import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PanelRight, Menu, X, CalendarX } from "lucide-react";
import { LeftSidebar } from "@/components/mission-control/left-sidebar";
import { RightSidebar } from "@/components/mission-control/right-sidebar";
import { StatCards, type Stat } from "@/components/mission-control/stat-cards";
import { LessonCard, type LessonWithStudent } from "@/components/mission-control/lesson-card";
import { getMissionControlData } from "@/lib/mission-control.functions";

const title = "Mission Control — Teacher OS";
const description =
  "The AI operating system for private language teachers: today's lessons, students, schedule and progress in one calm workspace.";

const dataQuery = queryOptions({
  queryKey: ["mission-control"],
  queryFn: () => getMissionControlData(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(dataQuery);
  },
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Couldn't load your data</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  notFoundComponent: () => <div className="p-8 text-sm text-muted-foreground">Not found.</div>,
  component: MissionControl,
});

function dayKey(iso: string | null, tz: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: tz ?? "UTC" }).format(d);
  } catch {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(d);
  }
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center">
      <CalendarX className="size-6 text-muted-foreground" />
      <p className="mt-3 text-[14px] font-medium">{label}</p>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Nothing is scheduled in your calendar yet.
      </p>
    </div>
  );
}

function MissionControl() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const { data } = useSuspenseQuery(dataQuery);

  const tz = data.students[0]?.teacher_timezone ?? null;
  const today = dayKey(new Date().toISOString(), tz);

  const todayLessons: LessonWithStudent[] = data.lessons.filter(
    (l) => dayKey(l.lesson_start, l.student?.teacher_timezone ?? tz) === today,
  );
  const upcoming: LessonWithStudent[] = data.lessons.filter(
    (l) => dayKey(l.lesson_start, l.student?.teacher_timezone ?? tz) > today,
  );
  const activeStudents = data.students.filter((s) => s.status === "active").length;
  const totalMinutes = todayLessons.reduce(
    (sum, l) => sum + (l.duration_minutes ?? l.student?.lesson_duration_minutes ?? 0),
    0,
  );

  const stats: Stat[] = [
    {
      label: "Students",
      value: String(data.students.length),
      delta: `${activeStudents} active`,
      icon: "users",
    },
    {
      label: "Lessons Today",
      value: String(todayLessons.length),
      delta: `${totalMinutes} min scheduled`,
      icon: "calendar",
    },
    {
      label: "Upcoming Lessons",
      value: String(upcoming.length),
      delta: "after today",
      icon: "clock",
    },
    {
      label: "Active Students",
      value: String(activeStudents),
      delta: `of ${data.students.length} total`,
      icon: "active",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <div className="hidden shrink-0 lg:block">
        <LeftSidebar />
      </div>

      {leftOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setLeftOpen(false)} />
          <div className="absolute inset-y-0 left-0">
            <LeftSidebar />
          </div>
        </div>
      )}

      <main className="scroll-slim min-w-0 flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur-xl">
          <div className="mx-auto grid max-w-[1100px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-8">
            <div className="flex min-w-0 items-center gap-2">
              <button
                onClick={() => setLeftOpen(true)}
                aria-label="Open navigation"
                className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground lg:hidden"
              >
                <Menu className="size-4" />
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-[22px] leading-tight font-semibold sm:text-[26px]">
                  Mission Control
                </h1>
                <p className="truncate text-[13px] text-muted-foreground">
                  Everything important for today's teaching.
                </p>
              </div>
            </div>
            <button
              onClick={() => setRightOpen(true)}
              aria-label="Open AI sidebar"
              className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground xl:hidden"
            >
              <PanelRight className="size-4" />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-6 sm:px-8">
          <StatCards stats={stats} />

          <section className="space-y-3">
            <div className="flex items-baseline gap-2.5">
              <h2 className="text-[16px] font-semibold">Today's Lessons</h2>
              <span className="num text-[12.5px] text-muted-foreground">
                {todayLessons.length} scheduled
              </span>
            </div>
            {todayLessons.length === 0 ? (
              <EmptyState label="No lessons today" />
            ) : (
              <div className="space-y-3">
                {todayLessons.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-3">
            <div className="flex items-baseline gap-2.5">
              <h2 className="text-[16px] font-semibold">Upcoming Lessons</h2>
              <span className="num text-[12.5px] text-muted-foreground">
                {upcoming.length} scheduled
              </span>
            </div>
            {upcoming.length === 0 ? (
              <EmptyState label="No upcoming lessons" />
            ) : (
              <div className="space-y-3">
                {upcoming.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <div className="hidden shrink-0 xl:block">
        <RightSidebar students={data.students} lessons={data.lessons} />
      </div>

      {rightOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setRightOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[min(360px,88vw)] bg-surface">
            <button
              onClick={() => setRightOpen(false)}
              aria-label="Close AI sidebar"
              className="absolute top-5 right-5 z-10 grid size-7 place-items-center rounded-lg border border-border bg-card text-muted-foreground"
            >
              <X className="size-3.5" />
            </button>
            <RightSidebar students={data.students} lessons={data.lessons} />
          </div>
        </div>
      )}
    </div>
  );
}
