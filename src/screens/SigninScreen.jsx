import * as React from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableOpacity,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

class SigninScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'user1@example.com', password: 'password' };
  }

  handleSignIn() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          }),
        );
      })
      .catch(() => {});
  }

  handleSignUpScreen() { this.props.navigation.navigate('Signup'); }

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => { this.setState({ email: text }); }}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => { this.setState({ password: text }); }}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSignIn.bind(this)}
          underlayColor="#c70f66"
        >
          <Text style={styles.buttonTitle}>Sign In</Text>
        </TouchableHighlight>

        <TouchableOpacity
          style={styles.signup}
          onPress={this.handleSignUpScreen.bind(this)}
        >
          <Text style={styles.buttonTitle}>Sign Up</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#E31676',
    height: 48,
    borderRadius: 4,
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  signup: {
    marginTop: 16,
    backgroundColor: '#E31676',
    height: 48,
    borderRadius: 4,
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default SigninScreen;
