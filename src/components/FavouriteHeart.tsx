import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useToggleFavouriteContent } from "@/api/queries";

type Props = {
  bookId: number;
  isFavorite?: boolean;
  className?: string;
  size?: number;
  contentType?: string; // default "book"
};

const FavouriteHeart: React.FC<Props> = ({
  bookId,
  isFavorite = false,
  className = "",
  size = 19,
  contentType = "book",
}) => {
  const { mutate, isLoading } = useToggleFavouriteContent();

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isLoading) {
      mutate({ id: bookId, isFavorite, contentType });
    }
  };

  return (
    <button
      onClick={onClick}
      aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
      title={isFavorite ? "Remove from favourites" : "Add to favourites"}
      className={`group inline-flex items-center justify-center rounded-full bg-white/50 hover:bg-white p-1 shadow-sm transition ${className}`}
    >
      {isFavorite ? (
          <AiFillHeart size={size} className="text-rose-500 transition-transform group-active:scale-95" />
        ) : (
            <AiOutlineHeart size={size} className="text-rose-500 transition-transform group-active:scale-95" />
      )}
    </button>
  );
};

export default FavouriteHeart;
