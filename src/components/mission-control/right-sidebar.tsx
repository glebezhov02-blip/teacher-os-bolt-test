import {
  Sparkles,
  Check,
  X,
  Activity,
  Plus,
  UserPlus,
  Receipt,
  Wand2,
  ArrowUpRight,
} from "lucide-react";
import { aiInbox, approvals, systemHealth, quickActions } from "@/data/demo";

const actionIcons = { plus: Plus, userPlus: UserPlus, receipt: Receipt, wand: Wand2 };

function Panel({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center gap-2">
        <Icon className="size-[15px] shrink-0 text-muted-foreground" />
        <h2 className="truncate text-[12.5px] font-semibold">{title}</h2>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function RightSidebar() {
  return (
    <aside className="scroll-slim flex h-full w-full flex-col gap-3 overflow-y-auto border-border bg-surface p-4 xl:w-[336px] xl:border-l">
      <Panel title="AI Inbox" icon={Sparkles}>
        <ul className="space-y-1">
          {aiInbox.map((item) => (
            <li
              key={item.id}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 rounded-xl px-2 py-2 transition-colors hover:bg-accent/60"
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">{item.title}</p>
                <p className="truncate text-[12px] text-muted-foreground">{item.body}</p>
              </div>
              <span className="num shrink-0 text-[11px] text-muted-foreground">{item.time}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Waiting for Approval" icon={Check}>
        <ul className="space-y-2">
          {approvals.map((item) => (
            <li key={item.id} className="rounded-xl border border-border bg-surface/60 p-3">
              <p className="truncate text-[13px] font-medium">{item.title}</p>
              <p className="truncate text-[12px] text-muted-foreground">{item.body}</p>
              <div className="mt-2.5 flex gap-2">
                <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 py-1.5 text-[12px] font-medium text-primary-foreground transition-opacity hover:opacity-90">
                  <Check className="size-3.5" />
                  Approve
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-accent">
                  <X className="size-3.5" />
                  Dismiss
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="System Health" icon={Activity}>
        <ul className="space-y-2">
          {systemHealth.map((item) => (
            <li key={item.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <span className="truncate text-[12.5px] text-muted-foreground">{item.label}</span>
              <span
                className={`flex shrink-0 items-center gap-1.5 text-[12px] font-medium ${
                  item.ok ? "text-success" : "text-danger"
                }`}
              >
                <span className="size-1.5 rounded-full bg-current" />
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Quick Actions" icon={ArrowUpRight}>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((a) => {
            const Icon = actionIcons[a.icon];
            return (
              <button
                key={a.id}
                className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-2.5 py-2.5 text-left text-[12.5px] font-medium transition-colors hover:bg-accent"
              >
                <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">{a.label}</span>
              </button>
            );
          })}
        </div>
      </Panel>
    </aside>
  );
}
