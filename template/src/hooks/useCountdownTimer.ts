import { ONE_SECOND } from '@/core/constants';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  duration: number;
  autoStart?: boolean;
  onTimeout?: () => void;
}

const getTimeEnd = (duration: number) => Date.now() + duration;

const useCountdownTimer = ({ duration, autoStart = true, onTimeout }: Options) => {
  const timer = useRef<NodeJS.Timer | null>(null);
  const endTime = useRef(getTimeEnd(duration));
  const [currentTime, setCurrentTime] = useState(duration);

  const stop = useCallback(
    (replayCallback?: () => void) => {
      const isReplay = !!replayCallback;
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
      if (isReplay) endTime.current = getTimeEnd(duration);
      setCurrentTime(isReplay ? duration : 0);
      replayCallback?.();
    },
    [duration],
  );

  const play = useCallback(() => {
    if (timer.current) return;
    if (!autoStart) endTime.current = getTimeEnd(duration);
    timer.current = setInterval(() => {
      const current = Date.now() - ONE_SECOND;
      if (current >= endTime.current) {
        onTimeout?.();
        stop();
        return;
      }
      setCurrentTime(endTime.current - current);
    }, ONE_SECOND);
  }, [autoStart, duration, onTimeout, stop]);

  const replay = useCallback(() => stop(play), [stop, play]);

  useEffect(() => {
    if (autoStart) play();
    return () => stop();
  }, [autoStart, play, stop]);

  return { currentTime, play, replay, stop };
};

export default useCountdownTimer;
