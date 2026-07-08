import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export function NotFound() {
  const imagesRef = useRef(null);

  useEffect(() => {
    const container = imagesRef.current;
    if (!container) return;

    const images = container.children;
    const tl = gsap.timeline({ repeat: -1 });
    for (let i = 0; i < images.length; i++) {
      tl.set(images, { opacity: 0 })
        .set(images[i], { opacity: 1 })
        .to({}, { duration: 0.18 });
    }

    return () => tl.kill();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-2">
      
      {}
      <img 
        src="/messias.svg" 
        alt="Logo MESsias" 
        className="w-[160px] h-auto opacity-90 mb-2" 
      />

      {}
      <h1 
        className="text-[10rem] md:text-[16rem] lg:text-[20rem] font-black text-messias-red leading-none select-none"
        style={{ 
          textShadow: '0 4px 30px rgba(190, 18, 60, 0.15)',
          letterSpacing: '-0.04em'
        }}
      >
        404
      </h1>

      {}
      <div 
        className="relative w-[80px] h-[80px] mt-2" 
        ref={imagesRef}
      >
        <img src="/1.png" alt="frame 1" className="absolute inset-0 w-full h-full object-contain opacity-100" />
        <img src="/2.png" alt="frame 2" className="absolute inset-0 w-full h-full object-contain opacity-0" />
        <img src="/3.png" alt="frame 3" className="absolute inset-0 w-full h-full object-contain opacity-0" />
        <img src="/4.png" alt="frame 4" className="absolute inset-0 w-full h-full object-contain opacity-0" />
      </div>

      {}
      <Link 
        to="/" 
        className="mt-4 text-sm text-gray-400 hover:text-messias-red transition-colors duration-300"
      >
        voltar para home
      </Link>
    </div>
  );
}
