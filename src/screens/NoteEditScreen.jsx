import * as React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Button from '../elements/Button';

class NoteEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '', key: '' };
  }

  componentDidMount() {
    const { note } = this.props.route.params;
    this.setState({ body: note.body, key: note.key });
  }

  handleSave() {
    const { body, key } = this.state;
    const { currentUser } = firebase.auth();
    const newDate = firebase.firestore.Timestamp.now();
    const db = firebase.firestore();

    db.collection(`users/${currentUser.uid}/notes`).doc(key)
      .update({ body, createdOn: newDate })
      .then(() => {
        this.props.route.params.returnNote({
          body: this.state.body,
          key: this.state.key,
          createdOn: newDate,
        });
        this.props.navigation.goBack();
      })
      .catch(() => {});
  }

  render() {
    const { body } = this.state;

    if (body == null) { return null; }

    return (
      <View style={styles.container}>
        <TextInput
          multiline
          autoCapitalize="none"
          textAlignVertical="top"
          style={styles.noteEditInput}
          value={body}
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
  noteEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

export default NoteEditScreen;
