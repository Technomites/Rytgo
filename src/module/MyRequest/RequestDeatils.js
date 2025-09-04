//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import BackHeader from '../../shared/components/BackHeader';
import LeftArrow from 'react-native-vector-icons/AntDesign';
import FlatButton from '../../shared/components/FlatButton';
import {
  PropertyRequestbyId,
  closeRequestProperty,
} from '../../shared/ApiMiddleware/api';
import Loader from '../../shared/components/Loader';
import HorizontalLine from '../../shared/components/HorizontalLine';
import MapView from 'react-native-maps';
import {localizedString} from '../../shared/localization/localization';

// create a component
const RequestDeatils = props => {
  const [deattils, setdeattils] = useState({});
  const [loading, setloading] = useState(false);
  const [latitude, setlatitude] = useState('25.2048');
  const [longitude, setlongitude] = useState('55.2708');

  const {id} = props.route.params;
  // alert(id);
  useEffect(() => {
    setloading(true);

    PropertyRequestbyId(id)
      .then(res => {
        if (res.status === 'success') {
          setloading(false);
          setdeattils(res.data);
          setlongitude(res.data.longitude);
          setlatitude(res.data.latitude);
        } else {
          setloading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const ClosedRequest = () => {
    closeRequestProperty(id)
      .then(res => {
        if (res.status === 'success') {
          props.navigation.goBack();
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#F6F8F9',
        width: '100%',
        //padding: 20,
      }}>
      <Loader show={loading} />
      <BackHeader
        title={localizedString.requestdeatils}
        onPress={() => props.navigation.goBack()}
      />
      <View
        style={{
          //padding: 20,
          width: '100%',
          height: '80%',
          //backgroundColor: 'red',
        }}>
        <View
          style={{
            //height: 50,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            //backgroundColor: 'red',
          }}>
          <Text
            style={{
              marginLeft: 22,
              marginTop: 2,
              color: '#141414',
              fontFamily: 'Inter-Bold',
            }}>
            {localizedString.lookingproperttext}
          </Text>
          <View
            style={{
              width: 38,
              height: 24,
              borderRadius: 5,
              marginTop: 2,
              borderWidth: 1,
              borderColor: '#D3CAD7',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
              backgroundColor: '#0989B8',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 11,
                fontFamily: 'Inter-SemiBold',
              }}>
              {deattils?.status}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginLeft: 20,
            width: '92%',
            //backgroundColor: 'red',
          }}>
          <Text
            style={{
              //marginLeft: 12,
              color: '#141414',
              fontFamily: 'Inter-Bold',
              textAlign: 'left',
            }}>
            {localizedString.descriptionText}
          </Text>

          <Text
            numberOfLines={4}
            style={{
              //marginLeft: 12,
              color: '#989898',
              fontFamily: 'Inter-Medium',
              fontSize: 12,
            }}>
            {deattils?.description}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            marginTop: 10,
            //alignItems: 'center',
            //justifyContent: 'center',
          }}>
          <HorizontalLine />
        </View>
        <View
          style={{
            marginTop: 13,
            width: '80%',
            //justifyContent: 'space-between',
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Inter-SemiBold',
                fontSize: 13,
                textAlign: 'left',
              }}>
              {localizedString.roomsNumber}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.noOfRooms}
            </Text>
          </View>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Inter-SemiBold',
                fontSize: 13,
                textAlign: 'left',
              }}>
              {localizedString.bathsNumber}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.noOfBathRooms}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 13,
            width: '80%',
            //backgroundColor: 'red',
            //justifyContent: 'space-between',
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Inter-SemiBold',
                fontSize: 13,
                textAlign: 'left',
              }}>
              {localizedString.sizeText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.size}
            </Text>
          </View>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Inter-SemiBold',
                fontSize: 13,
                textAlign: 'left',
              }}>
              {localizedString.priceText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {'AED ' +
                deattils?.minPrice +
                ' - ' +
                'AED ' +
                deattils?.maxPrice}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 13,
            width: '80%',
            //backgroundColor: 'red',
            //justifyContent: 'space-between',
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <View style={{width: '90%'}}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Inter-SemiBold',
                fontSize: 13,
                textAlign: 'left',
              }}>
              {localizedString.locationText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.address}
            </Text>
          </View>
        </View>
        <View
          style={{
            // width: '100%',
            // height: '60%',
            alignItems: 'center',
            // backgroundColor: 'red',
            borderRadius: 30,
            overflow: 'hidden',
            position: 'relative',
          }}>
          <MapView
            style={{
              height: '53%',
              width: '90%',
              borderRadius: 50,
              marginTop: 10,
            }}
            scrollEnabled={false}
            region={{
              latitude: Number(latitude),
              longitude: Number(longitude),
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}>
            <MapView.Marker.Animated
              coordinate={{
                latitude: Number(latitude),
                longitude: Number(longitude),
              }}>
              <Image
                resizeMode="contain"
                source={require('../../shared/assests/postad/mappin.png')}
                style={{height: 36, width: 36}}
              />
            </MapView.Marker.Animated>
          </MapView>
          <View
            style={{
              height: '53%',
              width: '90%',
              position: 'absolute',
              marginTop: 10,
              backgroundColor: `rgba(0,0,0,${0.4})`,
              borderRadius: 7,
            }}></View>
        </View>
      </View>
      <View
        style={{
          //padding: 20,
          width: '100%',
          height: '20%',
          // backgroundColor: 'yellow',
          alignItems: 'center',
          //justifyContent: 'center',
          marginTop: 2,
        }}>
        {deattils?.isFulFilled === false ? (
          <FlatButton
            label={localizedString.closerequest}
            buttonStyle={{
              width: '84%',
              // marginVertical: 6,
              paddingVertical: 15,
              backgroundColor: '#E5E5E5',
              //marginBottom: 60,
              borderRadius: 6,
            }}
            labelStyle={{
              textTransform: 'uppercase',
              color: '#989898',
              fontSize: 14,
            }}
            onPress={() => ClosedRequest()}></FlatButton>
        ) : null}
      </View>
    </SafeAreaView>
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

export default RequestDeatils;
