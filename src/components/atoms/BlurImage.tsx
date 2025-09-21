import React, { useState, useMemo } from "react";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Optional solid colour or gradient to show behind the blur */
  fallbackColor?: string;
}

const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgZmlsbD0nI0VGRUY5OCcvPjwvc3ZnPg==";

const BlurImage: React.FC<BlurImageProps> = ({
  src,
  alt,
  className = "",
  fallbackColor,
  onLoad,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);

  const placeholder = useMemo(() => {
    if (fallbackColor) {
      return `data:image/svg+xml;base64,${btoa(
        `<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><rect width='10' height='10' fill='${fallbackColor}' /></svg>`
      )}`;
    }
    return DEFAULT_PLACEHOLDER;
  }, [fallbackColor]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={placeholder}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        {...rest}
        src={src}
        alt={alt}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        className={`relative h-full w-full object-cover transition-filter duration-700 ease-out ${
          loaded ? "blur-0" : "blur-sm"
        } ${rest.draggable === false ? "select-none" : ""}`}
        loading={rest.loading ?? "lazy"}
      />
    </div>
  );
};

export default BlurImage;
