import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider, BottomNavigation, Text, Appbar, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
 
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/navigation';

const App = () => {
 


  return (
    
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;

 