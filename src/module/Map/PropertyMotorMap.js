//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import IoIcon from '../../shared/components/Icon/IoIcon';

// create a component
const PropertyMotorMap = props => {
  const {lon, lat} = props.route.params;
  console.log(lon);
  return (
    <>
      <MapView
        // provider={PROVIDER_GOOGLE}
        scrollEnabled={false}
        initialRegion={{
          latitude:
            lat !== null && lat !== '' && lat !== undefined
              ? parseFloat(lat)
              : 25.276987,
          longitude:
            lon !== null && lon !== '' && lon !== undefined
              ? parseFloat(lon)
              : 55.296249,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}>
        <MapView.Marker
          coordinate={{
            latitude:
              lat !== null && lat !== '' && lat !== undefined
                ? parseFloat(lat)
                : 25.276987,
            longitude:
              lon !== null && lon !== '' && lon !== undefined
                ? parseFloat(lon)
                : 55.296249,
          }}>
          <Image
            resizeMode="cover"
            source={require('../../shared/assests/postad/mappin.png')}
            style={{height: 36, width: 36}}
          />
        </MapView.Marker>
      </MapView>
      <View
        style={{
          position: 'absolute',
          width: '40%',
          height: '40%',
          //backgroundColor: 'red',
          padding: 30,
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            height: 50,
            width: 50,
            //backgroundColor: 'white',
            justifyContent: 'center',
            // paddingLeft: 10,
          }}>
          <IoIcon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </>
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
  map: {
    width: '100%',
    height: '100%',
  },
});

//make this component available to the app
export default PropertyMotorMap;
