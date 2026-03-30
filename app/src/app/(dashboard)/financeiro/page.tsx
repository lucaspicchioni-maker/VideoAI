"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { api } from "@/services/api";

interface CostEntry {
  episode: string;
  midjourney: number;
  kling: number;
  elevenlabs: number;
  anthropic: number;
  total: number;
  date: string;
}

interface ServiceUsage {
  name: string;
  spent: number;
  budget: number;
  unit: string;
  color: string;
}

interface CostEstimate {
  midjourney: number;
  kling: number;
  elevenlabs: number;
  anthropic: number;
  total: number;
}

const MOCK_HISTORY: CostEntry[] = [
  {
    episode: "EP01 — O Sorriso",
    midjourney: 4.5,
    kling: 8.0,
    elevenlabs: 1.2,
    anthropic: 0.8,
    total: 14.5,
    date: "28/03/2026",
  },
];

const MOCK_SERVICES: ServiceUsage[] = [
  {
    name: "ElevenLabs",
    spent: 1.2,
    budget: 22,
    unit: "de $22/mês",
    color: "var(--accent-blue)",
  },
  {
    name: "Kling AI",
    spent: 8.0,
    budget: 50,
    unit: "de $50 (créditos)",
    color: "var(--accent-yellow)",
  },
  {
    name: "Anthropic",
    spent: 0.8,
    budget: 20,
    unit: "de $20/mês",
    color: "var(--accent)",
  },
  {
    name: "Midjourney",
    spent: 4.5,
    budget: 10,
    unit: "de $10/mês",
    color: "var(--accent-green)",
  },
];

// Cost estimates per scene
const COST_PER_SCENE = {
  midjourney: 0.3,   // ~4 images at $0.08 each
  kling: 0.6,        // ~1 animation clip
  elevenlabs: 0.08,  // ~300 chars
  anthropic: 0.06,   // script generation
};

