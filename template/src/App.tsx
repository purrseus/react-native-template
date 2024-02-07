import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OverlayLoading } from './components/core';
import { StatusBar } from './layouts';
import { RootNavigator } from './navigators';
import { buildProvidersTree, navigationRef, overlayLoadingRef, queryClient } from './utils';

const AppProvider = buildProvidersTree([
  [QueryClientProvider, { client: queryClient }],
  [NavigationContainer, { ref: navigationRef }],
  [SafeAreaProvider],
  [ActionSheetProvider],
  [GestureHandlerRootView, { style: { flex: 1 } }],
] as const);

export default function App() {
  return (
    <AppProvider>
      <StatusBar />
      <OverlayLoading ref={overlayLoadingRef} />
      <RootNavigator />
    </AppProvider>
  );
}
