"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--text-secondary)]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          h-9 w-full rounded-xl px-3 text-sm
          bg-[var(--bg-secondary)] border border-[var(--border)]
          text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
          outline-none
          focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
          ${error ? "border-[var(--accent-red)] focus:border-[var(--accent-red)] focus:ring-[var(--accent-red)]" : ""}
          ${className}
        `}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-[var(--text-muted)]">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-[var(--accent-red)]">{error}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--text-secondary)]"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`
          w-full rounded-xl px-3 py-2 text-sm
          bg-[var(--bg-secondary)] border border-[var(--border)]
          text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
          outline-none resize-none
          focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
          ${error ? "border-[var(--accent-red)]" : ""}
          ${className}
        `}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-[var(--text-muted)]">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-[var(--accent-red)]">{error}</p>
      )}
    </div>
  );
}
