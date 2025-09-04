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
  Keyboard,
  SafeAreaView,
} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import FeaturedMotors from '../../shared/components/FeaturedMotor';
import CityType from '../../shared/components/CityType';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  FilterAllfaeturedMotors,
  getAllCities,
} from '../../shared/ApiMiddleware/api';
import Loader from '../../shared/components/Loader';
import BackHeader from '../../shared/components/BackHeader';

import {motorMasterData} from '../../shared/Constant/Constant';
import {localizedString} from '../../shared/localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
// create a component
const MotorProperty = ({navigation, route}) => {
  const {RtlStyles, isRtl} = useRtlContext();

  const [featuredData, setfeaturedData] = useState([]);
  const [RecentData, setRecentData] = useState([]);
  const [cities, setCities] = useState([]);
  const [featuredoffset, setfeaturedoffset] = useState(0);
  const [recentoffset, setrecentoffset] = useState(0);
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

  const Trendinglist = () => {
    return RecentData.map((element, i) => {
      return (
        <FeaturedMotors
          key={i}
          onClick={() => NavigateToPropertyDeatilsScreen(element.id, 'Motor')}
          conatinerStyle={{width: '45%', marginTop: 8, marginLeft: 10}}
          item={element}></FeaturedMotors>
      );
    });
  };
  const NavigateToPropertyDeatilsScreen = (id, name) => {
    navigation.navigate('PropertyDeatils', {
      id: id,
      name: name,
    });
  };
  const NavigateToCityPropertyScreen = (id, name, image, cityname) => {
    navigation.navigate('CityProperty', {
      id: id,
      name: name,
      image: image,
      cityname: cityname,
    });
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 2;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  function LoadMorefeaturedMotor() {
    // load more feature data
    setfeaturedoffset(featuredoffset + 1);
  }
  const featuredMotor = () => {
    // FEATUREpROPRTY APIS

    let motorData = {
      Skip: featuredoffset * 10,
      PageSize: 10,
      PriceMin: 0,
      PriceMax: motorMasterData?.value,
      FeaturedOnly: true,
    };

    FilterAllfaeturedMotors(motorData)
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

  function LoadMorerecentMotor() {
    // load more RECENT  data
    //alert(recentoffset);
    setrecentoffset(recentoffset + 1);
  }

  const recentMotor = () => {
    // RECENT PROPRTY FUNCTION API

    let motorData = {
      Skip: recentoffset * 10,
      PageSize: 10,
      PriceMin: 0,
      PriceMax: motorMasterData?.value,
      IsRecent: true,
    };

    FilterAllfaeturedMotors(motorData)
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
    setloading(true);
    AllCities();
  }, []);

  useEffect(() => {
    featuredMotor();
  }, [featuredoffset]);

  useEffect(() => {
    // alert(recentoffset);
    recentMotor();
  }, [recentoffset]);

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <Loader show={loading} />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            //alert('scroll end');
            LoadMorerecentMotor();
          }
        }}
        scrollEventThrottle={1000}>
        <View style={styles.topContainer}>
          {/* <View style={styles.topHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <Image
                cover
                resizeMode="cover"
                style={{marginLeft: 30}}
                source={require('../../shared/assests/Profile/arrow.png')}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '73%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#191919',
                  fontFamily: 'Inter-Bold',
                  fontSize: 18,
                }}>
                Motors
              </Text>
            </View>
          </View> */}
          <BackHeader
            title={localizedString.motorheadingText}
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <SearchBar
              placeholder={localizedString.perfectmotorText}
              onPress={() => console.log('')}
              onChangeText={text => console.log(text)}
              style={{
                borderRadius: 7,
                height: 48,
                borderColor: '#19191933',
                backgroundColor: '#F1F3F5',
                borderWidth: 1,
                width: '89%',
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
                navigation.navigate('CarFilter');
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
              width: '96%',
              marginLeft: 22,
              ...RtlStyles.containerRow,

              //backgroundColor: 'red',
            }}>
            <Text
              style={{color: 'black', fontSize: 15, fontFamily: 'Inter-Bold'}}>
              {localizedString.featuredmotorText}
            </Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={featuredData}
            // data={[
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
            style={{marginTop: 4, marginLeft: 10}}
            renderItem={({item, i}) => (
              <FeaturedMotors
                key={i}
                conatinerStyle={{width: 230}}
                onClick={() =>
                  NavigateToPropertyDeatilsScreen(item.id, 'Motor')
                }
                item={item}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={LoadMorefeaturedMotor}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<View style={{width: 18}}></View>}
          />

          {/* <Banner image="https://png.pngtree.com/png-clipart/20200727/original/pngtree-modern-website-abstract-banner-png-image_5363605.jpg" /> */}

          <View
            style={{
              //height: 20,
              width: '96%',
              marginLeft: 22,
              marginTop: 8,
              ...RtlStyles.containerRow,
              //backgroundColor: 'red',
            }}>
            <Text
              style={{color: 'black', fontSize: 15, fontFamily: 'Inter-Bold'}}>
              {localizedString.exploreCititesText}
            </Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={cities}
            // data={[
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
            // ]}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 7, marginLeft: 10}}
            renderItem={({item, i}) => (
              <CityType
                key={i}
                name="Motor"
                onClick={() =>
                  NavigateToCityPropertyScreen(
                    item.id,
                    'Motor',
                    item.thumbnail,
                    item.name,
                  )
                }
                item={item}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{width: 18}}></View>}
          />

          <View
            style={{
              width: '96%',
              ...RtlStyles.containerRow,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontFamily: 'Inter-Bold',
                marginLeft: 22,
                marginTop: 8,
                //padding: 16,
              }}>
              {localizedString.recentlyPublishedmotors}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: 10,
            // marginLeft: 12,
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
    height: 120,
    width: '100%',
    backgroundColor: '#F1F3F5',
  },
  topHeader: {
    //justifyContent: 'space-between',
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

export default MotorProperty;
