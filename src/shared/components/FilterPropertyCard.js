//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import FilterPropertyCategorytag from './FilterPropertyCategorytag';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const FilterPropertyCategoryCard = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  const Categorylist = () => {
    return props?.data.map((element, i) => {
      return (
        <FilterPropertyCategorytag
          key={i}
          index={i} // city clickid
          onSelectCategory={props.onSelectCategory}
          selectCategoryId={props.selectCategoryId}
          name={props.Name}
          item={element}></FilterPropertyCategorytag>
      );
    });
  };

  const Featuredlist = () => {
    return props.data.map((element, i) => {
      return (
        <FilterPropertyCategorytag
          key={i}
          index={i} // city clickid
          onSelectCategory={props.onSelectFeature}
          selectCategoryId={props.selectFeatureId}
          name={props.Name}
          item={element}></FilterPropertyCategorytag>
      );
    });
  };
  // const Categorylist = () => {
  //   return props.data.map((element, i) => {
  //     return (
  //       <FilterPropertytag
  //         key={i}
  //         index={i} // city clickid
  //         onSeletCity={props.onSeletCity}
  //         selectCityId={props.selectCityId}
  //         name={props.Name}
  //         item={element}></FilterPropertytag>
  //     );
  //   });
  // };
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        //backgroundColor: 'red',
        // flex: 1,
      }}>
      <View
        style={{
          width: '90%',
          //height: 160,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',
          }}>
          {/* <Text
            style={{
              color: '#191919',
              fontSize: 17,
              fontFamily: 'Inter-SemiBold',
              marginTop: 0,
              textAlign: isRtl ? 'right' : 'left',
            }}>
            {props.title}
          </Text> */}
          <View style={{marginTop: 10}}>
            {/* <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag />
            <FilterPropertytag /> */}
            {props.Heading === 'Categories' ? Categorylist() : Featuredlist()}

            {/* <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
              }}>
              <Text
                style={{
                  color: '#0989B8',
                  fontSize: 14,
                  fontFamily: 'Inter-Bold',
                  padding: 10,
                }}>
             
              </Text>
            </View> */}
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

export default FilterPropertyCategoryCard;
