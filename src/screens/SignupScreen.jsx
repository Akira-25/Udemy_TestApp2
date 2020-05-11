import * as React from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableHighlight,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';

import firebase from 'firebase';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleSignUp() {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
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

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
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
          onPress={this.handleSignUp.bind(this)}
          underlayColor="#c70f66"
        >
          <Text style={styles.buttonTitle}>Sign Up</Text>
        </TouchableHighlight>
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
});

export default SignupScreen;
