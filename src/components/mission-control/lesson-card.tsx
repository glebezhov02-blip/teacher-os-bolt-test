import { useState } from "react";
import { ChevronDown, Play, Clock } from "lucide-react";
import type { Lesson } from "@/data/demo";
import { StatusPill } from "./status-pill";

function Section({
  label,
  aside,
  children,
}: {
  label: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-3">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
            {label}
          </span>
          {aside}
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? `Collapse ${label}` : `Expand ${label}`}
          className="grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div className="relative">
        <div
          className={`scroll-slim mt-2 overflow-hidden text-[13px] leading-relaxed text-secondary-foreground ${
            open ? "h-[124px] overflow-y-auto" : "h-[38px]"
          }`}
        >
          {children}
        </div>
        {!open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-surface to-transparent" />
        )}
      </div>
    </div>
  );
}


export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="rounded-3xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="num grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-[13px] font-semibold text-accent-foreground">
            {lesson.initials}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold">{lesson.student}</h3>
            <p className="truncate text-[12px] text-muted-foreground">{lesson.language}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[12px] text-muted-foreground">
          <Clock className="size-3.5" />
          <span className="num font-medium text-foreground">{lesson.time}</span>
          <span className="hidden sm:inline">· {lesson.duration}</span>
        </div>
      </header>

      <div className="mt-4 grid gap-2.5 lg:grid-cols-2">
        <Section label="Homework" aside={<StatusPill status={lesson.homeworkStatus} />}>
          {lesson.homeworkDetail}
        </Section>

        <Section label="Current Unit">
          <p className="font-medium text-foreground">{lesson.unit}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${lesson.unitProgress}%` }}
            />
          </div>
          <p className="num mt-2 text-[12px] text-muted-foreground">
            {lesson.unitProgress}% complete
          </p>
        </Section>

        <Section label="Key Takeaways">
          <ul className="space-y-1.5">
            {lesson.takeaways.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-[7px] size-1 shrink-0 rounded-full bg-muted-foreground" />
                <span className="min-w-0">{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="AI Advice">
          <ul className="space-y-1.5">
            {lesson.aiAdvice.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary" />
                <span className="min-w-0">{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Payment" aside={<StatusPill status={lesson.paymentStatus} />}>
          {lesson.paymentDetail}
        </Section>

        <div className="flex items-end lg:justify-end">
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90 lg:w-auto">
            <Play className="size-3.5 fill-current" />
            Start Lesson
          </button>
        </div>
      </div>
    </article>
  );
}
