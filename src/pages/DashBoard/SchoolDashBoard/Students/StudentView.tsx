// -------------------------------
// src/pages/StudentView.tsx
// -------------------------------
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressGraph from "@/components/ProgressGraph";
import StatCard from "@/components/StatCard";
import ContentTable from "@/components/ContentTable";
import child from "@/assets/child.png";
import storyy from "@/assets/storyy.png";
import langg from "@/assets/langg.png";
import Teacers from "@/assets/Teachers.png";

const StudentView: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // “id” comes from :id in the route
  const navigate = useNavigate();

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
    <div className="space-y-8 pb-8 px-4 bg-transparent min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <span className="cursor-pointer hover:underline">Student</span> &gt; <span className="font-medium text-gray-900">View</span>
      </nav>

      <h1 className="text-xl font-semibold relative -top-4 text-gray-900">
          Student info
        </h1>

      {/* Info cards */}
      <div className="grid md:grid-cols-2 gap-6 relative -top-4">
        <div className="bg-white border border-gray-200 rounded-3xl px-8 py-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={child} alt="Student Avatar" className="w-20 rounded-full object-cover" />
            <div>
                <p className="font-inter font-semibold text-gray-800 text-2xl leading-tight tracking-tight">{student.name}</p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
          </div>
          <div className="border-l pl-6">
            <p className="text-sm text-gray-500">Class</p>
            <p className="text-lg font-semibold text-gray-800">{student.class}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl px-8 py-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Time spent</p>
             <p className="text-2xl font-bold text-gray-900">100:45 <span className="text-gray-500 text-sm font-medium">Minutes</span></p>
          </div>
          <div className="border-l pl-6 flex flex-col ">
            <p className="text-sm text-gray-500 relative top-1">Teacher</p>
            <p className="text-ms font-semibold text-gray-800">{teacher.name}</p>
            <p className="text-sm text-gray-500 relative -top-1">{teacher.email}</p>
          </div>
        </div>
      </div>

      {/* Progress report */}
      <h2 className="text-xl font-semibold text-gray-900 mt-10">Progress report</h2>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressGraph />
        </div>
        <div className="flex flex-col gap-4">
          <StatCard icon={storyy} label="Stories" value="200/300" onView={() => navigate(`/schooldashboard/students/${id}/stories-report`)} />
          <StatCard icon={langg} label="Languages" value="120/300" onView={() => {}} />
          <StatCard icon={Teacers} label="Literacy" value="100/300" onView={() => {}} />
        </div>
      </div>

      {/* NEW: content table */}
      <ContentTable />
    </div>
  );
};

export default StudentView;
