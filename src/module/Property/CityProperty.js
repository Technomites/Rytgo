//import liraries
import React, {Component, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import Banner from '../../shared/components/Banner';
import FeaturedProperty from '../../shared/components/FeaturedProperty';
import FeaturedMotor from '../../shared/components/FeaturedMotor';
import FlatButton from '../../shared/components/FlatButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {localizedString} from '../../shared/localization/localization';
import Loader from '../../shared/components/Loader';
import BackHeader from '../../shared/components/BackHeader';
import {
  FilterAllfaeturedMotors,
  FilterAllfaeturedProperty,
} from '../../shared/ApiMiddleware/api';
import {
  propertyMasterData,
  motorMasterData,
} from '../../shared/Constant/Constant';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
var searchArray = [];
// create a component
const CityProperty = ({navigation, route}) => {
  const {RtlStyles, isRtl} = useRtlContext();
  const {id, name, image, cityname} = route.params;

  //alert(id);
  const [offset, setoffset] = useState(0);
  const [cityData, setcityData] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchtext, setsearchtext] = useState('');
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
    return cityData.map((element, i) => {
      // return (
      //   <FeaturedProperty
      //     key={i}
      //     onClick={NavigateToPropertyDeatilsScreen}
      //     conatinerStyle={{width: '45%', marginTop: 8}}
      //     item={element}></FeaturedProperty>
      // );
      {
        return name === 'Property' ? (
          <FeaturedProperty
            conatinerStyle={{width: '45%', marginTop: 7, marginLeft: 10}}
            key={i}
            item={element}
            onClick={() =>
              NavigateToPropertyDeatilsScreen(element.id, 'Property')
            }
          />
        ) : (
          <FeaturedMotor
            conatinerStyle={{width: '45%', marginTop: 7, marginLeft: 10}}
            key={i}
            item={element}
            onClick={() => NavigateToPropertyDeatilsScreen(element.id, 'Motor')}
          />
        );
      }
    });
  };
  const NavigateToPropertyDeatilsScreen = (id, name) => {
    navigation.navigate('PropertyDeatils', {
      id: id,
      name: name,
    });
  };
  function LoadMoreData() {
    // load more RECENT  data
    //alert(recentoffset);
    setoffset(offset + 1);
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 2;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const cityMotor = () => {
    let motorData = {
      Skip: offset * 10,
      PageSize: 10,
      PriceMin: 0,
      PriceMax: motorMasterData?.value,
      cityId: id,
    };

    FilterAllfaeturedMotors(motorData)
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          setcityData([...cityData, ...res.data]);
          searchArray = [...cityData, ...res.data];
          console.log(' res ' + JSON.stringify(res.data));
          setloading(false);
          //alert(res.data);
        } else {
          //seterrorValidation(res.error + '.No user found');
          //console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const cityProperty = () => {
    let propertyData = {
      Skip: offset * 10,
      PageSize: 10,
      PriceMin: 0,
      PriceMax: propertyMasterData?.price,
      cityId: id,
      //ForSale: type === 'Sale' ? true : false,
    };

    FilterAllfaeturedProperty(propertyData)
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          setcityData([...cityData, ...res.data]);
          searchArray = [...cityData, ...res.data];
          setloading(false);
        } else {
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
    if (name === 'Property') {
      cityProperty();
    } else if (name === 'Motor') {
      //alert('Motors call');
      cityMotor();
    }
  }, [offset]);

  const searchFilterFunction = text => {
    setsearchtext(text);
    if (text === '') {
      setcityData(searchArray);
    } else {
      const newData = searchArray.filter(item => {
        const itemData = item.title.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      //console.log(newData);
      setcityData(newData);
    }
  };
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <Loader show={loading} />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        contentContainerStyle={{backgroundColor: '#F1F3F5'}}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            if (searchtext === '') {
              LoadMoreData();
            }
          }
        }}
        scrollEventThrottle={1000}>
        <View style={styles.topContainer}>
          {/* <View style={styles.topHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <Image
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
                {name === 'Property'
                  ? localizedString.propertyListText
                  : localizedString.carListText}
              </Text>
            </View>
          </View> */}

          <BackHeader
            title={
              name === 'Property'
                ? localizedString.propertyListText
                : localizedString.carListText
            }
            onPress={() => navigation.goBack()}
          />

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              //flexDirection: 'row',
              //backgroundColor: 'red',
              alignItems: 'center',
            }}>
            {/* <Banner image= {image} /> */}
            <View
              style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 6,
                //backgroundColor: 'red',
              }}>
              <ImageBackground
                //resizeMode="cover"
                style={{
                  width: '100%',
                  height: 93,
                  //alignItems: 'center',
                  //justifyContent: 'center',
                }}
                imageStyle={{borderRadius: 0}}
                source={{uri: image}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 19,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    marginTop: 30,
                    fontWeight: 'bold',
                  }}>
                  {cityname}
                </Text>
              </ImageBackground>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              justifyContent: 'space-around',
              //flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <SearchBar
              placeholder={
                name === 'Property'
                  ? localizedString.propertysearchPlaceholder
                  : localizedString.carsearchPlaceholder
              }
              onPress={() => console.log('onPress')}
              onChangeText={text => searchFilterFunction(text)}
              clearIconImageSource=""
              //onClearPress={() => searchFilterFunction('')}
              style={{
                borderRadius: 7,
                height: 47,
                borderColor: '#19191933',
                backgroundColor: '#F1F3F5',
                borderWidth: 1,
                width: '89%',
              }}
              placeholderTextColor="#19191940"
              textInputStyle={{
                fontSize: 15,
                textAlign: isRtl ? 'right' : 'left',
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            //backgroundColor: 'red',
            marginTop: 10,
            marginLeft: 10,
          }}>
          {Trendinglist()}
        </View>
        <Text></Text>
      </ScrollView>
      {/* 
      <View
        style={{
          width: 60,
          height: 60,
          position: 'absolute',
          borderRadius: 6,
          bottom: 0,
          right: 4,
          backgroundColor: '#0989B8',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name="filter" size={30} color="white" />
      </View> */}
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
    //height: 230,
    width: '100%',
    backgroundColor: '#F1F3F5',
  },
  topHeader: {
    flexDirection: 'row',
    width: '100%',
    //height: '30%',
    marginTop: 20,
    backgroundColor: '#F1F3F5',
  },
  propertryContainer: {
    bottom: 30,
    width: '100%',
    backgroundColor: '#F1F3F5',
  },
});

export default CityProperty;
