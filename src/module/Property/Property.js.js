/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

import React, {Component, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import PropertyType from '../../shared/components/PropertyType';
import FeaturedProperty1 from '../../shared/components/FeaturedProperty';
import FeaturedMotor1 from '../../shared/components/FeaturedMotor';
import Banner from '../../shared/components/Banner';
import Blogs from '../../shared/components/Blogs';
import CityType from '../../shared/components/CityType';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {localizedString} from '../../shared/localization/localization';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FilterAllfaeturedMotors,
  FilterAllfaeturedProperty,
  getAllCities,
} from '../../shared/ApiMiddleware/api';
import Loader from '../../shared/components/Loader';

import {
  propertyMasterData,
  motorMasterData,
} from '../../shared/Constant/Constant';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const Property = ({navigation, route}) => {
  const {RtlStyles, isRtl} = useRtlContext();
  const {name} = route.params;
  //alert(name);
  const [featuredData, setfeaturedData] = useState([]);
  const [RecentData, setRecentData] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setloading] = useState(false);
  const DATA = [
    {
      image: require('../../shared/assests/home/Rent.png'),
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      image: require('../../shared/assests/home/Rent.png'),
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      image: require('../../shared/assests/home/Rent.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const TRENDINGDATA = [
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const list = () => {
    return DATA.map((element, i) => {
      return (
        <FeaturedProperty
          key={i}
          onClick={() =>
            NavigateToPropertyDeatilsScreen(element.id, 'Property')
          }
          item={element}></FeaturedProperty>
      );
    });
  };

  const Trendinglist = () => {
    return RecentData.map((element, i) => {
      {
        return name === 'Sale' || name === 'Rent' ? (
          <FeaturedProperty1
            conatinerStyle={{width: '45%', marginTop: 9}}
            key={i}
            onClick={() =>
              NavigateToPropertyDeatilsScreen(element.id, 'Property')
            }
            item={element}
          />
        ) : (
          <FeaturedMotor1
            conatinerStyle={{width: '45%', marginTop: 9}}
            key={i}
            onClick={() => NavigateToPropertyDeatilsScreen(element.id, 'Motor')}
            item={element}
          />
        );
      }

      //     <FeaturedProperty1
      //       conatinerStyle={{width: '45%', marginTop: 14}}
      //       item={element}
      //       key={i}
      //       onClick={NavigateToPropertyDeatilsScreen}></FeaturedProperty1>
      //   );
      // });
    });
  };
  const NavigateToPropertyDeatilsScreen = (id, name) => {
    navigation.navigate('PropertyDeatils', {id: id, name: name});
  };

  const NavigateToCityPropertyScreen = (id, name, image, type, cityname) => {
    navigation.navigate('CityProperty', {
      id: id,
      name: name,
      image: image,
      type: type,
      cityname: cityname,
    });
  };
  const FeaturedProperty = () => {
    //Faetured Property Sale / Rent

    let propertyData = {
      Skip: 0,
      PageSize: 50,
      PriceMin: 0,
      PriceMax: propertyMasterData?.price, //12000000,
      FeaturedOnly: true,
      ForSale: name === 'Sale' ? true : false,
    };

    FilterAllfaeturedProperty(propertyData)
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          setfeaturedData([...featuredData, ...res.data]);
        } else {
          //seterrorValidation(res.error + '.No user found');
          //console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const FeaturedMotors = () => {
    //Featured Motors there is no sale and rent in motors
    let MotorData = {
      Skip: 0,
      PageSize: 50,
      PriceMin: 0,
      PriceMax: motorMasterData?.value, //12000000,
      FeaturedOnly: true,
    };

    FilterAllfaeturedMotors(MotorData)
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          setfeaturedData([...featuredData, ...res.data]);
        } else {
          //seterrorValidation(res.error + '.No user found');
          //console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const RecentProperty = () => {
    //Recent Property Sale / Rent
    let propertyData = {
      Skip: 0,
      PageSize: 50,
      PriceMin: 0,
      PriceMax: propertyMasterData?.price,
      IsRecent: true,
      ForSale: name === 'Sale' ? true : false,
    };

    FilterAllfaeturedProperty(propertyData)
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          setRecentData([...RecentData, ...res.data]);
        } else {
          //seterrorValidation(res.error + '.No user found');
          //console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const RecentMotor = () => {
    //Recent Motor there is no sale and rent in motor
    let MotorData = {
      Skip: 0,
      PageSize: 50,
      PriceMin: 0,
      PriceMax: motorMasterData?.value, //12000000,
      IsRecent: true,
    };

    FilterAllfaeturedMotors(MotorData)
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          setRecentData([...RecentData, ...res.data]);
        } else {
          //seterrorValidation(res.error + '.No user found');
          //console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const AllCities = () => {
    getAllCities()
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          setCities(res.cities);
          setloading(false);
        } else {
          setloading(false);
          //seterrorValidation(res.error + '.No user found');
          //console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (name === 'Sale' || name === 'Rent') {
      setloading(true);
      FeaturedProperty();
      RecentProperty();
    } else if (name === 'Motor') {
      setloading(true);
      //alert('Motors call');
      FeaturedMotors();
      RecentMotor();
    }
    AllCities();
  }, []);

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <Loader show={loading} />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}>
        <View style={styles.topContainer}>
          <View style={styles.topHeader}>
            <TouchableOpacity
              //style={{height: 80, width: 80, backgroundColor: 'red'}}
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
              onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={20}
                color="#191919"
                style={{marginLeft: 20}}
              />
            </TouchableOpacity>
            <Image
              resizeMode="cover"
              style={{marginRight: 20}}
              source={require('../../shared/assests/home/logo.png')}
            />
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <SearchBar
              placeholder={localizedString.homePlaceholder}
              onPress={() => console.log('preessss')}
              onChangeText={text => console.log(text)}
              style={{
                borderRadius: 7,
                height: 48,
                borderColor: 'lightgray',
                borderWidth: 1,
                width: '90%',
                backgroundColor: '#F1F3F5',

                //marginBottom: 200,
              }}
              placeholderTextColor="#19191950"
              textInputStyle={{
                fontSize: 15,
                textAlign: isRtl ? 'right' : 'left',
              }}
              clearIconImageSource=""
              onFocus={() => {
                Keyboard.dismiss();
                name === 'Sale' || name === 'Rent'
                  ? navigation.navigate('PropertyFilter', {type: name})
                  : navigation.navigate('CarFilter');
              }}
            />
            {/* <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#0989B8',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign
                name="filter"
                size={30}
                color="white"
                onPress={() => navigation.navigate('Filter')}
              />
            </View> */}
          </View>
        </View>

        <View style={{backgroundColor: '#F1F3F5', width: '100%'}}>
          <View
            style={{
              //height: 20,
              width: '100%',
              ...RtlStyles.containerRow,

              //backgroundColor: 'red',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginHorizontal: 18,
              }}>
              {localizedString.propertyFeaturedText}{' '}
              {name === 'Rent' ? localizedString.rentText : ''}
              {name === 'Sale' ? localizedString.saleText : ''}
              {name === 'Motor' ? localizedString.motorText : ''}
            </Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={featuredData}
            //   [
            //   {
            //     image: require('../../shared/assests/property/Rectangle1881.png'),
            //     name: 'Robbies Management',
            //     distance: '2 miles',
            //     status: 'Student',
            //   },
            //   {
            //     image: require('../../shared/assests/property/Rectangle1881.png'),
            //     name: 'Oltra Loca Por Ahi',
            //     distance: '2 miles',
            //     status: 'Instrutor',
            //   },
            //   {
            //     image: require('../../shared/assests/property/Rectangle1881.png'),
            //     name: 'Pepe Pingolete',
            //     distance: '2 miles',
            //     status: 'Student',
            //   },
            //   {
            //     image: require('../../shared/assests/property/Rectangle1881.png'),
            //     name: 'El Pingu',
            //     distance: '2 miles',
            //     status: 'Instrutor',
            //   },
            // ]}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 3, marginLeft: 6}}
            renderItem={({item, i}) =>
              name === 'Sale' || name === 'Rent' ? (
                <FeaturedProperty1
                  conatinerStyle={{width: 230, marginTop: 5}}
                  key={i}
                  onClick={() =>
                    NavigateToPropertyDeatilsScreen(item.id, 'Property')
                  }
                  item={item}
                />
              ) : (
                <FeaturedMotor1
                  key={i}
                  conatinerStyle={{width: 230, marginTop: 5}}
                  onClick={() =>
                    NavigateToPropertyDeatilsScreen(item.id, 'Motor')
                  }
                  item={item}
                />
              )
            }
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{width: 14}}></View>}
          />

          {/* <Banner image="https://png.pngtree.com/png-clipart/20200727/original/pngtree-modern-website-abstract-banner-png-image_5363605.jpg" /> */}

          <View
            style={{
              //height: 20,
              width: '100%',
              marginTop: 9,
              ...RtlStyles.containerRow,
              //backgroundColor: 'red',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginHorizontal: 18,
              }}>
              {localizedString.exploreCititesText}
            </Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={
              cities
              //   {
              //     image: require('../../shared/assests/home/Car.png'),
              //     name: 'Robbies Management',
              //     distance: '2 miles',
              //     status: 'Student',
              //   },
              //   {
              //     image: require('../../shared/assests/home/Car.png'),
              //     name: 'Oltra Loca Por Ahi',
              //     distance: '2 miles',
              //     status: 'Instrutor',
              //   },
              //   {
              //     image: require('../../shared/assests/home/Car.png'),
              //     name: 'Pepe Pingolete',
              //     distance: '2 miles',
              //     status: 'Student',
              //   },
              //   {
              //     image: require('../../shared/assests/home/Car.png'),
              //     name: 'El Pingu',
              //     distance: '2 miles',
              //     status: 'Instrutor',
              //   },
              //]}
            }
            showsVerticalScrollIndicator={false}
            style={{marginTop: 9, marginLeft: 4}}
            renderItem={({item, i}) => (
              <CityType
                key={i}
                onClick={() =>
                  NavigateToCityPropertyScreen(
                    item.id,
                    name === 'Sale' || name === 'Rent' ? 'Property' : 'Motor',
                    item.thumbnail,
                    name,
                    item.name,
                  )
                }
                item={item}
                name={name === 'Sale' || name === 'Rent' ? 'Property' : 'Motor'}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{width: 14}}></View>}
          />

          <View
            style={{
              width: '100%',
              ...RtlStyles.containerRow,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 9,
                marginHorizontal: 17,
                //padding: 16,
              }}>
              {localizedString.propertyRecentText}{' '}
              {name === 'Rent' ? localizedString.rentText : ''}
              {name === 'Sale' ? localizedString.saleText : ''}
              {name === 'Motor' ? localizedString.motorText : ''}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {Trendinglist()}
        </View>
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F1F3F5',
  },
  topContainer: {
    height: 130,
    width: '100%',
    backgroundColor: '#F1F3F5',
  },
  topHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    marginTop: 20,
    backgroundColor: '#F1F3F5',
  },
  propertryContainer: {
    //height: 120,
    //flex: 1,
    bottom: 30,
    width: '100%',
    backgroundColor: '#F1F3F5',
    //height: 300,
  },
});

export default Property;
