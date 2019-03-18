import React, { Component } from 'react';
import {
  View,
  Image,
  Keyboard,
  ActivityIndicator,
  Text,
  StatusBar,
  ToastAndroid,
  AppState,
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
} from 'react-native-ui-kitten';

import { Container, Header, Spinner } from 'native-base';

import SInfo from 'react-native-sensitive-info';

import { GradientButton } from '../components/gradientButton';
import { scaleVertical } from '../utils/scale';
import ApiRequest from '../api/ApiRequest.js';
import * as ApiConstants from '../config/ApiConstants.js';
import User from '../model/User.js';
import UserController from '../controller/UserController.js';

import UserDaoImpl from "../dao/User/UserDaoImpl.js";

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

export default class LoginPage extends Component<Props> {
  
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      passwd: '',
      isLoading: false,
      message: '',
      appState: AppState.currentState,
    };

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.userDaoImpl = new UserDaoImpl();
  }

  componentDidMount() {
    // App is starting up
    this.appIsNowRunningInForeground();
    this.setState({
      appState: "active"
    });

    // Listen for app state changes
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    // Remove app state change listener
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  // Handle the app going from foreground to background, and vice versa.
  handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // App has moved from the background (or inactive) into the foreground
      this.appIsNowRunningInForeground();
    } else if (
      this.state.appState === "active" &&
      nextAppState.match(/inactive|background/)
    ) {
      // App has moved from the foreground into the background (or become inactive)
      this.appHasGoneToTheBackground();
    }
    this.setState({ appState: nextAppState });
  }

  // Code to run when app is brought to the foreground
  appIsNowRunningInForeground() {
    console.log("App is now running in the foreground!");
  }

  // Code to run when app is sent to the background
  appHasGoneToTheBackground() {
    console.log("App has gone to the background.");
  }


  _onUserNameTextChanged = (event) => {
    this.setState({ uname: event.nativeEvent.text })
  };

   _onPasswordTextChanged = (event) => {
    this.setState({ passwd: event.nativeEvent.text })
  };

  _onLoginButtonPressed = () => {
    uname = this.state.uname;
    pwd = this.state.passwd;
    isLoading = this.state.isLoading;

    if(isBlank(uname) || isBlank(pwd) || isLoading){
      ToastAndroid.show('Either you submited a request or the username pwd are blank', ToastAndroid.SHORT);
    }else {
      const data = {
        uname: uname,
        pwd: pwd
      };
      console.log('Construct data---- ' + data);

      this.setState({ isLoading: true })
      try{
        ApiRequest.executeQuery(data, ApiConstants.AuthUser, ApiConstants.Post_Method)
        .then(response => this._handleResponse(response));
      }catch (e) {
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + e
        });
      }
    }  
  };

  _handleResponse = (response) => {
    this.setState({ isLoading: false , message: '' });
    console.log(response);
    if (response.status === 200) {
      // store cred in sharedpref
      SInfo.setItem('account_id', response.account_id.toString(), {});
      SInfo.setItem('token', response.token.toString(), {});

      uDetails = new User(response.account_id, response.token);
      UserController.setUserDetails(uDetails);

      // save user details
      this.userDaoImpl.setUser(uDetails);

      this.props.navigation.navigate('Grid');
    } else {
      this.setState({ message: 'Authentication failed; please try again.'});
    }
  };

  _onDismiss = () => {
    this.setState({ message: ''});
  };

  renderImage = () => (
    <Image style={styles.image} source={require('../assets/images/logo.png')} />
  );

  render = () => (
    <Container>
      <Header
        style={{ backgroundColor: "#4F6D7A" }} noShadow
        centerComponent={{ text: 'School Portal', style: { color: '#fff' } }}
      />
      <StatusBar
            barStyle="light-content"
            backgroundColor="#4F6D7A"
      />
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}>
        <View style={styles.header}>
          {this.renderImage()}
          <RkText rkType='light h1'>Hard Knock University</RkText>
          <RkText rkType='logo h0'>Free Enrollment</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType='rounded' placeholder='Username'  onChange={this._onUserNameTextChanged} />
            <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry  onChange={this._onPasswordTextChanged} />  
            <GradientButton
              colors={['#4F6D7A', '#4b6f7f', '#3a5d6d']}
              style={styles.save}
              rkType='large'
              text='LOGIN'
              textStyle={styles.buttonText}
              onPress={this._onLoginButtonPressed}
            />
          </View>
          <Text style={styles.description}>{this.state.message}</Text>
        </View>
      </RkAvoidKeyboard>
    </Container>
  );
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.screen.base,
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  image: {
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  content: {
    justifyContent: 'space-between',
  },
  save: {
    backgroundColor: '#4F6D7A',
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  button: {
    borderColor: theme.colors.border.solid,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: 'white',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginVertical: 20,
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));