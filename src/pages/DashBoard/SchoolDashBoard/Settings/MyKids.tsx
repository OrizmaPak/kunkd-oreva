import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ⬇️ If your project has a profile store, import it.
// We guard all usages so this file won’t break if the store path/name differs.
let useProfileStore: any = null;
try {
  // Adjust this import path if your store lives elsewhere.
  // If it throws (path mismatch), we will gracefully fall back to sessionStorage.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  useProfileStore = require("../../../../store/profileStore").default;
} catch { /* no-op */ }

// ---------- Types ----------
type StudentInfo = {
  assigned_teacher_id: number;
  assigned_teacher_name: string;
  class_id: number;
  class_name: string;
  school_id: number;
  school_name: string;
  status: string;
};

export type KidProfile = {
  id: number;
  name: string;
  age?: number; // optional; we’ll compute from dob if provided
  dob?: string; // ISO
  image?: string;
  username?: string;
  student?: StudentInfo;
  accepted_summer_challenge?: boolean;
  interactive_app_url?: string;
  // allow extra keys to exist without breaking
  [key: string]: any;
};

// ---------- Helpers ----------
const yearsOld = (dob?: string, fallbackAge?: number) => {
  if (!dob) return typeof fallbackAge === "number" ? fallbackAge : 0;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return typeof fallbackAge === "number" ? fallbackAge : 0;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return Math.max(0, age);
};

const classNames = (...v: Array<string | false | null | undefined>) => v.filter(Boolean).join(" ");

const VerticalDots = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <circle cx="12" cy="5" r="1.75" />
    <circle cx="12" cy="12" r="1.75" />
    <circle cx="12" cy="19" r="1.75" />
  </svg>
);

// ---------- Toast ----------
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed right-6 top-6 z-[70] flex items-center gap-3 rounded-full bg-green-100 px-4 py-2 text-sm text-green-800 shadow">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">✓</span>
      <span className="font-medium">Edited Successfully</span>
    </div>
  );
}

// ---------- Basic Modal ----------
function Modal({
  title,
  isOpen,
  onClose,
  children,
  headerTint = "bg-[#8FA01F]", // lime/green brand bar per Figma
  wide = false,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  headerTint?: string;
  wide?: boolean;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        className={classNames(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl",
          wide ? "w-[560px] max-w-[92vw]" : "w-[460px] max-w-[92vw]"
        )}
      >
        <div className={classNames("flex items-center justify-between rounded-t-2xl px-5 py-3 text-white", headerTint)}>
          <h3 className="text-base font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ---------- Edit Form ----------
function EditProfileForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: KidProfile;
  onSave: (updated: KidProfile) => void;
  onCancel: () => void;
}) {
  const [fullName, setFullName] = useState(initial.name ?? "");
  const [nickname, setNickname] = useState(initial.username ?? "");
  const [dob, setDob] = useState(
    initial.dob ? new Date(initial.dob).toISOString().slice(0, 10) : ""
  );

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ ...initial, name: fullName, username: nickname, dob: dob ? new Date(dob).toISOString() : initial.dob });
      }}
    >
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-900">Full name</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-gray-400"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-900">Nickname</label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-gray-400"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-900">Date of birth</label>
        <input
          type="date"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-gray-400"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      <div className="mt-4 flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-[#8FA01F] px-5 py-2.5 text-sm font-semibold text-white shadow hover:brightness-95"
        >
          Save
        </button>
      </div>
    </form>
  );
}

