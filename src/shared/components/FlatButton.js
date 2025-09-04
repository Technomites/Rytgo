import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {colors, fontSize, spacing, shadow} from '../themes/theme';
import Text from '../components/DerivedText';

type Props = {
  label: String,
  onPress: Function,
  backgroundColor: String,
  buttonStyle: ViewStyle,
  labelStyle: ViewStyle,
  disabled: Boolean,
};

export default function FlatButton(props: Props) {
  const {label, onPress, backgroundColor, buttonStyle, labelStyle, disabled} =
    props;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor ? backgroundColor : colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
      borderColor: 'white',
      marginVertical: spacing.med,

      // ...shadow.med,
      ...buttonStyle,
    },
    buttonText: {
      color: colors.background,
      //textTransform: 'capitalize',
      fontSize: fontSize.headerText,

      ...labelStyle,
    },
  });

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.button}
      onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}
