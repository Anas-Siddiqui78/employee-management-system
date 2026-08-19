import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { askGemini } from "../services/geminiService";


function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Assistant. Ask me anything about employee management, HR practices, or get help with this system!",
      sender: "bot"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user"
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await askGemini(inputValue);
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: "bot"
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot"
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 z-40"
          title="Chat with AI"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 w-96 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden transition-all duration-300 z-50 ${
            isMinimized ? "h-16" : "h-96"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2">
              <MessageCircle size={20} /> AI Assistant
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1 rounded"
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-slate-800 text-slate-100 rounded-bl-none"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-slate-100 p-3 rounded-lg rounded-bl-none">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSendMessage}
                className="border-t border-slate-800 p-4 flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-slate-800 text-white p-2 rounded-lg focus:outline-none focus:border-blue-500 border border-slate-700"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white p-2 rounded-lg transition"
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default AIChatbot;