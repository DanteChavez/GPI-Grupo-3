'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PlayerImageProps {
  src: string;
  alt: string;
  fallbackNode: React.ReactNode;
  className?: string;
  sizes?: string;
}

export default function PlayerImage({ src, alt, fallbackNode, className, sizes }: PlayerImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return <>{fallbackNode}</>;
  }

  return (
    <Image 
      src={src} 
      alt={alt} 
      fill 
      className={className || "object-cover"} 
      sizes={sizes} 
      onError={() => setError(true)} 
    />
  );
}
