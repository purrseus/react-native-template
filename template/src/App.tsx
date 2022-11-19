import RootNavigator from '@navigation';
import AppProvider from '@providers';

const App = () => (
  <AppProvider>
    <RootNavigator />
  </AppProvider>
);

export default App;
