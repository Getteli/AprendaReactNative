import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Header(params) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Menu</Text>
      <Text style={styles.subtitle}>Tela {params.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: 'navy',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    color: '#ccc'
  }
});

export default Header;
