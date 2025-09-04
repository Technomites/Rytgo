//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

// create a component
const CityType = props => {
  return (
    <View
      style={{
        width: 240,
        height: 100,
        // borderRadius: 45,
        //backgroundColor: 'white',
        elevation: 10,
        shadowColor: '#0000001F',
        //flexDirection: 'row',
        //justifyContent: 'space-evenly',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 13,
        overflow: 'visible',
      }}>
      <View>
        <TouchableOpacity onPress={props.onClick}>
          <ImageBackground
            resizeMode="stretch"
            source={{uri: props.item?.thumbnail}}
            style={{width: 240, height: 100}}
            // imageStyle={{borderRadius: 12}}>
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                //backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>
                {props.item?.name}
              </Text>
              {/* <Text
                style={{fontSize: 15, color: '#FFFFFF90', fontWeight: 'bold'}}>
                {props.name === 'Property'
                  ? ''
                  : //? props.item?.propertyCount?.rent + ' Properties'
                    props.item?.vehicleCount + ' Vehicles'}
              </Text> */}
            </View>
          </ImageBackground>
        </TouchableOpacity>
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
export default CityType;
