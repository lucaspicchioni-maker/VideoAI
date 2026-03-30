"use client";

import { useState, useEffect } from "react";
import { PipelineStatus, PipelineStep } from "@/components/production/PipelineStatus";
import { SceneCard } from "@/components/production/SceneCard";
import { Badge, BadgeStatus } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { api } from "@/services/api";

interface Job {
  id: string;
  episode: string;
  step: string;
  progress: number;
  status: BadgeStatus;
  started_at: string;
}

interface EpisodeProduction {
  id: string;
  number: number;
  title: string;
  project: string;
  steps: PipelineStep[];
}

const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    episode: "EP01 — O Sorriso",
    step: "Geração de imagens (Midjourney)",
    progress: 45,
    status: "running",
    started_at: "2h atrás",
  },
];

const MOCK_EPISODES: EpisodeProduction[] = [
  {
    id: "ep01",
    number: 1,
    title: "O Sorriso",
    project: "Danilo Vasconcelos",
    steps: [
      { name: "Roteiro", status: "done" },
      { name: "Imagens", status: "running" },
      { name: "Áudio", status: "pending" },
      { name: "Animação", status: "pending" },
      { name: "Montagem", status: "pending" },
    ],
  },
];

export default function ProductionPage() {
  const [episodes, setEpisodes] = useState<EpisodeProduction[]>(MOCK_EPISODES);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [selectedEp, setSelectedEp] = useState<string>(MOCK_EPISODES[0]?.id ?? "");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    api
      .getActiveJobs()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setJobs(data as Job[]);
      })
      .catch(() => null);
  }, []);

  const handleStart = async (episodeId: string) => {
    setActionLoading(true);
    try {
      await api.startProduction(episodeId);
      alert("Produção iniciada! Verifique os jobs em andamento.");
    } catch {
      alert("Erro ao iniciar produção. Backend offline?");
    } finally {
      setActionLoading(false);
    }
  };

  const currentEpisode = episodes.find((e) => e.id === selectedEp) ?? episodes[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Produção
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Pipeline de produção por episódio
          </p>
        </div>
        <Button
          loading={actionLoading}
          onClick={() => currentEpisode && handleStart(currentEpisode.id)}
        >
          ▶ Iniciar Próxima Etapa
        </Button>
      </div>

      {/* Episode selector */}
      {episodes.length > 1 && (
        <div className="flex gap-2">
          {episodes.map((ep) => (
            <button
              key={ep.id}
              onClick={() => setSelectedEp(ep.id)}
              className="px-3 py-1.5 rounded-lg text-sm transition-colors"
              style={
                selectedEp === ep.id
                  ? { background: "var(--accent)", color: "white" }
                  : {
                      background: "var(--bg-card)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                    }
              }
            >
              EP{String(ep.number).padStart(2, "0")} — {ep.title}
            </button>
          ))}
        </div>
      )}

      {/* Pipeline visual */}
      {currentEpisode && (
        <Card title={`EP${String(currentEpisode.number).padStart(2, "0")} — ${currentEpisode.title}`}>
          <div className="py-2">
            <PipelineStatus steps={currentEpisode.steps} />
          </div>

          {/* Step details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
            {currentEpisode.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-xl p-3 text-center"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                  {step.name}
                </div>
                <Badge status={step.status} />
                {step.status === "pending" && (
                  <div className="mt-2">
                    <button
                      className="text-xs px-2 py-1 rounded-lg transition-colors"
                      style={{
                        background: "var(--bg-card)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border)",
                      }}
                      onClick={() => handleStart(currentEpisode.id)}
                    >
                      Iniciar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Active jobs */}
      <Card title="Jobs em Andamento">
        {jobs.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Nenhum job ativo no momento.
          </p>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-xl p-4"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {job.step}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {job.episode} · Iniciado {job.started_at}
                    </div>
                  </div>
                  <Badge status={job.status} />
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${job.progress}%`,
                        background:
                          job.status === "error"
                            ? "var(--accent-red)"
                            : "var(--accent)",
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium w-8 text-right" style={{ color: "var(--text-secondary)" }}>
                    {job.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Scene cards preview */}
      <Card title="Cenas — EP01 (preview)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <SceneCard
            number={1}
            title="Abertura — Danilo no espelho"
            description="Close no rosto de Danilo se olhando no espelho, sorriso calculado."
            status="done"
            prompt="Close shot of Danilo Vasconcelos looking at himself in a cracked mirror, slight smile, dim lighting --ar 9:16"
            duration="0:12"
          />
          <SceneCard
            number={2}
            title="Chegada ao trabalho"
            description="Danilo entra no escritório cumprimentando todos com charme excessivo."
            status="running"
            prompt="Medium shot, man in suit entering office, charming smile, modern corporate environment --ar 9:16"
            duration="0:18"
          />
          <SceneCard
            number={3}
            title="Conversa com a chefe"
            description="Danilo seduz a chefe com palavras, mas o olhar trai algo mais sombrio."
            status="pending"
            prompt="Two shot, man and woman in office conversation, tension in the air --ar 9:16"
            duration="0:22"
          />
          <SceneCard
            number={4}
            title="Saída — ligação misteriosa"
            description="Ao sair, Danilo atende uma ligação e o sorriso some completamente."
            status="pending"
            prompt="Back shot of man leaving building, answering phone, expression change --ar 9:16"
            duration="0:15"
          />
        </div>
      </Card>
    </div>
  );
}
