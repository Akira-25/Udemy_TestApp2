import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import NoteList from '../components/NoteList';
import Button from '../elements/Button';

class NoteListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteList: [],
    };
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();

    db.collection(`users/${currentUser.uid}/notes`)
      .onSnapshot((snapshot) => {
        const tempList = [];
        snapshot.forEach((doc) => {
          tempList.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        this.setState({ noteList: tempList });
      });
  }

  handlePress() { this.props.navigation.navigate('Create'); }

  render() {
    return (
      <View style={styles.container}>
        <NoteList noteList={this.state.noteList} navigation={this.props.navigation} />
        <Button
          name="plus"
          onPress={this.handlePress.bind(this)}
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

export default NoteListScreen;
