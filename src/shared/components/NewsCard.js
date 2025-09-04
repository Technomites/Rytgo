import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import FlatButton from '../../shared/components/FlatButton';
import AIcon from 'react-native-vector-icons/Entypo';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

const NewsCard = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onClick}
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

        //height: 250,
        //backgroundColor: '#FFFFFF',
        //borderBottomEndRadius: 10,
        //borderBottomLeftRadius: 10,
        //marginTop: 12,
      }}>
      <View
        style={{
          width: '90%',
          //height: 250,
          backgroundColor: '#FFFFFF',
          //borderBottomEndRadius: 4,
          //borderBottomLeftRadius: 4,
          marginTop: 0,
          // shadowColor: '#000',
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 1,
          // },
          // shadowOpacity: 0.2,
          // shadowRadius: 1.41,

          // elevation: 2,
        }}>
        <ImageBackground
          //resizeMode="cover"
          style={{
            width: '100%',
            height: 130,
          }}
          imageStyle={{}}
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
                borderRadius: 3,
              }}
              labelStyle={{fontSize: 11}}></FlatButton>
          </View>
        </ImageBackground>
        <View
          style={{
            width: '95%',
            marginTop: 13,
            justifyContent: 'center',
            marginLeft: 12,

            //alignItems: 'center',
          }}>
          <Text
            numberOfLines={2}
            style={{
              color: '#191919',
              fontSize: 14,
              fontFamily: 'Inter-SemiBold',
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
              marginTop: 4,
              textAlign: isRtl ? 'right' : 'left',
            }}>
            {props.item?.description}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            //justifyContent: 'space-between',
            marginTop: 14,
            marginLeft: 12,
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row', width: '50%'}}>
            {/* <Image
              resizeMode="contain"
              style={{marginTop: 2}}
              source={require('../../shared/assests/NewsFeed/date.png')}
            /> */}
            <AIcon
              name="calendar"
              size={13}
              color="#0989B8"
              style={{marginTop: 1}}
            />
            <Text
              style={{
                color: '#989898',
                fontSize: 12,
                marginLeft: 5,
                //marginBottom: 6,
                //marginTop: 10,
              }}>
              {props.item?.createdOn.split('T')[0]}
            </Text>
          </View>
          <View
            style={{
              //backgroundColor: 'red',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              width: '50%',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: '#0989B8',
                fontWeight: 'bold',
                marginHorizontal: 24,
                marginBottom: 8,
                textTransform: 'uppercase',
              }}>
              {props.readmore}
            </Text>
          </View>
        </View>
      </View>
      <Text></Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default NewsCard;
