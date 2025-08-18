import { useEffect, useState } from "react";
import {
  GetAttemptAllStudentConnect,
  GetAttemptStudentConnect,
} from "@/api/api";

/** Minimal API shapes */
type TParent = { firstname?: string; lastname?: string; user_id?: number; email?: string };
type TClass = { class_id?: number; class_name?: string };
type TRecord = {
  id: number;
  firstname?: string;
  lastname?: string;
  name?: string;
  image?: string;
  parent?: TParent;
  class?: TClass;
  status?: string; // "pending" | "approved" | "declined"
  created_at?: string;
  declined_at?: string;
  email?: string;
};

type TApiEnvelope = {
  status: boolean;
  message: string;
  data?: {
    links: unknown;
    number_pages: number;
    record_per_page: number;
    records: TRecord[];
    totalRecord: number;
  };
};

export type NotificationItem = {
  id: number;
  title: string;     // e.g. "James Babatunde requested to connect"
  subtitle: string;  // e.g. "Grade 1 • Madam Joy • parent@email"
  avatar?: string;
  status: "pending" | "approved" | "declined";
  date?: string;
};

/** Helpers */
const getRole = () => {
  try {
    const s = sessionStorage.getItem("user") || localStorage.getItem("user");
    const u = s ? JSON.parse(s) : null;
    return (u?.role || "").toString();
  } catch {
    return "";
  }
};
const isSchoolAdmin = (role: string) => {
  const r = role.toLowerCase();
  return r === "schooladmin" || r === "school_admin";
};
const fullName = (r: TRecord) =>
  r.name?.trim() ||
  `${(r.firstname || "").trim()} ${(r.lastname || "").trim()}`.trim() ||
  "—";
const parentName = (p?: TParent) =>
  p ? `${p.firstname || ""} ${p.lastname || ""}`.trim() : "—";
const parentEmail = (r: TRecord) => r.parent?.email || r.email || "—";
const classNameOf = (r: TRecord) => r.class?.class_name || "—";
const statusOf = (r: TRecord) => (r.status || "pending").toLowerCase() as "pending" | "approved" | "declined";

/**
 * Fetches connection-request notifications based on user role.
 * - School Admin → GetAttemptAllStudentConnect
 * - Teacher      → GetAttemptStudentConnect
 */
export function useConnectionRequestNotifications(page = 1) {
  const role = getRole();
  const admin = isSchoolAdmin(role);

  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchPage(p = page) {
    try {
      setLoading(true);
      setError(null);

      const res = (admin
        ? await GetAttemptAllStudentConnect(String(p))
        : await GetAttemptStudentConnect(String(p))) as unknown as { data: TApiEnvelope };

      const recs = res?.data?.data?.records || [];
      const mapped: NotificationItem[] = recs.map((r) => ({
        id: r.id,
        title: `${fullName(r)} requested to connect`,
        subtitle: `${classNameOf(r)} • ${parentName(r.parent)} • ${parentEmail(r)}`,
        avatar: r.image || undefined,
        status: statusOf(r),
        date: r.created_at || r.declined_at || undefined,
      }));

      setItems(mapped);
    } catch {
      setItems([]);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, page]);

  return { items, loading, error, refresh: fetchPage };
}
