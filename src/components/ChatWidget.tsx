"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./ui/Icon";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the Shift Ü assistant. Ask me about websites, AI agents, automations, or pricing.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ||
            "Something went wrong. Please use the contact form and we'll reply fast.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I can't reach the assistant right now. Please book a call or use the contact form.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-blue text-white shadow-s4 transition-transform hover:scale-105 active:scale-95"
      >
        <Icon name={open ? "X" : "MessageCircle"} size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.58, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-card border border-hair bg-card shadow-s4"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-hair bg-card px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-blue font-display text-sm font-bold text-white">
                Ü
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-ink">Shift Ü Assistant</p>
                <p className="flex items-center gap-1 text-xs text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Usually replies instantly
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface/50 p-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <p
                    className={
                      m.role === "user"
                        ? "max-w-[82%] rounded-2xl rounded-br-sm bg-blue px-3.5 py-2 text-[14px] text-white"
                        : "max-w-[82%] rounded-2xl rounded-bl-sm border border-hair bg-card px-3.5 py-2 text-[14px] text-ink"
                    }
                  >
                    {m.content}
                  </p>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <p className="flex gap-1 rounded-2xl rounded-bl-sm border border-hair bg-card px-3.5 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-soft"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </p>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-hair bg-card p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask a question..."
                className="min-w-0 flex-1 rounded-full border border-hair bg-surface px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft focus:border-blue"
                aria-label="Type your message"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue text-white transition-opacity disabled:opacity-40"
              >
                <Icon name="Send" size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
