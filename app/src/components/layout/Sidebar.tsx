"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="6" height="6" rx="1.5" />
        <rect x="11" y="1" width="6" height="6" rx="1.5" />
        <rect x="1" y="11" width="6" height="6" rx="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/showrunner",
    label: "Showrunner",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 1a8 8 0 100 16A8 8 0 009 1z" />
        <path d="M6 7h1m5 0h-1M6 11h6" strokeLinecap="round" />
        <circle cx="6.5" cy="7" r="0.5" fill="currentColor" />
        <circle cx="11.5" cy="7" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "/projects",
    label: "Projetos",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 4a2 2 0 012-2h3l2 2h5a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
      </svg>
    ),
  },
  {
    href: "/production",
    label: "Produção",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="5" width="16" height="10" rx="2" />
        <path d="M7 9l4 2-4 2V9z" fill="currentColor" stroke="none" />
        <path d="M4 2h1M8 2h1M12 2h1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/financeiro",
    label: "Financeiro",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="9" r="8" />
        <path d="M9 4v1m0 8v1M6.5 7a2 2 0 013 0 1.5 1.5 0 01-1.5 1.5h-1A1.5 1.5 0 005.5 10a2 2 0 003 0" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="fixed left-0 top-0 h-full w-60 flex flex-col z-40"
      style={{ background: "var(--bg-secondary)", borderRight: "1px solid var(--border)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b"
        style={{ borderColor: "var(--border)" }}>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--accent)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
            <path d="M1 4a2 2 0 012-2h6l2 2h2a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2V4z" opacity="0.4" />
            <path d="M6 7.5l5 2.5-5 2.5V7.5z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-bold tracking-wide" style={{ color: "var(--text-primary)" }}>
            VideoAI
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            Studio
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-colors duration-150
                ${active
                  ? "text-white"
                  : "hover:bg-[var(--bg-card)]"
                }
              `}
              style={
                active
                  ? { background: "var(--accent)", color: "white" }
                  : { color: "var(--text-secondary)" }
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--accent-green)" }}
          />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Sistema operacional
          </span>
        </div>
      </div>
    </aside>
  );
}
