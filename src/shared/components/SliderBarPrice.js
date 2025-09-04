//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

// create a component
const SliderBarPrice = props => {
  // const [count, setCount] = useState(0);
  return (
    <View
      style={{
        width: '90%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '91%',
          //backgroundColor: 'red',
        }}>
        <Text
          style={{
            color: '#191919',
            fontSize: 17,
            marginTop: 13,
            fontFamily: 'Inter-SemiBold',
          }}>
          {props.title}
        </Text>
        <Slider
          thumbTintColor="#0989B8"
          style={{
            width: '100%',
            height: 35,
            padding: 10,
            transform: [{scaleX: 1.09}, {scaleY: 1.1}],
          }}
          minimumValue={0}
          maximumValue={props.maxprice}
          minimumTrackTintColor="#0989B8"
          maximumTrackTintColor="grey"
          value={props.initialvalue} // here we change
          onSlidingComplete={val => {
            props.onchange(parseInt(val));

            //setCount(parseInt(val));
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            //backgroundColor: 'red',
            flexDirection: 'row',
            // marginTop: 10,
          }}>
          <View
            style={{
              height: 35,
              width: 110,
              backgroundColor: '#0989B810',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                marginLeft: 4,
                fontFamily: 'Inter-Medium',
                color: '#0989B8',
                fontSize: 11,
              }}>
              {props.name}
            </Text>
            <Text
              style={{
                marginLeft: 4,
                fontFamily: 'Inter-Medium',
                color: '#0989B8',
                fontSize: 11,
              }}>
              0
            </Text>
          </View>
          <View
            style={{
              height: 35,
              width: 110,
              backgroundColor: '#0989B810',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                marginLeft: 4,
                fontFamily: 'Inter-Medium',
                color: '#0989B8',
                fontSize: 11,
              }}>
              {props.name}
            </Text>
            <Text
              style={{
                marginLeft: 4,
                fontFamily: 'Inter-Medium',
                color: '#0989B8',
                fontSize: 11,
              }}>
              {props.value === 0 ? 0 : props.value}
            </Text>
          </View>
        </View>
        <Text></Text>
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

//make this component available to the app
export default SliderBarPrice;
