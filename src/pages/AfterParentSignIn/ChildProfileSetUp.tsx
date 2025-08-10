import { getApiErrorMessage } from "@/api/helper";
import {
  useGetAvatars,
  useGetProfile,
  useProfle,
  useGetUpdatedProfile,
  useGetSuggestUserName,
  useUserNameChecker,
} from "@/api/queries";
import AddAvatarIcon from "@/assets/AddAvatarIcon.svg";
import LessDOwnIcon from "@/assets/backIcon.png";
import YajSucces from "@/assets/yaacongrat24.png";
import InputFormat from "@/common/InputFormat";
import { FormData } from "@/common/User/FormValidation/Schema";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chip, Loader, Skeleton, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import {
  STEP_1,
  STEP_2,
  STEP_3,
  STEP_4,
  STEP_5,
} from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { selectAvatarType } from "./SelectProfile";
import moengage from "@moengage/web-sdk";
import Logo from "@/assets/KundaLogo.svg";
import facebook from "@/assets/facebook.svg";
import insta from "@/assets/insta.svg";
import twitter from "@/assets/twitter.svg";
import Ema from "@/assets/ema.png";
import { useDebouncedValue } from "@mantine/hooks";

/** ───────────────────────────────────────────────────────────────────────
 * Layout notes (NO SCROLL):
 * - Header: 64px, Footer: 64px
 * - Content wrapper uses min-h-[calc(100vh-128px)] and overflow-hidden
 * - Step sections are grid/flex to keep everything inside the viewport
 * - Avatar step uses pagination (no vertical scrolling)
 * ─────────────────────────────────────────────────────────────────────── */

export type avatarType = { name: string; image: string };

const HEADER_H = 64;
const FOOTER_H = 64;

