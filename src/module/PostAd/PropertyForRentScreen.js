import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';

import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';

import {
  propertyfiltersCategory,
  carfiltersCategory,
} from '../../shared/ApiMiddleware/api';
import Loader from '../../shared/components/Loader';
import {localizedString} from '../../shared/localization/localization';

const PropertyForRentScreen = props => {
  const {name, forsale, type} = props.route.params;
  //alert(name);
  const [deattils, setdeattils] = useState({});
  const [loading, setloading] = useState(false);
  const rantAddList = [
    {
      id: 1,
      name: 'Appartment',
    },
    {
      id: 2,
      name: 'Houses',
    },
    {
      id: 3,
      name: 'Retail',
    },
    {
      id: 4,
      name: 'Condos',
    },
    {
      id: 5,
      name: 'Offices',
    },
    {
      id: 6,
      name: 'Villas',
    },
  ];
  useEffect(() => {
    setloading(true);
    if (name === 'Property') {
      propertyfiltersCategory(type)
        .then(res => {
          if (res.status === true) {
            setloading(false);
            setdeattils(res.data);
          } else {
            setloading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      carfiltersCategory()
        .then(res => {
          if (res.status === true) {
            setloading(false);
            setdeattils(res.data);
          } else {
            setloading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: '#F6F8F9'}}>
      <Loader show={loading} />
      <ScrollView style={{height: '100%', width: '100%'}}>
        <BackHeader
          title={localizedString.createRequest}
          onPress={() => props.navigation.goBack()}
        />
        {/* TOP HEADING */}
        <View
          style={{
            height: 70,
            marginTop: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '10%',
              width: '10%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.blue,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.blue,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.gray,
                borderRadius: 10,
              }}></View>
          </View>

          <View
            style={{
              height: '70%',
              width: '55%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: colors.black,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {localizedString.rightcategory}
            </Text>
            <Text
              style={{fontSize: 13, color: 'gray', fontWeight: '400'}}></Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{width: '90%'}}>
            {deattils &&
              deattils.length > 0 &&
              deattils.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (name === 'Property') {
                        props.navigation.navigate('PostAnAddStep3', {
                          id: item.id,
                          forsale: forsale,
                        });
                      } else {
                        props.navigation.navigate('PostAnAddStepMotor', {
                          id: item.id,
                        });
                      }
                    }}
                    style={Styles.tileContainer}
                    key={item.index}>
                    <Text style={Styles.listTextStyle}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tileContainer: {
    height: 51,
    width: '100%',
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTextStyle: {
    fontSize: 15,
    color: colors.black,
    fontWeight: '600',
  },
});

export default PropertyForRentScreen;
