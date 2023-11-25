import RootNavigator, { navigationRef } from '@/navigators';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OverlayLoading } from './components/core';
import { buildProvidersTree, overlayLoadingRef } from './utils';

const queryClient = new QueryClient();

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
