'use client';

import { useState, useEffect } from 'react';

interface CompetitorImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CompetitorImage = ({ src, alt, className }: CompetitorImageProps) => {
  // Usamos el SVG como fallback, que es más fiable
  const fallbackSrc = '/shield-default.svg';

  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleImageError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img 
      key={imgSrc} // Mantenemos la key para forzar el re-renderizado
      src={imgSrc || fallbackSrc}
      width={35}
      height={35}
      className={`${className} pixelated-image`}
      onError={handleImageError}
    />
  );
};
