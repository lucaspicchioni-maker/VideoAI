import React from "react";

export type BadgeStatus =
  | "pending"
  | "running"
  | "done"
  | "error"
  | "scripted"
  | "images"
  | "audio"
  | "animation"
  | "active"
  | "paused"
  | "draft";

interface BadgeProps {
  status: BadgeStatus;
  label?: string;
  className?: string;
}

const statusConfig: Record<
  BadgeStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  pending: {
    label: "Pendente",
    dot: "bg-[var(--accent-yellow)]",
    bg: "bg-[#ffd60a15]",
    text: "text-[var(--accent-yellow)]",
  },
  running: {
    label: "Rodando",
    dot: "bg-[var(--accent-blue)] animate-pulse",
    bg: "bg-[#3b82f615]",
    text: "text-[var(--accent-blue)]",
  },
  done: {
    label: "Concluído",
    dot: "bg-[var(--accent-green)]",
    bg: "bg-[#00d4aa15]",
    text: "text-[var(--accent-green)]",
  },
  error: {
    label: "Erro",
    dot: "bg-[var(--accent-red)]",
    bg: "bg-[#ff4d6d15]",
    text: "text-[var(--accent-red)]",
  },
  scripted: {
    label: "Roteiro",
    dot: "bg-purple-400",
    bg: "bg-purple-400/10",
    text: "text-purple-400",
  },
  images: {
    label: "Imagens",
    dot: "bg-blue-400",
    bg: "bg-blue-400/10",
    text: "text-blue-400",
  },
  audio: {
    label: "Áudio",
    dot: "bg-orange-400",
    bg: "bg-orange-400/10",
    text: "text-orange-400",
  },
  animation: {
    label: "Animação",
    dot: "bg-pink-400",
    bg: "bg-pink-400/10",
    text: "text-pink-400",
  },
  active: {
    label: "Ativo",
    dot: "bg-[var(--accent-green)]",
    bg: "bg-[#00d4aa15]",
    text: "text-[var(--accent-green)]",
  },
  paused: {
    label: "Pausado",
    dot: "bg-[var(--text-muted)]",
    bg: "bg-[#55557015]",
    text: "text-[var(--text-muted)]",
  },
  draft: {
    label: "Rascunho",
    dot: "bg-[var(--text-secondary)]",
    bg: "bg-[#8888aa15]",
    text: "text-[var(--text-secondary)]",
  },
};

export function Badge({ status, label, className = "" }: BadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label ?? config.label;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-full text-xs font-medium
        ${config.bg} ${config.text}
        ${className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot}`} />
      {displayLabel}
    </span>
  );
}
