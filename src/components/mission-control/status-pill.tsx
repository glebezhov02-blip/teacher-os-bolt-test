import type { Status } from "@/data/demo";

const map: Record<Status, { label: string; cls: string }> = {
  done: { label: "Done", cls: "bg-success-soft text-success" },
  pending: { label: "Pending", cls: "bg-warning-soft text-warning" },
  late: { label: "Late", cls: "bg-danger-soft text-danger" },
  paid: { label: "Paid", cls: "bg-success-soft text-success" },
  unpaid: { label: "Unpaid", cls: "bg-danger-soft text-danger" },
  partial: { label: "Partial", cls: "bg-warning-soft text-warning" },
};

export function StatusPill({ status, prefix }: { status: Status; prefix?: string }) {
  const s = map[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${s.cls}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {prefix ? `${prefix} · ${s.label}` : s.label}
    </span>
  );
}
