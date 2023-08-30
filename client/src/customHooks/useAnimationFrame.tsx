import { useRef, useEffect } from 'react';

const useAnimationFrame = (callback: (deltaTime: number) => void, animationState: boolean) => {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    if (animationState) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current !== null) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
    if (!animationState && requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  }, [animationState]);
};

export default useAnimationFrame;
