import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function Card({ title, children, className = "", action }: CardProps) {
  return (
    <div
      className={`
        bg-[var(--bg-card)] border border-[var(--border)]
        rounded-xl p-6
        ${className}
      `}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              {title}
            </h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
