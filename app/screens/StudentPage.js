'use strict';

import React, { Component } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
  StatusBar,
  AppLoading,
  Text,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet,
} from 'react-native-ui-kitten';


function urlQueryString(data) {
  const querystring = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://192.168.99.1:5001/students?' + querystring;
}

let data = {
  method: 'GET' 
}

type Props = {};
export default class StudentPage extends Component<Props> {
  static navigationOptions = {
    header: null,
  };


  constructor(props) {
    super(props);
      this.state = {
        isLoaded: false,
        message: '',
        account: props.navigation.state.params.account,
        student_list: undefined
      };
  }

  componentDidMount() {
    this._getStudents();
  }

  _getStudents = () => {

    console.log('Get students----'  );
    console.log('Construct data----');
    const data = {
      account_id: this.state.account.account_id,
      token: this.state.account.token
    };
    const query = urlQueryString(data);
    this._executeQuery(query);
    
  };

  _executeQuery = (query) => {
    console.log(query);

    fetch(query,data)
    .then(response => response.json())
    .then(json => this._handleResponse(json.response))
    .catch(error =>
      this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
      }));
  };

  _setStatesAfterResponse = (loaded, msg, response) => {
    this.setState({ 
          isLoaded: loaded,
          message: msg,
          student_list: response.students
    }) 
  }

  _handleResponse = (response) => {
    this.setState({ isLoading: false , message: '' });
    console.log(response);
    if (response.status === 200) {
        this.props.navigation.navigate('Results', {students: response.students});
    } else {
      this.setState({ message: 'Oh oh'});
    }
  };

  _renderLoading = () => (
    <View style={styles.horizontal}>
        <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );


  render() {
    const items = this.state.isLoaded ? <View>{this.state.message}</View> : this._renderLoading();
    return (
      <View>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  card: {
    marginVertical: 8,
  },
  footer: {
    paddingTop: 16,
  },
  time: {
    marginTop: 5,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
}));