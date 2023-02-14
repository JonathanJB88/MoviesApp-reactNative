import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Navigation } from './src/navigation/Navigation';
import { FadeScreen } from './src/screens/FadeScreen';
import { GradientProvider } from './src/context/GradientContext';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <GradientProvider>{children}</GradientProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
        {/* <FadeScreen /> */}
      </AppState>
    </NavigationContainer>
  );
};

export default App;
