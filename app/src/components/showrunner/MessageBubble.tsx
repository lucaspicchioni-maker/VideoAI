import React from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  showApproveButton?: boolean;
  onApprove?: () => void;
}

interface MessageBubbleProps {
  message: Message;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

// Minimal markdown: bold (**text**), italic (*text*), code (`text`), line breaks
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  return lines.map((line, li) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    const rendered = parts.map((part, pi) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={pi}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return <em key={pi}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        return (
          <code
            key={pi}
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{ background: "var(--bg-secondary)", color: "var(--accent)" }}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return <span key={pi}>{part}</span>;
    });
    return (
      <React.Fragment key={li}>
        {rendered}
        {li < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
        style={{
          background: isUser ? "var(--accent)" : "var(--bg-card)",
          border: "1px solid var(--border)",
          color: isUser ? "white" : "var(--accent-green)",
        }}
      >
        {isUser ? "V" : "AI"}
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-1.5 max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
          style={{
            background: isUser ? "rgba(108,99,255,0.15)" : "var(--bg-card)",
            border: isUser ? "1px solid rgba(108,99,255,0.3)" : "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        >
          {renderMarkdown(message.content)}
        </div>

        {/* Timestamp */}
        <span className="text-xs px-1" style={{ color: "var(--text-muted)" }}>
          {formatTime(message.timestamp)}
        </span>

        {/* Approve Bible button */}
        {message.showApproveButton && message.onApprove && (
          <button
            onClick={message.onApprove}
            className="mt-1 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            style={{
              background: "var(--accent-green)",
              color: "var(--bg-primary)",
            }}
          >
            ✓ Aprovar Bíblia
          </button>
        )}
      </div>
    </div>
  );
}
