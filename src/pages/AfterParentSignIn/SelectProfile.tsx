import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useGetProfile } from "@/api/queries";
import useStore from "@/store";
import { getProfileState } from "@/store/profileStore";
import { getUserState } from "@/store/authStore";

import ParentUpdateModal from "./ParentUpdateModal";
import KundaLogo from "@/assets/KundaLogo.svg";
import BgImage from "@/assets/newBackground.svg";

/* 🔽 new */
import { GetUpdatedProfile } from "@/api/api";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";

/* =========================
   Types
========================= */
export type selectAvatarType = {
  id: number;
  name: string;
  accepted_summer_challenge: boolean;
  student?: { class_name: string };
};

/* =========================
   Page
========================= */
const SelectProfile = ({
  setChildProfile,
}: {
  setChildProfile: (val: string) => void;
}) => {
  const [profiles] = useStore(getProfileState);
  const [user] = useStore(getUserState);
  const { isLoading } = useGetProfile();
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.country_id === 0) open();
  }, [user?.country_id, open]);

  return (
    <>
      {/* Background illustration */}
      <div className="relative min-h-screen w-full overflow-hidden">
        <img
          src={BgImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* Right-aligned card container */}
        <div className="relative z-10 flex min-h-screen items-center justify-end px-4 sm:px-8 lg:px-12">
          <section className="w-full max-w-[520px] overflow-auto max-h-[90vh] rounded-[50px] bg-white/95 p-6 shadow-md backdrop-blur md:p-8">
            {/* Logo */}
            <div className="mb-5 flex justify-center md:mb-12">
              <img src={KundaLogo} alt="Kunda Kids" className="w-[160px] h-[34px] opacity-100" />
            </div>

            {/* Title & subtext */}
            <div className="text-center">
              <h1 className="font-[600] font-BalooSemiBold text-[36px] leading-[32px] tracking-[-0.2px] text-[#2C3137]">
                Welcome to Kunda Kids
              </h1>
              <p className="mt-1 text-sm font-Arimo text-gray-500">
               Select which kid is learning now
              </p>
            </div>

            {/* Kids grid (if any) */}
            {!isLoading && profiles && profiles.length > 0 && (
              <div className="mt-6">
                <KidsGrid
                  profiles={profiles}
                  setChildProfile={setChildProfile}
                />
              </div>
            )}

            {/* Loading state */}
            {isLoading && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`s-${i}`}
                    className="rounded-2xl border border-gray-100 p-4 text-center"
                  >
                    <Skeleton height={64} circle className="mx-auto" />
                    <Skeleton height={10} mt={12} />
                    <Skeleton height={10} mt={8} width="60%" className="mx-auto" />
                  </div>
                ))}
              </div>
            )}

            {/* Add Profile block */}
            <div className="mt-8 flex justify-center">
              <AddProfileBlock profiles={profiles?.length || 0} />
            </div>
          </section>
        </div>
      </div>

      {/* Country/phone prompt */}
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        overlayProps={{ opacity: 0.2, blur: 4 }}
        radius="lg"
      >
        <ParentUpdateModal close={close} />
      </Modal>
    </>
  );
};

export default SelectProfile;

/* =========================
   Children Grid
========================= */
const KidsGrid = ({
  profiles,
  setChildProfile,
}: {
  profiles: selectAvatarType[];
  setChildProfile: (val: string) => void;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {profiles.map((kid) => (
        <KidItem key={kid.id} kid={kid} setChildProfile={setChildProfile} />
      ))}
    </div>
  );
};