// ---------- Main ----------
const MyKids: React.FC = () => {
  const navigate = useNavigate();

  // store (if present)
  const storeProfiles: KidProfile[] | undefined =
    useProfileStore ? useProfileStore((s: any) => s.profiles) : undefined;
  const updateProfile =
    useProfileStore ? useProfileStore((s: any) => s.updateProfile) : undefined;
  const removeProfile =
    useProfileStore ? useProfileStore((s: any) => s.removeProfile) : undefined;

  // fallback from sessionStorage if store empty/missing
  const sessionProfiles: KidProfile[] = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("profiles");
      if (!raw) return [];
      const v = JSON.parse(raw);
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  }, []);

  const [profiles, setProfiles] = useState<KidProfile[]>(
    (storeProfiles && storeProfiles.length ? storeProfiles : sessionProfiles) ?? []
  );

  // when store value changes, sync it
  useEffect(() => {
    if (storeProfiles && storeProfiles.length) setProfiles(storeProfiles);
  }, [storeProfiles]);

  // menu/open states
  const [openMenuFor, setOpenMenuFor] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onClickAway = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target)) setOpenMenuFor(null);
    };
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  // modals
  const [schoolFor, setSchoolFor] = useState<KidProfile | null>(null);
  const [editFor, setEditFor] = useState<KidProfile | null>(null);
  const [removeFor, setRemoveFor] = useState<KidProfile | null>(null);

  // toast
  const [showToast, setShowToast] = useState(false);

 

  // update helpers (store first, then sessionStorage)
  const persistToSession = (next: KidProfile[]) => {
    try {
      sessionStorage.setItem("profiles", JSON.stringify(next));
    } catch { /* ignore */ }
  };

  const performUpdate = (updated: KidProfile) => {
    let next = profiles.map((p) => (p.id === updated.id ? updated : p));
    setProfiles(next);
    if (updateProfile) {
      try {
        updateProfile(updated); // if your store supports it
      } catch { /**/ }
    } else {
      persistToSession(next);
    }
    setShowToast(true);
  };

  const performRemove = (id: number) => {
    const next = profiles.filter((p) => p.id !== id);
    setProfiles(next);
    if (removeProfile) {
      try {
        removeProfile(id); // if your store supports it
      } catch { /**/ }
    } else {
      persistToSession(next);
    }
  };

  return (
    <div className="space-y-5">
     

      {/* Cards grid */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        {profiles.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-sm text-gray-500">
            No kids data available. Please add your kids to see them here.
          </div>
        ) : (
          <div className="flex justify-between gap-10 flex-wrap">
            {profiles.map((kid) => {
              const age = yearsOld(kid.dob, kid.age);
              const img = kid.image && kid.image.trim().length > 0 ? kid.image : null;
              return (
                <div
                  key={kid.id}
                  className="relative flex items-center justify-between rounded-[20px] border border-gray-200 bg-white px-[25px] py-[45px] shadow-sm"
                  style={{ width: '473px', height: '170px', gap: '10px', opacity: 1 }}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    {img ? (
                      <img
                        src={img}
                        alt={kid.name}
                        className="w-20 h-20 rounded-[40px] ring-8 ring-[#E6EAD8]"
                        style={{ transform: 'rotate(0deg)', opacity: 1 }}
                      />
                    ) : (
                      <div
                        className="w-20 h-20 rounded-[40px] bg-[#E6EAD8] ring-8 ring-[#E6EAD8] flex items-center justify-center text-lg font-semibold text-gray-700"
                        style={{ transform: 'rotate(0deg)', opacity: 1 }}
                      >
                        {kid.name?.slice(0, 2).toUpperCase() || "K"}
                      </div>
                    )}

                    {/* Name + age */}
                    <div className="ml-[12px]">
                      <div className="text-lg font-semibold text-gray-900">{kid.name}</div>
                      <div className="text-sm text-gray-500">{age}yrs old</div>
                    </div>
                  </div>

                  {/* middle divider + view link */}
                  <div className="flex items-center mx-auto gap-4">
                    <span className="hidden h-10 w-[3px] bg-gray-200 md:block" />
                    <button
                      onClick={() => setSchoolFor(kid)}
                      className="font-thin text-[14px] text-[#0A9BF4] hover:text-[#0A9BF4] relative left-4"
                      style={{ fontStyle: 'normal', lineHeight: '21px', letterSpacing: '0.1px' }}
                    >
                      View School Info
                    </button>
                  </div>

                  {/* 3-dots menu */}
                  <div className="relative" ref={menuRef}>
                    <button
                      aria-label="More options"
                      onClick={() => setOpenMenuFor((v) => (v === kid.id ? null : kid.id))}
                      className="rounded-full p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      <VerticalDots className="h-5 w-5" />
                    </button>

                    {openMenuFor === kid.id && (
                      <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white text-sm shadow-lg">
                        <button
                          className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-50"
                          onClick={() => {
                            setEditFor(kid);
                            setOpenMenuFor(null);
                          }}
                        >
                          ✏️ <span>Edit Profile</span>
                        </button>
                        <button
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setRemoveFor(kid);
                            setOpenMenuFor(null);
                          }}
                        >
                          🗑️ <span>Remove profile</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* School Info Modal */}
      <Modal
        title="School Information"
        isOpen={!!schoolFor}
        onClose={() => setSchoolFor(null)}
        headerTint="bg-[#9FC43E]"
      >
        {schoolFor ? (
          <div className="space-y-5">
            <div>
              <div className="text-sm font-semibold text-gray-900">School</div>
              <div className="text-sm text-gray-500">
                {schoolFor.student?.school_name || "—"}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Class</div>
              <div className="text-sm text-gray-500">
                {schoolFor.student?.class_name || "—"}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Teacher</div>
              <div className="text-sm text-gray-500">
                {schoolFor.student?.assigned_teacher_name || "—"}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Profile Info"
        isOpen={!!editFor}
        onClose={() => setEditFor(null)}
        headerTint="bg-[#8FA01F]"
        wide
      >
        {editFor ? (
          <EditProfileForm
            initial={editFor}
            onCancel={() => setEditFor(null)}
            onSave={(updated) => {
              performUpdate(updated);
              setEditFor(null);
            }}
          />
        ) : null}
      </Modal>

      {/* Remove confirm */}
      <Modal
        title="Remove Child Profile"
        isOpen={!!removeFor}
        onClose={() => setRemoveFor(null)}
        headerTint="bg-[#8FA01F]"
      >
        <div className="space-y-6">
          <p className="text-sm text-gray-600">
            Are you sure you want to remove this profile? It can not be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setRemoveFor(null)}
              className="rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (removeFor) performRemove(removeFor.id);
                setRemoveFor(null);
              }}
              className="rounded-full bg-[#8FA01F] px-5 py-2.5 text-sm font-semibold text-white shadow hover:brightness-95"
            >
              Yes, remove profile
            </button>
          </div>
        </div>
      </Modal>

      {showToast && <Toast message="Edited Successfully" onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default MyKids;
