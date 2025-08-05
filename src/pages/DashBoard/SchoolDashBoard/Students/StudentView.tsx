// -------------------------------
// src/pages/StudentView.tsx
// -------------------------------
import React from "react";
import { useParams } from "react-router-dom";
import ProgressGraph from "@/components/ProgressGraph";
import StatCard from "@/components/StatCard";

const StudentView: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // “id” comes from :id in the route

  // fetch student by id or use dummy data
  const student = {
    name: "Joy Giver",
    email: "babameg194@yahoo.com",
    avatarUrl: "", // placeholder
    class: "Primary 1",
  };
  const teacher = {
    name: "Esther Balogun",
    email: "marayolowo@yahoo.com",
    avatarUrl: "",
  };

  return (
    <div className="p-0 space-y-6 bg-transparent min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <span className="cursor-pointer hover:underline">Student</span> &gt; <span className="font-medium text-gray-900">View</span>
      </nav>

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900">Student info</h1>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div>
              <p className="text-lg font-semibold text-gray-800">{student.name}</p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
          </div>
          <div className="border-l pl-6">
            <p className="text-sm text-gray-500">Class</p>
            <p className="text-lg font-semibold text-gray-800">{student.class}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Time spent</p>
            <p className="text-2xl font-bold text-gray-900">100:45 Minutes</p>
          </div>
          <div className="border-l pl-6">
            <p className="text-sm text-gray-500">Teacher</p>
            <p className="text-lg font-semibold text-gray-800">{teacher.name}</p>
            <p className="text-sm text-gray-500">{teacher.email}</p>
          </div>
        </div>
      </div>

      {/* Progress report */}
      <h2 className="text-xl font-semibold text-gray-900">Progress report</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressGraph />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <StatCard label="Stories" value="200/300" onView={() => {}} />
          <StatCard label="Languages" value="120/300" onView={() => {}} />
          <StatCard label="Literacy" value="100/300" onView={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default StudentView;
