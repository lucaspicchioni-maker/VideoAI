"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge, BadgeStatus } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { api, ProjectInput } from "@/services/api";

interface Project {
  id: string;
  name: string;
  platform: string;
  genre: string;
  episodes_total: number;
  episodes_done: number;
  status: BadgeStatus;
  updated_at: string;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: "danilo-vasconcelos",
    name: "Danilo Vasconcelos — O Anti-Herói",
    platform: "YouTube / TikTok",
    genre: "Drama vertical",
    episodes_total: 120,
    episodes_done: 0,
    status: "running",
    updated_at: "28/03/2026",
  },
];

const PLATFORMS = ["YouTube", "TikTok", "Instagram Reels", "YouTube Shorts", "Multi-plataforma"];
const GENRES = ["Drama", "Thriller", "Comédia", "Terror", "Romance", "Documentário", "Educativo"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<ProjectInput>({
    name: "",
    platform: PLATFORMS[0],
    genre: GENRES[0],
    description: "",
  });

  useEffect(() => {
    api
      .getProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data as Project[]);
      })
      .catch(() => null);
  }, []);

  const handleCreate = async () => {
    if (!form.name.trim()) return;
    setCreating(true);
    try {
      const created = await api.createProject(form);
      setProjects((prev) => [...prev, created as Project]);
      setModalOpen(false);
      setForm({ name: "", platform: PLATFORMS[0], genre: GENRES[0], description: "" });
    } catch {
      alert("Erro ao criar projeto. Verifique o backend.");
    } finally {
      setCreating(false);
    }
  };

  const pct = (done: number, total: number) =>
    total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Projetos
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            {projects.length} projeto{projects.length !== 1 ? "s" : ""} cadastrado
            {projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>+ Novo Projeto</Button>
      </div>

      {/* Projects grid */}
      {projects.length === 0 ? (
        <div
          className="rounded-xl p-12 flex flex-col items-center gap-4 text-center"
          style={{ border: "2px dashed var(--border)" }}
        >
          <div className="text-4xl">🎬</div>
          <div>
            <p className="font-medium" style={{ color: "var(--text-primary)" }}>
              Nenhum projeto ainda
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Crie seu primeiro projeto para começar a produzir conteúdo com IA.
            </p>
          </div>
          <Button onClick={() => setModalOpen(true)}>Criar Projeto</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => {
            const progress = pct(project.episodes_done, project.episodes_total);
            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div
                  className="rounded-xl p-5 flex flex-col gap-4 cursor-pointer transition-colors"
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
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        className="text-sm font-semibold leading-snug"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {project.name}
                      </h3>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        {project.platform} · {project.genre}
                      </p>
                    </div>
                    <Badge status={project.status} />
                  </div>

                  {/* Progress bar */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: "var(--text-muted)" }}>
                        {project.episodes_done} / {project.episodes_total} episódios
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {progress}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "var(--bg-secondary)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${progress}%`,
                          background: "var(--accent)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Atualizado em {project.updated_at}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* New Project Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Novo Projeto"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button loading={creating} onClick={handleCreate}>
              Criar Projeto
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Nome do projeto"
            placeholder="Ex: Danilo Vasconcelos — O Anti-Herói"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Plataforma
            </label>
            <select
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="h-9 w-full rounded-xl px-3 text-sm outline-none"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Gênero
            </label>
            <select
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
              className="h-9 w-full rounded-xl px-3 text-sm outline-none"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Descrição (opcional)"
            placeholder="Breve descrição da série..."
            value={form.description ?? ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  );
}
