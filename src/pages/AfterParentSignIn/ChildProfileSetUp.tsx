// src/pages/AfterParentSignIn/ProfileSetupPage.tsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import BgImage from "@/assets/newBackground.svg";
import KundaLogo from "@/assets/KundaLogo.svg";

import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
import { getApiErrorMessage } from "@/api/helper";
import { useGetSuggestUserName, useUserNameChecker } from "@/api/queries";

type FormData = {
  name: string;
  username: string;
  dob: string; // YYYY-MM-DD
};

const ProfileSetupPage: React.FC<{ setChildProfile: (val: string) => void }> = ({
  setChildProfile,
}) => {
  const navigate = useNavigate();

  const [name, setName] = useState<FormData["name"]>("");
  const [username, setUsername] = useState<FormData["username"]>("");
  const [dob, setDob] = useState<FormData["dob"]>("");

  const [debouncedUsername] = useDebouncedValue(username, 250);
  const { isError, isLoading, isInitialLoading } = useUserNameChecker(debouncedUsername);

  const usernameTaken = !isLoading && !isInitialLoading && isError;

  const { mutate: suggestUsername } = useGetSuggestUserName();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const datalistId = "username-suggestions";

  const today = new Date().toISOString().split("T")[0];

  /** Always coerce incoming value into a clean string */
  const toStr = (v: unknown): string => {
    if (typeof v === "string") return v;
    // handle event-like shapes from custom inputs
    // @ts-ignore
    if (v?.target?.value != null) return String(v.target.value);
    return String(v ?? "");
  };

  const askForSuggestions = (raw: unknown) => {
    const fullName = toStr(raw);
    const trimmed = fullName.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }
    suggestUsername(
      { name: trimmed },
      {
        onSuccess(resp: any) {
          setSuggestions(resp?.data?.data?.suggestions || []);
        },
        onError(err: any) {
          notifications.show({
            title: "Notification",
            message: getApiErrorMessage(err),
          });
        },
      }
    );
  };

  const applySuggestion = (val: string) => {
    setUsername(val);
    usernameInputRef.current?.focus();
  };

  const safeName = toStr(name).trim();
  const safeUsername = toStr(username).trim();

  const canSubmit = Boolean(safeName && safeUsername && dob) && !usernameTaken && !isLoading;

  const onSubmit = () => {
    suggestUsername(
      { name: safeName, dob, is_avatar: "false", username: safeUsername },
      {
        onSuccess(resp: any) {
          const profileId = resp?.data?.data?.profile_id;
          if (profileId) {
            sessionStorage.setItem("showJoinChallenge", "true");
            setChildProfile?.(String(profileId));
          }
          notifications.show({
            title: "Notification",
            message: resp?.data?.message || "Profile created successfully!",
          });
          navigate("/profilesuccess");
        },
        onError(err: any) {
          notifications.show({
            title: "Notification",
            message: getApiErrorMessage(err),
          });
        },
      }
    );
  };

  return (
    <div
      className="min-h-screen w-full bg-no-repeat bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Keep the card on the right for large screens */}
      <section className="w-full max-w-6xl flex items-center justify-end">
        {/* Card — styled to match the screenshot */}
        <div className="w-full sm:w-[520px] md:w-[560px] bg-white/95 backdrop-blur-[0.5px] rounded-[28px] shadow-[0_22px_60px_rgba(0,0,0,0.10)] p-6 sm:py-10 sm:px-14">
          {/* Logo centered */}
          <div className="flex justify-center">
            <img src={KundaLogo} alt="Kunda Kids" className="h-9 sm:h-10" />
          </div>

          {/* Heading + subheading centered */}
          <div className="text-center mt-5 mb-6 sm:mb-8">
            <h1 className="text-[22px] sm:text-[26px] font-semibold text-[#111827]">
              Create child’s profile
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Enter the child’s info to create a profile.
            </p>
          </div>

          {/* Inputs — pill style */}
          <div className="space-y-4">
            {/* Full Name */}
            <InputFormat
              label=""
              placeholder="Child’s full name"
              value={name}
              onChange={(val) => {
                const v = toStr(val);
                setName(v);
                askForSuggestions(v);
              }}
              className="!bg-transparent"
              inputClassName="h-12 sm:h-[52px] rounded-full bg-[#ECEFF1] focus:bg-[#FFF6D9] px-5 text-[15px] placeholder:text-[#8C9AAE] border border-transparent focus:border-[#9FC43E] outline-none w-full"
            />

            {/* Username */}
            <div>
              <input
                ref={usernameInputRef}
                value={username}
                onChange={(e) => setUsername(toStr(e))}
                placeholder="Enter a nickname"
                className={`h-12 sm:h-[52px] w-full rounded-full px-5 text-[15px] placeholder:text-[#8C9AAE] outline-none transition
                  ${usernameTaken ? "bg-[#FFE4E6] border border-[#EF4444]" : "bg-[#ECEFF1] border border-transparent focus:bg-[#FFF6D9] focus:border-[#9FC43E]"}`}
                list={datalistId}
              />
              <datalist id={datalistId}>
                {suggestions?.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>

              <p className="text-[11px] text-[#6B7280] mt-1">
                Note: the username would display on leaderboard.
              </p>

              {!!suggestions?.length && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => applySuggestion(s)}
                      className="px-3 py-1 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {toStr(username) && (
                <div className="mt-1 text-[12px]">
                  {isInitialLoading || isLoading ? (
                    <span className="text-[#6B7280]">Checking availability…</span>
                  ) : usernameTaken ? (
                    <span className="text-[#EF4444]">Username already exists</span>
                  ) : (
                    <span className="text-[#10B981]">Username is available</span>
                  )}
                </div>
              )}
            </div>

            {/* DOB */}
            <div>
              <input
                type="date"
                max={today}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Select date of birth"
                className="h-12 sm:h-[52px] w-full rounded-full bg-[#ECEFF1] focus:bg-[#FFF6D9] px-5 text-[15px] placeholder:text-[#8C9AAE] border border-transparent focus:border-[#9FC43E] outline-none"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Button
              onClick={onSubmit}
              disabled={!canSubmit}
              className="!w-fit px-10 py-4 mx-auto h-[48px] sm:h-[52px] rounded-full font-semibold text-white shadow-[0_8px_18px_rgba(159,196,62,0.35)] disabled:opacity-60 disabled:cursor-not-allowed
                        bg-[#9FC43E] hover:bg-[#8AB532]"
            >
              Create Profile
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileSetupPage;
