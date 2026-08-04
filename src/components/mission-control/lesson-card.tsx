import { Play, Clock, Calendar, Globe, Briefcase, BookOpen, GraduationCap } from "lucide-react";
import type { LessonEventRow, StudentRow } from "@/lib/mission-control.functions";

export type LessonWithStudent = LessonEventRow & { student: StudentRow | null };

const DASH = "—";

function initials(name: string | null) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function fmt(iso: string | null, tz: string | null, opts: Intl.DateTimeFormatOptions) {
  if (!iso) return DASH;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return DASH;
  try {
    return new Intl.DateTimeFormat("en-GB", { ...opts, timeZone: tz ?? "UTC" }).format(d);
  } catch {
    return new Intl.DateTimeFormat("en-GB", { ...opts, timeZone: "UTC" }).format(d);
  }
}

function Field({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-3">
      <div className="flex items-center gap-1.5">
        <Icon className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
          {label}
        </span>
      </div>
      <p className="mt-1.5 truncate text-[13.5px] font-medium text-foreground" title={value}>
        {value}
      </p>
    </div>
  );
}

export function LessonCard({ lesson }: { lesson: LessonWithStudent }) {
  const s = lesson.student;
  const tz = s?.teacher_timezone ?? null;
  const duration = lesson.duration_minutes ?? s?.lesson_duration_minutes ?? null;

  return (
    <article className="rounded-3xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="num grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-[13px] font-semibold text-accent-foreground">
            {initials(s?.full_name ?? null)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold">{s?.full_name ?? DASH}</h3>
            <p className="truncate text-[12px] text-muted-foreground">
              {s?.textbook ?? DASH}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full border border-border px-2.5 py-1 text-[12px] font-medium text-muted-foreground capitalize">
            {lesson.status ?? DASH}
          </span>
        </div>
      </header>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        <Field
          icon={Calendar}
          label="Lesson date"
          value={fmt(lesson.lesson_start, tz, { day: "2-digit", month: "short", year: "numeric" })}
        />
        <Field
          icon={Clock}
          label="Lesson time"
          value={fmt(lesson.lesson_start, tz, { hour: "2-digit", minute: "2-digit", hour12: false })}
        />
        <Field
          icon={Clock}
          label="Duration"
          value={duration != null ? `${duration} min` : DASH}
        />
        <Field icon={GraduationCap} label="Current level" value={s?.current_level ?? DASH} />
        <Field icon={BookOpen} label="Current unit" value={s?.current_unit ?? DASH} />
        <Field icon={Briefcase} label="Occupation" value={s?.occupation ?? DASH} />
        <Field icon={Globe} label="Teacher timezone" value={s?.teacher_timezone ?? DASH} />
        <Field icon={Globe} label="Student timezone" value={s?.student_timezone ?? DASH} />

        <div className="flex items-end lg:justify-end">
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90">
            <Play className="size-3.5 fill-current" />
            Start Lesson
          </button>
        </div>
      </div>
    </article>
  );
}
