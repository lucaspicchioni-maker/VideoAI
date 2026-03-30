"use client";

import { use, useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge, BadgeStatus } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { api } from "@/services/api";

interface EpisodeStage {
  name: string;
  status: BadgeStatus;
  completedAt?: string;
}

interface EpisodeDetail {
  id: string;
  number: number;
  title: string;
  synopsis: string;
  status: BadgeStatus;
  project_name: string;
  scenes_count: number;
  duration_estimate: string;
  stages: EpisodeStage[];
  created_at: string;
}

interface Props {
  params: Promise<{ id: string; epId: string }>;
}

const STAGE_ICONS: Record<string, string> = {
  Roteiro: "📝",
  Imagens: "🎨",
  Áudio: "🔊",
  Animação: "🎬",
  Montagem: "✂️",
};

export default function EpisodePage({ params }: Props) {
  const { id, epId } = use(params);
  const [episode, setEpisode] = useState<EpisodeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    api.getEpisode(id, epId)
      .then((data) => setEpisode(data as EpisodeDetail))
      .catch(() =>
        setEpisode({
          id: epId,
          number: 1,
          title: "O Sorriso",
          synopsis:
            "Danilo Vasconcelos aparece pela primeira vez — carismático, irresistível. Mas algo está errado desde o começo.",
          status: "images",
          project_name: "Danilo Vasconcelos — O Anti-Herói",
          scenes_count: 12,
          duration_estimate: "~3 min",
          stages: [
            { name: "Roteiro", status: "done", completedAt: "28/03/2026" },
            { name: "Imagens", status: "running" },
            { name: "Áudio", status: "pending" },
            { name: "Animação", status: "pending" },
            { name: "Montagem", status: "pending" },
          ],
          created_at: "28/03/2026",
        })
      )
      .finally(() => setLoading(false));
  }, [id, epId]);

  const handleStartStage = async (stageName: string) => {
    setActionLoading(true);
    try {
      await api.startProduction(epId);
      alert(`Iniciando etapa: ${stageName}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex gap-2">
          <span className="loading-dot w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="loading-dot w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="loading-dot w-2 h-2 rounded-full bg-[var(--accent)]" />
        </div>
      </div>
    );
  }

  if (!episode) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--text-muted)] mb-1">
            {episode.project_name} · EP{String(episode.number).padStart(2, "0")}
          </p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {episode.title}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            {episode.synopsis}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <Badge status={episode.status} />
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <div className="text-xs text-[var(--text-muted)] mb-1">Cenas</div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {episode.scenes_count}
          </div>
        </Card>
        <Card>
          <div className="text-xs text-[var(--text-muted)] mb-1">Duração estimada</div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {episode.duration_estimate}
          </div>
        </Card>
        <Card>
          <div className="text-xs text-[var(--text-muted)] mb-1">Criado em</div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {episode.created_at}
          </div>
        </Card>
      </div>

      {/* Pipeline */}
      <Card title="Pipeline de Produção">
        <div className="space-y-3 mt-2">
          {episode.stages.map((stage, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "var(--bg-secondary)" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{STAGE_ICONS[stage.name] ?? "⚙️"}</span>
                <div>
                  <div className="text-sm font-medium text-[var(--text-primary)]">
                    {stage.name}
                  </div>
                  {stage.completedAt && (
                    <div className="text-xs text-[var(--text-muted)]">
                      Concluído em {stage.completedAt}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge status={stage.status} />
                {stage.status === "pending" && i > 0 && episode.stages[i - 1].status === "done" && (
                  <Button
                    size="sm"
                    variant="primary"
                    loading={actionLoading}
                    onClick={() => handleStartStage(stage.name)}
                  >
                    Iniciar
                  </Button>
                )}
                {stage.status === "running" && (
                  <Button size="sm" variant="secondary" disabled>
                    Em andamento...
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
