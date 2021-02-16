import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// telas para a pilha de navegacao
import Home from './pages/Home';
import Form from './pages/Form';
import Login from './pages/Login';
import Browser from './pages/Browser';
import Foto from './pages/Foto';
import Usuario from './pages/Usuario';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="home" component={Home} />
        <AppStack.Screen name="form" component={Form} />
        <AppStack.Screen name="login" component={Login} />
        <AppStack.Screen name="browser" component={Browser} />
        <AppStack.Screen name="foto" component={Foto} />
        <AppStack.Screen name="usuario" component={Usuario} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
