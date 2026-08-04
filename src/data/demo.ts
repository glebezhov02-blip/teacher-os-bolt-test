export type Status = "done" | "pending" | "late" | "paid" | "unpaid" | "partial";

export type Lesson = {
  id: string;
  student: string;
  initials: string;
  language: string;
  time: string;
  duration: string;
  homeworkStatus: Status;
  homeworkDetail: string;
  unit: string;
  unitProgress: number;
  takeaways: string[];
  aiAdvice: string[];
  paymentStatus: Status;
  paymentDetail: string;
};

export const stats = [
  { label: "Students Today", value: "6", delta: "+1 vs yesterday", icon: "users" as const },
  { label: "Lessons Today", value: "7", delta: "2 remaining", icon: "calendar" as const },
  { label: "Homework Waiting", value: "4", delta: "1 overdue", icon: "inbox" as const },
  { label: "Payments", value: "€480", delta: "€120 outstanding", icon: "wallet" as const },
  { label: "AI Tasks", value: "9", delta: "3 need approval", icon: "sparkles" as const },
];

export const lessons: Lesson[] = [
  {
    id: "l1",
    student: "Marta Kowalska",
    initials: "MK",
    language: "German · B1",
    time: "09:00",
    duration: "60 min",
    homeworkStatus: "done",
    homeworkDetail: "Submitted 8 hours ago — Unit 6 writing task, 340 words.",
    unit: "Unit 6 — Reported Speech",
    unitProgress: 72,
    takeaways: [
      "Confuses Konjunktiv I with indicative in reported speech.",
      "Vocabulary retention strong: 92% on last recall drill.",
      "Prefers speaking-first warmups over grammar tables.",
    ],
    aiAdvice: [
      "Open with a 4-minute retelling exercise using yesterday's news headline.",
      "Skip the Konjunktiv II drill — she already mastered it in Unit 5.",
      "Close with a written prompt; she consolidates best in writing.",
    ],
    paymentStatus: "paid",
    paymentDetail: "Package of 10 lessons — 4 remaining. Paid 12 Jul.",
  },
  {
    id: "l2",
    student: "Tomás Ferreira",
    initials: "TF",
    language: "English · C1",
    time: "10:30",
    duration: "90 min",
    homeworkStatus: "pending",
    homeworkDetail: "Not submitted yet. Due today at 10:00 — presentation draft.",
    unit: "Unit 12 — Negotiation Language",
    unitProgress: 45,
    takeaways: [
      "Fluent but over-uses hedging phrases in formal registers.",
      "Needs pressure practice: performs better with a timer.",
      "Goal is a promotion interview in September.",
    ],
    aiAdvice: [
      "Run a live 10-minute mock negotiation, record it, review together.",
      "Flag three hedging phrases to replace with assertive alternatives.",
      "Ask about the presentation draft first — likely blocked, not avoidant.",
    ],
    paymentStatus: "unpaid",
    paymentDetail: "Invoice #204 · €120 · 6 days overdue.",
  },
  {
    id: "l3",
    student: "Yuki Tanaka",
    initials: "YT",
    language: "German · A2",
    time: "13:00",
    duration: "45 min",
    homeworkStatus: "late",
    homeworkDetail: "Submitted 2 days late — 11 of 20 exercises correct.",
    unit: "Unit 3 — Dative Case",
    unitProgress: 28,
    takeaways: [
      "Dative prepositions still guessed rather than reasoned.",
      "Listening comprehension ahead of production.",
      "Responds very well to visual case tables.",
    ],
    aiAdvice: [
      "Re-teach dative with a colour-coded table, not new vocabulary.",
      "Reduce homework volume by half to rebuild consistency.",
      "Praise the listening progress explicitly — motivation is dipping.",
    ],
    paymentStatus: "partial",
    paymentDetail: "€60 of €90 received. Remainder due Friday.",
  },
  {
    id: "l4",
    student: "Elena Rossi",
    initials: "ER",
    language: "English · B2",
    time: "16:00",
    duration: "60 min",
    homeworkStatus: "done",
    homeworkDetail: "Submitted early — all 18 exercises correct.",
    unit: "Unit 9 — Conditionals in Business",
    unitProgress: 88,
    takeaways: [
      "Ready to move to C1 material within three lessons.",
      "Enjoys debate-style tasks over role-play.",
      "Writing is stronger than spontaneous speech.",
    ],
    aiAdvice: [
      "Introduce a C1 diagnostic today; she is under-challenged.",
      "Use a debate prompt on remote work to push spontaneous speech.",
      "Propose the advanced package — high renewal likelihood.",
    ],
    paymentStatus: "paid",
    paymentDetail: "Monthly subscription active. Renews 1 Sep.",
  },
];

export const aiInbox = [
  { id: "a1", title: "Lesson summary drafted", body: "Marta Kowalska · Unit 6", time: "12m" },
  { id: "a2", title: "Homework auto-graded", body: "Elena Rossi · 18/18 correct", time: "1h" },
  { id: "a3", title: "Progress report ready", body: "Yuki Tanaka · monthly", time: "3h" },
];

export const approvals = [
  { id: "p1", title: "Payment reminder email", body: "Tomás Ferreira · Invoice #204" },
  { id: "p2", title: "New homework set", body: "Yuki Tanaka · reduced volume" },
  { id: "p3", title: "Level-up proposal", body: "Elena Rossi · move to C1" },
];

export const systemHealth = [
  { label: "AI Engine", value: "Operational", ok: true },
  { label: "Calendar Sync", value: "Synced 2m ago", ok: true },
  { label: "Payments", value: "1 failed charge", ok: false },
  { label: "Storage", value: "34% used", ok: true },
];

export const quickActions = [
  { id: "q1", label: "New lesson", icon: "plus" as const },
  { id: "q2", label: "Add student", icon: "userPlus" as const },
  { id: "q3", label: "Send invoice", icon: "receipt" as const },
  { id: "q4", label: "Generate homework", icon: "wand" as const },
];
