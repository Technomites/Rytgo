//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import LeftArrow from 'react-native-vector-icons/AntDesign';

const MyRequestCard = props => {
  return (
    <TouchableOpacity onPress={props.onClick}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: 130,
        }}>
        <View
          style={{
            width: '90%',
            backgroundColor: 'white',
            height: '100%',
            padding: 10,
          }}>
          <View
            style={{
              width: '100%',
              //backgroundColor: 'red',
              height: '50%',
              flexDirection: 'row',
            }}>
            <View style={{width: '90%'}}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: '#191919',
                  fontFamily: 'Inter-Bold',
                }}>
                {props.item?.title}
              </Text>
              <Text
                //adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  color: '#191919',
                  fontFamily: 'Inter-Medium',
                }}>
                {props.item?.description}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 12,
                  color: '#989898',
                  fontFamily: 'Inter-Medium',
                }}>
                {props.item?.creationDate?.split('T')[0]}
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                height: '114%',
                //backgroundColor: 'green',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 22 / 2,
                  borderWidth: 1,
                  borderColor: 'white',
                  backgroundColor: '#0989B8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                  //marginBottom: 60,
                }}>
                <LeftArrow name="arrowright" size={17} color={'white'} />
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              //backgroundColor: 'green',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '50%',
                // backgroundColor: 'red',
              }}>
              <Text
                style={{
                  color: '#989898',
                  fontSize: 11,
                  fontFamily: 'Inter-Medium',
                }}>
                Status
              </Text>
              <Text
                style={{
                  color:
                    props.item?.isFulFilled === true ? '#ff726f' : '#0989B8',
                  fontSize: 14,
                  fontFamily: 'Inter-ExtraBold',
                }}>
                {props.item?.isFulFilled === true ? 'Closed' : 'Open'}
              </Text>
            </View>
            <View
              style={{
                width: '50%',
                //backgroundColor: 'yellow',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                // marginBottom: 20,
              }}>
              <Text
                style={{
                  color: '#0989B8',
                  fontSize: 11,
                  fontFamily: 'Inter-ExtraBold',
                }}>
                {/* View Details */}
              </Text>
              {/* <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  borderWidth: 1,
                  borderColor: 'white',
                  backgroundColor: '#0989B8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                  marginBottom: 60,
                }}>
                <LeftArrow name="arrowright" size={17} color={'white'} />
              </View> */}
            </View>
          </View>
        </View>
      </View>
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

export default MyRequestCard;
