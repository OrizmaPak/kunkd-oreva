import { useNavigate } from "react-router-dom";

export type CardProps = {
  image?: string;
  title?: string;
  size?: number;
  id?: string;
  clickable?: boolean;
};

const Card = ({ title, image, size, id, clickable }: CardProps) => {
  const navigate = useNavigate();
  const goto = () => {
    if (!clickable) return;
    navigate(`../stories1/${id}`, { state: { image, title, size } });
  };
  return (
    <div
      onClick={goto}
      className="w-[200px]"
      style={{ width: `${size ? size : ""}px` }}
    >
      <span>
        <img
          src={image}
          alt="image"
          style={{ width: `${size ? size : "350px"}px` }}
        />
      </span>
      {title ? (
        <p className="mt-[10px] font-bold font-Hanken">{title}</p>
      ) : null}
    </div>
  );
};

export default Card;
