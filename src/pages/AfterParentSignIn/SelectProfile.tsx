import { useGetProfile } from "@/api/queries";
import KundaLogo from "@/assets/KundaLogo.svg";
import BgImage from "@/assets/newBackground.svg";
import useStore from "@/store";
import { getProfileState } from "@/store/profileStore";
import { Modal, Skeleton } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { getUserState } from "@/store/authStore";
import ParentUpdateModal from "./ParentUpdateModal";

export type selectAvatarType = {
  id: number;
  name: string;
  accepted_summer_challenge: boolean;
  student?: { class_name: string };
};

const PAID_MAX_PROFILES = 4;
const FREE_MAX_PROFILES = 1;

function isPaidUser(user: any): boolean {
  // user.subscription: {cancelled_subscription, expiry, status}
  if (!user?.subscription) return false;
  const { cancelled_subscription, expiry, status } = user.subscription;
  if (cancelled_subscription) return false;
  if (!status) return false;
  if (!expiry) return false;
  // expiry is a string date, e.g. "2025-08-14"
  const expiryDate = new Date(expiry);
  const now = new Date();
  return expiryDate > now;
}

const SelectProfile = ({
  setChildProfile,
}: {
  setChildProfile: (val: string) => void;
}) => {
  const [profiles] = useStore(getProfileState);
  const [user] = useStore(getUserState);
  const { isLoading } = useGetProfile();
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (user?.country_id === 0) open();
  }, [user?.country_id, open]);

  // Determine user type and max profiles allowed
  const paid = isPaidUser(user);
  const maxProfiles = paid ? PAID_MAX_PROFILES : FREE_MAX_PROFILES;
  const isAddProfileDisabled = (profiles?.length ?? 0) >= maxProfiles;

  return (
    <>
      <Modal
        opened={opened}
        radius={12}
        size="lg"
        onClose={close}
        overlayProps={{ opacity: 0.85, blur: 3 }}
        centered
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        <ParentUpdateModal close={close} />
      </Modal>

      <div
        className="min-h-screen w-full flex items-center justify-center px-20"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Card — rounded, soft shadow, centered like your mock */}
        <div className="w-full max-w-[560px] bg-white rounded-[30px] shadow-[0_14px_40px_rgba(0,0,0,0.12)] p-6 sm:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <img src={KundaLogo} alt="Kunda Kids" className="h-7 sm:h-8" />
          </div>

          {/* Title + subtext */}
          <div className="text-center mb-6">
            <h1 className="text-[22px] sm:text-[24px] font-bold text-[#333C48]">
              Welcome to Kunda Kids
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#667185]">
              To begin, create a profile for your child.
            </p>
          </div>

          {/* Kids (initials avatar above name). If loading show placeholders. */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#F2F4F7] p-4 flex flex-col items-center"
                >
                  <Skeleton height={44} width={44} circle className="mb-3" />
                  <Skeleton height={10} width={90} />
                </div>
              ))}
            </div>
          ) : profiles && profiles.length > 0 ? (
            <KidsGrid
              profiles={profiles as selectAvatarType[]}
              setChildProfile={setChildProfile}
            />
          ) : null}

          {/* Add Profile block — green rounded square plus + label underneath */}
          <div
            className={`flex justify-center ${
              profiles?.length ? "mt-3" : "mt-1"
            }`}
          >
            <AddProfileBlock
              disabled={isAddProfileDisabled}
              maxProfiles={maxProfiles}
              isPaidUser={paid}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectProfile;

/* ───────────── Children grid ───────────── */

const KidsGrid = ({
  profiles,
  setChildProfile,
}: {
  profiles: selectAvatarType[];
  setChildProfile: (val: string) => void;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
      {profiles.map((kid) => (
        <KidItem key={kid.id} kid={kid} setChildProfile={setChildProfile} />
      ))}
    </div>
  );
};

const KidItem = ({
  kid,
  setChildProfile,
}: {
  kid: selectAvatarType;
  setChildProfile: (val: string) => void;
}) => {
  const navigate = useNavigate();
  const initials = getInitials(kid.name);
  const sub =
    kid?.student?.class_name?.trim() ? kid.student.class_name : "Tap to begin";

  const handle = () => {
    setChildProfile(String(kid.id));
    sessionStorage.setItem("profileId", String(kid.id));
    navigate("/schooldashboard/content");
  };

  return (
    <button
      onClick={handle}
      className="w-full rounded-2xl border border-[#F2F4F7] bg-white hover:bg-[#FAFAFA] p-4 flex flex-col items-center text-center transition"
    >
      <span
        className="inline-grid place-items-center rounded-full text-white font-semibold w-12 h-12 mb-2"
        style={{ background: pickColorFromName(kid.name) }}
      >
        {initials}
      </span>
      <p className="truncate w-full text-[14px] sm:text-[15px] font-medium text-[#111827]">
        {capitalize(kid.name)}
      </p>
      <p className="truncate w-full text-[12px] text-[#6B7280]">{sub}</p>
    </button>
  );
};

/* ───────────── Add Profile (plus) ───────────── */

const AddProfileBlock = ({
  disabled = false,
  maxProfiles,
  isPaidUser,
}: {
  disabled?: boolean;
  maxProfiles: number;
  isPaidUser: boolean;
}) => {
  // If disabled, render a visually disabled block and prevent navigation
  if (disabled) {
    return (
      <div
        className="group flex hidden flex-col items-center opacity-50 cursor-not-allowed select-none"
        tabIndex={-1}
        aria-disabled="true"
      >
        <span
          className="inline-grid place-items-center w-[56px] h-[56px] rounded-[12px] bg-[#8CC63F] text-white shadow-[0_6px_18px_rgba(140,198,63,0.45)] transition"
          aria-hidden
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="mt-2 text-[13px] font-semibold" style={{ color: "#79B626" }}>
          Add Profile
        </span>
        <span className="text-xs text-[#EF4444] mt-1">
          {isPaidUser
            ? `Maximum ${maxProfiles} profiles allowed`
            : "Upgrade to add more profiles"}
        </span>
      </div>
    );
  }
  return (
    <Link to="/childprofilesetup" className="group flex flex-col items-center">
      <span
        className="inline-grid place-items-center w-[56px] h-[56px] rounded-[12px] bg-[#8CC63F] text-white shadow-[0_6px_18px_rgba(140,198,63,0.45)] group-active:scale-95 transition"
        aria-hidden
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12h14"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="mt-2 text-[13px] font-semibold" style={{ color: "#79B626" }}>
        Add Profile
      </span>
    </Link>
  );
};

/* ───────────── Helpers ───────────── */

function getInitials(name: string) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const two = (parts[0]?.[0] || "") + (parts[1]?.[0] || parts[0]?.[1] || "");
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
