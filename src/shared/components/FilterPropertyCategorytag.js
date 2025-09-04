//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Iconcheck from 'react-native-vector-icons/Ionicons';
import IconUncheck from 'react-native-vector-icons/Fontisto';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const FilterPropertyCategorytag = props => {
  //console.log(props.selectCategoryId + 'filter arrar');
  // console.log(props.selectCategoryId.indexOf(props.index) > -1);
  //console.log(props?.selectCategoryId[props?.index].isSelected);
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <View style={{}}>
      <TouchableOpacity onPress={() => props.onSelectCategory(props.index)}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            ...RtlStyles.containerRow,
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              ...RtlStyles.containerRow,
            }}>
            {props.selectCategoryId[props.index].isSelected == 'true' ? (
              <Iconcheck
                name="checkbox"
                size={19}
                color="#0989B8"
                onPress={() => props.onSelectCategory(props.index)}
              />
            ) : (
              <IconUncheck
                name="checkbox-passive"
                size={17}
                color="#989898"
                onPress={() => props.onSelectCategory(props.index)}
              />
            )}
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
            {props.name === 'Property' ? props.item.count : props.item.count}
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 0.8,
            marginTop: 1,
          }}
        />
      </TouchableOpacity>
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
export default FilterPropertyCategorytag;
