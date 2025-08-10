import { useGetProfile } from "@/api/queries";
import BlurImage from "@/assets/BlxstBlur.jpg";
import GroupIcon from "@/assets/newBackground.svg";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { Skeleton, Modal } from "@mantine/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useRef } from "react";
import { getUserState } from "@/store/authStore";
import ParentUpdateModal from "./ParentUpdateModal";
import { FaPlus } from "react-icons/fa";

export type selectAvatarType = {
  name: string;
  image: string;
  id: number;
  dob?: string;
  username?: string;
  accepted_summer_challenge: boolean;
  student?: {
    assigned_teacher_id: number;
    assigned_teacher_name: string;
    class_id: number;
    class_name: string;
    school_id: number;
    school_name: string;
    status: string;
  };
};

const SelectProfile = ({
  setChildProfile,
}: {
  setChildProfile: (val: string) => void;
}) => {
  const [profiles] = useStore(getProfileState);
  const [user] = useStore(getUserState);
  const { data, isLoading } = useGetProfile();
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (user?.country_id === 0) open();
  }, [user?.country_id, open]);

  const hasNoProfiles = useMemo(() => {
    const storeCount = Array.isArray(profiles) ? profiles.length : 0;
    const apiCount = Array.isArray(data?.data?.data) ? data?.data?.data?.length : 0;
    return !isLoading && (storeCount === 0 || apiCount === 0);
  }, [profiles, data, isLoading]);

  if (hasNoProfiles) return <Navigate to="/childprofilesetup" replace />;

  return (
    <>
      {/* --- Visual magic CSS (self-contained) --- */}
      <style>{`
        /* Aurora gradient that slowly flows */
        @keyframes auroraShift {
          0% { transform: translateX(-20%) translateY(-10%) rotate(0deg); }
          50% { transform: translateX(10%) translateY(5%) rotate(180deg); }
          100% { transform: translateX(-20%) translateY(-10%) rotate(360deg); }
        }
        /* Starfield shimmer */
        @keyframes twinkle {
          0%, 100% { opacity: .7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        /* Subtle heartbeat of the main container */
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.015); }
          28% { transform: scale(1); }
          42% { transform: scale(1.015); }
          70% { transform: scale(1); }
        }
        /* Shimmer line that slides across the card border */
        .sweep::after {
          content: "";
          position: absolute;
          inset: -30%;
          background: linear-gradient(115deg, rgba(255,255,255,0) 40%, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 60%);
          transform: translateX(-120%) rotate(8deg);
          transition: transform .9s ease;
          pointer-events:none;
        }
        .sweep:hover::after { transform: translateX(120%) rotate(8deg); }

        /* Neon glow pulse around cards */
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(159,196,62,.25), 0 0 40px rgba(200,180,255,.25); }
          50% { box-shadow: 0 0 0 4px rgba(159,196,62,.18), 0 0 60px rgba(200,180,255,.35); }
          100% { box-shadow: 0 0 0 0 rgba(159,196,62,.25), 0 0 40px rgba(200,180,255,.25); }
        }

        /* Particle stars — one tiny dot repeated with box-shadows */
        .stars::before {
          content: "";
          position: absolute;
          inset: 0;
          background-repeat: repeat;
          pointer-events:none;
        }
        .stars::before {
          background-image:
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.9) 50%, transparent 51%),
            radial-gradient(1.5px 1.5px at 60% 70%, rgba(255,255,255,.8) 50%, transparent 51%),
            radial-gradient(1.5px 1.5px at 80% 20%, rgba(255,255,255,.7) 50%, transparent 51%),
            radial-gradient(2px 2px at 35% 80%, rgba(255,255,255,.85) 50%, transparent 51%),
            radial-gradient(1.5px 1.5px at 10% 60%, rgba(255,255,255,.75) 50%, transparent 51%);
          animation: twinkle 5s ease-in-out infinite;
        }

        /* 3D tilt helpers (using CSS variables updated via JS) */
        .tilt {
          transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(var(--tz, 0px));
          transition: transform .12s ease-out;
        }
        .tilt-inner {
          transform: translateX(var(--px,0)) translateY(var(--py,0));
          transition: transform .12s ease-out;
        }

        /* Live glare hotspot (uses --mx/--my set from JS) */
        .glare {
          --mx: 50%;
          --my: 50%;
          background: radial-gradient(240px 240px at var(--mx) var(--my), rgba(255,255,255,.22), rgba(255,255,255,0) 60%);
        }
      `}</style>

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
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${GroupIcon})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Animated Aurora Sheet */}
        <div
          className="pointer-events-none absolute -inset-1 opacity-70"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(159,196,62,0.25), rgba(200,180,255,0.25), rgba(252,211,77,0.2), rgba(159,196,62,0.25))",
            filter: "blur(60px)",
            animation: "auroraShift 28s linear infinite",
          }}
        />

        {/* Subtle star particles */}
        <div className="absolute inset-0 stars" />

        {/* Main Glass Container */}
        <div
          className="relative w-full max-w-[1240px] mx-auto rounded-[30px] border border-white/30 bg-white/55 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.18)] px-5 sm:px-10 py-8 sm:py-12"
          style={{ animation: "heartbeat 3.5s ease-in-out infinite" }}
        >
          {/* Heading */}
          <header className="text-center mb-8 sm:mb-12">
            <h1 className="text-[34px] sm:text-[52px] leading-tight font-Recoleta text-[#0f172a]">
              Who’s Learning?
            </h1>
            <p className="text-[15px] sm:text-[18px] text-[#334155] font-Hanken">
              Pick your explorer and jump back into the adventure ✨
            </p>
          </header>

          {/* Grid of Profiles */}
          <section
            className="
              grid 
              grid-cols-1 
              xs:grid-cols-2
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              gap-4 xs:gap-5 sm:gap-6 md:gap-8 
              justify-items-center
            "
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="
                      w-[150px] xs:w-[160px] sm:w-[180px] 
                      h-[210px] xs:h-[220px] sm:h-[240px]
                      rounded-3xl bg-white/70 border border-white/50 shadow-md p-4 
                      flex flex-col items-center justify-center
                    "
                  >
                    <Skeleton height={100} circle className="mb-4 w-[100px]" />
                    <Skeleton height={12} width="70%" className="rounded" />
                  </div>
                ))
              : profiles?.map((avatar: selectAvatarType) => (
                  <HyperCard
                    key={avatar.id}
                    avatar={avatar}
                    setChildProfile={setChildProfile}
                  />
                ))}

            {!isLoading && <AddProfileCard />}
          </section>

          {/* Footer hint */}
          {!isLoading && (
            <div className="mt-10 text-center">
              <span className="inline-block rounded-full bg-[#F1F7E5] text-[#365314] px-4 py-2 text-sm font-medium border border-[#DCF1B3]">
                Tip: You can add more kids anytime.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectProfile;

/* ─────────────────────────────── Cards ─────────────────────────────── */

/**
 * HyperCard
 * A high-impact 3D tilt card with:
 * - Animated conic-gradient frame
 * - Live glare hotspot (mouse-tracked)
 * - Parallax inner content
 * - Neon pulse glow + sweep shimmer on hover
 * Keeps existing behavior: setChildProfile → sessionStorage → navigate("/parent")
 */
const HyperCard = ({
  avatar,
  setChildProfile,
}: {
  avatar: selectAvatarType;
  setChildProfile: (val: string) => void;
}) => {
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLButtonElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const px = (mx / rect.width) * 2 - 1;  // -1 to 1
    const py = (my / rect.height) * 2 - 1;

    const rx = (-py * 8).toFixed(2); // rotateX
    const ry = (px * 10).toFixed(2); // rotateY
    const tz = 10;                   // pop out a bit

    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--tz", `${tz}px`);

    // Parallax shift for inner elements
    el.style.setProperty("--px", `${px * 6}px`);
    el.style.setProperty("--py", `${py * 6}px`);

    // Move glare hotspot
    el.querySelectorAll<HTMLElement>(".glare")[0]?.style.setProperty("--mx", `${mx}px`);
    el.querySelectorAll<HTMLElement>(".glare")[0]?.style.setProperty("--my", `${my}px`);
  };

  const onLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--tz", `0px`);
    el.style.setProperty("--px", `0px`);
    el.style.setProperty("--py", `0px`);
  };

  const handleSelect = () => {
    setChildProfile(avatar.id.toString());
    sessionStorage.setItem("profileId", avatar.id.toString());
    navigate("/schooldashboard/content");
  };

  const className =
    avatar?.student?.class_name && avatar?.student?.class_name.trim().length > 0
      ? avatar.student.class_name
      : undefined;

  return (
    <button
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={handleSelect}
      aria-label={`Choose ${avatar.name}`}
      className="
        sweep tilt relative 
        w-[150px] xs:w-[160px] sm:w-[180px] md:w-[210px] 
        h-[210px] xs:h-[220px] sm:h-[240px] md:h-[260px] 
        rounded-[20px] p-[2px] 
        outline-none focus:ring-4 ring-[#A7CF3A]/30 
        transition-transform duration-200
      "
      style={{
        background:
          "conic-gradient(from 220deg, #9FC43E, #C084FC 30%, #FCD34D 55%, #93C5FD 75%, #9FC43E 100%)",
        animation: "pulseGlow 3.2s ease-in-out infinite",
      }}
    >
      {/* Live glare hotspot */}
      <div className="glare pointer-events-none absolute inset-0 rounded-[22px]" />

      {/* Inner glass panel with parallax content */}
      <div className="tilt-inner relative h-full w-full rounded-[20px] bg-white/80 backdrop-blur-md border border-white/60 shadow-xl overflow-hidden">
        {/* Soft “aurora blobs” inside the card */}
        <div className="pointer-events-none absolute -top-10 -left-12 w-[160px] h-[160px] rounded-full bg-[#C7E59F] opacity-50 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-10 w-[180px] h-[180px] rounded-full bg-[#E6D7FF] opacity-50 blur-2xl" />

        <div className="relative z-[2] h-full flex flex-col items-center justify-between p-4">
          {/* Avatar ring */}
          <div className="mt-1 relative">
            <div
              className="rounded-full p-[4px]"
              style={{
                background:
                  "conic-gradient(from 140deg, #9FC43E, #FCD34D, #C084FC, #60A5FA, #9FC43E)",
              }}
            >
              <div className="rounded-full bg-white overflow-hidden">
                <LazyLoadImage
                  src={avatar.image}
                  placeholderSrc={BlurImage}
                  effect="blur"
                  className="
                    h-[90px] w-[90px] 
                    xs:h-[95px] xs:w-[95px] 
                    sm:h-[110px] sm:w-[110px] 
                    object-cover
                  "
                  width={110}
                  height={110}
                />
              </div>
            </div>

            {avatar.accepted_summer_challenge && (
              <span className="absolute -right-1 -top-1 text-[10px] bg-[#FFB703] text-white px-2 py-0.5 rounded-full shadow font-semibold">
                ⭐ Star
              </span>
            )}
          </div>

          {/* Name + class */}
          <div className="text-center">
            <p className="text-[16px] sm:text-[18px] font-semibold text-[#111827]">
              {avatar.name.charAt(0).toUpperCase() + avatar.name.slice(1)}
            </p>
            {className ? (
              <p className="mt-0.5 text-[12px] text-[#6B7280]">{className}</p>
            ) : (
              <p className="mt-0.5 text-[12px] text-[#9CA3AF]">Tap to begin</p>
            )}
          </div>

          {/* CTA chip */}
          <span className="mb-1 inline-flex items-center gap-1 text-[12px] font-medium text-[#18502a] bg-[#EAF6D2] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Let’s learn!
          </span>
        </div>
      </div>
    </button>
  );
};

const AddProfileCard = () => {
  return (
    <Link
      to="/childprofilesetup"
      aria-label="Add a new child profile"
      className="
        sweep tilt relative 
        w-[150px] xs:w-[160px] sm:w-[180px] md:w-[210px] 
        h-[210px] xs:h-[220px] sm:h-[240px] md:h-[260px] 
        rounded-[20px] p-[2px] 
        outline-none focus:ring-4 ring-[#A7CF3A]/30 
        transition-transform duration-200
      "
      style={{
        background:
          "conic-gradient(from 120deg, #C7DC8A, #FDE68A 40%, #E9D5FF 75%, #A5B4FC 90%, #C7DC8A 100%)",
        animation: "pulseGlow 3.2s ease-in-out infinite",
      }}
    >
      <div className="glare pointer-events-none absolute inset-0 rounded-[22px]" />
      <div className="tilt-inner relative h-full w-full rounded-[20px] bg-white/85 backdrop-blur-md border border-white/60 shadow-xl flex items-center justify-center text-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full border-2 border-[#C7DC8A] p-3 bg-white">
            <FaPlus size={20} className="text-[#365314]" />
          </div>
          <p className="text-sm text-[#1f2937] font-semibold">Add Profile</p>
          <p className="text-[11px] text-[#6B7280] -mt-1 opacity-90">
            Create a new learner
          </p>
        </div>
      </div>
    </Link>
  );
};
