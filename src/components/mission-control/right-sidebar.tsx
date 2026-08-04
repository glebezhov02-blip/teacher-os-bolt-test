import { Users, Activity, Plus, UserPlus, Receipt, Wand2, ArrowUpRight } from "lucide-react";
import type { LessonEventRow, StudentRow } from "@/lib/mission-control.functions";

const DASH = "—";

function Panel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
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

const quickActions = [
  { id: "q1", label: "New lesson", icon: Plus },
  { id: "q2", label: "Add student", icon: UserPlus },
  { id: "q3", label: "Send invoice", icon: Receipt },
  { id: "q4", label: "Generate homework", icon: Wand2 },
];

export function RightSidebar({
  students,
  lessons,
}: {
  students: StudentRow[];
  lessons: (LessonEventRow & { student: StudentRow | null })[];
}) {
  const active = students.filter((s) => s.status === "active").length;

  return (
    <aside className="scroll-slim flex h-full w-full flex-col gap-3 overflow-y-auto border-border bg-surface p-4 xl:w-[336px] xl:border-l">
      <Panel title="Students" icon={Users}>
        {students.length === 0 ? (
          <p className="text-[12.5px] text-muted-foreground">No students found.</p>
        ) : (
          <ul className="space-y-1">
            {students.map((s) => (
              <li
                key={s.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl px-2 py-2 transition-colors hover:bg-accent/60"
              >
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium">{s.full_name ?? DASH}</p>
                  <p className="truncate text-[12px] text-muted-foreground">
                    {s.current_level ?? DASH} · Unit {s.current_unit ?? DASH}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground capitalize">
                  {s.status ?? DASH}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Overview" icon={Activity}>
        <ul className="space-y-2">
          {[
            { label: "Students", value: String(students.length) },
            { label: "Active students", value: String(active) },
            { label: "Scheduled lessons", value: String(lessons.length) },
          ].map((item) => (
            <li
              key={item.label}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"
            >
              <span className="truncate text-[12.5px] text-muted-foreground">{item.label}</span>
              <span className="num shrink-0 text-[12.5px] font-medium">{item.value}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Quick Actions" icon={ArrowUpRight}>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((a) => (
            <button
              key={a.id}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-2.5 py-2.5 text-left text-[12.5px] font-medium transition-colors hover:bg-accent"
            >
              <a.icon className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="truncate">{a.label}</span>
            </button>
          ))}
        </div>
      </Panel>
    </aside>
  );
}
