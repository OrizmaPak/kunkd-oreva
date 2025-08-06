import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { IoFilterOutline } from "react-icons/io5";
import placeholder from "@/assets/avatar-placeholder.png"; // use a default avatar
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ConnectionRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "denied">("pending");
  const [search, setSearch] = useState("");
  const [sortClass, setSortClass] = useState("");

  const requests = Array.from({ length: 10 }, (_, i) => ({
    name: "Jaydon Korsgaard",
    class: "Primary 1",
    email: "mamoca9539@fryshare.com",
    parent: "Anita Korsgaard",
    dateRejected: "Apr 12, 2023",
    avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  }));

  const renderTable = () => {
    if (requests.length === 0) {
      return (
        <div className="text-center py-20">
          <img src="/no-requests.png" alt="No Requests" className="mx-auto w-40 mb-4" />
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
            {requests.map((req, i) => (
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
                    <button className="text-black font-bold hover:underline">Deny</button>
                    <button className="text-green-500 font-bold  hover:underline">Accept</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <Pagination currentPage={1} totalPages={30} onPageChange={() => {}} />
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Requests <span className="ml-2 bg-[#CDE6B5] text-xs text-[#4B6B10] px-2 py-1 rounded-full">7</span></h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl">
        {/* Tabs + Search */}
        <div className="flex flex-wrap justify-between items-center px-4 py-3 border-b border-gray-200 gap-3">
          <div className="flex space-x-0">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-1.5 rounded-md text-sm rounded-r-none font-medium ${activeTab === "pending" ? "bg-[#A7CD3A] text-white" : "text-gray-600 bg-gray-100"}`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("denied")}
              className={`px-4 py-1.5 rounded-md text-sm rounded-l-none font-medium ${activeTab === "denied" ? "bg-[#A7CD3A] text-white" : "text-gray-600 bg-gray-100"}`}
            >
              Denied
            </button>
          </div>

          <div className="flex items-center gap-3">
            <SearchBar placeholder="Search here…" onChange={setSearch} />
            <div className="relative">
              <button className="border border-gray-300 rounded-md px-3 py-1.5 text-sm flex items-center gap-2">
                <IoFilterOutline />
                Sort by
              </button>
              {/* dropdown would be here */}
            </div>
          </div>
        </div>

        {/* Table section */}
        <div className="px-4 py-3">
          {renderTable()}
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequests;
