import React from "react";

interface CostCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  accentColor?: string;
}

export function CostCard({
  title,
  value,
  subtitle,
  change,
  icon,
  accentColor = "var(--accent)",
}: CostCardProps) {
  const changeColor =
    change?.direction === "down"
      ? "var(--accent-green)"
      : change?.direction === "up"
      ? "var(--accent-red)"
      : "var(--text-muted)";

  const changePrefix =
    change?.direction === "up" ? "↑" : change?.direction === "down" ? "↓" : "–";

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}>
          {title}
        </span>
        {icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${accentColor}20`, color: accentColor }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div>
        <div className="text-3xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}>
          {value}
        </div>
        {subtitle && (
          <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* Change */}
      {change && (
        <div className="text-xs font-medium" style={{ color: changeColor }}>
          {changePrefix} {change.value}
        </div>
      )}
    </div>
  );
}
