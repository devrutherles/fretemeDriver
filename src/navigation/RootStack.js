import * as React from 'react';

import { Button } from 'native-base';
import Detalhes from '../screens/Detalhes/index';
// drawer stack
import DrawerStack from './DrawerStack';
import Iniciados from '../screens/Iniciados';
// screens
import ModalHelp from '../screens/ModalHelp';
import ModalQRCode from '../screens/ModalQRCode';
import ModalTutorialBike from '../screens/ModalTutorialBike';
import { NavigationContainer } from '@react-navigation/native';
import Servicos from '../screens/Servicos/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        presentation: 'fullScreenModal'
      }}
    >
      <Stack.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ModalHelp"
        component={ModalHelp}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Iniciados"
        component={Iniciados}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ModalQRCode"
        component={ModalQRCode}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Detalhes"
        component={Detalhes}
        options={{
          headerShown: true
        }}
      />

      <Stack.Screen
        name="Servicos"
        component={Servicos}
        options={{
          headerShown: true
        }}
      />

      <Stack.Screen
        name="ModalTutorialBike"
        component={ModalTutorialBike}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
