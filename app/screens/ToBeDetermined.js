'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import {
  RkText, RkStyleSheet, 
} from 'react-native-ui-kitten';

type Props = {};

export default class ToBeDetermined extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <RkText rkType='xxlarge primary' style={styles.description}>
          Coming Soon !
        </RkText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F6D7A',
  },
  description: {
    textAlign: 'center',
    color: '#FFFF'
  },
});