import { OverlayLoading, StatusBar } from '@components/core';
import { globalStyles } from '@themes';
import { overlayLoadingRef } from '@utilities';
import { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const LayoutProvider = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={globalStyles.flexFill}>
        <StatusBar />
        {children}
        <OverlayLoading ref={overlayLoadingRef} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default LayoutProvider;
