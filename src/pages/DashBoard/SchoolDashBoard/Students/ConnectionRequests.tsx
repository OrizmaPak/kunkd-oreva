import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { IoFilterOutline } from "react-icons/io5";
import notfound from "@/assets/notfound.png";
import placeholder from "@/assets/avatar-placeholder.png"; // use a default avatar
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ConnectionRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "denied">("pending");
  const [search, setSearch] = useState("");
  const [sortClass, setSortClass] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [showModal, setShowModal] = useState<null | "accept" | "deny">(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const requests = Array.from({ length: 10 }, (_, i) => ({
    name: "Jaydon Korsgaard",
    class: "Primary 1",
    email: "mamoca9539@fryshare.com",
    parent: "Anita Korsgaard",
    dateRejected: "Apr 12, 2023",
    avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  }));

  const filtered = sortClass
    ? requests.filter((r) => r.class === sortClass)
    : requests;

  const totalPages = Math.ceil(filtered.length / pageSize);

  const pagedRequests = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderTable = () => {
    if (pagedRequests.length === 0) {
      return (
        <div className="text-center py-20">
          <img src={notfound} alt="No Requests" className="mx-auto w-40 mb-4" />
          <h3 className="font-semibold text-lg text-gray-800">No connection requests</h3>
          <p className="text-sm text-gray-500">Connection requests would appear here.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-[#F9FAFB] text-left">
              <th className="px-4 py-3">Student's Name</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Parent's Email</th>
              <th className="px-4 py-3">Parent's Name</th>
              {activeTab === "denied" && <th className="px-4 py-3">Date Rejected</th>}
              {activeTab === "pending" && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {pagedRequests.map((req, i) => (
              <tr key={i} className="border-t border-gray-200">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img src={req.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
                  <span>{req.name}</span>
                </td>
                <td className="px-4 py-3">{req.class}</td>
                <td className="px-4 py-3">{req.email}</td>
                <td className="px-4 py-3">{req.parent}</td>
                {activeTab === "denied" && <td className="px-4 py-3">{req.dateRejected}</td>}
                {activeTab === "pending" && (
                  <td className="px-4 py-3 text-right space-x-4">
                    <button
                      className="text-grey-500 hover:underline cursor-pointer font-semibold "
                      onClick={() => setShowModal("deny")}
                    >
                      Deny
                    </button>
                    <button
                      className="text-green-500 hover:underline cursor-pointer font-semibold"
                      onClick={() => setShowModal("accept")}
                    >
                      Accept
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    );
  };

  // 1. Modal Component
  const ConfirmationModal = ({
    type,
    onConfirm,
    onCancel,
  }: {
    type: "accept" | "deny";
    onConfirm: () => void;
    onCancel: () => void;
  }) => {
    const isAccept = type === "accept";
    return (
      <div className="fixed -top-6 inset-0 bg-black bg-opacity-20 flex items-center h-screen justify-center z-50">
        <div className="bg-white rounded-3xl w-full max-w-[400px] text-center shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#A7CD3A] py-3 px-3">
            <h3 className="text-base font-semibold text-white text-left">
              {isAccept ? "Accept Request" : "Deny Request"}
            </h3>
          </div>

          {/* Message */}
          <div className="p-5 space-y-6">
            <p className="text-sm text-gray-700">
              Are you sure you want to {isAccept ? "accept" : "deny"} this connection request?
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 font-semibold">
              <button
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 bg-white"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-full text-white ${
                  isAccept ? "bg-[#A7CD3A]" : "bg-[#A7CD3A]"
                }`}
                onClick={onConfirm}
              >
                {isAccept ? "Yes, accept request" : "Yes, deny request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Requests <span className="ml-2 bg-[#CDE6B5] text-xs text-[#4B6B10] px-2 py-1 rounded-full">{requests.length}</span></h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl">
        {/* Tabs + Search */}
        <div className="flex flex-wrap justify-between items-center px-4 py-3 border-b border-gray-200 gap-3">
          <div className="flex space-x-0">
            <button
              onClick={() => {
                setActiveTab("pending");
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-md text-sm rounded-r-none font-medium ${activeTab === "pending" ? "bg-[#A7CD3A] text-white" : "text-gray-600 bg-gray-100"}`}
            >
              Pending
            </button>
            <button
              onClick={() => {
                setActiveTab("denied");
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-md text-sm rounded-l-none font-medium ${activeTab === "denied" ? "bg-[#A7CD3A] text-white" : "text-gray-600 bg-gray-100"}`}
            >
              Denied
            </button>
          </div>

          <div className="flex items-center gap-3">
            <SearchBar value="" placeholder="Search here…" onChange={setSearch} />
            <div className="relative">
              <button
                className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white"
                onClick={() => setSortOpen((s) => !s)}
              >
                Sort by
                <IoFilterOutline className="ml-1" />
              </button>

              {sortOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                  {["Primary 1", "Primary 2", "Class 1", "Class 2"].map((cls) => (
                    <li
                      key={cls}
                      onClick={() => {
                        setSortClass(cls);
                        setSortOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                    >
                      {cls}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {sortClass && (
              <span className="text-gray-600 text-sm italic ml-2">
                Filtering class: {sortClass}
              </span>
            )}
          </div>
        </div>

        {/* Table section */}
        <div className="px-4 py-3">
          {renderTable()}
        </div>
      </div>

      {showModal && (
        <ConfirmationModal
          type={showModal}
          onConfirm={() => {
            console.log(`${showModal} request confirmed`);
            setShowModal(null);
          }}
          onCancel={() => setShowModal(null)}
        />
      )}
    </div>
  );
};

export default ConnectionRequests;
