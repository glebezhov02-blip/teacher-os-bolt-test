import { Users, CalendarDays, Clock, UserCheck } from "lucide-react";

export type Stat = { label: string; value: string; delta: string; icon: keyof typeof icons };

const icons = {
  users: Users,
  calendar: CalendarDays,
  clock: Clock,
  active: UserCheck,
};

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => {
        const Icon = icons[s.icon];
        return (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-4 shadow-card transition-shadow hover:shadow-lift"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon className="size-[15px] shrink-0" />
              <span className="truncate text-[12px] font-medium">{s.label}</span>
            </div>
            <p className="num mt-3 text-[28px] leading-none font-semibold">{s.value}</p>
            <p className="mt-2 truncate text-[11.5px] text-muted-foreground">{s.delta}</p>
          </div>
        );
      })}
    </div>
  );
}
