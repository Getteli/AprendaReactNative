import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { api, default_locale } from '../env';

import * as Location from 'expo-location';
import axios from 'axios';

function Home() {
  // button
  const navigation = useNavigation();

  // variavel
  const [contador, setContador] = useState(0);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // ao carregar pega a localizacao, mas dentro tem um setInterval para a cada x segundos
  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        if(1 == 2)
        {
          let locationAPI = await Location.getCurrentPositionAsync({});
          setLocation(locationAPI);

          // console.log("Latitude: " + locationAPI.coords.latitude + " Longitude: " + locationAPI.coords.longitude);
          // sobe para o servidor a localizacao
          axios.post('http://192.168.1.40:3030/setlocation',(locationAPI.coords) ,{
          "headers": {
            "content-type": "application/json",
          },
          })
          .then(function(response) {
            // console.log(response);
          })
          .catch(function(error) {
            // console.log(error);
          });
        }

      })();
      return () => clearInterval(interval);
    }, 20000);
  }, []);

  // functions
  function incrementar() {
    setContador(contador+1);
    console.log( default_locale );
    console.log( api.endpoint );
    // endpoint para o Login
    // `http://localhost:${config.fusionAuthPort}/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code`
  }

  // ao iniciar verifica e muda algum texto
  let text = 'carregando..';
  if (errorMsg) {
    text = errorMsg;
  }
  if (location) {
    text = "SUA LOCALIZACAO";
  }

  return (
    <>
      <Header title="Home" />
      <View style={styles.container}>
        <Text style={styles.title}>Bem-Vindo !</Text>
        <Text>Esse é o primeiro app em React Native</Text>
        <Text><Text style={styles.Count}>{contador}</Text> vezes clicado !</Text>
        <TouchableOpacity style={styles.button} onPress={incrementar}>
          <Text style={styles.textButton}>Clique neste Botão</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('form')}>
          <Text style={styles.textButton}>Ir para o Formulário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('foto')}>
          <Text style={styles.textButton}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('usuario')}>
          <Text style={styles.textButton}>Usuario</Text>
        </TouchableOpacity>

        <View>
          <Text>{text}</Text>
          <Text>Latitude: {JSON.stringify(!location ? "" : location.coords.latitude)}</Text>
          <Text>Longitude: {JSON.stringify(!location ? "" : location.coords.longitude)}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000'
  },
  button:{
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#0000ff',
    padding: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 20
  },
  Count: {
    fontWeight: 'bold'
  }
});

export default Home;
