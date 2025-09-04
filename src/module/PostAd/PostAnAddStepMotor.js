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
import Iconcheck from 'react-native-vector-icons/Ionicons';
import IconUncheck from 'react-native-vector-icons/Fontisto';
import {
  getAllCities,
  getAllCountries,
  getAllCarModels,
  getAllCarMakes,
  postRequestCar,
} from '../../shared/ApiMiddleware/api';
import PopUpModel from '../../shared/components/PopUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SliderRange from '../../shared/components/SliderRange';
import {
  propertyMasterData,
  motorMasterData,
} from '../../shared/Constant/Constant';
import {localizedString} from '../../shared/localization/localization';
import {languagee, _setLanguage} from '../../shared/Constant/Constant';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

const data = [
  {name: 'New In', value: '1'},
  {name: 'High to Low', value: '2'},
  {name: 'Low to High', value: '3'},
];
let years = [];
let transmissions = [
  {name: 'GCC Specs', value: 'GCC Specs'},
  {name: 'European Specs', value: 'European Specs'},
  {name: 'Japanese Specs', value: 'Japanese Specs'},
  {name: 'American Specs', value: 'American Specs'},
  {name: 'Canadian', value: 'Canadian'},
  {name: 'Australian Specs', value: 'Australian Specs'},
  {name: 'Not Sure', value: 'Not Sure'},
  {name: 'Other Specs', value: 'Other Specs'},
];
let arabictransmissions = [
  {name: 'المواصفات الخليجية', value: 'GCC Specs'},
  {name: 'المواصفات الأوروبية', value: 'European Specs'},
  {name: 'المواصفات اليابانية', value: 'Japanese Specs'},
  {name: 'المواصفات الأمريكية', value: 'American Specs'},
  {name: 'كندي', value: 'Canadian'},
  {name: 'المواصفات الاسترالية', value: 'Australian Specs'},
  {name: 'غير متأكد', value: 'Not Sure'},
  {name: 'المواصفات الأخرى', value: 'Other Specs'},
];
let regionSpec = [
  {name: 'Automatic', value: 'Automatic'},
  {name: 'Manual', value: 'Manual'},
  {name: 'CVT', value: 'CVT'},
  {name: 'DCT', value: 'DCT'},
];
let arabicregionSpec = [
  {name: 'تلقائي', value: 'Automatic'},
  {name: 'كتيب', value: 'Manual'},
  {name: 'CVT', value: 'CVT'},
  {name: 'DCT', value: 'DCT'},
];
const PostAnAddStep3 = props => {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const {id} = props.route.params;
  const [successModelShow, setSuccessShow] = useState(false);
  const [citydropdown, setcitydropdown] = useState('');
  const [loading, setloading] = useState(false);
  const [city, setcity] = useState([]);
  const [country, setcountry] = useState([]);
  const [countrydropdown, setcountrydropdown] = useState('');
  const [carModel, setcarModel] = useState([]);
  const [cardropdownModel, setcardropdownModel] = useState('');
  const [carMake, setcarMake] = useState([]);
  const [cardropdownMake, setcardropdownMake] = useState('');
  const [title, settitle] = useState('');
  const [price, setprice] = useState('');
  const [initalprice, setinitalprice] = useState([0, 0]);
  const [range, setrange] = useState([0, 0]);
  const [color, setcolor] = useState('');
  const [door, setdoor] = useState('');
  const [year, setyear] = useState('');
  const [yeardropdown, setyeardropdown] = useState('');
  const [minyeardropdown, setminyeardropdown] = useState('');
  const [cylinder, setcylinder] = useState('');
  const [regionspec, setregionspec] = useState('');
  const [transmission, settransmission] = useState('');
  const [description, setdescription] = useState('');
  const [kmMin, setkmMin] = useState('');
  const [kmMax, setkmMax] = useState('');
  const [errorValidation, seterrorValidation] = useState('');
  const [warranty, ISwarranty] = useState(false);
  const [popupvisble, setIspopupvisble] = useState(false);
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
          //setloading(false);
          setcountry(res.countries);
        } else {
          //setloading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });

    getAllCarModels()
      .then(res => {
        if (res.status === 'success') {
          setloading(false);
          setcarModel(res.model);
        } else {
          setloading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });

    getAllCarMakes()
      .then(res => {
        if (res.status === 'success') {
          setloading(false);
          setcarMake(res.makes);
        } else {
          setloading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onChangeText = (value, name) => {
    if (name === localizedString.titletext) {
      //alert(value);
      settitle(value);
    } else if (name === localizedString.colorText) {
      setcolor(value);
    } else if (name === localizedString.doorsText) {
      setdoor(value);
    } else if (name === localizedString.cylinderText) {
      setcylinder(value);
    } else if (name === 'Region Spec') {
      setregionspec(value);
    } else if (name === 'Transmission') {
      settransmission(value);
    } else if (name === localizedString.DescriptionText) {
      setdescription(value);
    } else if (name === localizedString.minKM) {
      setkmMin(value);
    } else if (name === localizedString.maxKM) {
      setkmMax(value);
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
  function getyears() {
    let currentYear = new Date().getFullYear().toString();
    //alert(currentYear);
    var lasttwo = currentYear.slice(-2);
    var startindex = lasttwo;
    // alert(lasttwo);
    console.log('function call');
    years = [];
    for (let index = startindex; index >= 0; index--) {
      // console.log(index);
      if (index < 10) {
        if (lasttwo >= 20) {
          years.push({name: '200' + index, value: '200' + index});
        }
        if (index === 0 && lasttwo >= 19) {
          lasttwo = 18;
          get19years();
        }
      } else if (index >= 10) {
        if (lasttwo >= 20) {
          years.push({name: '20' + index, value: '20' + index});
        }
      }
    }
  }

  function get19years() {
    for (let index = 99; index >= 0; index--) {
      // console.log(index);
      if (index < 10) {
        years.push({name: '1999' + index, value: '1999' + index});
      } else if (index >= 10) {
        years.push({name: '19' + index, value: '19' + index});
      }
    }
  }

  const SetPrice = value => {
    setprice(value);
    setrange(value);
    // console.log(price);
  };

  function Validation() {
    if (
      title === '' ||
      color === '' ||
      door === '' ||
      yeardropdown === '' ||
      cylinder === '' ||
      regionspec === '' ||
      transmission === '' ||
      description === '' ||
      cardropdownModel === '' ||
      cardropdownMake === '' ||
      minyeardropdown === '' ||
      yeardropdown === '' ||
      kmMin === '' ||
      kmMax === ''
    ) {
      seterrorValidation('Fields are Empty');
      setIspopupvisble(true);
      return false;
    }
    seterrorValidation('');
    return true;
  }
  const PostCarAds = () => {
    const IsValidate = Validation();
    if (IsValidate === true) {
      setloading(true);

      const userData = {
        Title: title,
        Description: description,
        CategoryID: id,
        MakeID: cardropdownMake,
        ModelID: cardropdownModel,
        Color: color,
        Doors: door,
        Cylinders: cylinder,
        Transmission: transmission,
        MinYear: minyeardropdown,
        MaxYear: yeardropdown,
        MinKilometers: kmMin,
        MaxKilometers: kmMax,
        MinPrice: minprice,
        MaxPrice: maxprice,
        RegionalSpecification: regionspec,
        Warranty: warranty,
      };

      postRequestCar(userData)
        .then(res => {
          console.log(' res  osama' + JSON.stringify(res));
          if (res.status === 'success') {
            setloading(false);
            setSuccessShow(true);
          } else {
            setIspopupvisble(true);
            seterrorValidation(res.message);
            setloading(false);
            //alert(JSON.stringify(res));
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // console.log('foucs');
      getyears();
    });
  }, []);

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
            {/* FORM FIELDS */}
            <View style={{width: '100%', marginTop: 10, marginBottom: 20}}>
              <MyInput
                formTitle={localizedString.titletext}
                placeHolder={localizedString.DescriptionText}
                onChange={onChangeText}
              />
              <MyInput
                formTitle={localizedString.DescriptionText}
                placeHolder={localizedString.descripationplaceholder}
                onChange={onChangeText}
              />
              <View
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
                    marginTop: 3,
                    textAlign: isRtl ? 'right' : 'left',
                  }}>
                  {localizedString.makeText}
                </Text>
                <Dropdown
                  style={Styles.dropdown}
                  //containerStyle={{height:50}}
                  data={carMake}
                  //search
                  //searchPlaceholder="Search"
                  maxHeight={200}
                  labelField="name"
                  valueField="id"
                  //label="Dropdown"
                  placeholder={localizedString.carMakeText}
                  iconStyle={{
                    marginRight: 9,
                  }}
                  placeholderStyle={{
                    color: 'black',
                    fontFamily: 'Inter-Medium',
                    fontSize: 13,
                    marginLeft: 11,
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                  value={cardropdownMake}
                  selectedTextStyle={{
                    marginLeft: 10,
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                  onChange={item => {
                    setcardropdownMake(item.id);
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
              </View>

              <View
                style={{
                  width: '100%',
                  height: 78,
                  //backgroundColor: 'yellow',
                  //padding: 17,
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontSize: 14,
                    fontFamily: 'Inter-SemiBold',
                    textAlign: isRtl ? 'right' : 'left',
                    //marginTop: 2,
                  }}>
                  {localizedString.modelText}
                </Text>
                <Dropdown
                  style={Styles.dropdown}
                  //containerStyle={{height:50}}
                  data={carModel}
                  //search
                  //searchPlaceholder="Search"
                  maxHeight={200}
                  labelField="name"
                  valueField="id"
                  //label="Dropdown"
                  iconStyle={{
                    marginRight: 12,
                  }}
                  placeholder={localizedString.carmodelText}
                  placeholderStyle={{
                    color: 'black',
                    fontFamily: 'Inter-Medium',
                    fontSize: 13,
                    marginLeft: 11,
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                  value={cardropdownModel}
                  onChange={item => {
                    setcardropdownModel(item.id);
                    console.log('selected', item);
                  }}
                  selectedTextStyle={{
                    marginLeft: 11,
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                  renderLeftIcon={() => null}
                />
              </View>

              <MyInput
                formTitle={localizedString.colorText}
                placeHolder={localizedString.colorPlaceholder}
                onChange={onChangeText}
              />

              <MyInput
                formTitle={localizedString.doorsText}
                keyboardType="number-pad"
                placeHolder={localizedString.doorPplaceholder}
                onChange={onChangeText}
              />

              <MyInput
                formTitle={localizedString.cylinderText}
                keyboardType="number-pad"
                placeHolder={localizedString.cylinderplaceholder}
                onChange={onChangeText}
              />

              <View
                style={{
                  width: '100%',
                  height: 78,
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontSize: 14,
                    fontFamily: 'Inter-SemiBold',
                    textAlign: isRtl ? 'right' : 'left',
                    //marginTop: 2,
                  }}>
                  {localizedString.regionalSpecificationText}
                </Text>
                <Dropdown
                  style={Styles.dropdown}
                  //containerStyle={{height:50}}
                  data={
                    languagee === 'ar' ? arabictransmissions : transmissions
                  }
                  //search
                  //searchPlaceholder="Search"
                  maxHeight={200}
                  labelField="name"
                  valueField="value"
                  iconStyle={{
                    marginRight: 12,
                  }}
                  //label="Dropdown"
                  placeholder={localizedString.regionalspecificationplaceholder}
                  placeholderStyle={{
                    color: 'black',
                    fontFamily: 'Inter-Medium',
                    fontSize: 13,
                    marginLeft: 11,
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                  value={transmission}
                  onChange={item => {
                    settransmission(item.value);
                    console.log('selected', item);
                  }}
                  selectedTextStyle={{
                    marginLeft: 11,
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                  renderLeftIcon={() => null}
                />
              </View>

              <View
                style={{
                  width: '100%',
                  height: 78,
                  //backgroundColor: 'yellow',
                  //padding: 17,
                  marginTop: 4,
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontSize: 14,
                    fontFamily: 'Inter-SemiBold',
                    textAlign: isRtl ? 'right' : 'left',
                    //marginTop: 2,
                  }}>
                  {localizedString.transmissionText}
                </Text>
                <Dropdown
                  style={Styles.dropdown}
                  //containerStyle={{height:50}}
                  data={languagee === 'ar' ? arabicregionSpec : regionSpec}
                  //search
                  //searchPlaceholder="Search"
                  maxHeight={200}
                  labelField="name"
                  valueField="value"
                  iconStyle={{
                    marginRight: 12,
                  }}
                  //label="Dropdown"
                  placeholder={localizedString.transmissionplaceholder}
                  placeholderStyle={{
                    color: 'black',
                    fontFamily: 'Inter-Medium',
                    fontSize: 13,
                    marginLeft: 11,
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                  value={regionspec}
                  onChange={item => {
                    setregionspec(item.value);
                    console.log('selected', item);
                  }}
                  selectedTextStyle={{
                    marginLeft: 11,
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                  renderLeftIcon={() => null}
                />
              </View>

              <View
                style={{
                  width: '100%',
                  height: 84,
                  // backgroundColor: 'yellow',
                  flexDirection: 'row',
                  marginTop: 4,
                  //padding: 17,
                }}>
                <View
                  style={{
                    width: '48%',
                    height: 84,

                    // backgroundColor: 'yellow',
                    //padding: 17,
                  }}>
                  <Text
                    style={{
                      color: '#191919',
                      fontSize: 14,
                      fontFamily: 'Inter-SemiBold',
                      marginTop: 2,
                      textAlign: isRtl ? 'right' : 'left',
                    }}>
                    {localizedString.minyear}
                  </Text>
                  <Dropdown
                    style={Styles.dropdown}
                    //containerStyle={{height:50}}
                    data={years}
                    //search
                    //searchPlaceholder="Search"
                    maxHeight={200}
                    labelField="name"
                    valueField="value"
                    iconStyle={{
                      marginRight: 12,
                    }}
                    //label="Dropdown"
                    placeholder={localizedString.yearplaceholder}
                    placeholderStyle={{
                      color: 'black',
                      fontFamily: 'Inter-Medium',
                      fontSize: 13,
                      marginLeft: 11,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                    selectedTextStyle={{
                      marginLeft: 11,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                    value={minyeardropdown}
                    onChange={item => {
                      setminyeardropdown(item.value);
                      //console.log('selected', item);
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
                </View>

                <View
                  style={{
                    width: '48%',
                    height: 84,
                    marginLeft: 13,
                    //backgroundColor: 'yellow',
                    //padding: 17,
                  }}>
                  <Text
                    style={{
                      color: '#191919',
                      fontSize: 14,
                      fontFamily: 'Inter-SemiBold',
                      marginTop: 2,
                      textAlign: isRtl ? 'right' : 'left',
                    }}>
                    {localizedString.maxyear}
                  </Text>
                  <Dropdown
                    style={Styles.dropdown}
                    //containerStyle={{height:50}}
                    data={years}
                    //search
                    //searchPlaceholder="Search"
                    maxHeight={200}
                    labelField="name"
                    valueField="value"
                    iconStyle={{
                      marginRight: 12,
                    }}
                    //label="Dropdown"
                    placeholder={localizedString.yearplaceholder}
                    placeholderStyle={{
                      color: 'black',
                      fontFamily: 'Inter-Medium',
                      fontSize: 13,
                      textAlign: isRtl ? 'right' : 'left',
                      marginLeft: 11,
                    }}
                    selectedTextStyle={{
                      marginLeft: 11,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                    value={yeardropdown}
                    onChange={item => {
                      setyeardropdown(item.value);
                      //console.log('selected', item);
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
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  height: 84,
                  // backgroundColor: 'yellow',
                  flexDirection: 'row',
                  //padding: 17,
                }}>
                <View
                  style={{
                    width: '47%',
                    height: 84,
                    // backgroundColor: 'yellow',
                    //padding: 17,
                  }}>
                  <MyInput
                    formTitle={localizedString.minKM}
                    placeHolder={localizedString.min}
                    onChange={onChangeText}
                    keyboardType="number-pad"
                  />
                </View>
                <View
                  style={{
                    width: '47%',
                    height: 84,
                    marginLeft: 20,
                    // backgroundColor: 'yellow',
                    //padding: 17,
                  }}>
                  <MyInput
                    formTitle={localizedString.maxKM}
                    placeHolder={localizedString.max}
                    onChange={onChangeText}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View style={{marginTop: 0}}>
                <View
                  style={{
                    width: '100%',
                    //marginTop: 2,
                    //backgroundColor: 'red',
                    height: 80,
                    flexDirection: 'row',
                    //padding: 10,
                    //paddingTop: 0,
                  }}>
                  <View
                    style={{
                      width: '48%',
                      // marginTop: 10,
                      //backgroundColor: 'red',
                      height: '100%',
                    }}>
                    <MyInput
                      formTitle={localizedString.MinPrice}
                      placeHolder={localizedString.min}
                      onChange={onChangeText}
                      value={minprice}
                      keyboardType="numeric"
                    />
                  </View>
                  <View
                    style={{
                      width: '5%',
                      //marginTop: 10,
                      //backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      marginTop: 20,
                    }}>
                    {/* <Text style={{borderRadius: 1}}>__</Text> */}
                  </View>
                  <View
                    style={{
                      width: '48%',
                      //marginTop: 10,
                      //backgroundColor: 'red',
                      height: '100%',
                    }}>
                    <MyInput
                      formTitle={localizedString.maxPrice}
                      placeHolder={localizedString.max}
                      onChange={onChangeText}
                      value={maxprice}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  // justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 19,
                  // backgroundColor: 'red',
                }}>
                {warranty === true ? (
                  <Iconcheck
                    name="checkbox"
                    size={15}
                    color="#0989B8"
                    onPress={() => ISwarranty(previousState => !previousState)}
                  />
                ) : (
                  <IconUncheck
                    name="checkbox-passive"
                    size={15}
                    color="#989898"
                    onPress={() => ISwarranty(previousState => !previousState)}
                  />
                )}
                <Text
                  style={{
                    color: '#989898',
                    fontSize: 12,
                    fontFamily: 'Inter-Medium',
                    marginLeft: 5,
                  }}>
                  {localizedString.warrantydeatilsText}
                </Text>
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
                  onPress={() => PostCarAds()}
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
            if (errorValidation.includes('denied' || 'Session')) {
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
    marginTop: 5,
  },
});

export default PostAnAddStep3;
