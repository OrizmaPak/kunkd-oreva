// src/components/AvatarName.tsx
import React from "react";

interface AvatarNameProps {
  name: string;
  avatarUrl: string;
  teacher?: boolean;
}

const AvatarName: React.FC<AvatarNameProps> = ({ name, avatarUrl, teacher = false }) => {
  const displayAvatar = avatarUrl || `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="100%" height="100%" fill="#ddd"/><text x="50%" y="50%" font-size="14" fill="#555" text-anchor="middle" alignment-baseline="central">${name.slice(0, 2).toUpperCase()}</text></svg>`)}`;

  return (
    <div className="flex items-center gap-3">
      {!teacher && <img
        src={displayAvatar}
        alt={name}
        className="w-8 h-8 rounded-full object-cover border border-gray-200"
      />}
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
};

export default AvatarName;
