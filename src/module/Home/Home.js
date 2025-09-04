/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import listeners from '../../shared/utils/notificationService';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import PropertyType from '../../shared/components/PropertyType';
import FeaturedMotor from '../../shared/components/FeaturedMotor';
import FeaturedProperty1 from '../../shared/components/FeaturedProperty';
import Banner from '../../shared/components/Banner';
import Blogs from '../../shared/components/Blogs';
import {localizedString} from '../../shared/localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import FlatButton from '../../shared/components/FlatButton';
import {useSelector, useDispatch} from 'react-redux';
import * as HomeAction from '../../redux/action/setWishList';
import * as NotificationAction from '../../redux/action/Notificationaction';
import * as openGuestPopup from '../../redux/action/Guestpopupaction';
import {
  propertyMasterData,
  motorMasterData,
} from '../../shared/Constant/Constant';
import DeviceInfo from 'react-native-device-info';
import {
  FilterAllfaeturedMotors,
  FilterAllfaeturedProperty,
  GetAllBlogs,
  Getbanners,
  trendingProperty,
  trendingCar,
  getnotificationCount,
  getuserProfile,
  sendPushNotifcation,
  getPrice,
  getMotorPrice,
} from '../../shared/ApiMiddleware/api';
import {
  _setToken,
  _setNotificationcount,
  _setUsereProfileData,
  languagee,
  accessToken,
  _setmasterPropertyData,
  _setmasterMotorData,
  _setLanguage,
} from '../../shared/Constant/Constant';

let tokenapi = '';
let propertyprice = 12000000;
let carprice = 12000000;
import Loader from '../../shared/components/Loader';
import messaging from '@react-native-firebase/messaging';
import MIcon from 'react-native-vector-icons/Entypo';
import PopUpModel from '../../shared/components/PopUp';
import SuccessFailModel from '../../shared/components/SuccessFailModel';
import AccessDeniedModel from '../../shared/components/AccessDeniedModel';
import {SliderBox} from 'react-native-image-slider-box';
// create a component

export const TestFunction = () => {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  //console.log('yahooooooooo');
  setLanguage(language !== 'ar' ? 'ar' : 'en');
  alert('yahooooooooo');
};

