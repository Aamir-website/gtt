import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.set(containerRef.current, { opacity: 1 })
      .fromTo(textRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
      )
      .fromTo(buttonRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const handleEnter = () => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    tl.to([textRef.current, buttonRef.current],
      {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in'
      }
    )
    .to(containerRef.current,
      {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      },
      '-=0.2'
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black opacity-0"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="relative flex flex-col items-center justify-center text-center px-6 w-full max-w-2xl">
        <div
          ref={textRef}
          className="opacity-0 w-full mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bosenAlt text-white tracking-wide">
            READY TO EXPLORE?
          </h1>
        </div>

        <button
          ref={buttonRef}
          onClick={handleEnter}
          className="opacity-0 relative group"
        >
          <div
            className="relative flex items-center justify-center px-12 py-4 bg-white/20 backdrop-blur-sm rounded-full
                       transition-all duration-300
                       group-hover:bg-white/30 group-hover:scale-105
                       border-2 border-white/30 group-hover:border-white/50"
          >
            <span className="text-white font-bosenAlt text-xl md:text-2xl tracking-wider">
              ENTER
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
