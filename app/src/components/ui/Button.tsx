"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[#5a52e0] active:bg-[#4a44cc] border border-transparent",
  secondary:
    "bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[#22223a] active:bg-[#1a1a30] border border-[var(--border)]",
  danger:
    "bg-[var(--accent-red)] text-white hover:bg-[#e03655] active:bg-[#c42840] border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-7 px-3 text-xs rounded-lg gap-1.5",
  md: "h-9 px-4 text-sm rounded-xl gap-2",
  lg: "h-11 px-6 text-base rounded-xl gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-medium
        transition-colors duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="flex gap-1 items-center">
            <span className="loading-dot w-1 h-1 rounded-full bg-current" />
            <span className="loading-dot w-1 h-1 rounded-full bg-current" />
            <span className="loading-dot w-1 h-1 rounded-full bg-current" />
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
