import { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';
import { useAppContext } from '../context/AppContext';

function normalizeClassName(name) {
  if (!name) return "";
  return name.toLowerCase().replace(/[_-]/g, " ").trim();
}

const ENVIRONMENT_SOUNDS = {
  "Fire Alarm": { label: "Fire Alarm Detected", iconName: "Flame", priority: "High", alertKey: "Fire Alarm" },
  "Car Horn": { label: "Car Horn Detected", iconName: "Car", priority: "High", alertKey: "Car Horn" },
  "Siren": { label: "Siren Detected", iconName: "Megaphone", priority: "High", alertKey: "Siren" },
  "Doorbell": { label: "Doorbell Detected", iconName: "BellRing", priority: "Medium", alertKey: "Doorbell" },
  "Dog Bark": { label: "Dog Bark Detected", iconName: "Dog", priority: "Low", alertKey: "Dog Bark" },
  "Announcement": { label: "Announcement Detected", iconName: "Mic", priority: "Medium", alertKey: "Announcement" }
};

const NORMALIZED_SOUND_MAP = {
  "fire alarm": ENVIRONMENT_SOUNDS["Fire Alarm"],
  "car horn": ENVIRONMENT_SOUNDS["Car Horn"],
  "vehicle horn": ENVIRONMENT_SOUNDS["Car Horn"],
  "siren": ENVIRONMENT_SOUNDS["Siren"],
  "doorbell": ENVIRONMENT_SOUNDS["Doorbell"],
  "dog bark": ENVIRONMENT_SOUNDS["Dog Bark"],
  "bark": ENVIRONMENT_SOUNDS["Dog Bark"],
  "announcement": ENVIRONMENT_SOUNDS["Announcement"],
  "public address": ENVIRONMENT_SOUNDS["Announcement"]
};

export function useMicrophone(language = 'Original') {
  const { alerts } = useAppContext();
  
  const [transcript, setTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [environmentalSound, setEnvironmentalSound] = useState(null);
  const [isDetectingSound, setIsDetectingSound] = useState(false);
  const [micStream, setMicStream] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState(null);
  const [permissionState, setPermissionState] = useState('prompt');
  const [modelLoading, setModelLoading] = useState(true);

  const isListening = isTranscribing || isDetectingSound;

  const recognitionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const analyserRef = useRef(null);
  const shouldListenRef = useRef(false);

  const modelRef = useRef(null);
  const lastProcessedTimeRef = useRef(0);
  
  const detectionStateRef = useRef({
    pendingClass: null,
    consecutiveCount: 0,
    belowThresholdStartTime: null,
    activeClass: null,
    currentVolume: 0
  });

  const isAlertEnabled = (name) => {
    if (!name) return true;
    const alertConfig = alerts.find(a => a.name === name);
    return alertConfig ? alertConfig.enabled : false;
  };

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Loading TM model for live detection...");
        const cacheBust = "?cacheBust=" + Date.now();
        const recognizer = speechCommands.create(
          "BROWSER_FFT",
          null,
          window.location.origin + "/model/model.json" + cacheBust,
          window.location.origin + "/model/metadata.json" + cacheBust
        );
        await recognizer.ensureModelLoaded();
        modelRef.current = recognizer;
        setModelLoading(false);
        console.log("TM model loaded");
      } catch (err) {
        console.error("Failed to load TM model", err);
      }
    };
    loadModel();
  }, []);

  const initSpeechRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser');
      return false;
    }

    recognitionRef.current = new SpeechRecognition();

    let langCode = 'hi-IN';
    if (language === 'English') langCode = 'en-IN';
    else if (language === 'Hindi') langCode = 'hi-IN';
    else if (language === 'Hinglish' || language === 'Original') langCode = 'hi-IN';

    recognitionRef.current.lang = langCode;
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      let liveText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        liveText += event.results[i][0].transcript;
      }
      setTranscript(liveText);
      console.log("Transcript:", liveText);
    };

    recognitionRef.current.onerror = (event) => {
      if (event.error === 'not-allowed') {
        setError('Mic permission denied');
        setPermissionState('denied');
      }
    };

    recognitionRef.current.onend = () => {
      if (shouldListenRef.current) {
        try { recognitionRef.current.start(); } catch (e) { }
      }
    };

    return true;
  }, [language]);

  const startListening = async () => {
    if (modelLoading || !modelRef.current) {
      setError("Please wait for the model to finish loading.");
      return;
    }

    setError(null);
    setTranscript('');
    setEnvironmentalSound(null);
    shouldListenRef.current = true;
    detectionStateRef.current = {
      pendingClass: null,
      consecutiveCount: 0,
      belowThresholdStartTime: null,
      activeClass: null,
      currentVolume: 0
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      
      console.log("Mic stream active");
      mediaStreamRef.current = stream;
      setMicStream(stream);
      setPermissionState('granted');

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });

      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

      source.connect(analyserRef.current);
      analyserRef.current.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);

      processorRef.current.onaudioprocess = (e) => {
        if (!shouldListenRef.current) return;

        const inputData = e.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
          sum += inputData[i] * inputData[i];
        }
        const rms = Math.sqrt(sum / inputData.length);
        const avgVolume = Math.round(rms * 1000);
        
        setAudioLevel(avgVolume);
        setVolume(avgVolume > 100 ? 100 : avgVolume);
        detectionStateRef.current.currentVolume = avgVolume;

        const now = Date.now();
        if (now - lastProcessedTimeRef.current > 500) {
          lastProcessedTimeRef.current = now;
        }
      };

      if (!recognitionRef.current) {
        const supported = initSpeechRecognition();
        if (!supported) return;
      }

      try {
        recognitionRef.current.start();
        setIsTranscribing(true);
      } catch (e) {
        console.error("Recognition already started");
      }

      setIsDetectingSound(true);

      if (modelRef.current) {
        modelRef.current.listen(result => {
          if (!shouldListenRef.current) return;

          const scores = result.scores;
          const labels = modelRef.current.wordLabels();

          const predictions = Array.from(scores).map((score, i) => ({
            className: labels[i],
            normalized: normalizeClassName(labels[i]),
            probability: score
          }));

          predictions.sort((a, b) => b.probability - a.probability);
          const top = predictions[0];

          console.table(predictions.map(p => ({
            className: p.className,
            normalized: p.normalized,
            prob: Math.round(p.probability * 100)
          })));

          const state = detectionStateRef.current;
          const now = Date.now();

          const isNoise =
            top.normalized.includes("background") ||
            top.normalized.includes("noise") ||
            top.normalized.includes("speech");

          if (isNoise || top.probability < 0.75) {
            if (!state.belowThresholdStartTime) {
              state.belowThresholdStartTime = now;
            }

            if (now - state.belowThresholdStartTime > 1500) {
              setEnvironmentalSound(null);
              state.activeClass = null;
              state.pendingClass = null;
              state.consecutiveCount = 0;
            }
            return;
          }

          state.belowThresholdStartTime = null;

          const soundInfo = NORMALIZED_SOUND_MAP[top.normalized];

          if (!soundInfo) {
            console.warn("No mapping for class:", top.className);
            return;
          }

          if (top.normalized !== state.pendingClass) {
            state.pendingClass = top.normalized;
            state.consecutiveCount = 1;
          } else {
            state.consecutiveCount += 1;
          }

          if (state.consecutiveCount >= 2) {
            if (isAlertEnabled(soundInfo.alertKey)) {
              setEnvironmentalSound({
                soundName: soundInfo.label.replace(" Detected", ""),
                iconName: soundInfo.iconName,
                priority: soundInfo.priority,
                confidence: Math.round(top.probability * 100)
              });
              state.activeClass = top.normalized;
            }
          }
        }, {
          includeSpectrogram: false,
          probabilityThreshold: 0,
          invokeCallbackOnNoiseAndUnknown: true,
          overlapFactor: 0.50
        });
      } else {
        console.error("TM Model is not loaded properly.");
      }

    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError('Mic permission denied');
      setPermissionState('denied');
      setIsTranscribing(false);
      setIsDetectingSound(false);
      shouldListenRef.current = false;
    }
  };

  const stopListening = () => {
    shouldListenRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (modelRef.current && modelRef.current.isListening()) {
      modelRef.current.stopListening();
    }

    setIsTranscribing(false);
    setIsDetectingSound(false);
    setVolume(0);
    setAudioLevel(0);
    setMicStream(null);
    setEnvironmentalSound(null);
    detectionStateRef.current = {
      pendingClass: null,
      consecutiveCount: 0,
      belowThresholdStartTime: null,
      activeClass: null,
      currentVolume: 0
    };
  };

  useEffect(() => {
    return () => {
      shouldListenRef.current = false;
      stopListening();
    };
  }, []);

  return {
    isListening,
    isTranscribing,
    isDetectingSound,
    transcript,
    setTranscript,
    volume,
    audioLevel,
    micStream,
    error,
    permissionState,
    soundPrediction: environmentalSound,
    startListening,
    stopListening,
    modelLoading
  };
}
