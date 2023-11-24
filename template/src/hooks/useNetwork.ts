import { useEffect, useState } from 'react';
import { onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { NoInternet } from '@/layouts';

const useNetwork = () => {
  const [noInternet, setNoInternet] = useState(false);

  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
        setNoInternet(!state.isConnected);
      });
    });
  }, []);

  const onlineScreen = <T>(Screen: T) => (noInternet ? NoInternet : Screen);

  return onlineScreen;
};

export default useNetwork;
