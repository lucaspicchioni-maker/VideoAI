import { CostCard } from "@/components/dashboard/CostCard";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { Badge } from "@/components/ui/Badge";

// Server component — data can be fetched directly
async function getDashboardData() {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
    const res = await fetch(`${base}/dashboard/usage`, { next: { revalidate: 60 } });
    if (res.ok) return res.json();
  } catch {
    // fallback below
  }
  return null;
}

interface Activity {
  id: string;
  episode: string;
  project: string;
  action: string;
  status: "done" | "running" | "error" | "pending";
  time: string;
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    episode: "EP01 — O Sorriso",
    project: "Danilo Vasconcelos",
    action: "Geração de imagens (MJ)",
    status: "running",
    time: "Agora",
  },
  {
    id: "2",
    episode: "EP01 — O Sorriso",
    project: "Danilo Vasconcelos",
    action: "Roteiro gerado",
    status: "done",
    time: "2h atrás",
  },
  {
    id: "3",
    episode: "EP01 — O Sorriso",
    project: "Danilo Vasconcelos",
    action: "Bíblia aprovada",
    status: "done",
    time: "5h atrás",
  },
];

export default async function DashboardPage() {
  const data = await getDashboardData();

  const metrics = [
    {
      title: "Episódios Produzidos",
      value: data?.episodes_done ?? "0",
      subtitle: `de ${data?.episodes_total ?? "120"} total`,
      change: { value: "+1 esta semana", direction: "up" as const },
      accentColor: "var(--accent)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1 4a2 2 0 012-2h6l2 2h2a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2V4z" opacity="0.4" />
          <path d="M6 7.5l5 2.5-5 2.5V7.5z" />
        </svg>
      ),
    },
    {
      title: "Custo do Mês",
      value: `$${data?.monthly_cost?.toFixed(2) ?? "0.00"}`,
      subtitle: "USD — todas as ferramentas",
      change: { value: "Dentro do budget", direction: "down" as const },
      accentColor: "var(--accent-green)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="8" r="7" />
          <path d="M8 3v1M8 12v1M5.5 6.5a2 2 0 013 0 1.5 1.5 0 01-1.5 1.5h-1A1.5 1.5 0 004.5 9.5a2 2 0 003 0" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Créditos Kling",
      value: data?.kling_credits ?? "—",
      subtitle: "créditos restantes",
      change: { value: "Suficiente para 40 eps", direction: "neutral" as const },
      accentColor: "var(--accent-yellow)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" opacity="0.8" />
        </svg>
      ),
    },
    {
      title: "ElevenLabs Chars",
      value: data?.elevenlabs_chars
        ? `${(data.elevenlabs_chars / 1000).toFixed(0)}k`
        : "—",
      subtitle: "characters restantes",
      change: { value: "~12 episódios restantes", direction: "neutral" as const },
      accentColor: "var(--accent-blue)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8h10M5 5h6M7 11h2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const usageItems = [
    { label: "ElevenLabs", value: data?.elevenlabs_used ?? 85000, max: 200000, color: "var(--accent-blue)" },
    { label: "Kling AI", value: data?.kling_used ?? 40, max: 200, color: "var(--accent-yellow)" },
    { label: "Anthropic API", value: data?.anthropic_used ?? 120000, max: 500000, color: "var(--accent)" },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Visão geral da produção — VideoAI Studio
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <CostCard key={i} {...m} />
        ))}
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2">
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-secondary)" }}
              >
                Últimas Atividades
              </h3>
            </div>
            <div style={{ background: "var(--bg-card)" }}>
              {MOCK_ACTIVITIES.map((act, i) => (
                <div
                  key={act.id}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i < MOCK_ACTIVITIES.length - 1 ? "border-b" : ""
                  }`}
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {act.action}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {act.episode} · {act.project}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {act.time}
                    </span>
                    <Badge status={act.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage chart */}
        <UsageChart title="Consumo de APIs" items={usageItems} />
      </div>
    </div>
  );
}
