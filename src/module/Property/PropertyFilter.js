//import liraries
import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
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
import AntDesign from 'react-native-vector-icons/FontAwesome5';
import * as Filteraction from '../../redux/action/Filteraction';
import {useSelector, useDispatch} from 'react-redux';
import {FilterAllfaeturedProperty} from '../../shared/ApiMiddleware/api';
import Loader from '../../shared/components/Loader';
import {localizedString} from '../../shared/localization/localization';
import BackHeader from '../../shared/components/BackHeader';
import {propertyMasterData} from '../../shared/Constant/Constant';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import IoIcon from '../../shared/components//Icon/IoIcon';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import Feature from '../../shared/components/Feature';

var searchArray = [];
var CategoryArray = [];
var FeatureArray = [];
let propertyFilterr = {};
let typee = '';

const PropertyFilter = ({navigation, route}) => {
  const {RtlStyles, isRtl} = useRtlContext();
  propertyFilterr = useSelector(state => state.propertyFilter.propertyFilter);
  const paginationcount = useSelector(
    state => state.propertyFilter.paginationValue,
  );

  //console.log(JSON.stringify(propertyFilterr)+" Filter object");
  if (route.params === undefined) {
    //alert('undefined');
  } else {
    const {type} = route.params;
    typee = type;
    //console.log(typee + ' typee');
    //alert(screenname);
  }

  const [offset, setoffset] = useState(0);
  const [propertyDataa, setpropertyData] = useState([]);
  const [search, setsearch] = useState('');
  const [filtertext, setfiltertext] = useState('');
  const [loading, setloading] = useState(false);
  const [loadCount, setloadCount] = useState(false);
  const [IsFaetching, setIsFaetching] = useState(false);

  const Cleardata = () => {
    setIsFaetching(false);
    setsearch('');
    setloadCount(false);
    //setoffset(1000);
    setpropertyData([]);
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
      type: typee,
    });
    Cleardata();
    // setTimeout(() => {

    // }, 1000);
  };
  function LoadMoreData() {
    // alert(loadCount);
    setIsFaetching(true);
    if (loadCount === false) {
      //setoffset(offset + 1);
      dispatch(Filteraction.setPaginationCount(paginationcount + 1));
    }
  }

  const Propertyfilter = search => {
    let propertyData = {};
    setloadCount(false);
    if (propertyFilterr) {
      if (propertyFilterr.hasOwnProperty('Cityid')) {
        // alert('with filter');
        // console.log('filter');
        // console.log(JSON.stringify(propertyFilterr));
        CategoryArray = [];
        FeatureArray = [];
        for (
          let index = 0;
          index < propertyFilterr.propertycategory.length;
          index++
        ) {
          //const element = array[index];
          CategoryArray.push(
            propertyFilterr.propertycategory[index].Categoryid,
          );
        }
        for (
          let index = 0;
          index < propertyFilterr.propertyfeature.length;
          index++
        ) {
          //const element = array[index];
          FeatureArray.push(propertyFilterr.propertyfeature[index].Featureid);
        }
        propertyData = {
          Skip: paginationcount * 40,
          PageSize: 40,
          PriceMin:
            propertyFilterr?.price[0] === 0 ? null : propertyFilterr?.price[0],
          PriceMax:
            propertyFilterr?.price[1] === 0 ? null : propertyFilterr?.price[1],
          Features: FeatureArray,
          Categories: CategoryArray,
          CityID: propertyFilterr?.Cityid,
          search: search,
          SortBy: propertyFilterr?.sortid,
          NoOfBeds: propertyFilterr?.beds,
          NoOfBaths: propertyFilterr?.baths,
          //SqSize: propertyFilterr.size, i commit
          ForSale: typee === 'Sale' ? true : typee === 'Rent' ? false : null, // i add
          Furnished: propertyFilterr?.furnished,
          MinSqSize:
            propertyFilterr?.size[0] === 0 ? null : propertyFilterr?.size[0],
          MaxSqSize:
            propertyFilterr?.size[1] === 0 ? null : propertyFilterr?.size[1],
          BuildYear:
            propertyFilterr?.year === '' ? null : propertyFilterr?.year,
          NoOfDining: propertyFilterr?.dine,
          NoOfLaundry: propertyFilterr?.laundry,
          NoOfGarage: propertyFilterr?.NoOfGarage,
        };
        //  console.log(JSON.stringify(propertyData) + 'final');
      }
    } else {
      //alert('wthout filter' + search);
      //alert(search);
      //   console.log('withoiut filter');
      propertyData = {
        Skip: paginationcount * 40,
        PageSize: 40,
        PriceMin: 0,
        PriceMax: propertyMasterData?.price,
        search: search,
        ForSale: typee === 'Sale' ? true : typee === 'Rent' ? false : null,
      };
    }
    //console.log(JSON.stringify(propertyData));
    ///alert(JSON.stringify(propertyData));
    FilterAllfaeturedProperty(propertyData)
      .then(res => {
        if (res.status === 'success') {
          //console.log("osama data" + JSON.stringify(res.data))
          //setloading(false);
          //alert('api call');
          // console.log(
          //   'dataaaa ' + [JSON.stringify(...propertyDataa, ...res.data)],
          // );
          // console.log('search data');
          // console.log(JSON.stringify(res.data));
          // alert(JSON.stringify(res.data));
          if (res.data.length === 0) {
            // alert('true');
            //setloadCount(true);
          }
          setpropertyData([...propertyDataa, ...res.data]);
          setloading(false);
          searchArray = [...propertyDataa, ...res.data];
          if (propertyDataa && propertyDataa.length <= 0) {
            setfiltertext('No record found');
          }
          setIsFaetching(false);
        } else {
          setIsFaetching(false);
        }
      })
      .catch(err => {
        setIsFaetching(false);
        console.log(err);
      });
  };

  const searchFilterFunction = text => {
    // cooment old search
    //alert('calling');
    setIsFaetching(false);
    if (text === '') {
      setpropertyData([]);
      setsearch('');
      dispatch(Filteraction.setPaginationCount(1000));
      setloadCount(false);
      setpropertyData([]);
      setTimeout(() => {
        dispatch(Filteraction.setPaginationCount(0));
      }, 3000);
    } else {
      setpropertyData([]);
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
      Propertyfilter(search);
      // alert('call');
      //dispatch(Filteraction.setPaginationCount(0));
    }
  }, [search]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsFaetching(false);
      setloading(true);
      Propertyfilter('');
    });
    const subscribe = navigation.addListener('blur', () => {
      setIsFaetching(false);
      //setpropertyData([]);
      dispatch(Filteraction.setPaginationCount(0));
    });
    return () => {
      setIsFaetching(false);
      dispatch(Filteraction.setPaginationCount(0));
      unsubscribe, subscribe;
    };
  }, []);

  useEffect(() => {
    //alert('call');
    setloading(true);

    Propertyfilter(search);
  }, [paginationcount]);

  // const searchFilterFunction = text => {  // cooment old search
  //   if (text === '') {
  //     setpropertyData(searchArray);
  //   } else {
  //     const newData = searchArray.filter(item => {
  //       const itemData = item.title.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });

  //     setpropertyData(newData);
  //   }
  // };

  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      {/* <Loader show={loading} /> */}
      <View style={styles.topContainer}>
        {/* <BackHeader
          title={localizedString.propertyListText}
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
            //flexDirection: 'row',
            alignItems: 'center',
            //marginTop: 5,
            flexDirection: 'row',
            padding: 11,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity
            onPress={() => NavigateToFilterScren('Property')}
            style={{
              width: '25%',
              marginLeft: 5,
              //backgroundColor: 'red',
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
              {/* <AntDesign
                style={{marginTop: 4}}
                name="sliders-h"
                size={24}
                color="white"
                onPress={() => NavigateToFilterScren('Property')}
              /> */}
              <Text
                style={{
                  color: '#0989B8',
                  fontSize: 12,
                  fontFamily: 'Inter-Bold',
                  textAlign: 'center',
                  // paddingRight: 12,
                  marginTop: 3,
                  // marginLeft: 10,
                  textTransform: 'uppercase',
                  color: 'white',
                  textAlign: 'center',
                  // textAlignVertical: 'center',
                }}>
                {localizedString.filterText}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{width: '88%'}}>
            <SearchBar
              value={search}
              placeholder={localizedString.propertysearchPlaceholder}
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
      {propertyDataa && propertyDataa.length > 0 ? (
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
              {typee === 'Rent'
                ? localizedString.requestlistingPropertyText
                : localizedString.requestlistingSaleText}
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={propertyDataa}
            numColumns={1}
            style={{marginTop: 1}}
            legacyImplementation={true}
            updateCellsBatchingPeriod={90}
            removeClippedSubviews={true}
            maxToRenderPerBatch={50}
            windowSize={70}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, i}) => (
              <FeaturedProperty
                key={i}
                item={item}
                onClick={() =>
                  NavigateToPropertyDeatilsScreen(item.id, 'Property')
                }
                conatinerStyle={{
                  width: '93%',
                  marginTop: 9,
                }}></FeaturedProperty>
              // <Feature item={item} index={i} />
            )}
            onEndReachedThreshold={13}
            onEndReached={({distanceFromEnd}) => {
              // if (distanceFromEnd < 0) {
              //   alert('api call');
              //   LoadMoreData();
              // }

              if (IsFaetching === false) {
                // alert('a[i call');
                LoadMoreData();
              }
            }}
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

  propertryContainer: {
    bottom: 30,
    width: '100%',
    backgroundColor: '#F1F3F5',
  },
});

export default PropertyFilter;