/* =========================
   Kid Item
========================= */
const KidItem = ({
  kid,
  setChildProfile,
}: {
  kid: selectAvatarType;
  setChildProfile: (val: string) => void;
}) => {
  const navigate = useNavigate();
  const initials = getInitials(kid.name);
  const sub = kid?.student?.class_name?.trim()
    ? kid.student.class_name
    : "Tap to begin";

  const handle = () => {
    setChildProfile(String(kid.id));
    sessionStorage.setItem("profileId", String(kid.id));
    navigate("/schooldashboard/content");
  };

  return (
    <button
      onClick={handle}
      className="group w-full rounded-2xl bg-white p-4 text-center transition hover:shadow-md"
    >
      {kid.image ? (
        <img src={kid.image} alt={kid.name} className="mx-auto h-16 w-16 rounded-full object-cover" />
      ) : (
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white shadow-sm"
          style={{ backgroundColor: pickColorFromName(kid.name) }}
        >
          {initials}
        </div>
      )}
      <div className="mt-3 text-sm font-Inter font-medium text-gray-900">
        {capitalize(kid.name)}
      </div>
      <div className="mt-1 text-xs text-gray-500 hidden">{sub}</div>
    </button>
  );
};

/* =========================
   Add Profile (Plus)
========================= */
const AddProfileBlock = ({ profiles }: { profiles: number }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);

  const handleAddClick = async () => {
    if (profiles >= 4 || checking) return; // guard if disabled or already checking
    setChecking(true);
    try {
      const res = await GetUpdatedProfile(); // GET /auth/profile
      const data = res?.data?.data ?? res?.data ?? {};
      const sub = data?.subscription ?? {};

      // Prefer explicit boolean at subscription.status when present (your requirement)
      // Otherwise fallback to other common shapes used elsewhere in the project.
      const isActive =
        typeof sub?.status === "boolean"
          ? sub.status
          : Boolean(
              sub?.is_active ??
                (data?.subscription_status === "active") ??
                data?.is_subscribed ??
                data?.subscribed
            );

      if (!isActive) {
        notifications.show({
          title: "Subscription required",
          message:
            "You cannot proceed because your subscription is not active.",
          color: "red",
        });
        navigate("/packages");
        return;
      }

      // OK → proceed to create child flow
      navigate("/profilesetup");
    } catch (err) {
      notifications.show({
        title: "Error checking subscription",
        message: getApiErrorMessage(err),
        color: "red",
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <button
      className={`flex flex-col items-center scale-80 ${
        profiles >= 4 ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label="Add Profile"
      onClick={handleAddClick}
      disabled={profiles >= 4 || checking}
    >
      {/* SVG unchanged */}
      <svg width="90" height="129" viewBox="0 0 90 129" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_965_85202)">
          <path d="M65.97 0C81.27 0 90 8.64 90 23.985V66.015C90 81.27 81.315 90 66.015 90H23.985C8.64 90 0 81.27 0 66.015V23.985C0 8.64 8.64 0 23.985 0H65.97ZM44.955 24.795C42.885 24.795 41.22 26.46 41.22 28.53V41.22H28.485C27.495 41.22 26.55 41.625 25.83 42.3C25.155 43.02 24.75 43.9605 24.75 44.955C24.75 47.025 26.415 48.69 28.485 48.735H41.22V61.47C41.22 63.54 42.885 65.205 44.955 65.205C47.025 65.205 48.69 63.54 48.69 61.47V48.735H61.47C63.54 48.69 65.205 47.025 65.205 44.955C65.205 42.885 63.54 41.22 61.47 41.22H48.69V28.53C48.69 26.46 47.025 24.795 44.955 24.795Z" fill="#9FC43E"/>
        </g>
        {/* (rest of your long path remains the same) */}
        <defs>
          <clipPath id="clip0_965_85202">
            <rect width="90" height="90" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};

/* =========================
   Helpers
========================= */
function getInitials(name: string) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const two =
    (parts[0]?.[0] || "") + (parts[1]?.[0] || parts[0]?.[1] || "");
  return two.slice(0, 2).toUpperCase();
}
function capitalize(s: string) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}
function pickColorFromName(name: string) {
  const colors = [
    "#7C3AED",
    "#E11D48",
    "#059669",
    "#2563EB",
    "#D97706",
    "#0EA5E9",
    "#16A34A",
    "#DB2777",
  ];
  return colors[hashCode(name) % colors.length];
}
