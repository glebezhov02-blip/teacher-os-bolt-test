import { createServerFn } from "@tanstack/react-start";

export type StudentRow = {
  id: string;
  full_name: string | null;
  age: number | null;
  occupation: string | null;
  current_level: string | null;
  target_level: string | null;
  learning_goal: string | null;
  textbook: string | null;
  current_unit: string | null;
  lessons_per_week: number | null;
  lesson_duration_minutes: number | null;
  lesson_format: string | null;
  payment_type: string | null;
  lesson_price: number | string | null;
  currency: string | null;
  status: string | null;
  teacher_timezone: string | null;
  student_timezone: string | null;
};

export type LessonEventRow = {
  id: string;
  student_id: string | null;
  lesson_start: string | null;
  duration_minutes: number | null;
  status: string | null;
  meeting_provider: string | null;
  meeting_link: string | null;
  calendar_event_id: string | null;
  notes: string | null;
};

export type MissionControlData = {
  students: StudentRow[];
  lessons: (LessonEventRow & { student: StudentRow | null })[];
};

async function restSelect<T>(table: string, query: string): Promise<T[]> {
  const url = process.env["EXT_SUPABASE_URL"];
  const key = process.env["EXT_SUPABASE_SECRET_KEY"];
  if (!url || !key) throw new Error("Supabase credentials are not configured.");

  const res = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/${table}?${query}`, {
    headers: { apikey: key, Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Supabase request for "${table}" failed [${res.status}]: ${await res.text()}`);
  }
  return (await res.json()) as T[];
}

export const getMissionControlData = createServerFn({ method: "GET" }).handler(
  async (): Promise<MissionControlData> => {
    const from = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [students, events] = await Promise.all([
      restSelect<StudentRow>("students", "select=*&order=full_name.asc"),
      restSelect<LessonEventRow>(
        "lesson_events",
        `select=*&lesson_start=gte.${encodeURIComponent(from)}&order=lesson_start.asc`,
      ),
    ]);

    const byId = new Map(students.map((s) => [s.id, s]));

    return {
      students,
      lessons: events.map((e) => ({
        ...e,
        student: e.student_id ? byId.get(e.student_id) ?? null : null,
      })),
    };
  },
);
