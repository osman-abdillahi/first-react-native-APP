'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Header, Card, CardItem, Body, Right } from 'native-base';
import {
  RkText, RkStyleSheet, 
} from 'react-native-ui-kitten';
import { scaleVertical } from '../utils/scale';
import { Divider } from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';

type Props = {};
export default class StudentDetails extends Component<Props> {

  static navigationOptions = {
   header: null,
  };

  render() {
    const { params } = this.props.navigation.state;
    const student = params.student;

    return ( 
        <View style={styles.root}>
          <Header
            style={{ backgroundColor: "#4F6D7A" }} noShadow
            centerComponent={{ text: 'School Portal', style: { color: '#fff' } }}
          />
          <StatusBar
            barStyle="light-content"
            backgroundColor="#4F6D7A"
          />

          <ScrollView style={styles.screen}>
            <ImageBackground source={require('../assets/images/school_background.png')} style={styles.container}>
              <View style={styles.overlay}>
                <Image source= {require('../assets/images/avatar_small.png')} style={styles.avatarStyle}/>
                <Text style = {styles.textStyle} >Name : {student.name}</Text>
                <Text style = {styles.textStyle} >Grade : {student.grade}</Text>
              </View>
            </ImageBackground>
            <Divider style={{ backgroundColor: '#4F6D7A', height: 5, paddingTop: 1.2 }} />
            <View>
              <Card>
                <CardItem>
                  <RkText style = {styles.textCardStyle}></RkText>
                  <RkText rkType='medium' style={styles.textCardStyle}>Teacher : {student.teacher}</RkText>
                </CardItem>
              </Card>
            </View>
            <View>
              <Card>
                <CardItem>
                  <RkText style = {styles.textCardStyle}></RkText>
                  <RkText rkType='medium' style={styles.textCardStyle}>Notes : {student.notes.substr(0, 10)}</RkText>
                </CardItem>
              </Card>
            </View>
          </ScrollView>
        </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  summary: {
    fontSize: 18,
    color: '#656565'
  },
  title: {
    fontSize: 25,
    color: '#48BBEC'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'powderblue'
  },
  colmnContainer: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'lightblue'
  },
  image: {
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  container: {
    backgroundColor:'black',
  },
  overlay: {
    backgroundColor:'rgba(79, 109, 122, 0.5)',
  },
  avatarStyle: {
    width:100, 
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textStyle: {
    marginTop: 10,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textCardStyle: {
    marginTop: 10,
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  balanceContainer:{
    padding:10,
  },
  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff',
  },
}));
