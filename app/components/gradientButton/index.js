import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  RkButton,
  RkText,
  RkComponent,
} from 'react-native-ui-kitten';

export class GradientButton extends RkComponent {
  componentName = 'GradientButton';
  typeMapping = {
    button: {},
    gradient: {},
    text: {},
  };

  renderContent = (textStyle) => {
    const hasText = this.props.text === undefined;
    return hasText ? this.props.children : this.renderText(textStyle);
  };

  renderText = (textStyle) => (
    <RkText style={textStyle}>{this.props.text}</RkText>
  );

  render() {
    const { button, gradient, text: textStyle } = this.defineStyles();
    const { style, rkType,color, ...restProps } = this.props;
    const colors = this.props.colors || this.extractNonStyleValue(gradient, 'colors');
    return (
      <RkButton
        rkType='stretch rounded'
        style={[button, style]}
				color={color}
        {...restProps}>
        <LinearGradient
          colors={colors}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 2, y: 0.5 }}
          style={[gradient]}>
          {this.renderContent(textStyle)}
        </LinearGradient>
      </RkButton>
    );
  }
}
