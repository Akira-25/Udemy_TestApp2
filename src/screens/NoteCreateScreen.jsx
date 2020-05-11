import * as React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Button from '../elements/Button';

class NoteCreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '' };
  }

  handleSave() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();

    db.collection(`users/${currentUser.uid}/notes`).add({
      body: this.state.body,
      createdOn: new Date(),
    })
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(() => {});
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          multiline
          autoCapitalize="none"
          textAlignVertical="top"
          style={styles.memoEditInput}
          value={this.state.body}
          onChangeText={(text) => { this.setState({ body: text }); }}
        />
        <Button
          name="check"
          onPress={this.handleSave.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default NoteCreateScreen;
