"use client";

import React from "react";
import { BadgeStatus } from "@/components/ui/Badge";

export interface PipelineStep {
  name: string;
  status: BadgeStatus;
  action?: () => void;
  actionLabel?: string;
}

interface PipelineStatusProps {
  steps: PipelineStep[];
}

const statusStyles: Record<string, { ring: string; bg: string; icon: string }> = {
  done: {
    ring: "border-[var(--accent-green)]",
    bg: "bg-[var(--accent-green)]",
    icon: "✓",
  },
  running: {
    ring: "border-[var(--accent-blue)] border-2",
    bg: "bg-[var(--accent-blue)]",
    icon: "⟳",
  },
  error: {
    ring: "border-[var(--accent-red)]",
    bg: "bg-[var(--accent-red)]",
    icon: "✕",
  },
  pending: {
    ring: "border-[var(--border)]",
    bg: "bg-[var(--bg-secondary)]",
    icon: "",
  },
};

export function PipelineStatus({ steps }: PipelineStatusProps) {
  return (
    <div className="w-full">
      {/* Horizontal pipeline */}
      <div className="flex items-start justify-between relative">
        {/* Connector line behind circles */}
        <div
          className="absolute top-5 left-5 right-5 h-0.5"
          style={{ background: "var(--border)", zIndex: 0 }}
        />

        {steps.map((step, i) => {
          const style = statusStyles[step.status] ?? statusStyles.pending;
          const isDone = step.status === "done";
          const isRunning = step.status === "running";

          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2 relative z-10"
              style={{ minWidth: "80px" }}
            >
              {/* Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full border flex items-center justify-center
                  text-sm font-bold flex-shrink-0
                  ${style.ring}
                  ${isRunning ? "animate-pulse" : ""}
                `}
                style={{
                  background: isDone || isRunning ? undefined : "var(--bg-card)",
                  backgroundColor:
                    isDone
                      ? "var(--accent-green)"
                      : isRunning
                      ? "var(--accent-blue)"
                      : step.status === "error"
                      ? "var(--accent-red)"
                      : "var(--bg-card)",
                  color:
                    isDone || isRunning || step.status === "error"
                      ? "white"
                      : "var(--text-muted)",
                }}
              >
                {style.icon || (i + 1)}
              </div>

              {/* Name */}
              <span
                className="text-xs text-center leading-tight"
                style={{
                  color: isDone
                    ? "var(--accent-green)"
                    : isRunning
                    ? "var(--accent-blue)"
                    : step.status === "error"
                    ? "var(--accent-red)"
                    : "var(--text-muted)",
                  maxWidth: "72px",
                }}
              >
                {step.name}
              </span>

              {/* Action button */}
              {step.action && step.actionLabel && (
                <button
                  onClick={step.action}
                  className="text-xs px-2 py-1 rounded-lg transition-colors"
                  style={{
                    background: "var(--accent)",
                    color: "white",
                  }}
                >
                  {step.actionLabel}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
