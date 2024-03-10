import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../views/HomeScreen';
import CadastroScreen from '../views/CadastroScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Cadastro" component={CadastroScreen} />
    </HomeStack.Navigator>
  );
};
export default HomeStackNavigator;

