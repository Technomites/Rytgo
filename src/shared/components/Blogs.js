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
import FlatButton from '../components/FlatButton';
import AIcon from 'react-native-vector-icons/Entypo';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
// create a component
const Blogs = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        width: 230,
        //height: 250,
        // flex: 1,
        marginLeft: 16,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 6,
        // },
        // shadowOpacity: 0.37,
        // shadowRadius: 7.49,
        //borderRadius: 4,
        marginTop: 3,
        //elevation: 12,
      }}>
      <TouchableOpacity onPress={props.onClick} activeOpacity={0.7}>
        <ImageBackground
          //resizeMode="cover"
          style={{
            width: '100%',
            height: 136,
          }}
          //imageStyle={{borderRadius: 4}}
          source={{
            uri: props.item?.bannerImage,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'flex-end',
              top: 20,
              left: 10,
              //padding: 9,
            }}>
            <FlatButton
              disabled
              label={props.item?.badge}
              buttonStyle={{
                width: 98,
                //height: 30,
                paddingVertical: 4,
                marginRight: 20,
                backgroundColor: '#0989B8',
                borderRadius: 2,
              }}
              labelStyle={{fontSize: 11}}
              onPress={props.onClick}></FlatButton>
          </View>
        </ImageBackground>

        <View
          style={{
            width: '94%',
            marginTop: 13,
            justifyContent: 'center',
            marginLeft: 12,
            //alignItems: 'center',
          }}>
          <Text
            numberOfLines={2}
            style={{
              color: 'black',
              fontSize: 12,
              fontFamily: 'Inter-Bold',
              textAlign: isRtl ? 'right' : 'left',
            }}>
            {props.item?.title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#989898',
              fontSize: 11,
              fontFamily: 'Inter-Medium',
              marginTop: 3,
              textAlign: isRtl ? 'right' : 'left',
            }}>
            {props.item?.description}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'space-around',
            marginTop: 12,
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row', width: '50%'}}>
            {/* <Image
              resizeMode="contain"
              style={{width: 15, marginTop: 2, marginLeft: 10}}
              source={require('../../shared/assests/NewsFeed/date.png')}
            /> */}
            <AIcon
              name="calendar"
              size={12}
              color="#0989B8"
              style={{width: 15, marginTop: 2, marginLeft: 10}}
            />
            <Text
              style={{
                color: '#989898',
                fontSize: 12,
                marginLeft: 2,
                marginBottom: 1,
              }}>
              {props.item?.createdOn.split('T')[0]}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              //backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 11,
                color: '#0989B8',
                fontWeight: 'bold',
                marginTop: 1,
                marginLeft: 20,
                textTransform: 'uppercase',
              }}>
              {props.readmore}
            </Text>
          </View>
        </View>
        <Text style={{height: 7}}></Text>
      </TouchableOpacity>
      {/* <Text></Text> */}
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
export default Blogs;
