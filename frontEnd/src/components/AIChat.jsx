import { useEffect, useRef, useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { askAI } from "../services/api";

function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm ShopAssist AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");
  const recognizerRef = useRef(null);
  const voiceActiveRef = useRef(false);

async function speakText(text) {
  try {
    const tokenResponse = await fetch(
      "http://localhost:5001/api/speech-token"
    );

    if (!tokenResponse.ok) {
      throw new Error("Could not get Speech token");
    }

    const { token, region } = await tokenResponse.json();

    const speechConfig =
      SpeechSDK.SpeechConfig.fromAuthorizationToken(
        token,
        region
      );

    speechConfig.speechSynthesisVoiceName =
      "en-IN-NeerjaNeural";

    const synthesizer =
      new SpeechSDK.SpeechSynthesizer(
        speechConfig,
        undefined
      );

    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (
          result.reason ===
          SpeechSDK.ResultReason.SynthesizingAudioCompleted
        ) {
          console.log("AI voice response completed.");
        } else {
          console.error(
            "Speech synthesis failed:",
            result.errorDetails
          );
        }

        synthesizer.close();
      },
      (error) => {
        console.error("Speech synthesis error:", error);
        synthesizer.close();
      }
    );
  } catch (error) {
    console.error("Text-to-Speech setup error:", error);
  }
}

  async function handleSend() {
  if (!input.trim()) {
    return;
  }

  const userMessage = {
    role: "user",
    text: input,
  };

  const messageText = input;

  setMessages((current) => [
    ...current,
    userMessage,
  ]);

  setInput("");
  setStatus("thinking");

  try {
    const token = localStorage.getItem("shopassist_token");

    if (!token) {
      throw new Error("User is not logged in");
    }

    const data = await askAI(messageText, token);

    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        text: data.reply,
      },
    ]);

    speakText(data.reply);

  } catch (error) {
    console.error("AI response error:", error);

    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        text: "Sorry, I couldn't connect to the AI assistant right now.",
      },
    ]);
  } finally {
    setStatus("idle");
  }
}

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSend();
    }
  }

 async function handleVoice() {
  if (voiceActiveRef.current) {
    voiceActiveRef.current = false;

    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          recognizerRef.current?.close();
          recognizerRef.current = null;
        },
        (error) => {
          console.error("Error stopping recognition:", error);
          recognizerRef.current = null;
        }
      );
    }

    setStatus("idle");
    return;
  }

  voiceActiveRef.current = true;
  setStatus("listening");

  try {
    const tokenResponse = await fetch(
      "http://localhost:5001/api/speech-token"
    );

    if (!tokenResponse.ok) {
      throw new Error("Could not get Speech token");
    }

    const { token, region } = await tokenResponse.json();

    if (!voiceActiveRef.current) {
      return;
    }

    const speechConfig =
      SpeechSDK.SpeechConfig.fromAuthorizationToken(
        token,
        region
      );

    speechConfig.speechRecognitionLanguage = "en-IN";

    const audioConfig =
      SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

    const recognizer = new SpeechSDK.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    recognizerRef.current = recognizer;

    recognizer.recognizeOnceAsync(
      (result) => {
        if (
          result.reason ===
          SpeechSDK.ResultReason.RecognizedSpeech
        ) {
          console.log("Recognized speech:", result.text);
          setInput(result.text);
        } else if (
          result.reason ===
          SpeechSDK.ResultReason.NoMatch
        ) {
          console.log("No speech recognized.");
        } else {
          console.error(
            "Speech recognition failed:",
            result.reason,
            result.errorDetails
          );
        }

        voiceActiveRef.current = false;
        setStatus("idle");

        if (recognizerRef.current === recognizer) {
          recognizerRef.current = null;
        }
      },
      (error) => {
        console.error("Speech recognition error:", error);

        voiceActiveRef.current = false;
        setStatus("idle");

        if (recognizerRef.current === recognizer) {
          recognizerRef.current = null;
        }
      }
    );
  } catch (error) {
    console.error("Speech-to-Text setup error:", error);

    voiceActiveRef.current = false;
    recognizerRef.current = null;
    setStatus("idle");
  }
}

  useEffect(() => {
    return () => {
      voiceActiveRef.current = false;
      recognizerRef.current?.close();
    };
  }, []);

  return (
    <section className="ai-section">
      <div className="ai-container">

        <div className="ai-header">
          <div className="ai-icon">✦</div>

          <div>
            <h2>ShopAssist AI</h2>
            <p>Your intelligent customer support assistant</p>
          </div>
        </div>

        <div className="chat-window">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role}`}
            >
              {message.text}
            </div>
          ))}

          {status === "thinking" && (
            <div className="message assistant">
              Thinking...
            </div>
          )}
        </div>

        <div className="ai-controls">

          <input
            type="text"
            placeholder="Ask about your order, refund, or return..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={handleSend}>
            Send
          </button>

          <button
            className={`voice-button ${
              status === "listening" ? "active" : ""
            }`}
            onClick={handleVoice}
          >
            {status === "listening"
              ? "🔴 Listening..."
              : "🎙️ Voice"}
          </button>

        </div>

        <div className="ai-status">
          {status === "idle" && "AI Support is ready"}
          {status === "listening" && "Listening for your request..."}
          {status === "thinking" && "AI is thinking..."}
        </div>

      </div>
    </section>
  );
}

export default AIChat;