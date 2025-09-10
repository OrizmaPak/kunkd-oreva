import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye } from "react-icons/ai";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";

import { getApiErrorMessage } from "@/api/helper";
import { useUpdatePassword } from "@/api/queries";

/**
 * Tailwind-coded page that matches the new design:
 * - Left rail: title + helper text + button (Change Password / Save Changes)
 * - Right panel:
 *    • Idle: one disabled password field (masked) with eye icon (non-interactive)
 *    • Editing: two active fields (Old/New) with pale-yellow background and eye toggles
 */

type FormFields = {
  current_password: string;
  password: string;
};

const Password: React.FC = () => {
  const { mutate, isLoading } = useUpdatePassword();

  // Editing toggle
  const [editing, setEditing] = useState(false);

  // Eye toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // Validation schema (when editing)
  const schema: ZodType<FormFields> = z.object({
    current_password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(20, { message: "Password must not exceed 20 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must not exceed 20 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { current_password: "", password: "" },
  });

  const onSubmit = (data: FormFields) => {
    mutate(
      { current_password: data.current_password.trim(), password: data.password.trim() },
      {
        onSuccess(resp: any) {
          notifications.show({ title: "Success", message: resp?.data?.message || "Password updated." });
          reset();
          setEditing(false);
        },
        onError(err: any) {
          notifications.show({ title: "Error", message: getApiErrorMessage(err) });
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-xl  border-gray-200 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left rail */}
        <aside className="md:col-span-4">
          <h2 className="text-[#1D2739] text-lg font-semibold">Password</h2>
          <p className="text-sm text-[#667185] mt-1">
            Update your password&nbsp; here.
          </p>

          {/* Primary action */}
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#BCD678] px-4 py-2 text-sm font-semibold text-[#BCD678] hover:bg-[#BCD678] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BCD678]"
            >
              {/* pencil glyph is optional; keeping button text only per mock */}
              Change Password
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="mt-5 inline-flex items-center rounded-full bg-[#BCD678] px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BCD678] disabled:opacity-70"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader size="sm" />
                  Saving…
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          )}
        </aside>

        {/* Right panel */}
        <section className="md:col-span-8">
          {!editing ? (
            // ————— IDLE VIEW —————
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-Inter font-semibold text-[#1D2739] mb-2">Old Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value="passwordplaceholder"
                    disabled
                    className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 bg-[#F2F4F7] text-[#98A2B3] cursor-not-allowed"
                  />
                  <AiOutlineEye className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
                </div>
              </div>
            </div>
          ) : (
            // ————— EDITING VIEW —————
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Old Password */}
              <div>
                <label className="block text-sm font-Inter font-semibold text-[#1D2739] mb-2">Old Password</label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    placeholder="Create Password"
                    className="w-full h-12 rounded-full border border-transparent px-5 bg-[#FFF6D9] text-[#1D2739] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#BCD678]"
                    {...register("current_password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/5"
                    aria-label="Toggle old password visibility"
                  >
                    <AiOutlineEye className="text-[#98A2B3]" />
                  </button>
                </div>
                {errors.current_password && (
                  <p className="mt-1 text-xs text-red-500">{errors.current_password.message}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-Inter text-[#1D2739] mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="Create Password"
                    className="w-full h-12 rounded-full border border-transparent px-5 bg-[#FFF6D9] text-[#1D2739] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#BCD678]"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/5"
                    aria-label="Toggle new password visibility"
                  >
                    <AiOutlineEye className="text-[#98A2B3]" />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default Password;
