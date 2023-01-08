import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { Box, NativeBaseProvider } from 'native-base';

import DrawerStack from './src/navigation/DrawerStack';
import RootStack from './src/navigation/RootStack';
import { StatusBar } from 'react-native';
// root stack navigation
import { func } from './src/constants';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function prepare() {
      try {
        // keeps the splash screen visible while assets are cached
        await SplashScreen.preventAutoHideAsync();

        // pre-load/cache assets: images, fonts, and videos
        await func.loadAssetsAsync();
      } catch (e) {
        // console.warn(e);
      } finally {
        // loading is complete
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  React.useEffect(() => {
    // when loading is complete
    if (isLoading === false) {
      // hide splash function
      const hideSplash = async () => SplashScreen.hideAsync();

      // hide splash screen to show app
      hideSplash();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <React.Fragment>
      <NativeBaseProvider>
        <StatusBar barStyle="dark-content" />
        <DrawerStack />
      </NativeBaseProvider>
    </React.Fragment>
  );
};

export default App;
