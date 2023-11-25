import { useState } from 'react';

const useSpacerContainer = () => {
  const [status, setStatus] = useState<'bottomTab' | 'safeArea' | 'halfSafeArea' | null>(null);

  const showBottomTabSpacer = () => setStatus('bottomTab');

  const showSafeAreaSpacer = () => setStatus('safeArea');

  const showHalfSafeAreaSpacer = () => setStatus('halfSafeArea');

  return {
    status,
    showBottomTabSpacer,
    showSafeAreaSpacer,
    showHalfSafeAreaSpacer,
  };
};

export default useSpacerContainer;
