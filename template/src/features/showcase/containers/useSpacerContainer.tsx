import { useState } from 'react';

const useSpacerContainer = () => {
  const WIDTH = 40;
  const HEIGHT = 100;

  const [status, setStatus] = useState<
    'spacerWidth' | 'spacerHeight' | 'bottomTab' | 'safeArea' | 'halfSafeArea' | null
  >(null);

  const showWidthSpacer = () => setStatus('spacerWidth');

  const showHeightSpacer = () => setStatus('spacerHeight');

  const showBottomTabSpacer = () => setStatus('bottomTab');

  const showSafeAreaSpacer = () => setStatus('safeArea');

  const showHalfSafeAreaSpacer = () => setStatus('halfSafeArea');

  return {
    WIDTH,
    HEIGHT,
    status,
    showWidthSpacer,
    showHeightSpacer,
    showBottomTabSpacer,
    showSafeAreaSpacer,
    showHalfSafeAreaSpacer,
  };
};

export default useSpacerContainer;