export default function FinanceiroPage() {
  const [history, setHistory] = useState<CostEntry[]>(MOCK_HISTORY);
  const [services, setServices] = useState<ServiceUsage[]>(MOCK_SERVICES);
  const [scenes, setScenes] = useState("12");
  const [estimate, setEstimate] = useState<CostEstimate | null>(null);
  const [estimating, setEstimating] = useState(false);

  useEffect(() => {
    api
      .getCostHistory()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHistory(data as CostEntry[]);
        }
      })
      .catch(() => null);
  }, []);

  const handleEstimate = async () => {
    const n = parseInt(scenes, 10);
    if (isNaN(n) || n <= 0) return;

    setEstimating(true);
    try {
      const data = await api.estimateCost({ scenes: n });
      setEstimate(data as CostEstimate);
    } catch {
      // Fallback: local calculation
      setEstimate({
        midjourney: parseFloat((n * COST_PER_SCENE.midjourney).toFixed(2)),
        kling: parseFloat((n * COST_PER_SCENE.kling).toFixed(2)),
        elevenlabs: parseFloat((n * COST_PER_SCENE.elevenlabs).toFixed(2)),
        anthropic: parseFloat((n * COST_PER_SCENE.anthropic).toFixed(2)),
        total: parseFloat(
          (
            n *
            (COST_PER_SCENE.midjourney +
              COST_PER_SCENE.kling +
              COST_PER_SCENE.elevenlabs +
              COST_PER_SCENE.anthropic)
          ).toFixed(2)
        ),
      });
    } finally {
      setEstimating(false);
    }
  };

  const totalSpent = services.reduce((s, sv) => s + sv.spent, 0);
  const totalBudget = services.reduce((s, sv) => s + sv.budget, 0);
  const budgetPct = Math.round((totalSpent / totalBudget) * 100);
  const budgetAlert = budgetPct >= 70;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Financeiro
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Custos de produção e consumo de APIs
        </p>
      </div>

      {/* Budget alert */}
      {budgetAlert && (
        <div
          className="rounded-xl px-5 py-4 flex items-center gap-3"
          style={{ background: "rgba(255,77,109,0.1)", border: "1px solid var(--accent-red)" }}
        >
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--accent-red)" }}>
              Atenção: {budgetPct}% do budget mensal utilizado
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              ${totalSpent.toFixed(2)} gastos de ${totalBudget.toFixed(2)} disponíveis este mês.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cost estimator */}
        <Card title="Estimador de Custo">
          <div className="flex flex-col gap-4 mt-2">
            <Input
              label="Número de cenas"
              type="number"
              min="1"
              max="500"
              value={scenes}
              onChange={(e) => setScenes(e.target.value)}
              placeholder="Ex: 12"
            />
            <Button loading={estimating} onClick={handleEstimate}>
              Estimar Custo
            </Button>

            {estimate && (
              <div className="flex flex-col gap-2 mt-1">
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {[
                    { label: "Midjourney", value: estimate.midjourney },
                    { label: "Kling AI", value: estimate.kling },
                    { label: "ElevenLabs", value: estimate.elevenlabs },
                    { label: "Anthropic", value: estimate.anthropic },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm py-1">
                      <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                      <span style={{ color: "var(--text-primary)" }}>
                        ${item.value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div
                    className="flex justify-between text-sm font-bold pt-2 mt-1"
                    style={{
                      borderTop: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span>Total estimado</span>
                    <span style={{ color: "var(--accent-green)" }}>
                      ${estimate.total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  * Baseado em {scenes} cena{parseInt(scenes) !== 1 ? "s" : ""}. Valores podem variar.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Service usage */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {services.map((sv) => {
            const pct = Math.min((sv.spent / sv.budget) * 100, 100);
            const isHigh = pct >= 80;
            return (
              <div
                key={sv.name}
                className="rounded-xl p-5"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${isHigh ? "var(--accent-red)" : "var(--border)"}`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {sv.name}
                  </span>
                  {isHigh && (
                    <span className="text-xs" style={{ color: "var(--accent-red)" }}>
                      ⚠ Alto
                    </span>
                  )}
                </div>
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: isHigh ? "var(--accent-red)" : "var(--text-primary)" }}
                >
                  ${sv.spent.toFixed(2)}
                </div>
                <div className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                  {sv.unit}
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: isHigh ? "var(--accent-red)" : sv.color,
                    }}
                  />
                </div>
                <div className="text-right text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {pct.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cost history table */}
      <Card title="Histórico de Custos por Episódio">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Episódio", "Midjourney", "Kling", "ElevenLabs", "Anthropic", "Total", "Data"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left pb-3 pr-4 font-semibold text-xs uppercase tracking-wider"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Nenhum histórico ainda.
                  </td>
                </tr>
              ) : (
                history.map((entry, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom:
                        i < history.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <td className="py-3 pr-4" style={{ color: "var(--text-primary)" }}>
                      {entry.episode}
                    </td>
                    <td className="py-3 pr-4" style={{ color: "var(--text-secondary)" }}>
                      ${entry.midjourney.toFixed(2)}
                    </td>
                    <td className="py-3 pr-4" style={{ color: "var(--text-secondary)" }}>
                      ${entry.kling.toFixed(2)}
                    </td>
                    <td className="py-3 pr-4" style={{ color: "var(--text-secondary)" }}>
                      ${entry.elevenlabs.toFixed(2)}
                    </td>
                    <td className="py-3 pr-4" style={{ color: "var(--text-secondary)" }}>
                      ${entry.anthropic.toFixed(2)}
                    </td>
                    <td
                      className="py-3 pr-4 font-semibold"
                      style={{ color: "var(--accent-green)" }}
                    >
                      ${entry.total.toFixed(2)}
                    </td>
                    <td className="py-3" style={{ color: "var(--text-muted)" }}>
                      {entry.date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
