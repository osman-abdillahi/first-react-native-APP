'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'

type Props = {};
export default class SplashScreenPage extends Component<Props> {
    static navigationOptions = {
      header: null,
    };

    constructor(props) {
      super(props);
    }

    // Once the app has loaded hide the splash screen
    // Navigate to the login screen
    componentDidMount() {
      SplashScreen.hide()
      this.props.navigation.navigate('Login');
    }

    render() {
      return (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#4F6D7A"
          />
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
});