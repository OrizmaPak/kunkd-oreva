export type CardProps = {
  image?: string;
  title?: string;
  size?: number;
};

const Card = ({ title, image, size }: CardProps) => {
  return (
    <div className={`${size ? `w-[${size}px]` : "w-[200px]"}`}>
      <span>
        <img
          src={image}
          alt="image"
          className={`${size ? `w-[${size}px]` : "w-[400px]"}`}
        />
      </span>
      {title ? (
        <p className="mt-[10px] font-bold font-Hanken">{title}</p>
      ) : null}
    </div>
  );
};

export default Card;
