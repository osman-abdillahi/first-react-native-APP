import React from 'react';
import {
  Alert,
} from 'react-native';
import {
  RkComponent,
} from 'react-native-ui-kitten';

export class AlertBox extends RkComponent {
	componentName = 'AlertBox';

	buttonClickded = (title, msg) => {
		
		Alert.alert(
			{title},
			{msg},
			{text: 'OK', onPress: () => this.props.onDismiss()},
			{cancelable: false}
		);
	};

	render() {
		const { title, msg, ...restProps } = this.props;
		
		return (
		  <View>
			{this.buttonClickded({title}, {msg})}
		  </View>
		);
	}
}