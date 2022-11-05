import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useReducer, createContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/screens/Home';
import Login from './src/screens/Login';


import AsyncSorage from '@react-native-async-storage/async-storage'

import { authConfig } from './src/constants/AUTH';
import SpotifyStack from './src/components/SpotifyNavigation';
import { NavigationContainer } from '@react-navigation/native';
import PlayState from './src/components/PlayState';
import { SpotifyContext } from './src/context/SpotifyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Spotify } from './src/context/SpotifyContext'


export default function App() {



  return (

    <View View style={styles.container} >

      <NavigationContainer>

        <Spotify>


          <SpotifyStack />

        </Spotify>

      </NavigationContainer>



    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
