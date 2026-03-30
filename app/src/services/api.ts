const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

type JsonBody = Record<string, unknown>;

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface ProjectInput {
  name: string;
  platform: string;
  genre: string;
  description?: string;
}

export const api = {
  // Projects
  getProjects: () => request("/projects"),
  createProject: (data: ProjectInput) =>
    request("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getProject: (id: string) => request(`/projects/${id}`),
  updateProject: (id: string, data: Partial<ProjectInput>) =>
    request(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteProject: (id: string) =>
    request(`/projects/${id}`, { method: "DELETE" }),

  // Episodes
  getEpisodes: (projectId: string) =>
    request(`/projects/${projectId}/episodes`),
  getEpisode: (projectId: string, epId: string) =>
    request(`/projects/${projectId}/episodes/${epId}`),
  createEpisode: (projectId: string, data: JsonBody) =>
    request(`/projects/${projectId}/episodes`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Showrunner
  chat: (messages: { role: string; content: string }[]) =>
    request("/showrunner/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
    }),
  approveBible: (projectId: string) =>
    request(`/showrunner/approve-bible`, {
      method: "POST",
      body: JSON.stringify({ project_id: projectId }),
    }),

  // Production
  startProduction: (episodeId: string) =>
    request(`/production/start`, {
      method: "POST",
      body: JSON.stringify({ episode_id: episodeId }),
    }),
  getJobStatus: (jobId: string) => request(`/production/jobs/${jobId}`),
  getActiveJobs: () => request("/production/jobs"),

  // Dashboard & Usage
  getUsage: () => request("/dashboard/usage"),
  getAlerts: () => request("/dashboard/alerts"),
  estimateCost: (data: { scenes: number; platform?: string }) =>
    request("/dashboard/estimate-cost", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getCostHistory: () => request("/dashboard/cost-history"),
};
