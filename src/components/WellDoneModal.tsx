// src/components/WellDoneModal.tsx
import React from "react";
import doll from "@/assets/doll.png";

type WellDoneVariant = 'read' | 'watch' | 'listen';

interface WellDoneModalProps {
  message?: string;
  variant?: WellDoneVariant;
  onTakeQuiz?: () => void;
  onLater?: () => void;
  onRetake?: () => void;
  onReplay?: () => void;
  onGoBack?: () => void;
  className?: string;
}

const WellDoneModal: React.FC<WellDoneModalProps> = ({
  message,
  variant,
  onTakeQuiz,
  onLater,
  onRetake,
  onReplay,
  onGoBack,
  className,
}) => {
  const urlParams = new URLSearchParams(window.location.search);
  const fallbackVariant: WellDoneVariant = urlParams.has('watch') ? 'watch' : 'read';
  const resolvedVariant: WellDoneVariant = variant ?? fallbackVariant;
  const bodyMessage = message ?? "You’ve finished this book.";

  const handleTakeQuiz = () => onTakeQuiz?.();
  const handleLater = () => onLater?.();
  const handleRetake = () => onRetake?.();
  const handleReplay = () => (onReplay ?? onLater)?.();
  const handleGoBack = () => (onGoBack ?? onLater)?.();

  const replayLabel = resolvedVariant === 'listen' ? 'Listen again' : 'Go watch again';
  const goBackLabel = 'Go back';

  return (
    <div className="fixed z-[10000] inset-0 bg-black/40 flex items-center justify-center z-50" data-modal-class={className}>
            <input type="hidden" name="" value={bodyMessage} />
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
            fontWeight: 400,
            fontStyle: 'Regular',
            fontSize: '14px',
            lineHeight: '22px',
            letterSpacing: '0%',
            textAlign: 'center'
          }}
        >
          {bodyMessage}
        </p>

        {resolvedVariant === 'listen' && (
          <>
            <button
              onClick={handleReplay}
              className="block bg-[#9FC43E] text-white font-bold w-[300px] mb-[10px] h-[54px] gap-[10px] transform rotate-0 opacity-100 mx-auto rounded-[30px] p-[10px]"
            >
              {replayLabel}
            </button>
            <button
              onClick={handleGoBack}
              style={{
                fontWeight: 400,
                fontStyle: 'Regular',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#7E7E89'
              }}
            >
              {goBackLabel}
            </button>
          </>
        )}

        {resolvedVariant === 'watch' && (
          <>
            {onTakeQuiz && (
              <button
                onClick={handleTakeQuiz}
                className="block bg-[#9FC43E] text-white font-bold w-[300px] mb-[10px] h-[54px] gap-[10px] transform rotate-0 opacity-100 mx-auto rounded-[30px] p-[10px]"
              >
                Take quiz
              </button>
            )}
            <button
              onClick={handleReplay}
              className="block bg-[#9FC43E] text-white font-bold w-[300px] mb-[10px] h-[54px] gap-[10px] transform rotate-0 opacity-100 mx-auto rounded-[30px] p-[10px]"
            >
              {replayLabel}
            </button>
            <button
              onClick={handleGoBack}
              style={{
                fontWeight: 400,
                fontStyle: 'Regular',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#7E7E89'
              }}
            >
              {goBackLabel}
            </button>
          </>
        )}

        {resolvedVariant === 'read' && (
          <>
            <button
              onClick={handleTakeQuiz}
              className="block bg-[#9FC43E] text-white font-bold w-[300px] mb-[10px] h-[54px] gap-[10px] transform rotate-0 opacity-100 mx-auto rounded-[30px] p-[10px]"
            >
              Take quiz
            </button>
            <button
              onClick={handleLater}
              style={{
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
            {onRetake && (
              <button
                onClick={handleRetake}
                style={{
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  color: '#7E7E89'
                }}
              >
                Retake
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WellDoneModal;
