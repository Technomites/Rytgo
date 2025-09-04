import React from 'react';
import {View, Text, TextProps} from 'react-native';

type Props = TextProps & {
  fontType: 'SemiBold' | 'Medium' | 'Light' | 'Bold' | undefined,
  isArabic: boolean,
};

export default function DerivedText(props: Props) {
  let style = props.style?.length ? props.style : [props.style];
  const fontFamily =
    'Inter-Medium' + (props.fontType ? `-${props.fontType}` : '');

  style = [...style, {fontFamily}];

  return (
    <Text {...props} style={style}>
      {props.children}
    </Text>
  );
}
