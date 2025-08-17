// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/ContentLibraryHeader.tsx
import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import TeacherIllustration from "@/assets/Teacher's_Library_.png";

interface Tab {
  label: string;
  icon: string;
  id: number | null;
}

interface Props {
  activeIndex: number;
  tabsConfig: Tab[];
  state: string;
  onTabSelect: (idx: number) => void;
}

const ContentLibraryHeader: React.FC<Props> = ({
  activeIndex,
  tabsConfig,
  state,
  onTabSelect,
}) => {
  return (
    <div>
      {/* Banner */}
      {tabsConfig[activeIndex]?.label === "For you" && state !== "fav" && (
        <div className="relative h-auto sm:h-[220px] z-10 rounded-3xl bg-[#BCD678] px-4 py-6 sm:px-8 sm:py-10 overflow-visible mt-10">
          <div className="flex flex-col justify-center h-full">
            <h1 className="font-Inter font-[600] text-[36px] leading-[120%] mb-[14px] tracking-[-0.02em] text-gray-900">
              Content Library
            </h1>
            <p className="mt-1 font-Inter font-[500] text-[16px] leading-[145%] tracking-[0%] text-gray-700">
              Content Library
            </p>
          </div>
          <img
            src={TeacherIllustration}
            alt="Illustration"
            className="absolute bottom-[-20px] sm:bottom-[-38px] right-4 sm:right-6 w-20 sm:w-auto select-none pointer-events-none"
          />
        </div>
      )}

      {/* Tabs */}
      <LayoutGroup>
        <div className="sticky top-[-22px] flex gap-3 mb-6 flex-wrap mt-[52px] z-10">
          {tabsConfig.map((tab, idx) => (
            (state !== "fav" || tab.label !== "For you") && (
              <motion.button
                key={tab.label}
                layout
                onClick={() => onTabSelect(idx)}
                animate={{
                  backgroundColor:
                    idx === activeIndex ? "#BCD678" : "#FFF",
                  color: idx === activeIndex ? "#1F2937" : "#4B5563",
                  boxShadow:
                    idx === activeIndex
                      ? "0 10px 20px rgba(188,214,120,0.3)"
                      : "0 2px 4px rgba(0,0,0,0.05)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-[7px] p-[12px] w-fit h-[48px] rounded-[8px] border border-gray-200 text-sm font-medium outline-none"
              >
                {idx === activeIndex && (
                  <motion.div
                    layoutId="tabHighlight"
                    className="absolute inset-0 rounded-[8px] bg-[#BCD678] z-0"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  <img src={tab.icon} alt="Tab Icon" />
                </span>
                <span className="relative z-10 font-Inter font-[100] text-[16px] leading-[120%] tracking-[-0.02em] align-middle">
                  {tab.label}
                </span>
              </motion.button>
            )
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
};

export default ContentLibraryHeader;
