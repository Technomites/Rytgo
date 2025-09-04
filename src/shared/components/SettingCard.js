//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import HorizontalLine from '../components/HorizontalLine';
import AIcon from 'react-native-vector-icons//AntDesign';

// create a component
const SettingCard = props => {
  return (
    <View style={{width: '100%', height: 70}}>
      <HorizontalLine />
      <View
        style={{
          width: '100%',
          height: '100%',
          //backgroundColor: 'blue',
          //justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
          ...props.languagestyle,
        }}>
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            marginLeft: 20,
            ...props.languagestyle,
          }}>
          <Image
            resizeMode="cover"
            //style={{width: 16, height: 16, marginLeft: 2}}
            source={props.imgPath}
          />
          <Text
            style={{
              color: '#191919',
              fontFamily: 'Inter-SemiBold',
              fontSize: 15,
              //marginLeft: 30,
              marginHorizontal: 18,
              marginTop: 7,
            }}>
            {props.heading}
          </Text>
        </View>
        {/* <Image
          resizeMode="cover"
          // style={{width: 16, height: 16, marginLeft: 2}}
          source={require('../../shared/assests/Profile/forward.png')}
        /> */}
        <AIcon
          name="caretright"
          size={12}
          color="#0989B8"
          style={{marginLeft: 8, ...props.iconstyle}}
        />
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
export default SettingCard;
