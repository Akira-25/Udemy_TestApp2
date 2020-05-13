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
    const { passNote, passCreatedOn } = this.props.route.params;
    console.log('passCreatedOn', passCreatedOn);
    const note = JSON.parse(passNote);
    this.setState({ body: note.body, key: note.key });
  }

  handleSaveNote() {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();

    const newDate = firebase.firestore.Timestamp.now(); // Create new timestamp
    const strNewDate = newDate.toDate().toISOString(); // convert to ISOstr

    const { body, key } = this.state;
    db.collection(`users/${currentUser.uid}/notes`).doc(key)
      // Update data to Cloud Firestore
      .update({ body, createdOn: newDate }) // body: body
      // Update data in the App
      .then(() => {
        const { returnNote, returnTime } = this.props.route.params;
        returnNote({ body, key }); // body: body, key: key
        returnTime({ createdOn: strNewDate });
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
        {/* SAVE Button */}
        <Button
          name="check"
          onPress={this.handleSaveNote.bind(this)}
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