const ChildProfileSetUp = ({
  setChildProfile,
}: {
  setChildProfile: (val: string) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(STEP_1);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState<string>("");
  const [schoolName, setSchoolName] = useState("");
  const [age, setAge] = useState<string>("");

  const navigate = useNavigate();
  const openInNewTab = (url: string) => {
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
  };

  const progress = useMemo(() => {
    const map = { [STEP_1]: 10, [STEP_2]: 40, [STEP_3]: 65, [STEP_4]: 85, [STEP_5]: 100 };
    return map[currentStep as keyof typeof map] ?? 10;
  }, [currentStep]);

  return (
    <div className="min-h-screen w-full max-w-[1440px] mx-auto flex flex-col bg-gradient-to-b from-[#F7FBEF] via-white to-[#F7FBEF]">
      {/* Header (fixed height) */}
      <div
        className="flex items-center justify-between px-6 sm:px-10"
        style={{ height: HEADER_H }}
      >
        <img src={Logo} alt="Kunda Kids" className="h-8 sm:h-10" />
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <span className="font-medium">Create Child Profile</span>
        </div>
      </div>

      {/* Progress/Stepper */}
      <div className="px-6 sm:px-10">
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#9FC43E] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] sm:text-xs text-gray-500">
          <span>Welcome</span>
          <span>Name</span>
          <span>Age</span>
          <span>Avatar</span>
          <span>Done</span>
        </div>
      </div>

      {/* Content area (no scroll) */}
      <div
        className="px-4 sm:px-8 py-4 sm:py-6 overflow-hidden"
        style={{ minHeight: `calc(100vh - ${HEADER_H + FOOTER_H + 40 + 32}px)` }} // header + footer + progress + margins
      >
        <div className="w-full h-full max-w-[1100px] mx-auto">
          <div className="w-full h-full rounded-[28px] border border-white/60 bg-white/70 backdrop-blur-md shadow-xl p-4 sm:p-8 flex">
            {/* Each step ensures content fits inside this box without scrolling */}
            <div className="flex-1 h-full">
              {currentStep === STEP_1 && (
                <WelcomeModal onContinue={() => setCurrentStep(STEP_2)} />
              )}

              {currentStep === STEP_2 && (
                <ChildNameModal
                  onContinue={() => setCurrentStep(STEP_3)}
                  goBack={() => setCurrentStep(currentStep - 1)}
                  showGoBackIcon={true}
                  setName={setName}
                  userName={userName}
                  name={name}
                  setUserName={setUserName}
                />
              )}

              {currentStep === STEP_3 && (
                <ChildAgeModal
                  onContinue={() => setCurrentStep(STEP_4)}
                  goBack={() => setCurrentStep(currentStep - 1)}
                  setAge={setAge}
                />
              )}

              {currentStep === STEP_4 && (
                <SelectAvatar
                  setChildProfile={setChildProfile}
                  onContinue={() => setCurrentStep(STEP_5)}
                  goBack={() => setCurrentStep(currentStep - 1)}
                  age={age}
                  schoolName={schoolName}
                  userName={userName}
                  name={name}
                  setAge={setAge}
                  setName={setName}
                  setSchoolName={setSchoolName}
                  setUserName={setUserName}
                />
              )}

              {currentStep === STEP_5 && (
                <WellDoneModal onContinue={() => navigate("/parent")} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer (fixed height) */}
      <footer
        className="mt-auto border-t bg-white/60 backdrop-blur-sm"
        style={{ height: FOOTER_H }}
      >
        <div className="h-full flex justify-between items-center text-sm text-gray-500 px-6 sm:px-10">
          <p>© {new Date().getFullYear()} Kunda Kids. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => openInNewTab("https://m.facebook.com/kundakids/")} aria-label="Facebook" className="hover:opacity-80">
              <img src={facebook} alt="facebook" className="w-5 h-5" />
            </button>
            <button onClick={() => openInNewTab("https://instagram.com/kundakids?igshid=NzZlODBkYWE4Ng==")} aria-label="Instagram" className="hover:opacity-80">
              <img src={insta} alt="instagram" className="w-6 h-6" />
            </button>
            <button onClick={() => openInNewTab("https://twitter.com/kundakids?lang=en")} aria-label="Twitter/X" className="hover:opacity-80">
              <img src={twitter} alt="twitter" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChildProfileSetUp;

/* ───────────────── STEP 1: Welcome (centered, no scroll) ─────────────── */
export const WelcomeModal = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <h1 className="font-bold text-[28px] sm:text-[34px] font-Recoleta text-gray-900">
          Welcome to Kunda Kids
        </h1>
        <p className="text-gray-600 mt-2">To begin, create a profile for your child.</p>
      </div>

      <button
        onClick={onContinue}
        className="mt-8 group rounded-2xl border-2 border-dashed border-[#B7D487] bg-[#F6FAEC] hover:bg-[#F2F8E3] px-6 py-5 transition"
      >
        <img src={AddAvatarIcon} alt="Add profile" className="mx-auto" />
        <p className="pt-4 font-medium text-[#2F2F2F] group-hover:underline">Add Profile</p>
      </button>
    </motion.div>
  );
};

/* ───────────── STEP 2: Name + Username (2-column, fits screen) ───────── */
export const ChildNameModal = ({
  onContinue,
  goBack,
  showGoBackIcon,
  setName,
  name,
  userName,
  close,
  setUserName,
  showCancelBtn,
  cancel,
}: {
  onContinue: () => void;
  goBack: () => void;
  name: string;
  userName: string;
  showGoBackIcon: boolean;
  setName: (val: string) => void;
  close?: () => void;
  cancel?: () => void;
  setUserName: (val: string) => void;
  showCancelBtn?: boolean;
}) => {
  const { mutate } = useGetSuggestUserName();
  const [suggestions, setSuggestion] = useState<string[] | undefined>();
  const [debounced] = useDebouncedValue(userName, 250);
  const { data, isError, isLoading, isInitialLoading } = useUserNameChecker(debounced);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleUsernameSuggestion = (childName: string) => {
    if (!childName?.trim()) return;
    mutate(
      { name: childName },
      {
        onSuccess(data) {
          setSuggestion(data?.data?.data?.suggestions);
        },
        onError(err) {
          notifications.show({ title: "Notification", message: getApiErrorMessage(err) });
        },
      }
    );
  };

  const usernameTaken = !isLoading && isError;

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="w-full h-full"
    >
      {/* 2-col layout that fits height */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Left: Art + Back */}
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between">
            {showGoBackIcon ? (
              <button onClick={() => { goBack(); if (cancel) cancel(); }} aria-label="Go back">
                <img src={LessDOwnIcon} alt="Back" />
              </button>
            ) : <span />}
            {showCancelBtn && (
              <MdClose onClick={close} size={28} className="cursor-pointer text-gray-500" />
            )}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={Ema} alt="illustration" className="max-h-[280px]" />
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex flex-col justify-center">
          <h1 className="font-bold font-Recoleta text-[24px] sm:text-[28px] text-gray-900 mb-1">
            What is your child’s name?
          </h1>
          <p className="text-gray-600 mb-6">Enter the child’s name below</p>

          <div className="max-w-[460px]">
            <label htmlFor="child-name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="child-name"
              value={name}
              className="mt-1 border rounded-full py-3 px-4 w-full text-[14px] border-[#F3DAFF] focus:outline-none focus:ring-2 focus:ring-[#9FC43E]"
              onBlur={() => handleUsernameSuggestion(name)}
              type="text"
              placeholder="Enter your child's name"
              onChange={(e) => setName(e.target.value)}
            />

            <div className="mt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <TextInput
                id="username"
                placeholder="Choose one or enter your desired username."
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                ref={ref}
                rightSection={(isInitialLoading || isLoading) ? <Loader size="xs" /> : null}
                error={usernameTaken ? "Username already exists" : undefined}
              />

              {suggestions && suggestions.length > 0 && (
                <>
                  <Chip.Group onChange={(value) => setUserName(value as string)} value={userName}>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {suggestions.map((s) => (
                        <Chip key={s} value={s}>{s}</Chip>
                      ))}
                    </div>
                  </Chip.Group>
                  <datalist id="user-name-suggestion">
                    {suggestions.map((s) => <option key={s} value={s} />)}
                  </datalist>
                </>
              )}

              <p className="text-[12px] text-gray-500 mt-2">
                Note: the username will be displayed on the leaderboard.
              </p>
            </div>

            <div className="mt-6">
              <Button
                disable={usernameTaken || isLoading || name.trim() === ""}
                type="button"
                onClick={onContinue}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ───────────── STEP 3: Age (2-column, fits screen) ───────────── */
export const ChildAgeModal = ({
  onContinue,
  goBack,
  setAge,
  close,
  showCancelBtn,
}: {
  onContinue: () => void;
  goBack: () => void;
  setAge: (val: string) => void;
  close?: () => void;
  showCancelBtn?: boolean;
}) => {
  const schema: ZodType<FormData> = z.object({
    dob: z.string().min(4, { message: "Invalid DOB" }).max(20, { message: "Invalid DOB" }),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const submitData = async (data: FormData) => { setAge(data?.dob as string); onContinue(); };
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="w-full h-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Left: Back + art */}
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between">
            <button onClick={goBack} aria-label="Go back">
              <img src={LessDOwnIcon} alt="Back" />
            </button>
            {showCancelBtn && <MdClose onClick={close} size={28} className="cursor-pointer text-gray-500" />}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={Ema} alt="illustration" className="max-h-[280px]" />
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex flex-col justify-center">
          <h1 className="font-bold font-Recoleta text-[24px] sm:text-[28px] text-gray-900 mb-1">
            What is your child’s age?
          </h1>
          <p className="text-gray-600 mb-6">We’ll customize the app for your child’s age.</p>

          <form onSubmit={handleSubmit(submitData)} className="max-w-[460px]">
            <InputFormat
              reg={register("dob")}
              errorMsg={errors.dob?.message}
              type="date"
              placeholder="DOB"
              dateMax={today}
            />
            <div className="mt-6">
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

/* ───────── STEP 4: Select Avatar (PAGINATED, no vertical scroll) ─────── */
export const SelectAvatar = ({
  setChildProfile,
  onContinue,
  goBack,
  userName,
  schoolName,
  setName,
  setUserName,
  setAge,
  setSchoolName,
  name,
  age,
  close,
  showCancelBtn,
}: {
  onContinue: () => void;
  goBack: () => void;
  setChildProfile?: (val: string) => void;
  userName: string;
  setName: (val: string) => void;
  setUserName: (val: string) => void;
  setAge: (val: string) => void;
  setSchoolName: (val: string) => void;
  schoolName: string;
  age: string;
  name: string;
  close?: () => void;
  showCancelBtn?: boolean;
}) => {
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState(0);
  const { isLoading: isLoadingAvatar, data, error } = useGetAvatars();
  const [user] = useStore(getUserState);

  // decide how many avatars per page so grid always fits the box
  // 2 rows x N columns depending on breakpoint
  // We'll assume 10 per page on md+ (5 cols x 2 rows), 6 per page on small (3 cols x 2 rows)
  const [perPage, setPerPage] = useState(10);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPerPage(mq.matches ? 10 : 6);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const avatars: selectAvatarType[] = useMemo(() => {
    const list = data?.data?.data?.avatars ?? [];
    return list.slice().reverse();
  }, [data]);

  const totalPages = Math.max(1, Math.ceil(avatars.length / perPage));
  const pageAvatars = avatars.slice(page * perPage, page * perPage + perPage);

  const selectedAv = avatars.find((a) => a.id === selected);

  const { isLoading, mutate } = useProfle();

  const timeString = useMemo(() => {
    const n = new Date();
    const pad = (x: number) => (x < 10 ? `0${x}` : `${x}`);
    return `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
  }, []);

  const onSubmit = () => {
    if (!selectedAv) return;
    mutate(
      {
        name,
        dob: age,
        image: selectedAv.image,
        is_avatar: "true",
        username: userName,
        schoolname: schoolName,
      },
      {
        onSuccess(resp) {
          if (setChildProfile) setChildProfile(resp?.data?.data?.profile_id);
          notifications.show({ title: "Notification", message: resp?.data?.message });
          sessionStorage.setItem("showJoinChallenge", "true");
          setName(""); setSchoolName(""); setAge(""); setUserName("");

          moengage.track_event("web_add_child", {
            user_id: user?.user_id,
            child_name: name,
            child_age: age,
            date_added: timeString,
          });

          onContinue();
        },
        onError(err) {
          notifications.show({ title: "Notification", message: getApiErrorMessage(err) });
        },
      }
    );
  };

  const next = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prev = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="w-full h-full"
    >
      {error ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-red-600 font-medium">Something went wrong</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Left: Title + grid (fixed rows) */}
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between">
              <button onClick={goBack} aria-label="Go back">
                <img src={LessDOwnIcon} alt="Back" />
              </button>
              {showCancelBtn && <MdClose onClick={close} size={28} className="cursor-pointer text-gray-500" />}
            </div>

            <div className="mt-2">
              <h1 className="text-center font-bold font-Recoleta text-[24px] sm:text-[28px] text-gray-900">
                Select Avatar
              </h1>
              <p className="text-center text-gray-600">
                Pick an avatar your child might like
              </p>
            </div>

            {/* Grid: 2 rows only. No vertical scroll. */}
            <div className="mt-4 flex-1 flex items-center justify-center">
              <div className="w-full">
                {isLoadingAvatar ? (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    {new Array(perPage).fill(0).map((_, i) => (
                      <div key={i} className="rounded-2xl bg-white/70 border border-white/60 p-3 shadow">
                        <Skeleton height={88} width={88} radius="xl" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    {pageAvatars.map((avatar) => (
                      <AvatarTile
                        key={avatar.id}
                        avatar={avatar}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ))}
                  </div>
                )}

                {/* Pager */}
                {totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={prev}
                      disabled={page === 0}
                      className={`px-3 py-1 rounded-full text-sm ${
                        page === 0 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#EAF4D6] text-[#3F6212] hover:opacity-90"
                      }`}
                    >
                      Prev
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <span
                          key={i}
                          className={`inline-block w-2.5 h-2.5 rounded-full ${
                            i === page ? "bg-[#9FC43E]" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={next}
                      disabled={page === totalPages - 1}
                      className={`px-3 py-1 rounded-full text-sm ${
                        page === totalPages - 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#EAF4D6] text-[#3F6212] hover:opacity-90"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Selection details + Continue (kept compact) */}
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl border border-white/60 bg-white/70 p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Selected</h3>
              {selected ? (
                <div className="flex items-center gap-4">
                  <img
                    src={selectedAv?.image}
                    alt="selected avatar"
                    className="w-[72px] h-[72px] object-contain rounded-xl"
                  />
                  <div className="text-sm text-gray-600">
                    <div><span className="font-medium">Name:</span> {name || "—"}</div>
                    <div><span className="font-medium">Username:</span> {userName || "—"}</div>
                    <div><span className="font-medium">Age:</span> {age || "—"}</div>
                    <div><span className="font-medium">School:</span> {schoolName || "—"}</div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Choose an avatar to continue.</p>
              )}

              <div className="mt-6">
                <button
                  disabled={!selected || isLoading}
                  onClick={onSubmit}
                  className={`w-full rounded-full py-3 text-white transition ${
                    !selected || isLoading ? "bg-[#d9beeb] cursor-not-allowed" : "bg-[#782caf] hover:bg-[#6b27a0]"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex justify-center items-center gap-2">
                      <Loader color="white" size="sm" /> Saving…
                    </span>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const AvatarTile = ({
  avatar,
  selected,
  setSelected,
}: {
  avatar: selectAvatarType;
  selected: number;
  setSelected: (val: number) => void;
}) => {
  const isActive = selected === avatar.id;
  return (
    <button
      onClick={() => setSelected(avatar.id)}
      aria-label={`Choose avatar ${avatar.name ?? ""}`}
      className={`rounded-2xl p-2 transition-all duration-200 shadow hover:-translate-y-[2px] focus:outline-none focus:ring-4 ${
        isActive
          ? "border-2 border-[#8530C1] ring-[#CBA6F1]/40 bg-white"
          : "border-2 border-white bg-white/80"
      }`}
    >
      <img
        src={avatar.image}
        alt={avatar.name ?? "avatar"}
        className="w-[88px] h-[88px] object-contain"
        loading="lazy"
      />
    </button>
  );
};

/* ───────────── STEP 5: Success (centered, no scroll) ───────────── */
export const WellDoneModal = ({ onContinue }: { onContinue: () => void }) => {
  const [enabled, setEnabled] = useState(false);
  const { data } = useGetProfile(enabled, () => { onContinue(); return data; });

  const handleSubmit = () => setEnabled(true);

  const [useri, setUser] = useStore(getUserState);
  const { data: userData } = useGetUpdatedProfile();
  const currentUserProfile = userData?.data?.data;

  useEffect(() => {
    if (currentUserProfile) setUser({ ...useri, ...currentUserProfile });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile]);

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="w-full h-full flex items-center justify-center"
    >
      <div className="px-6 sm:px-14 text-center">
        <div className="flex justify-center items-center p-2">
          <img src={YajSucces} alt="success" className="max-h-[220px]" />
        </div>
        <p className="text-gray-700 mt-2">You have successfully added a child</p>
        <div className="mt-4">
          <Button onClick={handleSubmit}><span className="text-white">Continue</span></Button>
        </div>
      </div>
    </motion.div>
  );
};
