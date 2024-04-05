import { useNavigate, useParams } from "react-router-dom";
import AfamBlur from "@/assets/afamblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export type CardProps = {
  image?: string;
  title?: string;
  size?: number;
  id?: string;
  clickable?: boolean;
  thumbnail?: string;
};

const Card = ({ title, image, size, id, clickable, thumbnail }: CardProps) => {
  const navigate = useNavigate();
  const { lan_type, id: storyType } = useParams();
  const goto = () => {
    if (!clickable) return;
    navigate(`../${lan_type || storyType}/${id}`, {
      state: { image, title, size },
    });
  };
  return (
    <div
      onClick={goto}
      className="w-[200px] z-[1]"
      style={{ width: `${size ? size : ""}px` }}
    >
      <span>
        <LazyLoadImage
          src={thumbnail ? thumbnail : image}
          placeholderSrc={AfamBlur}
          effect="blur"
          wrapperClassName=""
          width={200}
          height={200}
        />
      </span>
      {title ? (
        <p className="mt-[10px] text-[20px] font-Hanken font-semibold ">
          {title}
        </p>
      ) : null}
    </div>
  );
};

export default Card;
