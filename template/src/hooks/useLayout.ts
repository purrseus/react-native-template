import { useCallback, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

interface Options {
  flexibleLayout?: boolean;
}

const useLayout = ({ flexibleLayout = false }: Options) => {
  const [layout, setLayout] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });
  const hasLayoutValues = Object.values(layout).some(Boolean);

  const handleLayout = useCallback(
    ({ nativeEvent: { layout: layoutRectangle } }: LayoutChangeEvent) => {
      if (hasLayoutValues && !flexibleLayout) return;
      setLayout(layoutRectangle);
    },
    [hasLayoutValues, flexibleLayout],
  );

  return { layout, handleLayout };
};

export default useLayout;
