import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Button from '../elements/Button';

const dateString = (date) => {
  console.log('NDS date >>', date);
  if (date == null) { return ''; }

  // console.log('NDS dateObject >>', dateObject);
  // console.log(date.toISOString());
  return date.split('.')[0]; // T
};


class NoteDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { note: {}, createdOn: '' };
  }

  componentDidMount() {
    const { passItem, passCreatedOn } = this.props.route.params;
    console.log('passCreatedOn', passCreatedOn);

    const note = JSON.parse(passItem);
    const createdOn = passCreatedOn;

    this.setState({ note, createdOn });
  }

  returnNote(note) {
    this.setState({ note }); // **************
  }

  returnTime(createdOn) {
    console.log('returnTime', createdOn);
    this.setState(createdOn);
  }

  render() {
    const { note, createdOn } = this.state;
    const { body } = note;
    // const createdOn = JSON.stringify(note.createdOn);

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
              'Edit',
              {
                passNote: JSON.stringify(note),
                returnNote: JSON.stringify(this.returnNote.bind(this)), // **************
                returnTime: this.returnTime.bind(this),
              },
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
