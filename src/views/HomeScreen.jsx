import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text,View,Button} from 'react-native';

export default function HomeScreen() {

  const navigation = useNavigation();

  const proximaTela = () => {
    navigation.navigate('Profile', { name: 'Pedro' });
  }
  return <View>
          <Text>Home</Text>
          <Button onPress={() => proximaTela() } title="Proxima"></Button>
        </View>
}

