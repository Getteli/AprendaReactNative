import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import axios from 'axios';

function Login() {
  // mapear/ler os inputs
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState(0);
  const [ufs, setEstados ] = useState([]);

  // usar um metodo de efeito para pegar dados
  useEffect(() => {
    // uso do axios para get
    axios.get('http://192.168.1.40:3030/estados').then(response => {
      setEstados(response.data.map(estado => ({
        label: estado.uf,
        key: estado.uf,
        value: estado.uf
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

  function handleEmailChange(email){ setEmail(email); }
  function handlePassChange(pass){ setPass(pass); }

  function handleButtonPress(){
    // alerta padrao do celular
      // Alert.alert("email: " + email + " Senha: " + pass);
    // uso do axios para post
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
      // `http://localhost:${config.fusionAuthPort}/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code`
  }


  return (
    <>
      <ScrollView>
        <Header title="Login" />
        <View style={styles.container}>
          <Text>Faça login</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="seuemail@provedor.com" onChangeText={handleEmailChange} />
          <TextInput style={styles.input} placeholder="******" onChangeText={handlePassChange} secureTextEntry={true} />

          <TouchableOpacity style={styles.buttonSend} onPress={() => {
            Linking.openURL('https://google.com.br');
          }}>
            <Text style={styles.textButton}>ABRIR GOOGLE no navegador</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.buttonSend} onPress={() => navigation.navigate('browser')}>
            <Text style={styles.textButton}>ABRIR GOOGLE no app</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSend} onPress={handleButtonPress}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>

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

export default Login;
