"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface UsageData {
  elevenlabs_chars_remaining?: number;
  active_project?: string;
}

const routeLabels: Record<string, string[]> = {
  "/dashboard": ["Dashboard"],
  "/showrunner": ["Showrunner"],
  "/projects": ["Projetos"],
  "/production": ["Produção"],
  "/financeiro": ["Financeiro"],
};

function getBreadcrumb(pathname: string): string[] {
  // Exact match
  if (routeLabels[pathname]) return routeLabels[pathname];

  // Project detail
  const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
  if (projectMatch) {
    const parts: string[] = ["Projetos"];
    const sub = pathname.replace(`/projects/${projectMatch[1]}`, "");
    if (sub.startsWith("/episodes/")) {
      parts.push("Episódio");
    } else {
      parts.push("Detalhe");
    }
    return parts;
  }

  return ["VideoAI"];
}

export function Topbar() {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);
  const [usage, setUsage] = useState<UsageData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => setUsage(data))
      .catch(() => null);
  }, []);

  const formatChars = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
    return n.toString();
  };

  return (
    <header
      className="fixed top-0 left-60 right-0 h-14 flex items-center justify-between px-6 z-30"
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: "var(--text-muted)" }}
              >
                <path d="M4 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span
              style={{
                color: i === breadcrumb.length - 1
                  ? "var(--text-primary)"
                  : "var(--text-muted)",
              }}
              className={i === breadcrumb.length - 1 ? "font-medium" : ""}
            >
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Active project */}
        {usage?.active_project && (
          <div
            className="text-xs px-3 py-1 rounded-lg"
            style={{
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>Projeto: </span>
            <span style={{ color: "var(--text-primary)" }}>{usage.active_project}</span>
          </div>
        )}

        {/* ElevenLabs badge */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: usage !== null ? "var(--accent-green)" : "var(--accent-yellow)",
            }}
          />
          <span style={{ color: "var(--text-muted)" }}>ElevenLabs</span>
          <span
            className="font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {usage?.elevenlabs_chars_remaining != null
              ? `${formatChars(usage.elevenlabs_chars_remaining)} chars`
              : "—"}
          </span>
        </div>
      </div>
    </header>
  );
}
