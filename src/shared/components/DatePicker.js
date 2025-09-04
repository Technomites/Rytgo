import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import IoIcon from './Icon/IoIcon';
import {colors} from '../themes/theme';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
const LoactionInput = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <View
      style={{
        marginVertical: 2,
        marginTop: 6,
      }}>
      <Text
        style={{
          color: '#191919',
          fontWeight: '600',
          fontFamily: 'Inter-SemiBold',
          textAlign: isRtl ? 'right' : 'left',
        }}>
        {props.title}
      </Text>
      <TouchableOpacity
        onPress={props.onPicker}
        style={[Styles.container, RtlStyles.containerColumn]}>
        <View
          style={{
            height: '100%',
            width: '85%',
            justifyContent: 'center',
            //alignItems: 'center',
            //backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: 'gray',
              marginLeft: 10,
              //width: '100%',
              //height: '100%',
              //paddingTop: 18,
              //textAlign: 'center',
              textAlignVertical: 'center',

              // textAlignVertical: 'center',
            }}>
            {props.pickValue}
          </Text>
        </View>

        <View
          style={{
            height: 50,
            width: '15%',
            justifyContent: 'center',
            //alignItems: 'center',
            marginLeft: 10,
            //backgroundColor: 'red',
          }}>
          <IoIcon
            name="calendar"
            size={19}
            color="black"
            style={{marginRight: 10}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    height: 54,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgray',
    flexDirection: 'row',
    marginTop: 5,
  },
  textInput: {
    marginLeft: 10,
    height: 50,
    width: '95%',
    marginRight: 20,
    color: colors.black,
  },
  clickStyle: {
    height: 50,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDescription: {
    height: 80,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgray',
    flexDirection: 'row',
    marginTop: 5,
  },
});
export default LoactionInput;
