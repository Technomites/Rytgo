//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import RadioButton from 'react-native-radio-button';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const FilterPropertytag = props => {
  //console.log(props.item?.propertyCount);
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <View style={{}}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          //flexDirection: 'row-reverse',
          ...RtlStyles.containerRow,
        }}>
        <View style={{flexDirection: 'row', ...RtlStyles.containerRow}}>
          {/* <RadioButton
            size={10}
            animation={'bounceIn'}
            isSelected={props.index === props.selectCityId ? true : false}
            //isSelected={true}
            onPress={() => {
              //alert(props.index);
              props.onSeletCity(props.index);
            }}
          /> */}
          <Text
            style={{
              color: '#989898',
              fontSize: 13,
              padding: 10,
              fontFamily: 'Inter-Medium',
              //marginTop: 16,
            }}>
            {props.item.name}
          </Text>
        </View>
        <Text
          style={{
            color: '#989898',
            fontSize: 13,
            padding: 10,
            fontFamily: 'Inter-Medium',
          }}>
          {props.name === 'Property'
            ? props.type === 'Sale'
              ? props.item?.propertyCount.sale
              : props.item?.propertyCount.rent
            : props.item.vehicleCount}
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: 'lightgrey',
          borderBottomWidth: 0.8,
          marginTop: 1,
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default FilterPropertytag;
