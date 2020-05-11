import * as React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';

import * as Font from 'expo-font';
import { createIconSet } from '@expo/vector-icons';
import fontAwsome from '../../assets/fonts/fa-solid-900.ttf';


const CustomIcon = createIconSet({
  pen: '\uf303',
  plus: '\uf067',
  check: '\uf00c',
}, 'FontAwsome');

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({ FontAwsome: fontAwsome });
    this.setState({ fontLoaded: true });
  }

  render() {
    const {
      name, style, color, onPress,
    } = this.props;

    let bgColor = '#E31676';
    let textColor = '#fff';
    let buttonUnderlayColor = '#c70f66';

    if (color === 'white') {
      bgColor = '#fff';
      textColor = '#E31676';
      buttonUnderlayColor = '#eee';
    }

    return (
      <TouchableHighlight
        style={[styles.Button, style, { backgroundColor: bgColor }]}
        onPress={onPress}
        underlayColor={buttonUnderlayColor}
      >
        <View>
          {
            this.state.fontLoaded ? (
              <CustomIcon
                name={name}
                style={[styles.ButtonTitle, { color: textColor }]}
              />
            ) : null
          }
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  Button: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 4,
  },
  ButtonTitle: {
    fontFamily: 'FontAwsome',
    fontSize: 24,
    lineHeight: 32,
  },
});

export default Button;
