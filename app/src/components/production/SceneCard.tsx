import React from "react";
import { Badge, BadgeStatus } from "@/components/ui/Badge";

interface SceneCardProps {
  number: number;
  title: string;
  description?: string;
  status: BadgeStatus;
  prompt?: string;
  duration?: string;
}

export function SceneCard({
  number,
  title,
  description,
  status,
  prompt,
  duration,
}: SceneCardProps) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}
          >
            {number}
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {duration && (
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {duration}
            </span>
          )}
          <Badge status={status} />
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {description}
        </p>
      )}

      {/* Prompt preview */}
      {prompt && (
        <div
          className="text-xs rounded-lg px-3 py-2 font-mono"
          style={{
            background: "var(--bg-secondary)",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
          }}
        >
          {prompt.length > 120 ? prompt.slice(0, 120) + "…" : prompt}
        </div>
      )}
    </div>
  );
}
