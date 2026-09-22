import { useState } from "react";

function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm ShopAssist AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");

  function handleSend() {
    if (!input.trim()) {
      return;
    }

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");

    // Temporary AI response.
    // We'll replace this with the real Foundry agent later.
    setStatus("thinking");

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "I can help with orders, returns, refunds, and delivery issues. The AI agent will be connected here next.",
        },
      ]);

      setStatus("idle");
    }, 800);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSend();
    }
  }

  function handleVoice() {
    setStatus((current) =>
      current === "listening" ? "idle" : "listening"
    );
  }

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