import React, {useState, useEffect} from 'react';
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
import IoIcon from '../../shared/components/Icon/IoIcon';
import MyInput from '../../shared/components/MyInput';
import AuthButton from '../../shared/components/AuthButton';
import SuccessModal from '../../shared/components/SuccessModal';
import ImagePicker from 'react-native-image-crop-picker';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../shared/components/Loader';
import PopUpModel from '../../shared/components/PopUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SliderRange from '../../shared/components/SliderRange';
import {
  getAllCities,
  getAllCountries,
  postRequestProperty,
} from '../../shared/ApiMiddleware/api';
import LocationpickerModal from '../../shared/components/LocationpickerModal';
import LoactionInput from '../../shared/components/LoactionInput';
import {
  propertyMasterData,
  motorMasterData,
  _setLanguage,
} from '../../shared/Constant/Constant';
import {localizedString} from '../../shared/localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

const data = [
  {name: 'New In', value: '1'},
  {name: 'High to Low', value: '2'},
  {name: 'Low to High', value: '3'},
];
let years = [
  // {name: '1950', value: '1950'},
  // {name: '1951', value: '1952'},
  // {name: '1952', value: '1952'},
  // {name: '1953', value: '1953'},
  // {name: '1954', value: '1954'},
  // {name: '1955', value: '1955'},
  // {name: '1956', value: '1956'},
  // {name: '1957', value: '1957'},
  // {name: '1958', value: '1958'},
  // {name: '1959', value: '1959'},
  // {name: '1960', value: '1960'},
  // {name: '1961', value: '1961'},
  // {name: '1962', value: '1962'},
  // {name: '1963', value: '1963'},
  // {name: '1964', value: '1964'},
  // {name: '1965', value: '1965'},
  // {name: '1966', value: '1966'},
  // {name: '1967', value: '1967'},
  // {name: '1968', value: '1968'},
  // {name: '1969', value: '1969'},
  // {name: '1970', value: '1970'},
  // {name: '1971', value: '1971'},
  // {name: '1972', value: '1972'},
  // {name: '1973', value: '1973'},
  // {name: '1974', value: '1974'},
  // {name: '1975', value: '1975'},
  // {name: '1976', value: '1976'},
  // {name: '1977', value: '1977'},
  // {name: '1978', value: '1978'},
  // {name: '1979', value: '1979'},
  // {name: '1980', value: '1980'},
  // {name: '1981', value: '1981'},
  // {name: '1982', value: '1982'},
  // {name: '1983', value: '1983'},
  // {name: '1984', value: '1984'},
  // {name: '1985', value: '1985'},
  // {name: '1986', value: '1986'},
  // {name: '1987', value: '1987'},
  // {name: '1988', value: '1988'},
  // {name: '1989', value: '1989'},
  // {name: '1990', value: '1990'},
  // {name: '1991', value: '1991'},
  // {name: '1992', value: '1992'},
  // {name: '1993', value: '1993'},
  // {name: '1994', value: '1994'},
  // {name: '1995', value: '1995'},
  // {name: '1996', value: '1996'},
  // {name: '1997', value: '1997'},
  // {name: '1998', value: '1998'},
  // {name: '1999', value: '1999'},
  // {name: '2000', value: '2000'},
  // {name: '2001', value: '2001'},
  // {name: '2002', value: '2002'},
  // {name: '2003', value: '2003'},
  // {name: '2004', value: '2004'},
  // {name: '2005', value: '2005'},
  // {name: '2006', value: '2006'},
  // {name: '2007', value: '2007'},
  // {name: '2008', value: '2008'},
  // {name: '2009', value: '2009'},
  // {name: '2010', value: '2010'},
  // {name: '2011', value: '2011'},
  // {name: '2012', value: '2012'},
  // {name: '2013', value: '2013'},
  // {name: new Date().getFullYear(), value: new Date().getFullYear()},
];
const PostAnAddStep3 = props => {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const {id, forsale} = props.route.params;
  const [successModelShow, setSuccessShow] = useState(false);
  const [citydropdown, setcitydropdown] = useState('');
  const [loading, setloading] = useState(false);
  const [city, setcity] = useState([]);
  const [country, setcountry] = useState([]);
  const [countrydropdown, setcountrydropdown] = useState('');
  const [yeardropdown, setyeardropdown] = useState('');
  const [title, settitle] = useState('');
  const [price, setprice] = useState('');
  const [range, setrange] = useState([0, 0]);
  const [size, setsize] = useState('');
  const [room, setroom] = useState('');
  const [year, setyear] = useState('');
  const [bathrooms, setbathrooms] = useState('');
  const [selectedaddress, setselectedaddress] = useState('');
  const [area, setarea] = useState('');
  const [decription, setdecription] = useState('');
  const [errorValidation, seterrorValidation] = useState('');
  const [popupvisble, setIspopupvisble] = useState(false);

  const [locationSearch, setLocationSearch] = useState('');
  const [locationModal, setLocationModal] = useState(false);
  const [location, setLocation] = useState();
  const [mapCordinates, setMapCordinates] = useState({
    latitude: data?.latitude ? data?.latitude : '25.2048',
    longitude: data?.longitude ? data?.longitude : '55.2708',
  });
  const [selectedLocation, setSelectedLocation] = useState();
  // const [price, setPrice] = useState(0);
  //const [initalprice, setinitalprice] = useState(0);
  const [initalprice, setinitalprice] = useState([0, 0]);
  const [minprice, setminPrice] = useState(0);
  const [maxprice, setmaxPrice] = useState(0);

  // getyears();

  useEffect(() => {
    setloading(true);
    getAllCities()
      .then(res => {
        if (res.status === 'success') {
          //setloading(false);
          setcity(res.cities);
        } else {
          //setloading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });

    getAllCountries()
      .then(res => {
        if (res.status === 'success') {
          setloading(false);
          setcountry(res.countries);
        } else {
          setloading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const SetPrice = value => {
    setprice(value);
    setrange(value);
    // console.log(price);
  };

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyBk__F0NhYVnD78LJKl-BnfXv3V67NKldQ&input=${locationSearch}&inputtype=textquery`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => setLocation(result.results))
      .catch(error => console.log('error', error));
  }, [locationSearch]);

  const getAddress = (lat, lon) => {
    setMapCordinates({
      ...mapCordinates,
      latitude: lat,
      longitude: lon,
    });
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        lat +
        ',' +
        lon +
        '&key=AIzaSyBk__F0NhYVnD78LJKl-BnfXv3V67NKldQ',
      // `https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyBk__F0NhYVnD78LJKl-BnfXv3V67NKldQ&input=${locationSearch}&inputtype=textquery`,
      requestOptions,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(
          'ADDRESS GEOCODE is BACK!! => ' +
            JSON.stringify(responseJson.results[0].formatted_address),
        );
        onChangeText(
          responseJson.results[0].formatted_address,
          localizedString.locationText,
        );
      })
      .catch(error => console.log('error', error));
  };

  const onChangeText = (value, name) => {
    // alert(value);
    if (name === localizedString.titletext) {
      //alert(value);
      settitle(value);
    } else if (name === 'Price') {
      setprice(value);
    } else if (name === localizedString.sizesqText) {
      setsize(value);
    } else if (name === localizedString.roominoutText) {
      setroom(value);
    } else if (name === localizedString.bathinputText) {
      setbathrooms(value);
    } else if (name === localizedString.locationText) {
      // console.log(value);
      setselectedaddress(value);
    } else if (name === localizedString.deatilrequestText) {
      setdecription(value);
    }
    if (name === localizedString.MinPrice) {
      if (name === localizedString.MinPrice) {
        //console.log(value + 'max' + maxprice);
        if (Number(maxprice) === 0) {
          setminPrice(value);
        } else {
          if (value < Number(maxprice)) {
            setminPrice(value);
          }
        }
      }
    } else if (name === localizedString.maxPrice) {
      if (value === '') {
        setmaxPrice(0);
      } else {
        setmaxPrice(value);
      }
    }
  };

  const openpicker = () => {
    //alert('onfocus');
    setLocationModal(true);
  };
  const setmapCordinates = coordinate => {
    // alert(coordinate);
    setMapCordinates({
      ...mapCordinates,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };
  function Validation() {
    if (
      title === '' ||
      minprice === '' ||
      maxprice === '' ||
      room === '' ||
      bathrooms === '' ||
      selectedaddress === '' ||
      size === '' ||
      decription === ''
      // ||
      // citydropdown === '' ||
      // countrydropdown === '' ||
      // yeardropdown === ''
    ) {
      seterrorValidation('Fields are Empty');
      setIspopupvisble(true);
      return false;
    }
    seterrorValidation('');
    return true;
  }
  const PostPropertyAds = () => {
    const IsValidate = Validation();
    console.log(minprice);
    console.log(maxprice);
    if (IsValidate === true) {
      setloading(true);
      const userData = {
        Title: title,
        Description: decription,
        CategoryID: id,
        PropertyType: forsale === 0 ? 'Rent' : 'Sale',
        MinPrice: minprice,
        MaxPrice: maxprice,
        NoOfRooms: room,
        NoOfBathRooms: bathrooms,
        Size: size,
        Latitude: mapCordinates.latitude,
        Longitude: mapCordinates.longitude,
        Address: selectedaddress,

        //---------------------------------------------------------------
        // Price: price,
        // Size: size,
        // NoOfBedRooms: room,
        // BuildYear: year,
        // ForSale: forsale,
        // State: '',
        // City: citydropdown,
        // Country: countrydropdown,
        // Title: title,
        // Description: decription,
        // Area: area,
        // CategoryId: id,
        // PropertyType: forsale === 0 ? 'Rent' : 'Sale',
      };
      //  console.log('objcet' + JSON.stringify(userData));
      postRequestProperty(userData)
        .then(res => {
          console.log('res  osama' + JSON.stringify(res));
          if (res.status === 'success') {
            setloading(false);
            setSuccessShow(true);
          } else {
            //alert(JSON.stringify(res));
            //alert('error');
            console.log('errr' + res.message);
            setIspopupvisble(true);
            seterrorValidation(res.message);
            setloading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      //alert('false');
    }
  };

  const getyears = () => {
    let currentYear = new Date().getFullYear().toString();
    //alert(currentYear);
    var lasttwo = currentYear.slice(-2);
    // alert(lasttwo);
    years = [];
    for (let index = lasttwo; index >= 0; index--) {
      if (index < 10) {
        years.push({name: '200' + index, value: '200' + index});
      } else {
        years.push({name: '20' + index, value: '20' + index});
      }
    }
  };

  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: colors.bgGray}}>
      <Loader show={loading} />
      <ScrollView
        style={{height: '100%', width: '100%'}}
        keyboardShouldPersistTaps="handled">
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
                backgroundColor: colors.blue,
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
              {localizedString.generalInformationText}
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
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* IMAGE PICKER */}

            {/* <View
              style={{
                height: 100,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={imagePicker}
                style={Styles.imagePickTile}>
                <IoIcon size={30} color={colors.blue} name="camera" />
                <Text style={{fontSize: 10}}>Add Images</Text>
              </TouchableOpacity>

              <FlatList
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                data={pickImge}
                renderItem={itemData => {
                  //console.log(itemData.item.path);
                  return (
                    <View style={{height: 100, width: 100, margin: 10}}>
                      <Image
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'cover',
                          borderRadius: 10,
                        }}
                        source={{uri: itemData.item.path}}
                      />
                    </View>
                  );
                }}
              />
            </View> */}

            {/* FORM FIELDS */}
            <View style={{width: '100%', marginTop: 10, marginBottom: 20}}>
              {/* Title */}
              <MyInput
                formTitle={localizedString.titletext}
                placeHolder={localizedString.titleplaceholder}
                onChange={onChangeText}
              />

              {/* <MyInput
                formTitle="Price"
                keyboardType="number-pad"
                placeHolder="Enter price here"
                onChange={onChangeText}
              /> */}

              {/* <MultiSlider
                // onValuesChangeStart={true}
                // onValuesChangeFinish={true}
                enabledTwo={true}
                onValuesChangeFinish={val => {}}
                showStepMarkers={true}
                showSteps-={true}
                isMarkersSeparated={true}
                // sliderLength={316}
                min={0}
                max={100}
                step={1}
                values={[10, 50]}
              /> */}

              <MyInput
                formTitle={localizedString.sizesqText}
                keyboardType="number-pad"
                placeHolder={localizedString.sizesqplaceholder}
                onChange={onChangeText}
              />

              <MyInput
                formTitle={localizedString.roominoutText}
                keyboardType="number-pad"
                placeHolder={localizedString.roominputplaceholder}
                onChange={onChangeText}
              />

              <MyInput
                formTitle={localizedString.bathinputText}
                keyboardType="number-pad"
                placeHolder={localizedString.bathinputplcaeholder}
                onChange={onChangeText}
              />

              {/* <MyInput
                formTitle="Build Year"
                keyboardType="number-pad"
                placeHolder="Enter build year here"
                onChange={onChangeText}
              /> */}

              {/* <View
                style={{
                  width: '100%',
                  height: 84,
                  //backgroundColor: 'yellow',
                  //padding: 17,
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontSize: 14,
                    fontFamily: 'Inter-SemiBold',
                    marginTop: 2,
                  }}>
                  Year
                </Text>
                <Dropdown
                  style={Styles.dropdown}
                  data={years}
                  maxHeight={200}
                  labelField="name"
                  valueField="value"
                  placeholder="Select Year"
                  placeholderStyle={{
                    color: 'black',
                    fontFamily: 'Inter-Medium',
                    fontSize: 13,
                    marginLeft: 11,
                  }}
                  selectedTextStyle={{marginLeft: 11}}
                  value={yeardropdown}
                  onChange={item => {
                    setyeardropdown(item.value);
                  }}
                  renderLeftIcon={
                    () => null
                  }
                
                />
              </View> */}

              {/* <View
                style={{
                  width: '100%',
                  height: 84,
                  //backgroundColor: 'yellow',
                  //padding: 17,
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontSize: 14,
                    fontFamily: 'Inter-SemiBold',
                    marginTop: 2,
                  }}>
                  Country
                </Text>
                <Dropdown
                  style={Styles.dropdown}
                  //containerStyle={{height:50}}
                  data={country}
                  //search
                  //searchPlaceholder="Search"
                  maxHeight={114}
                  labelField="name"
                  valueField="id"
                  //label="Dropdown"
                  placeholder="Select Country"
                  placeholderStyle={{
                    color: 'black',
                    fontFamily: 'Inter-Medium',
                    fontSize: 13,
                    marginLeft: 11,
                  }}
                  selectedTextStyle={{marginLeft: 11}}
                  value={countrydropdown}
                  onChange={item => {
                    setcountrydropdown(item.id);
                    console.log('selected', item);
                  }}
                  renderLeftIcon={
                    () => null
                    // <Icon
                    //   name="arrow-back"
                    //   size={20}
                    //   color="#191919"
                    //   style={{padding: 4}}
                    // />
                  }
                  //renderItem={item => _renderItem(item)}
                  //textError="Error"
                />
              </View> */}

              {/* <View
                style={{
                  width: '100%',
                  height: 84,
                 
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontSize: 14,
                    fontFamily: 'Inter-SemiBold',
                    marginTop: 3,
                  }}>
                  City
                </Text>
                <Dropdown
                  style={Styles.dropdown}
              
                  data={city}
               
                  maxHeight={200}
                  labelField="name"
                  valueField="id"
            
                  placeholder="Select City"
                  placeholderStyle={{
                    color: 'black',
                    fontFamily: 'Inter-Medium',
                    fontSize: 13,
                    marginLeft: 11,
                  }}
                  selectedTextStyle={{marginLeft: 11}}
                  value={citydropdown}
                  onChange={item => {
                    setcitydropdown(item.id);
                    console.log('selected', item);
                  }}
                  renderLeftIcon={
                    () => null
                  
                  }
                  
                />
              </View> */}

              {/* <MyInput
                formTitle="Location"
                placeHolder="Location"
                onChange={onChangeText}
                onFocus={openpicker}
              /> */}
              <LoactionInput
                title={localizedString.locationText}
                onPicker={openpicker}
                pickValue={selectedaddress}
              />

              <MyInput
                desc
                formTitle={localizedString.deatilrequestText}
                placeHolder={localizedString.deatilsplaceholder}
                onChange={onChangeText}
              />
              <View style={{marginTop: 0}}>
                <View
                  style={{
                    width: '100%',
                    marginTop: 3,
                    //backgroundColor: 'red',
                    height: 80,
                    flexDirection: 'row',
                    //padding: 10,
                    paddingTop: 0,
                  }}>
                  <View
                    style={{
                      width: '45%',
                      marginTop: 10,
                      //backgroundColor: 'red',
                      height: '100%',
                    }}>
                    <MyInput
                      formTitle={localizedString.MinPrice}
                      placeHolder={localizedString.MinPrice}
                      onChange={onChangeText}
                      value={minprice}
                      keyboardType="numeric"
                    />
                  </View>
                  <View
                    style={{
                      width: '10%',
                      marginTop: 10,
                      //backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      marginTop: 20,
                    }}>
                    <Text style={{borderRadius: 1}}>__</Text>
                  </View>
                  <View
                    style={{
                      width: '45%',
                      marginTop: 10,
                      //backgroundColor: 'red',
                      height: '100%',
                    }}>
                    <MyInput
                      formTitle={localizedString.maxPrice}
                      placeHolder={localizedString.maxPrice}
                      onChange={onChangeText}
                      value={maxprice}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontFamily: 'Inter-ExtraBold',
                  marginTop: 11,
                  fontSize: 10,
                }}>
                {errorValidation}
              </Text>

              {/* BUTTON */}
              <View style={{marginTop: 10}}>
                <AuthButton
                  //onPress={() => setSuccessShow(true)}
                  onPress={() => PostPropertyAds()}
                  title={localizedString.sendText}
                />
              </View>
            </View>
          </View>
        </View>

        <SuccessModal
          modelOff={() => {
            setSuccessShow(false);
            props.navigation.navigate('Home');
          }}
          visible={successModelShow}
        />
        <PopUpModel
          visible={popupvisble}
          message={errorValidation}
          Success={false}
          btntext={localizedString.okayText}
          onPress={() => {
            if (errorValidation.includes('denied')) {
              AsyncStorage.clear();
              //props.navigation.replace('SignIn2');
              setLanguage('en');
              _setLanguage('en');
              props.navigation.reset({
                index: 0,
                routes: [{name: 'SignIn2'}],
              });
            } else {
              //setFeedback('');
              setIspopupvisble(false);
            }
          }}
        />
      </ScrollView>
      <LocationpickerModal
        title={localizedString.locationText}
        modalPopUp={locationModal}
        pickerSearch={text => setLocationSearch(text.trim())}
        onCancel={() => setLocationModal(false)}
        mapcordinates={mapCordinates}
        setAdress={onChangeText}
        funsetmapCordinates={setmapCordinates}
        getaddress={getAddress}>
        <FlatList
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            width: '100%',
          }}
          showsVerticalScrollIndicator={false}
          data={location}
          keyExtractor={(item, index) => index.toString()}
          renderItem={itemData => {
            return (
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => {
                    setLocation('');
                    setMapCordinates({
                      ...mapCordinates,
                      latitude: itemData.item.geometry.location.lat,
                      longitude: itemData.item.geometry.location.lng,
                    });
                    setSelectedLocation(itemData.item);
                    onChangeText(
                      itemData.item.formatted_address,
                      localizedString.locationText,
                    );
                    // setLocationModal(false);
                  }}
                  style={{
                    marginVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{paddingVertical: 10}}>
                    {itemData.item.formatted_address}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </LocationpickerModal>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tileContainer: {
    height: 70,
    width: '100%',
    backgroundColor: 'lightgray',
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
  imagePickTile: {
    height: 100,
    width: 100,
    backgroundColor: colors.gray,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.blue,
    borderStyle: 'dashed',
  },
  dropdown: {
    //backgroundColor: 'white',
    borderColor: '#19191933',
    //borderBottomWidth: 0.5,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 7,
  },
});

export default PostAnAddStep3;
