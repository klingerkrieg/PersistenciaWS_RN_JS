import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import '../../config';

import HomeStackNavigator from './HomeStack';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;

