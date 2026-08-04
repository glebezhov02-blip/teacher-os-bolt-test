import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BookOpen,
  Wallet,
  Sparkles,
  Settings,
  GraduationCap,
} from "lucide-react";

const nav = [
  { label: "Mission Control", to: "/", icon: LayoutDashboard },
  { label: "Students", to: "/", icon: Users },
  { label: "Schedule", to: "/", icon: CalendarDays },
  { label: "Curriculum", to: "/", icon: BookOpen },
  { label: "Payments", to: "/", icon: Wallet },
  { label: "AI Studio", to: "/", icon: Sparkles },
];

export function LeftSidebar() {
  return (
    <aside className="flex h-full w-[248px] flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2.5 px-5 pt-6 pb-7">
        <div className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-sidebar-accent">
          <GraduationCap className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold tracking-tight">Teacher OS</p>
          <p className="truncate text-[11px] text-sidebar-muted">Anna Reiter</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-2.5">
        {nav.map((item, i) => (
          <Link
            key={item.label}
            to={item.to}
            className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[13px] transition-colors ${
              i === 0
                ? "bg-sidebar-accent font-medium text-sidebar-foreground"
                : "text-sidebar-muted hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            }`}
          >
            <item.icon className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-2.5 py-3">
        <button className="flex w-full items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[13px] text-sidebar-muted transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground">
          <Settings className="size-4 shrink-0" />
          Settings
        </button>
      </div>
    </aside>
  );
}
