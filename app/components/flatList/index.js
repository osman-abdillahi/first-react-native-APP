import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import {
  RkText,
  RkCard, RkStyleSheet,
} from 'react-native-ui-kitten';


class ListItem extends React.PureComponent {
	
  componentName = 'ListItem';

  _onPress = () => {
    this.props.onPressItem(this.props.item);
  }

  render() {
    const item = this.props.item;

    return (
			<TouchableOpacity
			delayPressIn={70}
			activeOpacity={0.8}
			onPress={() => this.onItemPressed(item)}>
			<RkCard style={styles.card}>
				<View rkCardHeader>
					<View>
						<RkText rkType='header4'>{item.header}</RkText>
						<RkText rkType='secondary2 hintColor'>{moment().add(item.time, 'seconds').fromNow()}</RkText>
					</View>
				</View>
				<Image rkCardImg source={item.photo} />
				<View style={styles.footer} rkCardFooter>
					<SocialBar />
				</View >
			</RkCard>
			</TouchableOpacity>
    );
  }
}

export default ListItem;