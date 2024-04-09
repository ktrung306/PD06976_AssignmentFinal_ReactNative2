import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Background from './Background';
import Button from './Button';
import { darkGreen, green } from '../../constants/color';

const SplashScreen = ({navigation}) => {

  return (
    <Background>
      <View style={styles.container}>
      <Text style={styles.tilte}>Let's start</Text>
      <Text style={styles.text}>Coding</Text>
      <Button bgColor={green} textColor='white' btnLabel="Login" Press={() => navigation.navigate("LoginScreen")} />
      <Button bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => navigation.navigate("RegisterScreen")} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
   marginHorizontal: 40, 
   marginVertical: 100
  },

  tilte: { 
    color: 'white',
    fontSize: 64 
  },

  text: { 
    color: 'white', 
    fontSize: 64, 
    marginBottom: 40 
  }
})
export default SplashScreen;
