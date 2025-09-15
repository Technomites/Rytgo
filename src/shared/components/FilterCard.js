//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import FilterPropertytag from '../../shared/components/FilterPropertytag';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import { colors } from '../themes/theme';

// create a component
const FilterCard = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  const Citylist = () => {
    return props?.data.map((element, i) => {
      return (
        <FilterPropertytag
          key={i}
          index={i} // city clickid
          onSeletCity={props.onSeletCity}
          selectCityId={props.selectCityId}
          name={props.Name}
          type={props.type}
          item={element}></FilterPropertytag>
      );
    });
  };
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
      }}>
      <View
        style={{
          width: '90%',
          //height: 160,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          //backgroundColor: 'red',
        }}>
        <View
          style={{
            width: '80%',
          }}>
          {/* <Text
            style={{
              color: '#191919',
              fontSize: 17,
              fontFamily: FontFamily.SemiBold,
              marginTop: 16,
              textAlign: isRtl ? 'right' : 'left',
            }}>
            {props.Heading}
          </Text> */}
          <View style={{marginTop: 8}}>
            {/* <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag /> */}
            {Citylist()}

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: 14,
                  fontFamily: FontFamily.SemiBold,
                  padding: 1,
                }}>
                {/* Show More.. */}
              </Text>
            </View>
          </View>
        </View>
      </View>
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

export default FilterCard;
