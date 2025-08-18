// src/components/AvatarName.tsx
import React from "react";

interface AvatarNameProps {
  name: string;
  avatarUrl: string;
  teacher?: boolean;
}

const AvatarName: React.FC<AvatarNameProps> = ({ name, avatarUrl, teacher=false }) => {
  return (
    <div className="flex items-center gap-3">
      {!teacher && <img
        src={avatarUrl}
        alt={name}
        className="w-8 h-8 rounded-full object-cover border border-gray-200"
      />}
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
};

export default AvatarName;
