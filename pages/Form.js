import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Picker from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// importar imagem
import logo from './assets/cadastrar_img.png';

function Form() {
  const [ufs, setEstados ] = useState([]);

  // pega dados da API web
  useEffect(() => {
    axios.get('http://192.168.1.40:3030/estados').then(response => {
      setEstados(response.data.map(estado => ({
        label: estado.uf,
        key: estado.id,
        value: estado.id
      })));
    })
  }, []);
  // select - dados locais
  // const ufs = [
  //   {label: 'SP', value: '1', color: 'black'},
  //   {label: 'RJ', value: '2', color: 'black'},
  //   {label: 'MG', value: '3', color: 'black'},
  // ];
  const placeholderSelect = {label: 'Selecione seu estado', value: null, color: 'black'};
  // button
  const navigation = useNavigation();
  // mapear/ler os inputs
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState(0);
  const [estado, setEstado] = useState('');
  const [age, setAge] = useState('')


  function handleNameChange(name){ setNome(name); }
  function handleAgeChange(idade){ setIdade(parseInt(idade)); }
  function handleStateChange(state){ setEstado(state); }

  // salvar um dado
  const saveData = async () => {
    try {
      await AsyncStorage.setItem("nome", "Douglas Araujo Silva")
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  function handleButtonPress(){
      // console.log({nome, idade, estado});

      // axios.post('http://192.168.1.40:3030/cadastrarteste', {nome},{
      // "headers": {
      //   "content-type": "application/json",
      // },
      // })
      // .then(function(response) {
      //   // console.log(response);
      // })
      // .catch(function(error) {
      //   // console.log(error);
      // });
      saveData()
      alert("salvo na memoria, veja na tela de usuario");
  }

  // console.log(ufs);
  return (
    <>
      <ScrollView>
        <Header title="Formulário" />
        <View style={styles.container}>
          <Image source={logo} style={styles.topImage} />
          <Text>Preencha o formulario abaixo</Text>
        </View>
        <View>
        <TextInput style={styles.input} placeholder="Digite o nome" onChangeText={handleNameChange} />
        <TextInput style={styles.input} placeholder="Digite sua idade" onChangeText={handleAgeChange} keyboardType={'numeric'} />
        <Picker placeholder={placeholderSelect} onValueChange={handleStateChange} style={pickerSelectStyles} items={ufs} />

        <TouchableOpacity style={styles.buttonSend} onPress={handleButtonPress}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          {ufs.map(function(d){
            return (
              <Text key={d.key}>{d.label}</Text>
            )
          })}
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.textButton}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
    inputContainer: {
        margin: 20,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    topImage: {
        margin: 20,
    },
    title: {
        fontSize: 20,
    },
    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch',
    },
    buttonSend: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'green',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
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

// estilo para o select, os nomes das 'classes' sao nomes especificos que o react espera
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch',
        color: 'black'
    },
    inputAndroid: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch',
        color: 'black'
    },
});

export default Form;
