import { ChatWindow } from "@/components/showrunner/ChatWindow";

export const metadata = {
  title: "Showrunner — VideoAI Studio",
};

export default function ShowrunnerPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem-3rem)] gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Showrunner
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Diretor Geral de IA — roteiros, personagens e arcos narrativos
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--accent-green)" }}
          />
          <span style={{ color: "var(--text-secondary)" }}>Claude 3.5 Sonnet</span>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 min-h-0">
        <ChatWindow />
      </div>
    </div>
  );
}
