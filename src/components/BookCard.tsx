 import React, { useState, useEffect, useRef } from "react";
import FrameImg from "@/assets/bookframe.png";

export interface Book { 
  id: number | string;
  title: string;
  coverUrl: string;
  progress: number; // 0–100
}

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const [progressWidth, setProgressWidth] = useState(0); 
  const progressRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setProgressWidth(book.progress);
          if (observerRef.current) {
            observerRef.current.disconnect(); // Remove the observer once the progress is set
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Adjust threshold as needed
    });

    if (progressRef.current) {
      observerRef.current.observe(progressRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [book.progress]);

  return (
    <div title={book.title} className="relative flex-shrink-0 w-fit transition-transform duration-300 active:scale-95 mt-4 cursor-pointer">
      {/* Frame PNG */}
       <img src={FrameImg} alt="frame" className="block w-[134px] h-[152px]" />

      {/* Cover sits behind bumping into the frame’s transparent window */}
       <img
        src={book.coverUrl}
        alt={book.title}
        className="absolute top-[4.5%] left-[4.85%] w-[120px] h-[120px] object-cover transition-transform duration-1000 hover:scale-105"
      />

      {/* Progress bar aligned with the width of the book cover */}
      {progressWidth > 0 && (
        <div
          ref={progressRef}
          className="absolute bottom-[-10px] left-[0%] w-[100%] h-[6px] bg-green-200 rounded-full group"
        >
          <div
            className="h-full bg-[#BCD678] rounded-full transition-width duration-20000"
            style={{ width: `${progressWidth}%` }}
          />
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {`${progressWidth}%`}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
