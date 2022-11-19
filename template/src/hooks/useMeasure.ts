import { Measure } from '@core/interfaces';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

interface Options {
  flexiblePosition?: boolean;
}

const useMeasure = <T extends View>({ flexiblePosition = true }: Options) => {
  const ref = useRef<T | null>(null);
  const [measure, setMeasure] = useState<Measure>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });
  const hasMeasureValue = Object.values(measure).some(Boolean);

  useEffect(() => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      if (hasMeasureValue && !flexiblePosition) return;
      setMeasure({ x, y, width, height, pageX, pageY });
    });
  }, [hasMeasureValue, flexiblePosition]);

  return { measure, ref };
};

export default useMeasure;
