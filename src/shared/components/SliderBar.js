//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

// create a component
const SliderBar = () => {
  const [count, setCount] = useState(0);
  return (
    <View
      style={{
        width: '88%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '80%',
          //backgroundColor: 'red',
        }}>
        <Text
          style={{
            color: '#191919',
            fontSize: 17,
            marginTop: 16,
            fontFamily: 'Inter-SemiBold',
          }}>
          City
        </Text>
        <Slider
          thumbTintColor="#0989B8"
          style={{
            width: '100%',
            height: 40,
            padding: 10,
            transform: [{scaleX: 1.1}, {scaleY: 1.4}],
          }}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#0989B8"
          maximumTrackTintColor="grey"
          value={9}
          onValueChange={val => {
            //alert(parseInt(val));
            //setCount(val);
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: 'red',
            // marginTop: 10,
          }}>
          <View
            style={{
              height: 30,
              width: 80,
              backgroundColor: '#C74C5013',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                marginLeft: 4,
                fontFamily: 'Inter-Medium',
                color: '#0989B8',
              }}>
              3
            </Text>
            <Text
              style={{
                marginLeft: 4,
                fontFamily: 'Inter-Medium',
                color: '#0989B8',
              }}>
              Beds
            </Text>
          </View>
          <Text></Text>
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

//make this component available to the app
export default SliderBar;
