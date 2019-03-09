'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  StatusBar,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Left, Body, Thumbnail, Spinner} from 'native-base';
import {
  RkCard,RkStyleSheet,RkText,
} from 'react-native-ui-kitten';
import UserController from '../controller/UserController.js';
import StudentController from '../controller/StudentController.js';
import Student from '../model/Student.js';
import ApiRequest from '../api/ApiRequest.js';
import * as ApiConstants from '../config/ApiConstants.js';

class ListItem extends React.PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.item);
  }

  render() {
    const item = this.props.item;

    return (
      <TouchableHighlight onPress={this._onPress} activeOpacity={0.8} underlayColor='#dddddd'>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../assets/images/avatar_small.png')} />
                <Body>
                  <RkText rkType='medium'>Student Name : {item.name}</RkText>
                  <RkText rkType='medium'>Grade : {item.grade.toString()}</RkText>
                  <RkText rkType='medium'>Teacher : {item.teacher.toString()}</RkText>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <RkText rkType='medium'>
                   {item.notes.substr(0, 94)}
                </RkText>
              </Body>
            </CardItem>
          </Card>
      </TouchableHighlight>
    );
  }
}

type Props = {};
export default class SearchResults extends Component<Props> {

  static navigationOptions = {
   header: null,
  };

  constructor(props) {
    super(props);
      this.state = {
        isLoaded: false,
        response: undefined,
      };
  }

  componentDidMount() {
    console.log('We have mounted');
    this._getStudents();
  }

  _getStudents = () => {
    const data = {
      account_id: UserController.getUserDetails().accountID,
      token: UserController.getUserDetails().token
    };
    try{
      ApiRequest.executeQuery(data, ApiConstants.StudentList, ApiConstants.Get_Method)
      .then(response => this._handleResponse(response));
    }catch (e) {
      ToastAndroid.show('Error during fetch request : ' + e);
    }
  };

  // Check if response is valid then store via mobx
  _handleResponse = (response) => {
    if (response.status === 200) {
      this._storeStudentList(response.students);
    } else {
      ToastAndroid.show('Error Response status : ' + response.status, ToastAndroid.LONG);
    }
  };

  _storeStudentList = (students) => {

    if(students != null) {
      var l = students.length;
      var studentList = []; // array of students
      for(var i = 0; i < l; i++) {
        var item = students[i];

        var student = new Student();
        student.name = item.name;
        student.grade = item.grade;
        student.teacher = item.teacher;
        student.notes = item.notes;
        student.course = item.course;
        student.semester = item.semester;

        studentList.push(student);
      }
      StudentController.setStudentList(studentList);
      console.log('Parse student request : ' + StudentController.getStudentList());
      this.setState({ isLoaded: true });
    }
  };

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      onPressItem={this._onPressItem}
    />
    
  );

  _onPressItem = (item) => {
    this.props.navigation.navigate('StudentDetails', {student: item});
  };

  render() {
    const { students } = StudentController.getStudentList();

    if(this.state.isLoaded) {
        return (
          <Container>
            <Header
              style={{ backgroundColor: "#4F6D7A" }} noShadow
              centerComponent={{ text: 'School Portal', style: { color: '#fff' } }}
            />
            <StatusBar
              barStyle="light-content"
              backgroundColor="#4F6D7A"
            />
            <FlatList
              data={StudentController.getStudentList()}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </Container>
        );
    } else {
        return (
          <View style={styles.spinner}>
            <Spinner color='blue' />
          </View>
        );
    }
    
  }
}

const styles = RkStyleSheet.create(theme => ({
  spinner: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  },
}));
