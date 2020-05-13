import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import { YellowBox } from 'react-native';
// import { decode, encode } from 'base-64';

import SigninScreen from './src/screens/SigninScreen';
import NoteDetailScreen from './src/screens/NoteDetailScreen';
import NoteEditScreen from './src/screens/NoteEditScreen';
import NoteListScreen from './src/screens/NoteListScreen';
import SignupScreen from './src/screens/SignupScreen';
import NoteCreateScreen from './src/screens/NoteCreateScreen';

import ENV from './env.json';
/*
if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }
*/
/*
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);
*/
require('firebase/firestore');

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DATABASE_URL,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
  measurementId: ENV.FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="HOME"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerBackTitle: null,
        headerTitleStyle: {
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#265366',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
      }}
    >
      <Stack.Screen name="Signin" component={SigninScreen} options={{ title: 'SIMPLE NOTES' }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'SIMPLE NOTES' }} />
      <Stack.Screen name="Home" component={NoteListScreen} options={{ title: 'SIMPLE NOTES' }} />
      <Stack.Screen name="Detail" component={NoteDetailScreen} options={{ title: 'SIMPLE NOTES' }} />
      <Stack.Screen name="Edit" component={NoteEditScreen} options={{ title: 'SIMPLE NOTES' }} />
      <Stack.Screen name="Create" component={NoteCreateScreen} options={{ title: 'SIMPLE NOTES' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
