"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Sparkles, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey, I'm Muneeb's digital clone. Ask me anything about my brand identity designs, my social media campaigns, or how my social sciences studies inform my strategy."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setError(null);
    const userMsg = input.trim();
    setInput("");
    
    const updatedMessages = [...messages, { role: "user" as const, content: userMsg }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Map history to match the standard messages array format
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to get reply");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: unknown) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : "An unexpected connection error occurred.";
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-ink hover:bg-ink/90 text-paper border border-line/20 shadow-2xl flex items-center justify-center cursor-pointer select-none group"
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5.5 h-5.5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-5.5 h-5.5 text-accent-primary" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-primary animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* 2. Chat Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-[9999] w-[90vw] sm:w-[380px] h-[500px] border border-line/40 rounded-3xl bg-paper/85 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 border-b border-line/30 bg-ink text-paper flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-paper" />
                </div>
                <div>
                  <h3 className="font-display font-semibold italic text-sm text-paper leading-tight">
                    Muneeb Clone
                  </h3>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-paper/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    AI Twin Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-paper/10 flex items-center justify-center text-paper/70 hover:text-paper transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-paper/20">
              {messages.map((msg, idx) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <div
                    key={idx}
                    className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed font-light ${
                        isAssistant
                          ? "bg-line/20 text-ink border border-line/30 rounded-tl-none font-sans"
                          : "bg-ink text-paper rounded-tr-none font-sans font-normal"
                      }`}
                    >
                      {/* Simple parse lists & lines to render lists cleanly */}
                      {msg.content.split("\n").map((line, lIdx) => {
                        const trimmedLine = line.trim();
                        if (trimmedLine.startsWith("-") || trimmedLine.startsWith("•")) {
                          return (
                            <li key={lIdx} className="list-disc pl-2 ml-2 mt-1">
                              {trimmedLine.substring(1).trim()}
                            </li>
                          );
                        }
                        return (
                          <p key={lIdx} className={lIdx > 0 ? "mt-1.5" : ""}>
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-line/20 border border-line/30 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-graphite/60 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-graphite/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-graphite/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              {/* Error Box */}
              {error && (
                <div className="flex gap-2 items-start p-3 border border-red-500/20 bg-red-500/5 text-red-500 text-[11px] rounded-xl font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Connection Error</p>
                    <p className="font-light mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-line/30 bg-paper/90 flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about my projects..."
                disabled={isLoading}
                className="flex-1 bg-line/10 border border-line/30 rounded-xl px-4 py-2.5 text-xs font-sans text-ink focus-visible:outline-none focus:border-accent-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-ink hover:bg-ink/90 text-paper flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
