import React, {useState, useRef} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Image,
} from 'react-native';
import IoIcon from './Icon/IoIcon';
import {colors} from '../themes/theme';
import MapView from 'react-native-maps';
import FlatButton from './FlatButton';
import Icon from 'react-native-vector-icons/Entypo';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import {localizedString} from '../localization/localization';
// import AuthButton from "../../Components/UISupport/AuthButton"
const LocationpickerModal = props => {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const map = useRef();
  const [text, settext] = useState('');
  const [long, setlong] = useState('55.2708');
  const [lat, setlat] = useState('25.2048');

  const getAddress = myCoordinates => {
    map.current.addressForCoordinate(myCoordinates).then(address => {
      console.log(address);
      props.setAdress(
        address.locality === null ? address.name : address.locality,
        props.title,
      );
    });
  };
  return (
    // <View style={{flex: 1}}>

    <Modal animationType="slide" transparent={true} visible={props.modalPopUp}>
      <View
        style={{
          //   flex: 1,
          backgroundColor: '#19191980',
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
        <View
          style={{
            height: '90%',
            width: '95%',
            backgroundColor: 'white',
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 28,
            // position: 'absolute',
            // backgroundColor: 'red',
          }}>
          <View style={{height: '100%', width: '90%', marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                //backgroundColor: 'red',
                ...RtlStyles.containerRow,
              }}>
              <Text
                style={{
                  fontSize: 21,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {localizedString.enterlocationText}
              </Text>
              <View
                style={{
                  alignItems: isRtl ? 'flex-start' : 'flex-end',
                  //justifyContent: 'flex-end',
                  width: isRtl ? '70%' : '60%',
                  //backgroundColor: 'yellow',
                }}>
                <Icon name="cross" size={26} onPress={() => props.onCancel()} />
              </View>
            </View>

            <View
              style={{
                marginVertical: 5,
                marginTop: 7,
                ...RtlStyles.containerRow,
              }}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                {localizedString.addressText}
              </Text>
            </View>

            <View
              style={{
                height: 50,
                width: '100%',
                borderRadius: 5,
                borderColor: 'lightgray',
                borderWidth: 1,
                flexDirection: 'row',
                //...RtlStyles.containerRow,
              }}>
              <View style={{width: '85%', justifyContent: 'center'}}>
                <TextInput
                  onChangeText={props.pickerSearch}
                  style={{marginHorizontal: 20}}
                  placeholder={localizedString.searchAddress}
                />
              </View>

              <View
                style={{
                  height: 50,
                  width: '15%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IoIcon name="search" size={15} color="gray" />
              </View>
            </View>
            <View
              style={{
                // height: '20%',
                width: '100%',
                marginTop: 10,
                zIndex: 100,
                // position: 'absolute',
                backgroundColor: 'gray',
                //borderColor: 'red',

                // backgroundColor: 'red',
              }}>
              {props.children}
              {/* <View style={{ marginTop: 10 }}>
                  <AuthButton title="Cancel" onPress={props.onCancel} />
                </View> */}
            </View>
            <View
              style={{
                height: '90%',
                width: '100%',
                zIndex: 0,
                // position: 'absolute',
                // marginVertical: 4,
                // borderRadius: 20,
                // backgroundColor: 'yellow',
                // zIndex: 300,
                // position: 'absolute',
              }}>
              <MapView
                style={{
                  height: '74%',
                  width: '100%',
                  borderRadius: 2,
                }}
                scrollEnabled={true}
                ref={map}
                region={{
                  latitude: Number(props.mapcordinates.latitude),
                  longitude: Number(props.mapcordinates.longitude),
                  latitudeDelta: 1,
                  longitudeDelta: 1,
                }}>
                <MapView.Marker.Animated
                  draggable
                  coordinate={{
                    latitude: Number(props.mapcordinates.latitude),
                    longitude: Number(props.mapcordinates.longitude),
                  }}
                  onDrag={e => {
                    console.log('drag', e.nativeEvent.coordinate);
                  }}
                  onDragEnd={e => {
                    console.log('dragEnd', e.nativeEvent);
                    //setlong(e.nativeEvent.coordinate.longitude);
                    //setlat(e.nativeEvent.coordinate.latitude);
                    props.funsetmapCordinates(e.nativeEvent.coordinate);
                    // getAddress(e.nativeEvent.coordinate);
                    props.getaddress(
                      e.nativeEvent.coordinate.latitude,
                      e.nativeEvent.coordinate.longitude,
                    );
                  }}>
                  <Image
                    resizeMode="cover"
                    source={require('../../shared/assests/postad/mappin.png')}
                    style={{height: 36, width: 36}}
                  />
                </MapView.Marker.Animated>
              </MapView>
            </View>

            <FlatButton
              label={localizedString.locationConfirm}
              buttonStyle={{
                width: '88%',
                backgroundColor: '#0989B8',
                position: 'absolute',
                bottom: 15,
                right: 0,
                borderRadius: 8,
                left: 20,
                paddingVertical: 15,
              }}
              labelStyle={{
                textTransform: 'uppercase',
                fontSize: 14,
                color: '#FFFFFF',
              }}
              onPress={() => props.onCancel()}></FlatButton>
          </View>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({});

export default LocationpickerModal;
