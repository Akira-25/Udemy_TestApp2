import * as React from 'react';
import {
  StyleSheet, View, Text, TouchableHighlight, FlatList,
} from 'react-native';


const dateString = (date) => {
  if (date == null) { return ''; }
  const dateObject = date.toDate();
  return dateObject.toISOString().split('T')[0];
};

class NoteList extends React.Component {
  renderNote({ item }) {
    const { body, createdOn } = item;
    /*
    const note = JSON.stringify({ item });
    console.log('note>', note);
    console.log('item>', item);
    */
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate('Detail', { note: item }); // JSON.stringify(item)
        }}
      >
        <View style={styles.noteListItem}>
          <Text style={styles.noteListTitle}>{body.substring(0, 10)}</Text>
          <Text style={styles.noteListDate}>{dateString(createdOn)}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.noteList}>
        <FlatList
          data={this.props.noteList}
          renderItem={this.renderNote.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noteList: {
    width: '100%',
    flex: 1,
  },
  noteListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  noteTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  notedate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
});

export default NoteList;
