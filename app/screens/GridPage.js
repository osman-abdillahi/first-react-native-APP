import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import {
  RkText,
  RkButton,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { Container, Header } from 'native-base';
import { MainRoutes } from '../config/navigation/routes';

export default class GridPage extends Component<Props> {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
      this.state = {
        dimensions: undefined
      };
  }

  _onItemPressed = (item) => {
    this.props.navigation.navigate(item.id);
  };

  _onContainerLayout = (event) => {
    if (this.state.height) {
      return;
    }
    const dimensions = event.nativeEvent.layout;
    this.setState({ dimensions });
  };

  _renderItems = () => MainRoutes.map(this._renderItem);

  _renderItem = (item) => (
    <View style={{padding: 2.5}} key={item.id}>
      <RkButton
        rkType='tile rounded'
        style={[styles.tileBorder, { height: this.state.dimensions.width / 3}]}
        onPress={() => this._onItemPressed(item)}>
          <View style={styles.center_elements}>
            <Image source= {item.icon} style={styles.imageStyle}/>
            <RkText rkType='light small' style={{justifyContent: 'center'}}>{item.title}</RkText>
          </View>
      </RkButton>
    </View>
  );

  render() {
    const items = this.state.dimensions === undefined ? <View /> : this._renderItems();
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
        <ScrollView
          style={styles.root}
          onLayout={this._onContainerLayout}
          contentContainerStyle={styles.rootContainer}>
          {items}
        </ScrollView>
      </Container>

    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  icon: {
    marginBottom: 10,
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  tileBorder: {
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  imageStyle: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  center_elements: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
}));