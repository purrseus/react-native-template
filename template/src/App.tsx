import RootNavigator from '@navigators';
import AppProvider from '@providers';

const App = () => (
  <AppProvider>
    <RootNavigator />
  </AppProvider>
);

export default App;
