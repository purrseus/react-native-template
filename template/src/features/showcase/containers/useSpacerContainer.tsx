import { useState } from 'react';

const useSpacerContainer = () => {
  const [status, setStatus] = useState<'safeArea' | 'halfSafeArea' | null>(null);

  const showSafeAreaSpacer = () => setStatus('safeArea');

  const showHalfSafeAreaSpacer = () => setStatus('halfSafeArea');

  return {
    status,
    showSafeAreaSpacer,
    showHalfSafeAreaSpacer,
  };
};

export default useSpacerContainer;
