//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import BackHeader from '../../shared/components/BackHeader';
import LeftArrow from 'react-native-vector-icons/AntDesign';
import FlatButton from '../../shared/components/FlatButton';
import {
  MotorRequestbyId,
  closeRequestCar,
} from '../../shared/ApiMiddleware/api';
import Loader from '../../shared/components/Loader';
import HorizontalLine from '../../shared/components/HorizontalLine';
import {localizedString} from '../../shared/localization/localization';

// create a component
const RequestDeatilsMotor = props => {
  const [deattils, setdeattils] = useState({});
  const [loading, setloading] = useState(false);
  const {id} = props.route.params;
  // alert(id);
  useEffect(() => {
    setloading(true);

    MotorRequestbyId(id)
      .then(res => {
        if (res.status === 'success') {
          setloading(false);
          setdeattils(res.data);
        } else {
          setloading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const ClosedRequest = () => {
    closeRequestCar(id)
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
          height: '75%',
          //backgroundColor: 'red',
        }}>
        <View
          style={{
            //height: 50,
            width: '100%',
            //padding: 20,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginLeft: 22,
              color: '#141414',
              fontFamily: 'Inter-Bold',
            }}>
            {localizedString.lookingMotor}
          </Text>
          <View
            style={{
              //width: 38,
              //height: 24,
              borderRadius: 5,
              marginTop: 2,
              borderWidth: 1,
              borderColor: '#D3CAD7',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
              padding: 5,
              backgroundColor: '#0989B8',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 11,
                fontFamily: 'Inter-SemiBold',
              }}>
              {localizedString.saleText}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginLeft: 20,
            width: '92%',
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
            flexDirection: 'row',
            marginLeft: 20,
            // backgroundColor: 'red',
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Inter-SemiBold',
                fontSize: 13,
                textAlign: 'left',
              }}>
              {localizedString.makeText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.make?.name}
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
              {localizedString.modelText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.model?.name}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 13,
            width: '80%',
            //backgroundColor: 'red',
            // justifyContent: 'space-between',
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
              {localizedString.colorText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.color}
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
              {localizedString.doorsText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.doors}
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
              {localizedString.transmissionText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
                textAlign: 'left',
              }}>
              {deattils?.transmission}
            </Text>
          </View>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Inter-SemiBold',
                fontSize: 13,
              }}>
              {localizedString.kmDriven}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
                textAlign: 'left',
              }}>
              {deattils?.minKilometers +
                ' KM' +
                ' - ' +
                deattils?.maxKilometers +
                ' KM'}
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
              {localizedString.cylinderText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.cylinders}
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
                'AED  ' +
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
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Inter-SemiBold',
                fontSize: 13,
                textAlign: 'left',
              }}>
              {localizedString.yearText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.minYear + '-' + deattils?.maxYear}
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
              {localizedString.regionalSpecificationText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.regionalSpecification}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 13,
            width: '60%',
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
              {localizedString.warranty}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {deattils?.warranty ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          //padding: 20,
          width: '100%',
          height: '20%',
          //backgroundColor: 'yellow',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}>
        {deattils?.isFulFilled === false ? (
          <FlatButton
            label={localizedString.closerequest}
            labelStyle={{
              color: '#989898',
              fontSize: 17,
            }}
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

export default RequestDeatilsMotor;
