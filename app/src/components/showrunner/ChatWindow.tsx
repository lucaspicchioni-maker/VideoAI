"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Message, MessageBubble } from "./MessageBubble";
import { api } from "@/services/api";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

const BIBLE_APPROVE_KEYWORDS = [
  "aprovar a bíblia",
  "approve the bible",
  "bíblia aprovada",
  "aprovação da bíblia",
  "deseja aprovar",
];

function containsBibleApproval(text: string): boolean {
  const lower = text.toLowerCase();
  return BIBLE_APPROVE_KEYWORDS.some((kw) => lower.includes(kw));
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Olá! Sou o **Showrunner**, seu Diretor Geral de IA.\n\nPosso ajudar com roteiros, desenvolvimento de personagens, arcos narrativos e produção da sua série. Como posso ajudar hoje?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const allMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const data = await api.chat(allMessages) as Record<string, string>;
      const responseText =
        data?.response ?? data?.content ?? data?.message ?? "Sem resposta do servidor.";

      const aiMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
        showApproveButton: containsBibleApproval(responseText),
        onApprove: () => handleApprove(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: "Erro ao conectar com o servidor. Verifique se o backend está rodando.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleApprove = async () => {
    const approveMsg: Message = {
      id: generateId(),
      role: "user",
      content: "Bíblia aprovada. Pode prosseguir.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, approveMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="flex flex-col h-full rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
    >
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 min-h-0">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--accent-green)",
              }}
            >
              AI
            </div>
            <div
              className="rounded-2xl px-4 py-3"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex gap-1.5 items-center h-5">
                <span className="loading-dot w-2 h-2 rounded-full bg-[var(--text-muted)]" />
                <span className="loading-dot w-2 h-2 rounded-full bg-[var(--text-muted)]" />
                <span className="loading-dot w-2 h-2 rounded-full bg-[var(--text-muted)]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className="p-3 flex gap-3 items-end"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escreva uma mensagem... (Enter para enviar, Shift+Enter para nova linha)"
          rows={1}
          disabled={loading}
          className="flex-1 resize-none rounded-xl px-3 py-2.5 text-sm outline-none transition-colors"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            maxHeight: "120px",
            minHeight: "40px",
          }}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = Math.min(el.scrollHeight, 120) + "px";
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: "var(--accent)", color: "white" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M14.5 1.5L1.5 7l5 1.5L8 14.5l6.5-13z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
