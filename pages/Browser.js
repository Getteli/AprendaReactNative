import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Header from './Header';

// abre uma tela no browser por webView
function Browser() {
  // button
  const navigation = useNavigation();

  return (
    <>
      <Header title="Browser" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <WebView source={{ uri: "http://192.168.1.40:3030/estados" }} style={{flex: 1}}/>
      </View>
    </>
  );
}

export default Browser;
