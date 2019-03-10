'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import { Card, CardItem, Left, Body, Thumbnail } from 'native-base';
import {
  RkText,
} from 'react-native-ui-kitten';

export class ListItem extends React.PureComponent {

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
                <Thumbnail source={this.props.img_src} />
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