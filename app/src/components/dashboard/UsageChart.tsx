"use client";

import React from "react";

interface UsageItem {
  label: string;
  value: number;
  max: number;
  color?: string;
}

interface UsageChartProps {
  items: UsageItem[];
  title?: string;
}

export function UsageChart({ items, title }: UsageChartProps) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      {title && (
        <h3
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-4">
        {items.map((item, i) => {
          const pct = Math.min((item.value / item.max) * 100, 100);
          const color = item.color ?? "var(--accent)";
          const isHigh = pct >= 80;
          const barColor = isHigh ? "var(--accent-red)" : color;

          return (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                <span style={{ color: "var(--text-muted)" }}>
                  {item.value.toLocaleString()} / {item.max.toLocaleString()}
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ background: "var(--bg-secondary)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    background: barColor,
                  }}
                />
              </div>
              <div className="text-right text-xs" style={{ color: "var(--text-muted)" }}>
                {pct.toFixed(0)}% usado
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
