import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Picker from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Usuario() {
  // button
  const navigation = useNavigation();

  const [nome, setNome] = useState("");

  // ler um dado
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem("nome")

      if (value !== null) {
        setNome(value)
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  // limpar
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }

  // pega dados do store local
  useEffect(() => {
    readData()
  }, []);

  return (
    <>
      <Header title="Dados do Usuario" />
      <View style={styles.container}>
        <Text style={styles.texto}>{nome}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
    texto:{
      fontSize:40,
      fontWeight: 'bold',
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
    },
    button:{
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: '#0000ff',
      padding: 10,
    },
});


export default Usuario;
