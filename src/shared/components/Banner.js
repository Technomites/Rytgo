//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import FlatButton from '../components/FlatButton';
import {localizedString} from '../../shared/localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const Banner = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <View
      style={{
        width: '93%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        //backgroundColor: 'red',
        ...RtlStyles.containerRow,
      }}>
      <ImageBackground
        //resizeMode="cover"
        style={{
          width: '100%',
          height: 95,
          //alignItems: 'center',
          //justifyContent: 'center',
        }}
        // imageStyle={{borderRadius: 0}}
        source={{uri: props.deatils?.bannerPath}}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
            flexDirection: 'row',
            ...RtlStyles.containerRow,

            //padding: 20,
          }}>
          <View
            style={{
              width: '50%',
              //alignItems: 'center',
              justifyContent: 'center',
              //backgroundColor: 'yellow',
              marginRight: 16,
              // ...RtlStyles.containerRow,
            }}>
            <Text
              style={{
                color: '#FFFFFF60',
                fontFamily: 'Inter-Bold',
                fontSize: 12,
                textAlign: isRtl ? 'right' : 'left',
              }}>
              {localizedString.trendText}
            </Text>
            {/* <View style={{...RtlStyles.containerRow}}> */}
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter-SemiBold',
                fontSize: 14,
                textAlign: isRtl ? 'right' : 'left',
              }}>
              {/* {props.heading} */}
              {props.deatils?.description}
            </Text>
            {/* </View> */}
          </View>

          {props.IsExplore && (
            <FlatButton
              label={localizedString.exploreHeading}
              buttonStyle={{
                width: 73,
                //height: 30,
                paddingVertical: 9,
                //paddingHorizontal: 4,
                marginRight: 17,
                backgroundColor: '#0989B8',
                borderRadius: 6,
                marginBottom: 3,
                marginLeft: 43,
              }}
              labelStyle={{fontSize: 12}}
              onPress={props.onClick}
              //style={{fontsize: 2}}
              //</View>buttonText={{fontsize: 8}}
            ></FlatButton>
          )}
        </View>
      </ImageBackground>
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
export default Banner;