const Home = ({navigation, route}) => {
  const wishlist = useSelector(state => state.withList.wishlist);
  let popstate = useSelector(state => state.GuestPopup.popup);
  //alert(popstate);
  //console.log('wish -------------------' + wishlist);
  // const notificationCount = useSelector(state => state.Notifications.count);
  // console.log(notificationCount + ' vountt');

  const dispatch = useDispatch();
  const notInitialRendeproperty = useRef(false);

  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const [featuredMotors, setfeaturedMotors] = useState([]);
  const [offset, setOffset] = useState(0);
  const [offsetproperty, setOffsetproperty] = useState(0);
  const [PropertyStartLimit, setPropertyStartLimit] = useState(0);
  const [PropertyLimitsize, setPropertyLimitsize] = useState(10);
  const [featuredProperty, setfeaturedProperty] = useState([]);
  const [blogs, setblogs] = useState([]);
  const [banners, setbanners] = useState([]);

  const [offsettrendingproperty, setoffsettrendingproperty] = useState(0);
  const [trendProperty, settrendProperty] = useState([]);

  const [offsettrendingcar, setoffsettrendingcar] = useState(0);
  const [trendCar, settrendCar] = useState([]);
  const [loading, setloading] = useState(false);
  const [popupvisble, setIspopupvisble] = useState(false);
  const [errorValidation, seterrorValidation] = useState('');

  const [bannerImages, setbannerImages] = useState([
    // 'https://source.unsplash.com/1024x768/?nature',
    // 'https://source.unsplash.com/1024x768/?water',
    // 'https://source.unsplash.com/1024x768/?girl',
    // 'https://source.unsplash.com/1024x768/?tree',
  ]);

  const [bannerdescripation, setbannerdescripation] = useState('');
  const DATA = [
    {
      image: require('../../shared/assests/home/Rent.png'),
      id: 'Property for Rent',
      title: localizedString.rentText,
      name: 'Rent',
    },
    {
      image: require('../../shared/assests/home/Sale.png'),
      id: 'Property for Sale',
      title: localizedString.salesText,
      name: 'Sale',
    },
    {
      image: require('../../shared/assests/home/Motor.png'),
      id: 'Motors',
      title: localizedString.motorText,
      name: 'Motor',
    },
  ];

  const TRENDINGDATA = [
    {
      image: require('../../shared/assests/home/Car.png'),
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Rent Properties',
    },
    {
      image: require('../../shared/assests/home/Car.png'),
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Sale Properties',
    },
    {
      image: require('../../shared/assests/home/Car.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Motors',
    },
  ];
  const list = () => {
    return DATA.map((element, i) => {
      return (
        <PropertyType
          key={i}
          item={element}
          //onClick={() => NavigateToPropertyScreen(element.name)}></PropertyType>
          onClick={() => {
            NavigateToMotorPropertyFiler(i);
          }}></PropertyType>
      );
    });
  };

  const Trendinglist = () => {
    return TRENDINGDATA.map((element, i) => {
      return (
        <FeaturedMotor
          key={i}
          conatinerStyle={{width: '90%', marginTop: 14}}
          item={element}
          // onClick={NavigateToPropertyDeatilsScreen}>
          onClick={() => {
            NavigateToMotorPropertyFiler(i);
          }}></FeaturedMotor>
      );
    });
  };
  const NavigateToPropertyScreen = name => {
    navigation.navigate('Property', {
      name: name,
    });
  };
  const NavigateToPropertyDeatilsScreen = (id, name) => {
    navigation.navigate('PropertyDeatils', {
      id: id,
      name: name,
    });
  };
  const NavigateToBannerPropertyScreen = () => {
    navigation.navigate('MotorProperty');
  };
  const NavigateToBannerCityPropertyScreen = () => {
    navigation.navigate('BannerProperty');
  };
  const NavigateTofeedDeatils = id => {
    navigation.navigate('NewsDeatils', {
      id: id,
    });
  };

  const NavigateToMotorPropertyFiler = index => {
    if (index === 0) {
      navigation.navigate('PropertyFilter', {type: 'Rent'});
    } else if (index === 1) {
      navigation.navigate('PropertyFilter', {type: 'Sale'});
    } else {
      navigation.navigate('CarFilter');
    }
  };

  const SaveUserProfile = async data => {
    _setUsereProfileData(data);
    await AsyncStorage.setItem('ProfileData', JSON.stringify(data));
  };

  const getData = async () => {
    try {
      const pricedata = await AsyncStorage.getItem('masterData');
      const price = await JSON.parse(pricedata);
      if (price !== null) {
        //alert(price.price);
        _setmasterPropertyData(price);
        propertyprice = price.price;
      }
      const pricedataMotor = await AsyncStorage.getItem('masterDataMotor');
      const pricemotor = await JSON.parse(pricedataMotor);
      if (pricemotor !== null) {
        //alert(pricemotor.value);
        _setmasterMotorData(pricemotor);
        carprice = pricemotor.value;
      }

      const value = await AsyncStorage.getItem('UserDataLogin');
      const token = await JSON.parse(value);
      // console.log(token + ' token');
      if (token !== null) {
        //console.log(token.access_token);
        // alert(token?.user);
        // setuserState(token?.user);
        // userState = ;
        //console.log(userState + ' sts');
        tokenapi = token.access_token;
        _setToken(token.access_token);
        const mototData = {
          Skip: offset * 10,
          PageSize: 10,
          PriceMin: 0,
          PriceMax: carprice, //12000000,
          FeaturedOnly: true,
        };

        dispatch(HomeAction.setWishlist(tokenapi, mototData, languagee));
      }
    } catch (e) {
      //console.log(e + ' oama');
      //alert('error');
    }
  };

  const getUserProfile = async () => {
    try {
      const value = await AsyncStorage.getItem('UserDataLogin');
      const token = await JSON.parse(value);
      console.log(token + ' token');
      if (token?.user === 'guest') {
        // alert('as a guest');
        setloading(false);
      } else {
        getuserProfile()
          .then(res => {
            if (res.status === 'success') {
              SaveUserProfile(res.customer);
            } else {
              setIspopupvisble(true);
              seterrorValidation('Access denied' + 'Session expired!');
              setloading(false);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    } catch (e) {
      //console.log(e + ' oama');
      //alert('error');
    }
  };

  const getMasterDataproperty = () => {
    getPrice()
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.success === true) {
          //console.log(' res blogs ' + JSON.stringify(res));
          // console.log(res);
          const data = JSON.stringify(res);
          AsyncStorage.setItem('masterData', data);
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getMasterDatamotor = () => {
    getMotorPrice()
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.success === true) {
          //console.log(' res blogs ' + JSON.stringify(res));
          //console.log(res);

          const data = JSON.stringify(res);
          AsyncStorage.setItem('masterDataMotor', data);
        } else {
          //alert('jjcdjdh');

          console.log(res + 'error1 osama');
        }
      })
      .catch(err => {
        //alert('jjcdjdh');
        //setIsNetvisble(true);
        console.log(err + 'error2 osama');
      });
  };

  // };

  ///////// new change ---------------------------------------------------

  useEffect(() => {
    listeners();
    const unsubscribe = navigation.addListener('focus', () => {
      // setloading(true);
      // I commit all --------------------
      // setloading(true);
      // dispatch(HomeAction.claearWishLIST([]));
      // setblogs([]);
      // setfeaturedProperty([]);
      // settrendCar([]);
      // settrendProperty([]);
      // setOffset(0);
      // setOffsetproperty(0);
      // setoffsettrendingproperty(0);
      // setoffsettrendingcar(0);
      ///////-------------------------------------------------

      PustNotificationApisession();
    });

    const subscribe = navigation.addListener('blur', () => {
      // I commit all --------------------
      // dispatch(HomeAction.claearWishLIST([]));
      // setblogs([]);
      // setfeaturedProperty([]);
      // settrendCar([]);
      // settrendProperty([]);
      // setOffset(1000);
      // setOffsetproperty(1000);
      // setoffsettrendingproperty(1000);
      // setoffsettrendingcar(1000);
      ///////-------------------------------------------------
    });
    return unsubscribe, subscribe;
  }, []);

  useEffect(() => {
    getMasterDataproperty();
    getMasterDatamotor();
    getData(); //open here
    Getbanners()
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          //console.log(' res blogs ' + JSON.stringify(res));
          //console.log(res);
          setbanners(res);
          //setbannerdescripation(res.);
          for (let index = 0; index < res.banners.length; index++) {
            setbannerImages(oldArray => [
              ...oldArray,
              res.banners[index].bannerPath,
            ]);
          }
        } else {
          //console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });

    GetAllBlogs(0, 50)
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          //console.log(' res blogs ' + JSON.stringify(res));
          //console.log(res);
          setblogs(res.newsfeeds);
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [offset]);

  const getFeatureMotors = () => {
    setOffset(offset + 1);
  };

  useEffect(() => {
    let propertyData = {
      Skip: offsetproperty * 10,
      PageSize: 10,
      PriceMin: 0,
      PriceMax:
        propertyMasterData?.price && propertyMasterData?.price
          ? propertyMasterData?.price
          : propertyprice,
      FeaturedOnly: true,
    };
    FilterAllfaeturedProperty(propertyData)
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          setfeaturedProperty([...featuredProperty, ...res.data]);
        } else {
          //seterrorValidation(res.error + '.No user found');
          // console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [offsetproperty]);

  function LoadMoreFeatureProperty() {
    setOffsetproperty(offsetproperty + 1);
  }
  ///////////end here new chanhes///////////////////////////////////////////////////////////////////////////

  function LoadMoreTrendingProperty() {
    setoffsettrendingproperty(offsettrendingproperty + 1);
  }

  useEffect(() => {
    //alert(PropertyLimitsize + ' ' + PropertyStartLimit + "osama");
    let propertyData = {
      Skip: offsettrendingproperty * 10,
      PageSize: 10,
      PriceMin: 0,
      PriceMax:
        motorMasterData?.value && motorMasterData?.value
          ? motorMasterData?.value
          : propertyprice,
    };
    trendingProperty(propertyData)
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          settrendProperty([...trendProperty, ...res.data]);
          setloading(false);
        } else {
          //seterrorValidation(res.error + '.No user found');
          //console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [offsettrendingproperty]);

  /// trending property end

  // trending cars ////////////////

  function LoadMoreTrendingCars() {
    setoffsettrendingcar(offsettrendingcar + 1);
  }

  useEffect(() => {
    //alert(PropertyLimitsize + ' ' + PropertyStartLimit + "osama");
    let carData = {
      Skip: offsettrendingcar * 10,
      PageSize: 10,
      PriceMin: 0,
      PriceMax: carprice, //12000000,
    };
    trendingCar(carData)
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          //console.log(res.data + 'tremds car');
          settrendCar([...trendCar, ...res.data]);
          setloading(false);
        } else {
          //seterrorValidation(res.error + '.No user found');
          // console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [offsettrendingcar]);

  /// trending cars

  useEffect(() => {
    //User Profile && notofication count
    // alert('call');

    const unsubscribe = navigation.addListener('focus', () => {
      getnotificationCount()
        .then(res => {
          //console.log(' res ' + JSON.stringify(res));
          if (res.status === 'success') {
            //alert(res.newNotifications);
            dispatch(
              NotificationAction.NotificationCount(res.newNotifications),
            );
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
      getUserProfile();
    });
    return unsubscribe;
  }, []);

  async function PustNotificationApisession() {
    //const json = await messaging().getToken();
    const fcmToken = await messaging().getToken();
    //console.log('token' + fcmToken);
    let Data = {
      FirebaseToken: fcmToken,
      DeviceID: DeviceInfo.getUniqueId(),
      AccessToken: accessToken,
    };
    sendPushNotifcation(Data)
      .then(res => {
        if (res.status === 'success') {
          //alert(res.newNotifications);
          //setloading(false);
          //SaveUserProfile(res.customer);
        } else {
          //setloading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <Loader show={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{}}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}>
        <View style={styles.topContainer}>
          <View style={styles.topHeader}>
            <TouchableOpacity
              hitSlop={{top: 40, bottom: 40, left: 50, right: 50}}
              style={{}}
              onPress={() => navigation.openDrawer()}>
              {/* <Image
                resizeMode="cover"
                style={{marginLeft: 30}}
                source={require('../../shared/assests/home/bars.png')}
              /> */}
              <MIcon
                name="menu"
                size={28}
                color="#0989B8"
                style={{marginLeft: 13}}
              />
            </TouchableOpacity>
            <Image
              resizeMode="cover"
              style={{marginRight: 30}}
              source={require('../../shared/assests/home/logo.png')}
            />
          </View>
        </View>

        <View style={styles.propertryContainer}>
          <ScrollView
            horizontal
            style={{}}
            // contentContainerStyle={{zIndex: 2100, elevation: 210}}
            showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                width: '100%',
                padding: 16,
                flexDirection: 'row',
                // zIndex: 209,
                // elevation: 209,
                alignItems: 'center',
                height: '100%',

                //backgroundColor: 'yellow',
                // maxHeight: 200,
                //borderWidth: 10,
                //height: 120,
                //backgroundColor: 'red',
              }}>
              {list()}
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            backgroundColor: '#F1F3F5',
            width: '100%',
            bottom: 70,
            //backgroundColor: 'yellow',
            //height: '100%',
          }}>
          {/* <View
            style={{
              marginHorizontal: 16,
              ...RtlStyles.containerRow,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontFamily: 'Inter-Bold',
              }}>
              {localizedString.featuredmotorText}
            </Text>
          </View> */}
          {/* <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={wishlist}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              borderWidth: 0,
              backgroundColor: '#F1F3F5',
              //bottom: 70,
            }}
            style={{marginTop: 4}}
            renderItem={({item, i}) => (
              <FeaturedMotor
                item={item}
                key={i}
                conatinerStyle={{width: 230, marginTop: 5}}
                onClick={() =>
                  NavigateToPropertyDeatilsScreen(item.id, 'Motor')
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => getFeatureMotors()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<View style={{width: 14}}></View>}
          /> */}

          {/* <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F1F3F5',
            }}>
            <Banner
              IsExplore={true}
              image={require('../../shared/assests/banner/CarBanner.png')}
              heading={localizedString.trendHeading}
              deatils={banners?.motor}
              //image="https://png.pngtree.com/png-clipart/20200727/original/pngtree-modern-website-abstract-banner-png-image_5363605.jpg"
              onClick={NavigateToBannerPropertyScreen}
            />
          </View> */}
          {/* <View
            style={{
              //height: 20,
              //width: '100%',
              marginHorizontal: 16,
              ...RtlStyles.containerRow,
              //backgroundColor: 'red',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontFamily: 'Inter-Bold',
                marginTop: 14,
              }}>
              {localizedString.featuredpropertyText}
            </Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={featuredProperty}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 4}}
            renderItem={({item, i}) => (
              <FeaturedProperty1
                key={i}
                item={item}
                conatinerStyle={{width: 230, marginTop: 5}}
                onClick={() =>
                  NavigateToPropertyDeatilsScreen(item.id, 'Property')
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => LoadMoreFeatureProperty()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<View style={{width: 14}}></View>}
          /> */}
          {/* <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Banner
              IsExplore={true}
              image={require('../../shared/assests/banner/propertyBanner.png')}
              heading={localizedString.trendHHeading}
              deatils={banners?.property}
              //image="https://png.pngtree.com/png-clipart/20200727/original/pngtree-modern-website-abstract-banner-png-image_5363605.jpg"
              onClick={NavigateToBannerCityPropertyScreen}
            />
          </View> */}

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              // backgroundColor: 'red',
              //height: '16%',
              flex: 1,
            }}>
            <SliderBox
              autoplayInterval={15000}
              images={bannerImages}
              sliderBoxHeight={120}
              parentWidth={Dimensions.get('window').width * 0.93}
              dotStyle={{
                //justifyContent: 'flex-end',
                //alignItems: 'flex-end',
                // width: '100%',
                //marginLeft: 100,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                //paddingBottom: 20,
              }}
              resizeMode="cover"
              paginationBoxStyle={{
                width: '100%',
                //: 'red',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
              ImageComponentStyle={{borderRadius: 16}}
              //dotStyle={{width: 10, height: 10}}
              // dotStyle={{height: '0%', width: '0%'}}
              //dotColor=""
              // currentImageEmitter={
              //   index => alert(index)
              //   //setzoomInImage(sliderImages[index])
              // }
              dotColor=""
              inactiveDotColor=""
              autoplay={true}
              circleLoop={true}
            />
          </View>

          {/* banners */}
          <View
            style={{
              //height: 20,
              // width: '100%',
              marginHorizontal: 16,
              ...RtlStyles.containerRow,
              //backgroundColor: 'red',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontFamily: 'Inter-Bold',
                marginTop: 14,
              }}>
              {localizedString.blogText}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('posttack', {name: 'newstab'})
              }>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  fontFamily: 'Inter-SemiBold',
                  marginTop: 14,
                }}>
                {localizedString.viewlAll}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={blogs}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 8}}
            renderItem={({item, i}) => (
              <Blogs
                key={i}
                item={item}
                readmore={localizedString.readmoreText} //onClick={NavigateTofeedDeatils} />
                onClick={() => {
                  NavigateTofeedDeatils(item.id);
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{width: 14}}></View>}
          />
          {trendProperty && trendProperty.length ? (
            <>
              <View
                style={{
                  //width: '100%',
                  //alignItems: 'center',
                  //justifyContent: 'center',
                  marginHorizontal: 16,
                  ...RtlStyles.containerRow,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontFamily: 'Inter-Bold',
                    marginTop: 14,
                    //padding: 16,
                  }}>
                  {localizedString.trendingpropertyText}
                </Text>
              </View>
              {/* {Trendinglist()} */}
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={trendProperty}
                showsVerticalScrollIndicator={false}
                style={{marginTop: 4}}
                renderItem={({item, i}) => (
                  <FeaturedProperty1
                    key={i}
                    item={item}
                    conatinerStyle={{
                      width: Dimensions.get('window').width * 0.465,
                      marginTop: 5,
                      height: 231,
                    }}
                    onClick={() =>
                      NavigateToPropertyDeatilsScreen(item.id, 'Property')
                    }
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => LoadMoreTrendingProperty()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={<View style={{width: 14}}></View>}
              />
            </>
          ) : null}

          {trendCar && trendCar.length ? (
            <>
              <View
                style={{
                  //width: '100%',
                  //alignItems: 'center',
                  //justifyContent: 'center',
                  marginHorizontal: 16,
                  ...RtlStyles.containerRow,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontFamily: 'Inter-Bold',
                    marginTop: 14,
                    //padding: 16,
                  }}>
                  {localizedString.trendingcarText}
                </Text>
              </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={trendCar}
                showsVerticalScrollIndicator={false}
                style={{marginTop: 4}}
                renderItem={({item, i}) => (
                  <FeaturedMotor
                    key={i}
                    item={item}
                    conatinerStyle={{
                      width: Dimensions.get('window').width * 0.465,
                      marginTop: 5,
                      height: 231,
                    }}
                    onClick={() =>
                      NavigateToPropertyDeatilsScreen(item.id, 'Motor')
                    }
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => LoadMoreTrendingCars()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={<View style={{width: 14}}></View>}
              />
            </>
          ) : null}
          {/* </> */}
        </View>
        {popstate === true ? (
          <SuccessFailModel
            visible={popstate}
            message={localizedString.successFailMeSSAGE}
            userClick={() => {
              dispatch(openGuestPopup.closeGuestPopup(false));
              setTimeout(() => {
                // write your functions
                AsyncStorage.clear();
                setLanguage('en');
                _setLanguage('en');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'SignIn2'}],
                });
              }, 2000);
            }}
            btntext={localizedString.successModelbtntext}
            heading={localizedString.successModelheading}
            onPress={() => {
              if (errorValidation.includes('denied')) {
                dispatch(openGuestPopup.closeGuestPopup(false));
                setTimeout(() => {
                  AsyncStorage.clear();
                  dispatch(openGuestPopup.closeGuestPopup(false));
                  setLanguage('en');
                  _setLanguage('en');
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'SignIn2'}],
                  });
                }, 2000);
              } else {
                //setIspopupvisble(false);
                dispatch(openGuestPopup.closeGuestPopup(false));
              }
            }}
          />
        ) : null}
        {popupvisble === true ? (
          <AccessDeniedModel
            visible={popupvisble}
            guest={false}
            message={localizedString.accessDeniedModelMessage}
            userClick={() => {
              setIspopupvisble(false);
              setTimeout(() => {
                AsyncStorage.clear();
                setLanguage('en');
                _setLanguage('en');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'SignIn2'}],
                });
              }, 2000);
            }}
            btntext={localizedString.accessDeniedModelbtntext}
            heading={localizedString.accessDeniedModelheading}
            onPress={() => {
              if (errorValidation.includes('denied')) {
                setIspopupvisble(false);
                setTimeout(() => {
                  AsyncStorage.clear();
                  setLanguage('en');
                  _setLanguage('en');
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'SignIn2'}],
                  });
                }, 2000);
              } else {
                setIspopupvisble(false);
              }
            }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2c3e50',
  },
  topContainer: {
    height: 130,
    width: '100%',
    backgroundColor: 'white',
    zIndex: 0,
  },
  topHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    marginTop: 20,
  },
  propertryContainer: {
    //height: 120,
    //flex: 1,
    bottom: 54,
    width: '100%',
    height: 140,
    //backgroundColor: 'yellow',
    zIndex: 100,
    //height: 300,
  },
});

export default Home;
