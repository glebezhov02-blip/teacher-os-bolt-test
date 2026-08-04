import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PanelRight, Menu, X } from "lucide-react";
import { LeftSidebar } from "@/components/mission-control/left-sidebar";
import { RightSidebar } from "@/components/mission-control/right-sidebar";
import { StatCards } from "@/components/mission-control/stat-cards";
import { LessonCard } from "@/components/mission-control/lesson-card";
import { lessons } from "@/data/demo";

const title = "Mission Control — Teacher OS";
const description =
  "The AI operating system for private language teachers: today's lessons, homework, payments and AI tasks in one calm workspace.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MissionControl,
});

function MissionControl() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

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
          <StatCards />

          <section className="space-y-3">
            <div className="flex items-baseline gap-2.5">
              <h2 className="text-[16px] font-semibold">Today's Lessons</h2>
              <span className="num text-[12.5px] text-muted-foreground">{lessons.length} scheduled</span>
            </div>
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <div className="hidden shrink-0 xl:block">
        <RightSidebar />
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
            <RightSidebar />
          </div>
        </div>
      )}
    </div>
  );
}
