import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Button from '../elements/Button';

const dateString = (date) => {
  if (date == null) { return ''; }
  const dateObject = date.toDate();
  return dateObject.toISOString().split('T')[0];
};

class NoteDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { note: {} };
  }

  componentDidMount() {
    const { note } = this.props.route.params;
    this.setState({ note });
  }

  returnNote(note) {
    this.setState({ note });
  }

  render() {
    const { note } = this.state;
    const { body, createdOn } = note;

    if (body == null) { return null; }
    if (createdOn == null) { return null; }

    return (
      <View style={styles.container}>

        <View style={styles.noteHeader}>
          <Text style={styles.noteHeaderTitle}>{body.substring(0, 10)}</Text>
          <Text style={styles.noteHeaderDate}>{dateString(createdOn)}</Text>
        </View>

        <View style={styles.noteContent}>
          <Text style={styles.noteBody}>{body}</Text>
        </View>

        <Button
          name="pen"
          color="white"
          style={styles.editButton}
          onPress={() => {
            this.props.navigation.navigate(
              'Edit', { note, returnNote: this.returnNote.bind(this) },
            );
          }}
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
  noteHeader: {
    height: 100,
    backgroundColor: '#17313C',
    justifyContent: 'center',
    padding: 10,
  },
  noteHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  noteHeaderDate: {
    fontSize: 12,
    color: '#fff',
  },
  noteContent: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  noteBody: {
    lineHeight: 22,
    fontSize: 15,
  },
  editButton: {
    top: 75,
  },
});

export default NoteDetailScreen;
