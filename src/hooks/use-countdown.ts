import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

const useCountdown = (totalSeconds: number): { countdown: number; restart: () => void } => {
  const [countdown, setCounter] = useState(totalSeconds);
  const interval = useRef<ReturnType<typeof setInterval>>();

  const stop = useCallback(() => {
    clearInterval(interval.current);
  }, []);

  useEffect(() => stop, [stop]);

  const restart = useCallback(() => {
    let i = totalSeconds;
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      if (i < 0) {
        clearInterval(interval.current);
        return;
      }
      setCounter(i--);
    }, 1000);
  }, [totalSeconds]);

  return { countdown, restart };
};

export default useCountdown;
