// src/components/WellDoneModal.tsx
import React from "react";
import doll from "@/assets/doll.png";

interface WellDoneModalProps {
  message: string;  
  onTakeQuiz: () => void;
  onLater: () => void;
  onRetake: () => void;
}

const WellDoneModal: React.FC<WellDoneModalProps> = ({
  message,
  onTakeQuiz,
  onLater,
  onRetake,
}) => (
  <div className="fixed z-[10000] inset-0 bg-black/40 flex items-center justify-center z-50">
    <input type="hidden" name="" value={message} />
    <div className="bg-white rounded-2xl w-[450px] h-[380px] pt-8 pr-6 pb-8 pl-6 text-center" style={{ transform: 'rotate(0deg)', opacity: 1 }}>
      <img
        src={doll}
        alt="medal"
        className="mx-auto mb-4"
        style={{
          width: '120px',
          height: '120px',
          transform: 'rotate(0deg)',
          opacity: 1,
          borderRadius: '112.73px'
        }}
      />
      <h2 
        className="mb-4" 
        style={{
        //   fontFamily: 'Baloo Bhaijaan',
          fontWeight: 900,
          fontStyle: 'Regular',
          fontSize: '24px',
          lineHeight: '34px',
          letterSpacing: '0%',
          textAlign: 'center'
        }}
      >
        Well done!
      </h2>

      <p 
        className="text-gray-600 mb-6"
        style={{
        //   fontFamily: 'Arimo',
          fontWeight: 400,
          fontStyle: 'Regular',
          fontSize: '14px',
          lineHeight: '22px',
          letterSpacing: '0%',
          textAlign: 'center'
        }}
      >
        You’ve finished this book.
      </p>

      <button
        onClick={onTakeQuiz}
        className="block bg-[#9FC43E] text-white font-bold w-[300px] mb-[10px] h-[54px] gap-[10px] transform rotate-0 opacity-100 mx-auto rounded-[30px] p-[10px]"
      >
        Take quiz
      </button>
      <button
        onClick={onLater}
        style={{
        //   fontFamily: 'Hanken Grotesk',
          fontWeight: 400,
          fontStyle: 'Regular',
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '0%',
          textAlign: 'center',
          color: '#7E7E89'
        }}
      >
        Do it later
      </button>
    </div>
  </div>
);

export default WellDoneModal;
