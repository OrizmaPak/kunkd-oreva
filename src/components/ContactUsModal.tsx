// import { FormData } from "@/common/User/FormValidation/Schema";
// import Button from "@/components/Button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader } from "@mantine/core";
// import { notifications } from "@mantine/notifications";
// import { useForm } from "react-hook-form";
// import { ZodType, z } from "zod";
// import { useGetSupportCategories, useSupportMessage } from "@/api/queries";
// import { TSupportCategory } from "@/api/types";
// import { getApiErrorMessage } from "@/api/helper";
// const ContactUsModal = ({ close }: { close: () => void }) => {
//   const schema: ZodType<FormData> = z.object({
//     subjectId: z.string().min(1, { message: "Subject is invalid" }),
//     body: z.string().min(1, { message: "Body of messeage is empty" }),
//   });
//   const { data } = useGetSupportCategories();
//   const supportcategories = data?.data?.data;
//   const { mutate, isLoading } = useSupportMessage();
//   // console.log("matthew ");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({ resolver: zodResolver(schema) });

//   const SubmitData = async (datta: FormData) => {
//     console.log("matthew ");
//     console.log("data", datta);
//     mutate(
//       {
//         category_id: Number(datta?.subjectId),
//         content: datta?.body || "",
//       },
//       {
//         onSuccess(data) {
//           close();
//           notifications.show({
//             title: `Notification`,
//             message: data.data.message,
//           });
//         },

//         onError(err) {
//           close();

//           notifications.show({
//             title: `Notification`,
//             message: getApiErrorMessage(err),
//           });
//         },
//       }
//     );
//   };
//   return (
//     <div className="h-[481px]">
//       <div>
//         <p className=" bg-customGreen font-InterReg text-[18px] px-[20px] py-[12px] text-white ">
//           Contact Us
//         </p>
//       </div>

//       <div>
//         <div className=" px-8 mt-7">
//           <form onSubmit={handleSubmit(SubmitData)}>
//             <div className="mt-4">
//               {/* Dropdown for selecting category */}
//               <p
//                 className={`p-3 mb-2 rounded-full flex items-center gap-2 h-[44px] ${
//                   errors?.subjectId
//                     ? "border-red-700 border-[1px]"
//                     : "bg-[#F1F1F1]"
//                 }`}
//               >
//                 <select
//                   {...register("subjectId")} // Ensure this matches the schema
//                   name="subjectId"
//                   id="subjectId"
//                   className="w-full bg-[#F1F1F1] h-full focus-within:outline-none bg-inherit"
//                 >
//                   <option value="">Select Category</option>
//                   {supportcategories?.map((each: TSupportCategory) => (
//                     <option key={each.id} value={each.id}>
//                       {each.name}
//                     </option>
//                   ))}
//                 </select>
//               </p>
//               <span className="text-red-600 mb-10">
//                 {errors?.subjectId?.message}
//               </span>
//             </div>

//             <div className="mt-4">
//               {/* Textarea for message body */}
//               <textarea
//                 {...register("body")} // Corrected to match the schema
//                 name="body"
//                 id="body"
//                 placeholder="Message"
//                 className="w-full h-[250px] bg-[#F1F1F1] rounded-2xl p-4 focus:outline-none"
//               ></textarea>
//               <span className="text-red-600 mb-10">
//                 {errors?.body?.message}
//               </span>
//             </div>

//             <p className="my-5 flex gap-5 justify-center">
//               {/* Close button */}
//               <Button
//                 size="sm"
//                 onClick={close}
//                 className="text-black bg-[#F1F1F1] rounded-full px-[40px]"
//               >
//                 Close
//               </Button>

//               {/* Submit button */}
//               <Button
//                 size="sm"
//                 type="submit"
//                 backgroundColor="green"
//                 className="rounded-full px-[20px]"
//               >
//                 {isLoading ? (
//                   <p className="flex justify-center items-center">
//                     <Loader color="#BCD678" size="sm" />
//                   </p>
//                 ) : (
//                   <span className="flex gap-3 items-center">Send message</span>
//                 )}
//               </Button>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUsModal;

import React, { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { GetSupportCategories, SupportMessage } from "@/api/api";
import type { TSupportCategory } from "@/api/types";
import { getApiErrorMessage } from "@/api/helper";

type Props = {
  open: boolean;
  onClose: () => void;
  /** optional callback for parent UI updates after successful send */
  onSent?: () => void;
};

export default function ContactUsModal({ open, onClose, onSent }: Props) {
  const [categories, setCategories] = useState<TSupportCategory[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [catsError, setCatsError] = useState<string | null>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // fetch categories whenever modal opens
  useEffect(() => {
    if (!open) return;
    setCatsError(null);
    setLoadingCats(true);
    GetSupportCategories()
      .then(res => {
        // API returns array of categories
        setCategories(res.data?.data || res.data || []);
      })
      .catch(err => setCatsError(getApiErrorMessage(err)))
      .finally(() => setLoadingCats(false));
  }, [open]);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // click outside to close (modal) and to fold dropdown
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) onClose();
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, dropdownOpen, onClose]);

  if (!open) return null;

  const selectedLabel =
    categories.find(c => c.id === selectedId)?.name || "Category";

  const canSend = !!selectedId && message.trim().length > 0 && !sending;

  const handleSend = async () => {
    if (!selectedId) {
      setFormError("Please choose a category.");
      return;
    }
    if (!message.trim()) {
      setFormError("Please enter a message.");
      return;
    }
    setFormError(null);
    setSending(true);
    try {
      await SupportMessage({ category_id: selectedId, content: message.trim() });
      onSent?.();
      onClose();
      // reset after close
      setTimeout(() => {
        setSelectedId(null);
        setMessage("");
        setDropdownOpen(false);
      }, 0);
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className="w-[540px] max-w-[92vw] rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="rounded-t-2xl bg-[#A6CE39] px-6 py-4 text-lg font-semibold text-white">
          Contact Us
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          {/* Category dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              disabled={loadingCats}
              onClick={() => setDropdownOpen(s => !s)}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left"
            >
              <span className={selectedId ? "text-gray-700" : "text-gray-400"}>
                {loadingCats ? "Loading..." : selectedLabel}
              </span>
              <IoChevronDown className="shrink-0 text-gray-400" />
            </button>

            {dropdownOpen && !loadingCats && (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[1000] rounded-xl border border-gray-200 bg-white shadow-lg">
                <ul className="max-h-64 overflow-auto py-2">
                  {categories.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedId(c.id);
                          setDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {catsError && (
              <div className="mt-2 text-sm text-red-600">
                {catsError}{" "}
                <button
                  type="button"
                  className="underline"
                  onClick={() => {
                    setCatsError(null);
                    setLoadingCats(true);
                    GetSupportCategories()
                      .then(res => setCategories(res.data?.data || res.data || []))
                      .catch(err => setCatsError(getApiErrorMessage(err)))
                      .finally(() => setLoadingCats(false));
                  }}
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Message textarea */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="h-32 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:text-gray-400"
          />

          {formError && (
            <p className="text-sm text-red-600">{formError}</p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-gray-100 px-5 py-2 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className="rounded-full bg-[#A6CE39] px-5 py-2 font-medium text-white disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
