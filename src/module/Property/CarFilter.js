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
import FeaturedMotor from '../../shared/components/FeaturedMotor';
import AntDesign from 'react-native-vector-icons/FontAwesome5';
import * as Filteraction from '../../redux/action/Filteraction';
import {useSelector, useDispatch} from 'react-redux';
import {FilterAllfaeturedMotors} from '../../shared/ApiMiddleware/api';
import Loader from '../../shared/components/Loader';
import {localizedString} from '../../shared/localization/localization';
import BackHeader from '../../shared/components/BackHeader';
import {motorMasterData} from '../../shared/Constant/Constant';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import IoIcon from '../../shared/components//Icon/IoIcon';
var searchArray = [];
var CategoryArray = [];
var FeatureArray = [];
let carFilterr = {};
const CarFilter = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {RtlStyles, isRtl} = useRtlContext();
  carFilterr = useSelector(state => state.propertyFilter.carFilter);
  const paginationcount = useSelector(
    state => state.propertyFilter.paginationValue,
  );
  //console.log(JSON.stringify(carFilterr));
  const [offset, setoffset] = useState(0);
  const [CarDataa, setCarDataa] = useState([]);
  const [search, setsearch] = useState('');
  const [filtertext, setfiltertext] = useState('');
  const [loading, setloading] = useState(false);
  const [loadCount, setloadCount] = useState(false);
  const [IsFaetching, setIsFaetching] = useState(false);

  // const Trendinglist = () => {
  //   return cityData.map((element, i) => {
  //     {
  //       return name === 'Property' ? (
  //         <FeaturedProperty
  //           conatinerStyle={{width: '45%', marginTop: 14}}
  //           key={i}
  //           item={element}
  //           onClick={() =>
  //             NavigateToPropertyDeatilsScreen(element.id, 'Property')
  //           }
  //         />
  //       ) : (
  //         <FeaturedMotor
  //           conatinerStyle={{width: '45%', marginTop: 14}}
  //           key={i}
  //           item={element}
  //           onClick={() => NavigateToPropertyDeatilsScreen(element.id, 'Motor')}
  //         />
  //       );
  //     }
  //   });
  // };
  const Cleardata = () => {
    setIsFaetching(false);
    setloadCount(false);
    //setoffset(0);
    setCarDataa([]);
    setsearch('');
    //setoffset(0);
    dispatch(Filteraction.setPaginationCount(0));
  };
  const NavigateToPropertyDeatilsScreen = (id, name) => {
    navigation.navigate('PropertyDeatils', {
      id: id,
      name: name,
    });
  };

  const NavigateToFilterScren = name => {
    navigation.navigate('Filter', {
      name: name,
      type: 'Motor',
    });
    Cleardata();
    // setTimeout(() => {
    //   navigation.navigate('Filter', {
    //     name: name,
    //   });
    // }, 1000);
  };
  function LoadMoreData() {
    setIsFaetching(true);
    if (loadCount === false) {
      //setoffset(offset + 1);
      dispatch(Filteraction.setPaginationCount(paginationcount + 1));
    }
  }

  const Carfilter = search => {
    let carData = {};
    setloadCount(false);
    if (carFilterr) {
      if (carFilterr.hasOwnProperty('Cityid')) {
        CategoryArray = [];
        FeatureArray = [];
        for (let index = 0; index < carFilterr.carcategory.length; index++) {
          //const element = array[index];
          CategoryArray.push(carFilterr.carcategory[index].Categoryid);
        }
        for (let index = 0; index < carFilterr.carfeature.length; index++) {
          //const element = array[index];
          FeatureArray.push(carFilterr.carfeature[index].Featureid);
        }
        carData = {
          Skip: paginationcount * 40,
          PageSize: 40,
          PriceMin: carFilterr?.price[0] === 0 ? null : carFilterr?.price[0],
          PriceMax: carFilterr?.price[1] === 0 ? null : carFilterr?.price[1],
          BuildYear: carFilterr?.year,
          MakeID: carFilterr?.carmake,
          BodyTypeID: carFilterr?.carbody,
          ModelID: carFilterr?.carmodel,
          Features: FeatureArray,
          Categories: CategoryArray,
          CityID: carFilterr?.Cityid,
          search: search,
          SortBy: carFilterr?.sortid,

          Transmission: carFilterr?.transimmsion,
          Warranty: null,
          ServiceHistory: carFilterr?.serviceHistory,
          MinKilometers: carFilterr?.km[0] === 0 ? null : carFilterr?.km[0],
          MaxKilometers: carFilterr?.km[1] === 0 ? null : carFilterr?.km[1],
          RegionalSpecs: carFilterr?.regionSpec,
          MinEngineCC: null,
          MaxEngineCC: carFilterr?.engine,
          FuelType: carFilterr?.fuel,
          NoOfDoors: carFilterr?.door,
          NoOfWheels: carFilterr?.wheel,
          Capacity: carFilterr?.capacity,
          SteeringSide: carFilterr?.steering,
          BodyCondition: carFilterr?.bodycondition,
          MechanicalCondition: carFilterr?.mechanical,
          Cylinders: carFilterr?.cylinder,
        };
        //alert(JSON.stringify(carData) + 'final');
      }
    } else {
      carData = {
        Skip: paginationcount * 40,
        PageSize: 40,
        PriceMin: 0,
        PriceMax: motorMasterData?.value,
        search: search,
      };
    }
    //console.log(JSON.stringify(carData) + 'filterdatapassaray');
    //alert(JSON.stringify(carData));
    FilterAllfaeturedMotors(carData)
      .then(res => {
        if (res.status === 'success') {
          //console.log("osama data" + JSON.stringify(res.data))
          // alert('setdata');
          //alert('success');
          //console.log('success');
          //console.log('dataaaa ' + JSON.stringify(res.data));
          //console.log('searchArray ' + JSON.stringify(searchArray));
          //console.log([...CarDataa, ...res.data]);
          //setCarDataa([...CarDataa, ...res.data]);
          //searchArray = [...CarDataa, ...res.data];
          //console.log('api data ' + JSON.stringify(res.data));
          //console.log('car data ' + JSON.stringify(CarDataa));
          //  console.log(res.data.length + 'length');
          if (res.data.length === 0) {
            //setloadCount(true);
          }
          searchArray = [...CarDataa, ...res.data];
          setCarDataa([...CarDataa, ...res.data]);
          setloading(false);
          if (CarDataa && CarDataa.length <= 0) {
            setfiltertext('No Filter record found');
          }
          setIsFaetching(false);
        } else {
          setIsFaetching(false);
          // alert('error');
        }
      })
      .catch(err => {
        console.log(err);
        setIsFaetching(false);
      });
  };

  // const searchFilterFunction = text => {
  //   if (text === '') {
  //     //console.log('osama' + JSON.stringify(searchArray));
  //     setCarDataa(searchArray);
  //   } else {
  //     const newData = searchArray.filter(item => {
  //       const itemData = item.title.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     //console.log(newData);
  //     setCarDataa(newData);
  //   }
  // };

  const searchFilterFunction = text => {
    // cooment old search
    //alert('calling');
    setIsFaetching(false);
    if (text === '') {
      setCarDataa([]);
      setsearch('');
      dispatch(Filteraction.setPaginationCount(1000));
      setloadCount(false);
      setTimeout(() => {
        dispatch(Filteraction.setPaginationCount(0));
      }, 3000);
    } else {
      setCarDataa([]);
      setsearch(text);
      dispatch(Filteraction.setPaginationCount(0));
    }
  };

  useEffect(() => {
    if (search === '') {
      //dispatch(Filteraction.setPaginationCount(1000));
      //setpropertyData([]);
      //dispatch(Filteraction.setPaginationCount(0));
    } else {
      Carfilter(search);
      // alert('call');
      //dispatch(Filteraction.setPaginationCount(0));
    }
  }, [search]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsFaetching(false);
      //setloading(true);
      Carfilter('');
    });
    const subscribe = navigation.addListener('blur', () => {
      setIsFaetching(false);
      dispatch(Filteraction.setPaginationCount(0));
    });
    return () => {
      setIsFaetching(false);
      dispatch(Filteraction.setPaginationCount(0));
      unsubscribe, subscribe;
    };
  }, []);

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    //setloading(true);
    Carfilter(search);
    // });
    //return unsubscribe;
  }, [paginationcount]);

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <Loader show={loading} />

      <View style={styles.topContainer}>
        {/*         
        <BackHeader
          title={localizedString.carListText}
          onPress={() => navigation.goBack()}
        /> */}

        <View style={styles.backtopContainer}>
          <View style={styles.backtopHeader}>
            <TouchableOpacity
              hitSlop={{top: 40, bottom: 40, left: 50, right: 50}}
              style={{}}
              onPress={() => navigation.goBack()}>
              {/* <Image
                resizeMode="cover"
                style={{marginLeft: 30}}
                source={require('../../shared/assests/home/bars.png')}
              /> */}
              <IoIcon name="arrow-back" size={26} color="black" />
            </TouchableOpacity>
            <Image
              resizeMode="cover"
              style={{marginRight: 30}}
              source={require('../../shared/assests/home/logo.png')}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 11,
          }}>
          <TouchableOpacity
            onPress={() => NavigateToFilterScren('Car')}
            style={{
              width: '25%',
              marginLeft: 5,
            }}>
            <View
              style={{
                width: '70%',
                height: '76%',
                //position: 'absolute',
                borderRadius: 6,
                //bottom: 0,
                //right: 4,
                marginLeft: 6,
                backgroundColor: '#0989B8',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#0989B8',
                  fontSize: 12,
                  fontFamily: 'Inter-SemiBold',
                  textAlign: 'center',

                  textTransform: 'uppercase',
                  color: 'white',
                  textAlign: 'center',
                }}>
                {localizedString.filterText}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{width: '88%'}}>
            <SearchBar
              placeholder={localizedString.carsearchPlaceholder}
              //onPress={() => alert('onPress')}
              onChangeText={text => searchFilterFunction(text)}
              clearIconImageSource=""
              //onClearPress={() => searchFilterFunction('')}
              style={{
                borderRadius: 7,
                height: 53,
                borderColor: '#19191933',
                backgroundColor: '#F1F3F5',
                borderWidth: 1,
                width: '91%',
              }}
              placeholderTextColor="#19191940"
              textInputStyle={{
                fontSize: 15,
                textAlign: isRtl ? 'right' : 'left',
              }}
            />
          </View>
        </View>
      </View>
      {CarDataa && CarDataa.length > 0 ? (
        <>
          <View
            style={{
              //height: 20,
              // width: '100%',
              marginHorizontal: 16,
              marginTop: 16,
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
              {localizedString.motorText}
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={CarDataa}
            //extraData={CarDataa}
            style={{marginTop: 1}}
            numColumns={1}
            bounces={false}
            renderItem={({item, i}) => (
              <FeaturedMotor
                key={i}
                onClick={() =>
                  NavigateToPropertyDeatilsScreen(item.id, 'Motor')
                }
                conatinerStyle={{width: '93%', marginTop: 9}}
                item={item}></FeaturedMotor>
            )}
            keyExtractor={(item, index) => index.toString()}
            legacyImplementation={true}
            updateCellsBatchingPeriod={90}
            removeClippedSubviews={true}
            maxToRenderPerBatch={50}
            windowSize={70}
            onEndReached={({distanceFromEnd}) => {
              // if (distanceFromEnd < 0) return;
              // LoadMoreData();
              if (IsFaetching === false) {
                //alert('a[i call');
                LoadMoreData();
              }
            }}
            onEndReachedThreshold={13}
          />
          <Text></Text>
        </>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
            {filtertext}
          </Text>
        </View>
      )}
      {/* <View
        style={{
          width: 54,
          height: 54,
          position: 'absolute',
          borderRadius: 6,
          //bottom:0,
          //left: 0,
          // top: 0,
          bottom: 0,
          right: 4,
          backgroundColor: '#0989B8',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign
          name="sliders-h"
          size={24}
          color="white"
          onPress={() => NavigateToFilterScren('Car')}
        />
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
    height: 110,
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
  backtopContainer: {
    //height: 130,
    width: '100%',
    //backgroundColor: 'white',
    zIndex: 0,
    //backgroundColor: 'red',
  },
  backtopHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    //height: '100%',
    //backgroundColor: 'red',
    // marginTop: 20,
  },
});

export default CarFilter;
