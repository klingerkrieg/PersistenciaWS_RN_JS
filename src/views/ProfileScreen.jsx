import React from 'react';
import {Text,View} from 'react-native';
import {  useRoute } from '@react-navigation/native';
import { styles } from './Estilo';


export default function ProfileScreen() {

  const route = useRoute();
  const {name} = route.params;

  return <View>
           
            <Text style={styles.texto}>{name}</Text>
           
          </View>
}
