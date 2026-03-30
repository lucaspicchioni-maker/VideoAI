"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Badge, BadgeStatus } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { api } from "@/services/api";

interface Episode {
  id: string;
  number: number;
  title: string;
  status: BadgeStatus;
  stage: "scripted" | "images" | "audio" | "animation" | "done";
}

interface ProjectDetail {
  id: string;
  name: string;
  platform: string;
  genre: string;
  status: BadgeStatus;
  synopsis?: string;
  episodes: Episode[];
  episodes_total: number;
}

interface Props {
  params: Promise<{ id: string }>;
}

type TabId = "episodes" | "bible" | "characters";

const STAGE_ORDER: Episode["stage"][] = [
  "scripted",
  "images",
  "audio",
  "animation",
  "done",
];

const STAGE_LABEL: Record<Episode["stage"], string> = {
  scripted: "Roteiro",
  images: "Imagens",
  audio: "Áudio",
  animation: "Animação",
  done: "Concluído",
};

export default function ProjectDetailPage({ params }: Props) {
  const { id } = use(params);
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("episodes");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    api
      .getProject(id)
      .then((data) => setProject(data as ProjectDetail))
      .catch(() =>
        setProject({
          id,
          name: "Danilo Vasconcelos — O Anti-Herói",
          platform: "YouTube / TikTok",
          genre: "Drama vertical",
          status: "running",
          synopsis:
            "A história de Danilo Vasconcelos, um homem carismático que esconde segredos obscuros. Uma série vertical de 120 episódios sobre manipulação, identidade e redenção.",
          episodes_total: 120,
          episodes: [
            { id: "ep01", number: 1, title: "O Sorriso", status: "running", stage: "images" },
          ],
        })
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleGenerateEpisode = async () => {
    setGenerating(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      alert("Funcionalidade disponível quando o backend estiver conectado.");
    } finally {
      setGenerating(false);
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

  if (!project) return <p style={{ color: "var(--text-muted)" }}>Projeto não encontrado.</p>;

  const tabs: { id: TabId; label: string }[] = [
    { id: "episodes", label: `Episódios (${project.episodes.length})` },
    { id: "bible", label: "Bíblia" },
    { id: "characters", label: "Personagens" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/projects" className="text-sm" style={{ color: "var(--text-muted)" }}>
              Projetos
            </Link>
            <span style={{ color: "var(--text-muted)" }}>/</span>
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {project.name}
            </span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            {project.name}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            {project.platform} · {project.genre}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <Badge status={project.status} />
          <Button
            variant="primary"
            loading={generating}
            onClick={handleGenerateEpisode}
          >
            + Gerar Próximo Episódio
          </Button>
        </div>
      </div>

      {/* Synopsis */}
      {project.synopsis && (
        <Card>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {project.synopsis}
          </p>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
            Episódios feitos
          </div>
          <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            {project.episodes.filter((e) => e.stage === "done").length}
            <span className="text-sm font-normal ml-1" style={{ color: "var(--text-muted)" }}>
              / {project.episodes_total}
            </span>
          </div>
        </Card>
        <Card>
          <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
            Em produção
          </div>
          <div className="text-2xl font-bold" style={{ color: "var(--accent-yellow)" }}>
            {project.episodes.filter((e) => e.status === "running").length}
          </div>
        </Card>
        <Card>
          <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
            Progresso
          </div>
          <div className="text-2xl font-bold" style={{ color: "var(--accent-green)" }}>
            {project.episodes_total > 0
              ? Math.round(
                  (project.episodes.filter((e) => e.stage === "done").length /
                    project.episodes_total) *
                    100
                )
              : 0}
            %
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div>
        <div
          className="flex gap-1 p-1 rounded-xl w-fit mb-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={
                activeTab === tab.id
                  ? { background: "var(--accent)", color: "white" }
                  : { color: "var(--text-secondary)" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Episodes tab */}
        {activeTab === "episodes" && (
          <div className="space-y-2">
            {project.episodes.length === 0 ? (
              <div
                className="rounded-xl p-8 text-center"
                style={{ border: "2px dashed var(--border)" }}
              >
                <p style={{ color: "var(--text-muted)" }}>Nenhum episódio criado ainda.</p>
                <Button className="mt-3" onClick={handleGenerateEpisode}>
                  Gerar EP01
                </Button>
              </div>
            ) : (
              project.episodes.map((ep) => (
                <Link key={ep.id} href={`/projects/${id}/episodes/${ep.id}`}>
                  <div
                    className="flex items-center justify-between px-5 py-4 rounded-xl cursor-pointer transition-colors"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{
                          background: "var(--bg-secondary)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {String(ep.number).padStart(2, "0")}
                      </span>
                      <div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {ep.title}
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Etapa atual: {STAGE_LABEL[ep.stage]}
                        </div>
                      </div>
                    </div>

                    {/* Stage progress dots */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {STAGE_ORDER.map((s) => {
                          const idx = STAGE_ORDER.indexOf(s);
                          const curIdx = STAGE_ORDER.indexOf(ep.stage);
                          const isDone = idx < curIdx || ep.stage === "done";
                          const isCurrent = idx === curIdx;
                          return (
                            <div
                              key={s}
                              className="w-2 h-2 rounded-full"
                              style={{
                                background: isDone
                                  ? "var(--accent-green)"
                                  : isCurrent
                                  ? "var(--accent)"
                                  : "var(--border)",
                              }}
                            />
                          );
                        })}
                      </div>
                      <Badge status={ep.status} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {/* Bible tab */}
        {activeTab === "bible" && (
          <Card>
            <p style={{ color: "var(--text-muted)" }}>
              A bíblia da série ficará disponível aqui após aprovação via Showrunner.
            </p>
            <Button className="mt-4" variant="secondary" onClick={() => {}}>
              Abrir no Showrunner
            </Button>
          </Card>
        )}

        {/* Characters tab */}
        {activeTab === "characters" && (
          <Card>
            <p style={{ color: "var(--text-muted)" }}>
              Os personagens definidos na bíblia aparecerão aqui.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
