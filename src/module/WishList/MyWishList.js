//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';

import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';
import PropertyCard from '../../shared/components/PropertyCard';
import FeaturedMotorWishList from '../../shared/components/FeaturedMotorWishList';
import {getWishList} from '../../shared/ApiMiddleware/api';
import {localizedString} from '../../shared/localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const MyWishList = ({navigation, route}) => {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();

  const [motordData, setmotordData] = useState([]);
  const [propertyData, setpropertyData] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getWishList()
        .then(res => {
          if (res.status === 'success') {
            setmotordData(res.cars);
            setpropertyData(res.properties);
          } else {
            console.log('error');
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
    return unsubscribe;
  }, []);
  const NavigateToPropertyDeatilsScreen = (id, name) => {
    navigation.navigate('PropertyDeatils', {
      id: id,
      name: name,
    });
  };
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: colors.bgGray}}>
      {/* <ScrollView> */}
      <BackHeader
        title={localizedString.wishlistText}
        onPress={() => navigation.navigate('Setting')}
      />
      {!propertyData?.length && !motordData?.length ? (
        <View
          style={{
            //backgroundColor: 'red',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 13, color: 'black'}}>
            There are no items in wishlist
          </Text>
        </View>
      ) : (
        <>
          {propertyData && propertyData.length ? (
            <>
              <View
                style={{
                  //height: 20,
                  // width: '100%',
                  marginHorizontal: 16,
                  marginTop: 12,
                  ...RtlStyles.containerRow,

                  //backgroundColor: 'red',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                  }}>
                  {localizedString.wishlistpropertyText}
                </Text>
              </View>
              <View>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={propertyData}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    borderWidth: 0,
                    backgroundColor: '#F1F3F5',
                    // height: 60,
                    //backgroundColor: 'green',
                    // flex: 1,
                  }}
                  //style={{marginTop: 10}}
                  renderItem={({item, i}) => (
                    <PropertyCard
                      item={item}
                      key={i}
                      conatinerStyle={{width: 230}}
                      onClick={() =>
                        NavigateToPropertyDeatilsScreen(
                          item.productID,
                          'Property',
                        )
                      }
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  ListFooterComponent={<View style={{width: 14}}></View>}
                />
              </View>
            </>
          ) : null}

          {motordData && motordData.length ? (
            <>
              <View
                style={{
                  //height: 20,
                  //width: '100%',
                  //marginLeft: 16,
                  marginHorizontal: 16,
                  marginTop: 12,
                  ...RtlStyles.containerRow,
                  //borderWidth: 10,
                  //backgroundColor: 'red',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                  }}>
                  {localizedString.wishlistmotorText}
                </Text>
              </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={motordData}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  borderWidth: 0,
                  backgroundColor: '#F1F3F5',
                }}
                style={{marginTop: 10}}
                renderItem={({item, i}) => (
                  <FeaturedMotorWishList
                    item={item}
                    key={i}
                    conatinerStyle={{width: 230}}
                    onClick={() =>
                      NavigateToPropertyDeatilsScreen(item.productID, 'Motor')
                    }
                    //onClick={NavigateToPropertyDeatilsScreen}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<View style={{width: 14}}></View>}
              />
            </>
          ) : null}
          {/* </ScrollView> */}
        </>
      )}
    </SafeAreaView>
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
export default MyWishList;
