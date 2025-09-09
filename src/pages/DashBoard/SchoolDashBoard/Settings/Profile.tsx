  import Button from "@/components/Button";

  import useStore from "@/store/index";
  import { getUserState } from "@/store/authStore";
  import { notifications } from "@mantine/notifications";
  import { useEffect, useState } from "react";
  import { FaRegCopy } from "react-icons/fa6";
  import { MdModeEdit } from "react-icons/md";
  import { useGetCountries } from "@/api/queries";
  import ReactFlagsSelect from "react-flags-select";
  import { TCountry } from "@/pages/ParentSignup/ParentSignupDetails";
  import { Modal } from "@mantine/core";
  import { useDisclosure } from "@mantine/hooks";
  import UpdateProfileModal from "./UpdateProfileModal";

  const Profile = () => {
    const [user] = useStore(getUserState);
    const [textToCopy] = useState(user?.school?.code as string);
    const handleCopy = () => {
      // Create a new textarea element to hold the text
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);

      // Select the text in the textarea
      textarea.select();

      // Execute the copy command
      document.execCommand("copy");

      // Remove the textarea element from the DOM
      document.body.removeChild(textarea);
      notifications.show({
        title: `Notification`,
        message: "Copied",
      });
    };
    const { data } = useGetCountries();
    const countries: TCountry[] = data?.data?.data;
    // const [selectedCountry, setSelectedCountry] = useState<TCountry>();
    const [selectedCode, setSelectedCode] = useState("US");

    const selectedCountry = countries?.find(
      (data: TCountry) => data.id === user?.country_id
    );

    useEffect(() => {
      if (selectedCountry) {
        setSelectedCode(selectedCountry?.iso2);
      }
    }, [selectedCountry]);
    const [opened, { close, open }] = useDisclosure(false);

    // Parent-only controls
    const isParent = user?.role === "user";
    const [parentOpened, { open: openParent, close: closeParent }] = useDisclosure(false);

    // Countries already loaded above
    const countryName =
      countries?.find((c: TCountry) => c.id === user?.country_id)?.name || "";

    // Display values on the page (read-only); start from user
    const [parentDisplayFullName, setParentDisplayFullName] = useState(
      [user?.firstname, user?.lastname].filter(Boolean).join(" ")
    );
    const [parentDisplayCountryId, setParentDisplayCountryId] = useState<number | undefined>(
      user?.country_id
    );
    const [parentDisplayPhone, setParentDisplayPhone] = useState(user?.phone || "");

    // Draft values inside the modal (editable)
    const [draftFullName, setDraftFullName] = useState(parentDisplayFullName);
    const [draftCountryId, setDraftCountryId] = useState<number | "">(
      parentDisplayCountryId ?? ""
    );
    const [draftPhone, setDraftPhone] = useState(parentDisplayPhone);

    // Save handler (UI only for now; wire to API when ready)
    const saveParentEdits = async () => {
      const parts = (draftFullName || "").trim().split(/\s+/);
      const first = parts[0] || "";
      const last = parts.slice(1).join(" ");

      // Update what the page shows
      setParentDisplayFullName(`${first}${last ? " " + last : ""}`);
      setParentDisplayCountryId(typeof draftCountryId === "number" ? draftCountryId : undefined);
      setParentDisplayPhone(draftPhone);

      notifications.show({ title: "Saved", message: "Your profile has been updated." });
      closeParent();
    };

    // Teacher-only modal controls
    const [teacherOpened, { open: openTeacher, close: closeTeacher }] = useDisclosure(false);
    const isTeacher = user?.role === "teacher";

    // Teacher profile values (displayed on the page)
    const [firstName, setFirstName] = useState(user?.firstname || "");
    const [lastName, setLastName] = useState(user?.lastname || "");
    const email = user?.email || "";

    // Draft values edited inside the modal
    const [draftFirstName, setDraftFirstName] = useState(firstName);
    const [draftLastName, setDraftLastName] = useState(lastName);

    const saveTeacherEdits = async () => {
      // TODO: Wire this to your API when ready (no teacher endpoint in repo yet).
      setFirstName(draftFirstName.trim());
      setLastName(draftLastName.trim());
      notifications.show({ title: "Saved", message: "Your details have been updated." });
      closeTeacher();
    };

    // ——— PARENT VIEW ———
    if (isParent) {
      const parentCountryName =
        countries?.find((c) => c.id === (parentDisplayCountryId ?? user?.country_id))?.name || "";

      return (
        <div className="bg-white rounded-xl  border-x-none border-b-none border-gray-200 shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left rail */}
            <aside className="md:col-span-4">
              <h2 className="text-[#1D2739] font-Inter font-semibold" style={{ fontWeight: 600, fontSize: '16px', lineHeight: '145%', letterSpacing: '0%' }}>Parent Details</h2>
              <p className="text-sm text-[#667185] mt-1">Update your details here.</p>

              <button
                type="button"
                onClick={() => {
                  // seed modal drafts with current display values
                  setDraftFullName(parentDisplayFullName);
                  setDraftCountryId(parentDisplayCountryId ?? "");
                  setDraftPhone(parentDisplayPhone);
                  openParent();
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#BCD678] px-4 py-2 text-sm font-semibold text-[#BCD678] hover:bg-[#BCD678] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BCD678]"
              >
                <MdModeEdit className="text-lg" />
                Edit Profile
              </button>
            </aside>

            {/* Read-only form area (matches screenshot) */}
            <section className="md:col-span-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-[#667185] mb-2">Full name</label>
                  <input
                    type="text"
                    value={parentDisplayFullName}
                    readOnly
                    placeholder="Jadesola  Badmus"
                    className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 text-[#1D2739] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#667185] mb-2">Email address</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    placeholder="thegabriellamcpherson@email.com"
                    className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 bg-[#F2F4F7] text-[#98A2B3] cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#667185] mb-2">Country</label>
                  <input
                    value={parentCountryName}
                    readOnly
                    placeholder="Nigeria"
                    className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 text-[#1D2739]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#667185] mb-2">Phone number</label>
                  <input
                    value={parentDisplayPhone}
                    readOnly
                    placeholder="901 234 5678"
                    className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 text-[#1D2739]"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Exact Figma-styled modal */}
          <Modal
            opened={parentOpened}
            onClose={closeParent}
            centered
            withCloseButton
            title="Edit Profile Info"
            size="md"
            radius="lg"
            classNames={{
              content: "overflow-hidden rounded-xl",
              header: "bg-[#BCD678] px-6 py-3 rounded-t-xl border-0",
              title: "text-white font-semibold",
              close: "text-white hover:bg-white/10",
              body: "p-6 bg-white",
            }}
          >
            <div className="space-y-5 mt-7">
              {/* Full name */}
              <div>
                <label className="block font-semibold text-sm text-[#1D2739] mb-2">Full name</label>
                <input
                  type="text"
                  value={draftFullName}
                  onChange={(e) => setDraftFullName(e.target.value)}
                  placeholder="Jadesola  Badmus"
                  className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 focus:outline-none focus:ring-2 focus:ring-[#8BCD50] focus:border-[#8BCD50]"
                />
              </div>

              {/* Country (simple select to edit, styled like input) */}
              <div>
                <label className="block font-semibold text-sm text-[#1D2739] mb-2">Country</label>
                <select
                  value={draftCountryId}
                  onChange={(e) => setDraftCountryId(e.target.value ? Number(e.target.value) : "")}
                  className="w-full h-12 rounded-full border border-[#E4E7EC] bg-white px-5 focus:outline-none focus:ring-2 focus:ring-[#8BCD50] focus:border-[#8BCD50]"
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {countries?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone number */}
              <div>
                <label className="block font-semibold text-sm text-[#1D2739] mb-2">Phone number</label>
                <input
                  type="text"
                  value={draftPhone}
                  onChange={(e) => setDraftPhone(e.target.value)}
                  placeholder="901 234 5678"
                  className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 focus:outline-none focus:ring-2 focus:ring-[#8BCD50] focus:border-[#8BCD50]"
                />
              </div>

              {/* Save */}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={saveParentEdits}
                  className="inline-flex items-center rounded-full bg-[#BCD678] px-4 py-2 text-white text-sm font-medium hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8BCD50]"
                >
                  Save
                </button>
              </div>
            </div>
          </Modal>
        </div>
      );
    }
    // ——— END PARENT VIEW ———

    // ——— TEACHER VIEW ———
    if (isTeacher) {
      return (
        <div className="bg-white rounded-xl border border-x-none border-b-none border-gray-200 shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left rail */}
            <aside className="md:col-span-4">
              <h2 className="text-[#1D2739] text-lg font-semibold">Teachers Details</h2>
              <p className="text-sm text-[#667185] mt-1">Update your details here.</p>

              <button
                type="button"
                onClick={() => {
                  // seed modal drafts with current values
                  setDraftFirstName(firstName);
                  setDraftLastName(lastName);
                  openTeacher();
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#BCD678] px-4 py-2 text-sm font-semibold text-[#BCD678] hover:bg-[#BCD678] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BCD678]"
              >
                <MdModeEdit className="text-lg" />
                Edit Profile
              </button>
            </aside>

            {/* Read-only form area (matches screenshot) */}
            <section className="md:col-span-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-[#667185] mb-2">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    disabled
                    placeholder="Jadesola"
                    className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 bg-[#F2F4F7] text-[#1D2739]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#667185] mb-2">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    disabled
                    placeholder="Badmus"
                    className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 bg-[#F2F4F7] text-[#1D2739]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#667185] mb-2">Email address</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    placeholder="thegabriellamcpherson@email.com"
                    className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 bg-[#F2F4F7] text-[#98A2B3] cursor-not-allowed"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Edit modal */}
          <Modal
            opened={teacherOpened}
            onClose={closeTeacher}
            centered
            withCloseButton
            title="Edit Profile Info"
            size="md"
            radius="lg"
            classNames={{
              content: "overflow-hidden rounded-xl",
              header:
                "bg-[#BCD678] px-6 py-3 rounded-t-xl border-0",           // lime header
              title: "text-white font-semibold",                            // white title
              close: "text-white hover:bg-white/10",                        // white close icon
              body: "p-6 bg-white",                                         // clean body
            }}
          >
            <div className="space-y-5 mt-7">
              <div>
                <label className="block font-semibold text-sm text-[#1D2739] mb-2">First Name</label>
                <input
                  type="text"
                  value={draftFirstName}
                  onChange={(e) => setDraftFirstName(e.target.value)}
                  placeholder="Jadesola"
                  className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 focus:outline-none focus:ring-2 focus:ring-[#8BCD50] focus:border-[#8BCD50]"
                />
              </div>

              <div>
                <label className="block font-semibold text-sm text-[#1D2739] mb-2">Last Name</label>
                <input
                  type="text"
                  value={draftLastName}
                  onChange={(e) => setDraftLastName(e.target.value)}
                  placeholder="Badmus"
                  className="w-full h-12 rounded-full border border-[#E4E7EC] px-5 focus:outline-none focus:ring-2 focus:ring-[#8BCD50] focus:border-[#8BCD50]"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={saveTeacherEdits}
                  className="inline-flex items-center rounded-full bg-[#BCD678] px-3 py-2 text-white text-sm font-medium hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8BCD50]"
                >
                  Save
                </button>
              </div>
            </div>
          </Modal>
        </div>
      );
    }
    // ——— END TEACHER VIEW ———

    const schoolInfo = user?.school;

    console.log(schoolInfo, "shcool info");
    return (
      <>
        <Modal
          radius={20}
          size={450}
          opened={opened}
          onClose={close}
          padding={0}
          withCloseButton={false}
          centered
        >
          <UpdateProfileModal close={close} />
        </Modal>
        <div className="px-10 py-5">
          <div className="grid grid-cols-[450px_1fr]  ">
            <div className="">
              <p className=" font-Inter text-[16px]">School Details</p>
              <p className=" font-InterReg text-[14px] mb-5">
                Update your school details here.
              </p>
              <Button
                type="button"
                onClick={open}
                varient="outlined"
                size="sm"
                className="border-[#9FC43E]  rounded-full flex justify-center items-center  font-bold "
              >
                <MdModeEdit size={20} color="#9FC43E" />
                <span className="text-[14px] font-Inter text-[#9FC43E]">
                  {" "}
                  Edit Profile
                </span>
              </Button>
            </div>
            <div className="">
              <div className="max-w-[546px]">
                <p className="">
                  <p
                    onClick={handleCopy}
                    className="font-bold font-Hanken cursor-pointer text-[20px] pt-1 flex gap-2 items-center"
                  >
                    {(user?.school?.code as string) || "KS729"}
                    <FaRegCopy size={15} />
                  </p>
                  <span className="text-[12px] text-[#696969] font-Hanken">
                    {" "}
                    License Code:
                  </span>
                </p>
                <p className=" mt-4">
                  <label
                    htmlFor="school name"
                    className="text-[14px] font-InterReg"
                  >
                    School Name
                  </label>
                  <p
                    className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1 `}
                  >
                    {user?.school?.name}
                  </p>
                </p>
                <p className=" mt-4">
                  <label htmlFor="Address" className="text-[14px] font-InterReg">
                    Address
                  </label>
                  <p
                    className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1 `}
                  >
                    {user?.school?.address}
                  </p>
                </p>
                <p className=" mt-4">
                  <label htmlFor="country" className="text-[14px] font-InterReg">
                    Country
                  </label>
                  <ReactFlagsSelect
                    selected={selectedCode}
                    onSelect={setSelectedCode}
                    disabled={true}
                  />
                </p>

                <p>
                  <label htmlFor="state" className="text-[14px] font-InterReg">
                    State
                  </label>
                  <p
                    className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1 `}
                  >
                    Lagos
                  </p>
                </p>
              </div>
            </div>
          </div>
          <hr className="my-8" />
          <div className="grid grid-cols-[450px_1fr]  ">
            <div className="">
              <p className=" font-Inter text-[16px]">Contact Person Details</p>
              <p className=" font-InterReg text-[14px] mb-5">
                Update your personal details here.
              </p>
            </div>
            <div className="">
              <div className="max-w-[546px]">
                <p className=" mt-4">
                  <label htmlFor="name" className="text-[14px] font-InterReg">
                    Name
                  </label>
                  <p
                    className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1 `}
                  >
                    {schoolInfo?.contact_name}
                  </p>
                </p>

                <p>
                  <label htmlFor="phone" className="text-[14px] font-InterReg">
                    Phone Number
                  </label>
                  <p
                    className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1`}
                  >
                    {user?.phone}
                  </p>
                </p>

                <p>
                  <label htmlFor="email" className="text-[14px] font-InterReg">
                    Email
                  </label>
                  <p
                    className={`border h-[44px] bg-[#F1F1F1] py-3 px-4 rounded-full flex items-center gap-2 mt-1`}
                  >
                    {user?.email}
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default Profile;
