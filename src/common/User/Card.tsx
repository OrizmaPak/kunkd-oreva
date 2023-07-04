import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@mantine/core";

export type CardProps = {
  image?: string;
  title?: string;
  size?: number;
  id?: string;
  clickable?: boolean;
};

const Card = ({ title, image, size, id, clickable }: CardProps) => {
  const navigate = useNavigate();
  const { lan_type, id: storyType } = useParams();
  const params = useParams();
  console.log(params);
  const goto = () => {
    if (!clickable) return;
    navigate(`../${lan_type || storyType}/${id}`, {
      state: { image, title, size },
    });
  };
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div
      onClick={goto}
      className="w-[200px] z-[1]"
      style={{ width: `${size ? size : ""}px` }}
    >
      <Skeleton visible={isLoading}>
        <span>
          <img
            src={image}
            alt="image"
            style={{ width: `${size ? size : "350px"}px` }}
            onLoad={() => setIsLoading(false)}
          />
        </span>
      </Skeleton>
      {title ? (
        <p className="mt-[10px] text-[20px] font-Hanken font-semibold ">
          {title}
        </p>
      ) : null}
    </div>
  );
};

export default Card;
