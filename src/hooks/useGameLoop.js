import { useEffect, useRef } from 'react';

export const useGameLoop = (callback) => {
  const requestRef = useRef();

  const animate = (time) => {
    callback(time);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};
