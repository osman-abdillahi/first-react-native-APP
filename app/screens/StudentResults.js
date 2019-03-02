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
import { Container, Header, Content, Card, CardItem, Button, Left, Body, Thumbnail} from 'native-base';
import {
  RkCard,RkStyleSheet,RkText,
} from 'react-native-ui-kitten';

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
    const { params } = this.props.navigation.state;
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
          data={params.students}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </Container>
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
}));
