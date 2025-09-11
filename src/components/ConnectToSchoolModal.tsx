import React, { useEffect } from "react";
import { Modal } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import InputFormat from "@/common/InputFormat";
import useDebounce from "@/hooks/useDebounce";
import {
  useConnectStudentData,
  useGetSchoolProfileForStudent,
} from "@/api/queries";
import { getApiErrorMessage } from "@/api/helper";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";

type ChildLite = { id: number; name: string };

type Props = {
  opened: boolean;
  onClose: () => void;
  child: ChildLite | null;
  onConnected?: () => void;
};

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  schoolcode: z.string().min(2, "Enter a valid school code"),
  classid: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const splitName = (full?: string) => {
  if (!full) return { first: "", last: "" };
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
};

const ConnectToSchoolModal: React.FC<Props> = ({ opened, onClose, child, onConnected }) => {
  // Zustand user (selector returns the auth slice)
  const [user] = useStore(getUserState);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // keep inputs mounted so Controller can control values reliably
    shouldUnregister: false,
    defaultValues: { firstname: "", lastname: "", schoolcode: "", classid: "" },
  });

  // Re-hydrate defaults whenever modal becomes visible OR the dependencies change
  useEffect(() => {
    if (!opened) return;
    // const { first, last } = splitName(child?.name);
    reset({
      firstname: child.name || "",
      lastname: user?.lastname || user?.firstname || "",
      schoolcode: "",
      classid: "",
    });
  }, [opened, child?.id, child?.name, user?.firstname, user?.lastname, reset]);

  const schoolCode = watch("schoolcode");
  const debouncedCode = useDebounce(schoolCode, 400);

  // Lookup school by code
  const { data: schoolResp, isFetching: loadingSchool } =
    useGetSchoolProfileForStudent(debouncedCode || "");
  const schoolData = schoolResp?.data?.data; // { id, name, classes? }
  const classes =
    (schoolData?.classes as Array<{ id: number | string; name: string }>) || [];

  // Submit connect
  const { mutate: connect, isLoading } = useConnectStudentData();

  const onSubmit = (data: FormData) => {
    if (!child?.id || !schoolData?.id) {
      notifications.show({ title: "Connect to School", message: "Missing child or school details." });
      return;
    }
    if (classes.length > 0 && !data.classid) {
      notifications.show({ title: "Select Class", message: "Please select a class to continue." });
      return;
    }

    connect(
      {
        profile_id: Number(child.id),
        firstname: data.firstname,
        lastname: data.lastname,
        school_id: schoolData.id,
        class_id: classes.length > 0 ? Number(data.classid) : undefined,
      } as any,
      {
        onSuccess: (res: any) => {
          notifications.show({
            title: "Request sent",
            message: res?.data?.message || "Your request has been sent. It may be pending approval.",
          });
          onClose();
          onConnected?.();
        },
        onError: (err) => {
          notifications.show({ title: "Error", message: getApiErrorMessage(err) });
        },
      }
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      radius="lg"
      overlayProps={{ blur: 2 }}
      classNames={{ header: "px-6 pt-6", title: "w-full", body: "px-6 pb-6" }}
      title={
        <div className="w-full">
          <h2 className="text-xl font-semibold text-gray-900">Connect to School</h2>
          <p className="text-sm text-gray-500 mt-1">
            Connect your child to his or her school to enjoy.
          </p>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <InputFormat placeholder="First name" {...field} error={errors.firstname?.message} />
            )}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <InputFormat placeholder="Last name" {...field} error={errors.lastname?.message} />
            )}
          />
        </div>

        {/* School Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School code</label>
          <Controller
            name="schoolcode"
            control={control}
            render={({ field }) => (
              <InputFormat
                placeholder="Enter school code"
                {...field}
                error={errors.schoolcode?.message}
              />
            )}
          />
          {loadingSchool && <p className="text-xs text-gray-500 mt-1">Checking code…</p>}
        </div>

        {/* School Name (read-only when code is valid) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School name</label>
          <InputFormat placeholder="School name" value={schoolData?.name || ""} readonly />
        </div>

        {/* Classes (only if returned) */}
        {classes.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select class</label>
            <Controller
              name="classid"
              control={control}
              render={({ field }) => (
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9FC43E]"
                  {...field}
                >
                  <option value="">Choose a class</option>
                  {classes.map((c) => (
                    <option key={String(c.id)} value={String(c.id)}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.classid?.message && (
              <p className="mt-1 text-xs text-red-600">{errors.classid.message}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !schoolData?.id}
            className="px-4 py-2 rounded-lg text-sm bg-[#9FC43E] text-white hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Connecting…" : "Connect"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ConnectToSchoolModal;
