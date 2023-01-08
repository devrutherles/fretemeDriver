import * as React from 'react';

import CustomDrawerContent from '../components/CustomDrawerContent';
import Detalhes from '../screens/Detalhes/index';
// screens
import Home from '../screens/Home/index';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../screens/Profile/index';
import Servicos from '../screens/Servicos/index';
import Wallet from '../screens/Wallet/index';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerStack = () => (
  <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Detalhes" component={Detalhes} />
      <Drawer.Screen name="Servicos" component={Servicos} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Wallet" component={Wallet} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default DrawerStack;
