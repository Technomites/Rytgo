/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
//import liraries
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconsort from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

import FilterCard from '../../shared/components/FilterCard';
import SliderBar from '../../shared/components/SliderBar';
import SliderBarPrice from '../../shared/components/SliderBarPrice';
import SliderRange from '../../shared/components/SliderRange';
import FlatButton from '../../shared/components/FlatButton';
import {
  getAllCities,
  getPropertyCategories,
  getCarCategories,
  getCarFeature,
  getPropertyFeature,
  getAllmasterData,
} from '../../shared/ApiMiddleware/api';
import FilterPropertyCategoryCard from '../../shared/components/FilterPropertyCard';
import * as Filteraction from '../../redux/action/Filteraction';
import * as citycategoryfeatureFilter from '../../redux/action/citycategoryfeatureFilter';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../shared/components/Loader';
import {localizedString} from '../../shared/localization/localization';
import MyInput from '../../shared/components/MyInput';
import {
  propertyMasterData,
  motorMasterData,
  accessToken,
  languagee,
} from '../../shared/Constant/Constant';

import {max, set} from 'react-native-reanimated';
import HorizontalLine from '../../shared/components/HorizontalLine';
import {LocalizationString} from 'react-native-easy-localization-and-rtl';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

const data = [
  {label: 'New In', value: '1'},
  {label: 'High to Low', value: '2'},
  {label: 'Low to High', value: '3'},
];
const arabicdata = [
  {label: 'الجديد في', value: '1'},
  {label: 'من الأعلى إلى الأقل', value: '2'},
  {label: 'من أسفل إلى أعلى', value: '3'},
];
let regionSpec = [
  {name: 'GCC Specs', value: 'GCC Specs'},
  {name: 'European Specs', value: 'European Specs'},
  {name: 'Japanese Specs', value: 'Japanese Specs'},
  {name: 'American Specs', value: 'American Specs'},
  {name: 'Canadian', value: 'Canadian'},
  {name: 'Australian Specs', value: 'Australian Specs'},
  {name: 'Not Sure', value: 'Not Sure'},
  {name: 'Other Specs', value: 'Other Specs'},
];
let arabicregionSpec = [
  {name: 'المواصفات الخليجية', value: 'GCC Specs'},
  {name: 'المواصفات الأوروبية', value: 'European Specs'},
  {name: 'المواصفات اليابانية', value: 'Japanese Specs'},
  {name: 'المواصفات الأمريكية', value: 'American Specs'},
  {name: 'كندي', value: 'Canadian'},
  {name: 'المواصفات الاسترالية', value: 'Australian Specs'},
  {name: 'غير متأكد', value: 'Not Sure'},
  {name: 'المواصفات الأخرى', value: 'Other Specs'},
];
// const Roomsdata = [
//   {label: '1', value: '1'},
//   {label: '2', value: '2'},
//   {label: '3', value: '3'},
//   {label: '4', value: '4'},
//   {label: '5', value: '5'},
//   {label: '6', value: '6'},
//   {label: '7', value: '7'},
//   {label: '8', value: '8'},
//   {label: '9', value: '9'},
//   {label: '10', value: '10'},
//   {label: '11', value: '12'},
// ];
const Bathdata = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
];
let propertyFilterObj = {};
let carFilterObj = {};
let propertyFilter = {};
let carFilter = {};
let years = [];
let citydata = [];
let motorcategory = [];
let motorfeature = [];
let propertycategory = [];
let propertyfeatures = [];
let loader = true;

const Filter = ({navigation, route}) => {
  const {RtlStyles, isRtl} = useRtlContext();
  const {name, type} = route.params;
  //console.log('filter' + type);

  propertyFilter = useSelector(state => state.propertyFilter.propertyFilter);
  carFilter = useSelector(state => state.propertyFilter.carFilter);
  citydata = useSelector(state => state.FilterCitycategoryfeature.cities);
  motorcategory = useSelector(
    state => state.FilterCitycategoryfeature.carCategory,
  );
  motorfeature = useSelector(
    state => state.FilterCitycategoryfeature.carFeatures,
  );
  propertycategory = useSelector(
    state => state.FilterCitycategoryfeature.propertyCategory,
  );
  propertyfeatures = useSelector(
    state => state.FilterCitycategoryfeature.propertyFeatures,
  );

  loader = useSelector(state => state.FilterCitycategoryfeature.loader);
  const [categoryShown, setCategoriesShown] = useState(false);
  const [citiesShown, setcitiesShown] = useState(false);
  const [faetureShown, setfaetureShown] = useState(false);

  //console.log('Property filter' + propertyFilter);
  //console.log('car filter' + carFilter);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [pricerange, setpricerange] = useState([0, 0]);
  const [price, setPrice] = useState(0);
  const [initalprice, setinitalprice] = useState([0, 0]);
  const [bath, setBath] = useState(0);
  const [initalbath, setinitalBath] = useState(0);
  const [bed, setBed] = useState(0);
  const [initalbed, setinitalBed] = useState(0);
  const [size, setSize] = useState(0);
  const [initalsize, setinitalSize] = useState(0);
  const [selected, setSelected] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedcityId, setselectedcityId] = useState(-1);
  const [selectedcityIndex, setselectedcityIndex] = useState(-1);
  const [render, setrender] = useState('');
  //-------------------------------------------------------------------------------

  const [makes, setmakes] = useState([]);
  const [cardropdownmakes, setcardropdownmakes] = useState(null);
  const [bodyType, setbodyType] = useState([]);
  const [cardropdownbody, setcardropdownbody] = useState(null);
  const [model, setmodel] = useState([]);
  const [cardropdownmodel, setcardropdownmodel] = useState(null);
  const [transmission, settransmission] = useState([]);
  const [regionspec, setregionspec] = useState(null);
  const [cardropdowntransmission, setcardropdowntransmission] = useState(null);

  //-----------------------------------------------------------------------------------
  const [carCategories, setcarCategories] = useState([]);
  const [propertyCategories, setpropertyCategories] = useState([]);
  const [selectedpropertyCategoryId, setselectedpropertyCategoryId] = useState(
    [],
  );
  const [selectedcarCategoryId, setselectedcarCategoryId] = useState([]);
  const [carFeature, setcarFeature] = useState([]);
  const [propertyfeature, setpropertyfeature] = useState([]);
  const [selectedpropertyfeatureId, setselectedpropertyfeatureId] = useState(
    [],
  );
  const [selectedcarfeatureId, setselectedcarfeatureId] = useState([]);

  const [IsPropertyCategory, setIsPropertyCategory] = useState(true);
  const [IsPropertyFeature, setIsPropertyFeature] = useState(true);
  const [IsCarCategory, setIsCarCategory] = useState(true);
  const [IsCarFeature, setIsCarFeature] = useState(true);

  const [minprice, setminPrice] = useState(0);
  const [maxprice, setmaxPrice] = useState(0);

  const [minsize, setminsize] = useState(0);
  const [maxsize, setmaxsize] = useState(0);

  const [minyear, setminyear] = useState(0);
  const [maxyear, setmaxyear] = useState(0);

  const [minkm, setminKm] = useState(0);
  const [maxKm, setmaxKm] = useState(0);
  const [engine, setengineCC] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [roomselected, setroomSelected] = useState(null);
  const [roomsdata, setRoomsdata] = useState([
    {label: '1', value: '1', isSelected: false},
    {label: '2', value: '2', isSelected: false},
    {label: '3', value: '3', isSelected: false},
    {label: '4', value: '4', isSelected: false},
    {label: '5', value: '5', isSelected: false},
    {label: '6', value: '6', isSelected: false},
    {label: '7', value: '7', isSelected: false},
    {label: '8', value: '8', isSelected: false},
    {label: '9', value: '9', isSelected: false},
    {label: '10', value: '10', isSelected: false},
    {label: '11', value: '11', isSelected: false},
    {label: '12', value: '12', isSelected: false},
  ]);

  const [bathselected, setbathSelected] = useState(null);
  const [bathdata, setbathdata] = useState([
    {label: '1', value: '1', isSelected: false},
    {label: '2', value: '2', isSelected: false},
    {label: '3', value: '3', isSelected: false},
    {label: '4', value: '4', isSelected: false},
    {label: '5', value: '5', isSelected: false},
  ]);

  const [diningselected, setdiningselected] = useState(null);
  const [diningdata, setdiningdata] = useState([
    {label: '1', value: '1', isSelected: false},
    {label: '2', value: '2', isSelected: false},
    {label: '3', value: '3', isSelected: false},
  ]);

  const [laundryselected, setlaundryselected] = useState(null);
  const [laundrydata, setlaundrydata] = useState([
    {label: '1', value: '1', isSelected: false},
    {label: '2', value: '2', isSelected: false},
    {label: '3', value: '3', isSelected: false},
  ]);

  const [garagesselected, setgaragesselected] = useState(null);
  const [garagesdata, setgaragesdata] = useState([
    {label: '1', value: '1', isSelected: false},
    {label: '2', value: '2', isSelected: false},
    {label: '3', value: '3', isSelected: false},
  ]);
  const [transimssionselected, settransimssionselected] = useState(null);
  const [transimssiondata, seTransimssiondata] = useState([
    {label: 'Automatic', value: 'Automatic', isSelected: false},
    {label: 'Manual', value: 'Manual', isSelected: false},
    {label: 'CVT', value: 'CVT', isSelected: false},
    {label: 'DCT', value: 'DCT', isSelected: false},
  ]);
  const [arabictransimssiondata, searabicTransimssiondata] = useState([
    {label: 'تلقائي', value: 'Automatic', isSelected: false},
    {label: 'يدوي', value: 'Manual', isSelected: false},
    {label: 'CVT', value: 'CVT', isSelected: false},
    {label: 'DCT', value: 'DCT', isSelected: false},
  ]);
  const [fuelselected, setfuelselected] = useState(null);
  const [fueldata, sefueldata] = useState([
    {label: 'Petrol', value: 'Petrol', isSelected: false},
    {label: 'Diesel', value: 'Diesel', isSelected: false},
    {label: 'Hybrid', value: 'Hybrid', isSelected: false},
    {label: 'Electric', value: 'Electric', isSelected: false},
  ]);
  const [arabicfueldata, searabicfueldata] = useState([
    {label: 'بنزين', value: 'Petrol', isSelected: false},
    {label: 'ديزل', value: 'Diesel', isSelected: false},
    {label: 'هجين', value: 'Hybrid', isSelected: false},
    {label: 'كهربائي', value: 'Electric', isSelected: false},
  ]);
  const [doorselected, setdoorselected] = useState(null);
  const [doordata, setdoordata] = useState([
    {label: '1', value: '1', isSelected: false},
    {label: '2', value: '2', isSelected: false},
    {label: '3', value: '3', isSelected: false},
    {label: '4', value: '4', isSelected: false},
    {label: '5', value: '5', isSelected: false},
  ]);
  const [wheelselected, setwheelselected] = useState(null);
  const [wheeldata, setwheeldata] = useState([
    {label: '1', value: '1', isSelected: false},
    {label: '2', value: '2', isSelected: false},
    {label: '3', value: '3', isSelected: false},
    {label: '4', value: '4', isSelected: false},
    {label: '5', value: '5', isSelected: false},
  ]);
  const [capacityselected, setcapacityselected] = useState(null);
  const [capacitydata, setcapacitydata] = useState([
    {label: '1-2 Person', value: '1-2 Person', isSelected: false},
    {label: '2-4 Person', value: '2-4 Person', isSelected: false},
    {label: '4-6 Person', value: '4-6 Person', isSelected: false},
    {label: '6-10 Person', value: '6-10 Person', isSelected: false},
  ]);
  const [arabiccapacitydata, setarabiccapacitydata] = useState([
    {label: '1-2 شخص', value: '1-2 Person', isSelected: false},
    {label: '2-4 شخص', value: '2-4 Person', isSelected: false},
    {label: '4-6 شخص', value: '4-6 Person', isSelected: false},
    {label: '6-10 شخص', value: '6-10 Person', isSelected: false},
  ]);
  const [steeringselected, setsteeringselected] = useState(null);
  const [steeringdata, setsteeringdata] = useState([
    {label: 'Left Hand Side', value: 'Left Hand Side', isSelected: false},
    {label: 'Right Hand Side', value: 'Right Hand Side', isSelected: false},
  ]);
  const [arabicsteeringdata, setarabicsteeringdata] = useState([
    {label: 'الجانب الأيسر', value: 'Left Hand Side', isSelected: false},
    {label: 'الجانب الأيمن', value: 'Right Hand Side', isSelected: false},
  ]);
  const [bodyselected, setbodyselected] = useState(null);
  const [bodydata, setbodydata] = useState([
    {label: '1-3', value: '1-3', isSelected: false},
    {label: '4-6', value: '4-6', isSelected: false},
    {label: '7-9', value: '7-9', isSelected: false},
    {label: '10-10', value: '10-10', isSelected: false},
  ]);
  const [mechanicalselected, setmechanicalselected] = useState(null);
  const [mechanicaldata, setmechanicaldata] = useState([
    {label: 'Perfect Inside', value: 'Perfect Inside', isSelected: false},
    {label: 'Perfect Outside', value: 'Perfect Outside', isSelected: false},
    {
      label: 'Perfect Inside & Outside',
      value: 'Perfect Inside & Outside',
      isSelected: false,
    },
  ]);
  const [arabicmechanicaldata, setarabicmechanicaldata] = useState([
    {label: 'الكمال من الداخل', value: 'Perfect Inside', isSelected: false},
    {label: 'الكمال من الخارج', value: 'Perfect Outside', isSelected: false},
    {
      label: 'مثالي من الداخل والخارج',
      value: 'مثالي من الداخل والخارج',
      isSelected: false,
    },
  ]);
  const [cylinderselected, setcylinderselected] = useState(null);
  const [cylinderdata, setcylinderdata] = useState([
    {label: '3', value: '3', isSelected: false},
    {label: '4', value: '4', isSelected: false},
    {label: '5', value: '5', isSelected: false},
    {label: '6', value: '6', isSelected: false},
    {label: '8', value: '8', isSelected: false},
    {label: '10', value: '10', isSelected: false},
    {label: '12', value: '12', isSelected: false},
    {label: '16', value: '16', isSelected: false},
    {label: 'Electric', value: 'Electric', isSelected: false},
    {label: 'All', value: 'All', isSelected: false},
  ]);
  const [arabiccylinderdata, setarabiccylinderdata] = useState([
    {label: '3', value: '3', isSelected: false},
    {label: '4', value: '4', isSelected: false},
    {label: '5', value: '5', isSelected: false},
    {label: '6', value: '6', isSelected: false},
    {label: '8', value: '8', isSelected: false},
    {label: '10', value: '10', isSelected: false},
    {label: '12', value: '12', isSelected: false},
    {label: '16', value: '16', isSelected: false},
    {label: 'كهربائي', value: 'Electric', isSelected: false},
    {label: 'الجميع', value: 'All', isSelected: false},
  ]);

  const [yeardropdown, setyeardropdown] = useState('');
  const [minyeardropdown, setminyeardropdown] = useState('');

  if (name === 'Property') {
    propertyFilterObj = {
      Cityid:
        cities && cities.length > 0 && selectedcityId >= 0
          ? cities[selectedcityId].id
          : '',
      propertycategory: selectedpropertyCategoryId,
      propertyfeature: selectedpropertyfeatureId,
      //price: pricerange, //price commit osama
      price: [minprice, maxprice], // new add
      size: [minsize, maxsize], //  new add
      //year: [minyear, maxyear], //  new add
      year: yeardropdown,
      sortid: dropdown,
      SelectedcityIndex: selectedcityIndex,
      beds: roomselected === null ? null : roomselected?.value, // new add
      roomselected: roomselected === null ? null : roomselected, // add for check collor
      baths: bathselected === null ? null : bathselected?.value, // new add
      bathselected: bathselected === null ? null : bathselected,
      dine: diningselected === null ? null : diningselected?.value, // new add
      diningselected: diningselected === null ? null : diningselected,
      laundry: laundryselected === null ? null : laundryselected?.value, // new add
      laundryselected: laundryselected === null ? null : laundryselected,
      garages: garagesselected === null ? null : garagesselected?.value, // new add
      garagesselected: garagesselected === null ? null : garagesselected,
      furnished: isEnabled,
      //beds: bed, // commit
      //baths: bath, // commit
      // size: size, // commit
    };
  }
  if (name === 'Car') {
    carFilterObj = {
      Cityid:
        cities && cities.length > 0 && selectedcityId >= 0
          ? cities[selectedcityId].id
          : '',
      carcategory: selectedcarCategoryId,
      carfeature: selectedcarfeatureId,
      //price: pricerange, //price commit osama
      serviceHistory: isEnabled,
      price: [minprice, maxprice],
      sortid: dropdown,
      SelectedcityIndex: selectedcityIndex,
      carmake: cardropdownmakes,
      carbody: cardropdownbody,
      carmodel: cardropdownmodel,
      year: yeardropdown, //  new add
      km: [minkm, maxKm],
      engine: engine,
      regionSpec: regionspec,
      transimmsion:
        transimssionselected === null ? null : transimssionselected?.value,
      transimssionselected:
        transimssionselected === null ? null : transimssionselected,
      fuel: fuelselected === null ? null : fuelselected?.value,
      fuelselected: fuelselected === null ? null : fuelselected,
      door: doorselected === null ? null : doorselected?.value,
      doorselected: doorselected === null ? null : doorselected,
      wheel: wheelselected === null ? null : wheelselected?.value,
      wheelselected: wheelselected === null ? null : wheelselected,
      capacity: capacityselected === null ? null : capacityselected?.value,
      capacityselected: capacityselected === null ? null : capacityselected,
      steering: steeringselected === null ? null : steeringselected?.value,
      steeringselected: steeringselected === null ? null : steeringselected,
      bodycondition: bodyselected === null ? null : bodyselected?.value,
      bodyselected: bodyselected === null ? null : bodyselected,
      mechanical:
        mechanicalselected === null ? null : mechanicalselected?.value,
      mechanicalselected:
        mechanicalselected === null ? null : mechanicalselected,
      cylinder: cylinderselected === null ? null : cylinderselected?.value,
      cylinderselected: cylinderselected === null ? null : cylinderselected,
      //cartransmission: cardropdowntransmission,
    };
  }

  const _renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {/* <Image style={styles.icon} source={require('./assets/tick.png')} /> */}
      </View>
    );
  };
  const SetperviouFilterOnScreenLoadCategory = () => {
    if (name === 'Property') {
      if (propertyFilter && IsPropertyCategory === true) {
        //console.log('setdata');
        // write your functions
        if (propertyFilter.hasOwnProperty('Cityid')) {
          // console.log('ID');
          setIsPropertyCategory(false);
          // for (
          //   let index = 0;
          //   index < propertyFilter.propertycategory.length;
          //   index++
          // ) {
          //   SelectPropertyCategoryByIndex(
          //     propertyFilter.propertycategory[index].index,
          //   );
          // }
          setDropdown(propertyFilter.sortid);
          setselectedcityId(propertyFilter.SelectedcityIndex);
          setselectedcityIndex(propertyFilter.SelectedcityIndex);
          setPrice(propertyFilter.price);
          setinitalprice([propertyFilter.price[0], propertyFilter.price[1]]);
          setpricerange([propertyFilter.price[0], propertyFilter.price[1]]);
          setBed(propertyFilter.beds);
          setinitalBed(propertyFilter.beds);
          setBath(propertyFilter.baths);
          setinitalBath(propertyFilter.baths);
          setSize(propertyFilter.size);
          setinitalSize(propertyFilter.size);
          setroomSelected(propertyFilter.roomselected);
          setbathSelected(propertyFilter.bathselected);
          setdiningselected(propertyFilter.diningselected);
          setlaundryselected(propertyFilter.laundryselected);
          setgaragesselected(propertyFilter.garagesselected);
          setminPrice(propertyFilter?.price[0]);
          setmaxPrice(propertyFilter?.price[1]);
          setminsize(propertyFilter?.size[0]);
          setmaxsize(propertyFilter?.size[1]);
          //setminyear(propertyFilter?.year[0]);
          //setmaxyear(propertyFilter?.year[1]);
          setyeardropdown(propertyFilter?.year);
        }
      }
    }
    //console.log('CALL PERVIOUS');
  };

  const SetperviouFilterOnScreenLoadFeature = () => {
    if (name === 'Property') {
      if (propertyFilter && IsPropertyFeature === true) {
        //console.log('setdata');
        // write your functions
        if (propertyFilter.hasOwnProperty('Cityid')) {
          setIsPropertyFeature(false);

          // for (
          //   let index = 0;
          //   index < propertyFilter.propertyfeature.length;
          //   index++
          // ) {
          //   SelectPropertyFeatureByIndex(
          //     propertyFilter.propertyfeature[index].index,
          //   );
          // }
          setDropdown(propertyFilter.sortid);
          setselectedcityId(propertyFilter.SelectedcityIndex);
          setselectedcityIndex(propertyFilter.SelectedcityIndex);
          setPrice(propertyFilter.price);
          setinitalprice([propertyFilter.price[0], propertyFilter.price[1]]);
          setpricerange([propertyFilter.price[0], propertyFilter.price[1]]);
          setBed(propertyFilter.beds);
          setinitalBed(propertyFilter.beds);
          setBath(propertyFilter.baths);
          setinitalBath(propertyFilter.baths);
          setSize(propertyFilter.size);
          setinitalSize(propertyFilter.size);
          setroomSelected(propertyFilter.roomselected);
          setbathSelected(propertyFilter.bathselected);
          setdiningselected(propertyFilter.diningselected);
          setlaundryselected(propertyFilter.laundryselected);
          setgaragesselected(propertyFilter.garagesselected);
          setminPrice(propertyFilter?.price[0]);
          setmaxPrice(propertyFilter?.price[1]);
          setminsize(propertyFilter?.size[0]);
          setmaxsize(propertyFilter?.size[1]);
          //setminyear(propertyFilter?.year[0]);
          //setmaxyear(propertyFilter?.year[1]);
          setyeardropdown(propertyFilter?.year);
        }
      }
    }
  };
  const SetperviouFilterOnScreenLoadCategoryCar = () => {
    if (name === 'Car') {
      if (carFilter && IsCarCategory === true) {
        //console.log('setdata');
        // write your functions

        if (carFilter.hasOwnProperty('Cityid')) {
          setIsCarCategory(false);
          // for (let index = 0; index < carFilter.carcategory.length; index++) {
          //   SelectcarCategoryByIndex(carFilter.carcategory[index].index);
          // }
          setDropdown(carFilter.sortid);
          setselectedcityId(carFilter.SelectedcityIndex);
          setselectedcityIndex(carFilter.SelectedcityIndex);
          setPrice(carFilter.price);
          setinitalprice([carFilter.price[0], carFilter.price[1]]);
          setpricerange([carFilter.price[0], carFilter.price[1]]);
          setcardropdownmakes(carFilter.carmake);
          setcardropdownbody(carFilter.carbody);
          setcardropdownmodel(carFilter.carmodel);
          setyeardropdown(carFilter?.year);
          setmaxKm(carFilter?.km[1]);
          setminKm(carFilter?.km[0]);
          setengineCC(carFilter?.engine);
          setregionspec(carFilter?.regionspec);
          settransimssionselected(carFilter?.transimssionselected);
          setfuelselected(carFilter?.fuelselected);
          setdoorselected(carFilter?.doorselected);
          setwheelselected(carFilter?.wheelselected);
          setcapacityselected(carFilter?.capacityselected);
          setsteeringselected(carFilter?.steeringselected);
          setbodyselected(carFilter?.bodyselected);
          setmechanicalselected(carFilter?.mechanicalselected);
          setcylinderselected(carFilter?.cylinderselected);

          //setcardropdowntransmission(carFilter.cartransmission);
          //     year: yeardropdown, //  new add
          // km: [minkm, maxKm],
          // engine: engine,
          // regionSpec: regionspec,
          // transimmsion:
          //   transimssionselected === null ? null : transimssionselected?.value,
          // fuel: fuelselected === null ? null : fuelselected?.value,
          // door: doorselected === null ? null : doorselected?.value,
          // wheel: wheelselected === null ? null : wheelselected?.value,
          // capacity: capacityselected === null ? null : capacityselected?.value,
          // steering: steeringselected === null ? null : steeringselected?.value,
          // bodycondition: bodyselected === null ? null : bodyselected?.value,
          // mechanical:
          //   mechanicalselected === null ? null : mechanicalselected?.value,
          // cylinder: cylinderselected === null ? null : cylinderselected?.value,
        }
      }
    }
  };

  const SetperviouFilterOnScreenLoadFeatureCar = () => {
    if (name === 'Car') {
      if (carFilter && IsCarFeature === true) {
        //console.log('setdata');
        // write your functions
        if (carFilter.hasOwnProperty('Cityid')) {
          setIsCarFeature(false);

          // for (let index = 0; index < carFilter.carfeature.length; index++) {
          //   SelectcarFeatureByIndex(carFilter.carfeature[index].index);
          // }
          setDropdown(carFilter.sortid);
          setselectedcityId(carFilter.SelectedcityIndex);
          setselectedcityIndex(carFilter.SelectedcityIndex);
          setPrice(carFilter.price);
          setinitalprice([carFilter.price[0], carFilter.price[1]]);
          setpricerange([carFilter.price[0], carFilter.price[1]]);
          setcardropdownmakes(carFilter.carmake);
          setcardropdownbody(carFilter.carbody);
          setcardropdownmodel(carFilter.carmodel);
          //setcardropdowntransmission(carFilter.cartransmission); coomit
          setyeardropdown(carFilter?.year);
          setmaxKm(carFilter?.km[1]);
          setminKm(carFilter?.km[0]);
          setengineCC(carFilter?.engine);
          setregionspec(carFilter?.regionspec);
          settransimssionselected(carFilter?.transimssionselected);
          setfuelselected(carFilter?.fuelselected);
          setdoorselected(carFilter?.doorselected);
          setwheelselected(carFilter?.wheelselected);
          setcapacityselected(carFilter?.capacityselected);
          setsteeringselected(carFilter?.steeringselected);
          setbodyselected(carFilter?.bodyselected);
          setmechanicalselected(carFilter?.mechanicalselected);
          setcylinderselected(carFilter?.cylinderselected);
        }
      }
    }
  };
  const AllCities = () => {
    getAllCities()
      .then(res => {
        //const obj = {isSelected: false};
        if (res.status === 'success') {
          setCities(res.cities);
          setloading(false);
          //console.log('Osamama ' + cities);
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const AllmasterData = () => {
    getAllmasterData()
      .then(res => {
        if (res.status === 'success') {
          setmakes(res.motors.makes);
          setbodyType(res.motors.bodyTypes);
          setmodel(res.motors.models);
          settransmission(res.motors.transmission);
          //setloading(false);
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const AllPropertycategory = () => {
    getPropertyCategories()
      .then(res => {
        // if (res.status === true) {
        //console.log(JSON.stringify(res) + 'osamaa');
        setpropertyCategories(res);

        // }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const AllCarcategory = () => {
    getCarCategories()
      .then(res => {
        setcarCategories(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const AllPropertyfeature = () => {
    getPropertyFeature()
      .then(res => {
        //console.log(res);
        setpropertyfeature(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const AllCarfeature = () => {
    getCarFeature()
      .then(res => {
        setcarFeature(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SelectCityByIndex = id => {
    if (id === selectedcityId) {
      setselectedcityId(-1);
    } else {
      setselectedcityId(id);
      setselectedcityIndex(id);
    }
  };

  const SelectPropertyCategoryByIndex = id => {
    //alert(id)
    // console.log(id + 'redet id');

    let newArr = [...propertyCategories];
    //console.log(newArr);
    if (newArr[id].isSelected == 'true') {
      //alert('TRUE');
      newArr[id].isSelected = 'false';
      let filteredArray = selectedpropertyCategoryId.filter(
        item => item.Categoryid !== newArr[id].id,
      );
      setselectedpropertyCategoryId(filteredArray);
    } else {
      //alert('FALSE');
      newArr[id].isSelected = 'true';
      // setselectedpropertyCategoryId(oldArray => [...oldArray, newArr[id].id]);
      setselectedpropertyCategoryId(oldArray => [
        ...oldArray,
        {index: id, Categoryid: newArr[id].id},
      ]);
    }

    setpropertyCategories(newArr);
  };

  const SelectcarCategoryByIndex = id => {
    let newArr = [...carCategories];
    if (newArr[id].isSelected == 'true') {
      newArr[id].isSelected = 'false';
      let filteredArray = selectedcarCategoryId.filter(
        item => item.Categoryid !== newArr[id].id,
      );
      setselectedcarCategoryId(filteredArray);
    } else {
      newArr[id].isSelected = 'true';
      setselectedcarCategoryId(oldArray => [
        ...oldArray,
        {index: id, Categoryid: newArr[id].id},
      ]);
    }
    setcarCategories(newArr);
  };

  const SelectPropertyFeatureByIndex = id => {
    //alert('fikyer' + id);
    let newArr = [...propertyfeature];
    if (newArr[id].isSelected == 'true') {
      newArr[id].isSelected = 'false';
      let filteredArray = selectedpropertyfeatureId.filter(
        item => item.Featureid !== newArr[id].id,
      );
      setselectedpropertyfeatureId(filteredArray);
    } else {
      newArr[id].isSelected = 'true';
      setselectedpropertyfeatureId(oldArray => [
        ...oldArray,
        {index: id, Featureid: newArr[id].id},
      ]);
    }
    setpropertyfeature(newArr);
  };

  const SelectcarFeatureByIndex = id => {
    //alert('fikyer' + id);
    let newArr = [...carFeature];
    if (newArr[id].isSelected == 'true') {
      newArr[id].isSelected = 'false';
      let filteredArray = selectedcarfeatureId.filter(
        item => item.Featureid !== newArr[id].id,
      );
      setselectedcarfeatureId(filteredArray);
    } else {
      newArr[id].isSelected = 'true';
      setselectedcarfeatureId(oldArray => [
        ...oldArray,
        {index: id, Featureid: newArr[id].id},
      ]);
    }
    setcarFeature(newArr);
  };

  const SetPrice = value => {
    setPrice(value);
    setpricerange(value);
  };
  const funSetBath = value => {
    setBath(value);
  };
  const funSetBed = value => {
    setBed(value);
  };
  const funSetSize = value => {
    setSize(value);
  };

  const onChangeText = (value, name) => {
    //console.log(name);
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
    } else if (name === localizedString.minSize) {
      if (name === localizedString.minSize) {
        //console.log(value + 'max' + maxsize);
        if (Number(maxsize) === 0) {
          setminsize(value);
        } else {
          if (value < Number(maxsize)) {
            setminsize(value);
          }
        }
      }
    } else if (name === localizedString.maxsize) {
      if (value === '') {
        setmaxsize(0);
      } else {
        setmaxsize(value);
      }
    } else if (name === 'Min Year') {
      setminyear(value);
    } else if (name === 'Max Year') {
      setmaxyear(value);
    } else if (name === localizedString.minKM) {
      if (name === localizedString.minKM) {
        //console.log(value + 'max' + maxKm);
        if (Number(maxKm) === 0) {
          setminKm(value);
        } else {
          if (value < Number(maxKm)) {
            setminKm(value);
          }
        }
      }
    } else if (name === localizedString.maxKM) {
      setmaxKm(value);
    } else if (name === localizedString.enginecc) {
      setengineCC(value);
    }
  };

  function getyears() {
    let currentYear = new Date().getFullYear().toString();
    //alert(currentYear);
    var lasttwo = currentYear.slice(-2);
    var startindex = lasttwo;
    // alert(lasttwo);
    //console.log('function call');
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

  const clearPropertyFilter = () => {
    // for (let index = 0; index < selectedpropertyCategoryId.length; index++) {
    //   SelectPropertyCategoryByIndex(selectedpropertyCategoryId[index].index);
    // }
    // for (let index = 0; index < selectedpropertyfeatureId.length; index++) {
    //SelectPropertyFeatureByIndex(selectedpropertyfeatureId[index].index);
    // }
    let newArr = [...propertyfeature];
    for (let index = 0; index < newArr.length; index++) {
      newArr[index].isSelected = 'false';
    }
    let newArr1 = [...propertyCategories];
    for (let index = 0; index < newArr1.length; index++) {
      newArr1[index].isSelected = 'false';
    }

    setpropertyfeature(newArr);
    setpropertyCategories(newArr1);
    setDropdown(null);
    setselectedcityId(-1);
    setselectedcityIndex(-1);
    setselectedpropertyCategoryId([]);
    setselectedpropertyfeatureId([]);
    setPrice(0);
    setinitalprice([0, 0]);
    setBath(0);
    setBed(0);
    setSize(0);
    setinitalBath(0);
    setinitalBed(0);
    setinitalSize(0);
    setrender('true');
    setroomSelected(null);
    setbathSelected(null);
    setdiningselected(null);
    setlaundryselected(null);
    setgaragesselected(null);
    setminPrice(0);
    setmaxPrice(0);
    setminsize(0);
    setmaxsize(0);
    //setminyear(0);
    //setmaxyear(0);
    setyeardropdown(null);
    setIsEnabled(false);
    dispatch(Filteraction.propertyFilter(null));

    // navigation.replace('Filter', {
    //   name: name,
    // });
  };

  const clearCarFilter = () => {
    // for (let index = 0; index < selectedcarCategoryId.length; index++) {
    //   SelectcarCategoryByIndex(selectedcarCategoryId[index].index);
    // }
    // for (let index = 0; index < selectedcarfeatureId.length; index++) {
    //   SelectcarFeatureByIndex(selectedcarfeatureId[index].index);
    // }
    let newArr = [...carFeature];
    for (let index = 0; index < newArr.length; index++) {
      newArr[index].isSelected = 'false';
    }
    let newArr1 = [...carCategories];
    for (let index = 0; index < newArr1.length; index++) {
      newArr1[index].isSelected = 'false';
    }
    setDropdown(null);
    setcardropdownmakes(null);
    setcardropdownbody(null);
    setcardropdownmodel(null);
    setcardropdowntransmission(null);
    setyeardropdown(null);

    setselectedcityId(-1);
    setselectedcityIndex(-1);
    setselectedcarCategoryId([]);
    setselectedcarfeatureId([]);
    setPrice(0);
    setinitalprice([0, 0]);
    setrender('true');
    setIsEnabled(false);
    setminPrice(0);
    setmaxPrice(0);
    setmaxKm(0);
    setminKm(0);
    setengineCC('');
    setregionspec(null);
    settransimssionselected(null);
    setfuelselected(null);
    setdoorselected(null);
    setwheelselected(null);
    setcapacityselected(null);
    setsteeringselected(null);
    setbodyselected(null);
    setmechanicalselected(null);
    setcylinderselected(null);
    dispatch(Filteraction.carFilter(null));

    // navigation.replace('Filter', {
    //   name: name,
    // });
  };

  const SelectedRoom = value => {
    setroomSelected(value);
  };

  const RoomList = () => {
    //console.log('rrom list' + JSON.stringify(roomsdata));
    return roomsdata.map((element, i) => {
      return (
        <View style={{marginTop: 1}}>
          <TouchableOpacity
            onPress={() => {
              // setFormFields({
              //   ...formFirlds,
              //   fueltype: itemData.item.name,
              // })
              SelectedRoom(element);
              //console.log('click');
            }}
            style={{
              height: 50,
              padding: 10,
              width: 50,
              backgroundColor:
                // itemData.item.name === formFirlds.fueltype
                //   ? Colors.blue
                //   : '#0989b814',
                roomselected?.label === element.label ? '#0989B8' : '#E5E5E5',

              marginHorizontal: 5,
              borderRadius: 50 / 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // color:
                //   itemData.item.name === formFirlds.fueltype
                //     ? Colors.white
                //     : Colors.gray,
                color:
                  roomselected?.label === element.label ? 'white' : 'black',
                fontSize: 11,
              }}>
              {element.label}
            </Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
      );
    });
  };

  const SelectedBath = value => {
    setbathSelected(value);
    //console.log(value + ' val');
  };
  const BathList = () => {
    return bathdata.map((element, i) => {
      return (
        <View style={{marginTop: 1}}>
          <TouchableOpacity
            onPress={() =>
              // setFormFields({
              //   ...formFirlds,
              //   fueltype: itemData.item.name,
              // })
              SelectedBath(element)
            }
            style={{
              height: 50,
              padding: 10,
              width: 50,
              backgroundColor:
                bathselected?.label === element.label ? '#0989B8' : '#E5E5E5',
              marginHorizontal: 5,
              borderRadius: 50 / 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // color:
                //   itemData.item.name === formFirlds.fueltype
                //     ? Colors.white
                //     : Colors.gray,
                color:
                  bathselected?.label === element.label ? 'white' : 'black',
                fontSize: 11,
              }}>
              {element.label}
            </Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
      );
    });
  };

  const SelectedDining = value => {
    setdiningselected(value);
    //console.log(value + ' val');
  };
  const DiningList = () => {
    return diningdata.map((element, i) => {
      return (
        <View style={{marginTop: 1}}>
          <TouchableOpacity
            onPress={() =>
              // setFormFields({
              //   ...formFirlds,
              //   fueltype: itemData.item.name,
              // })
              SelectedDining(element)
            }
            style={{
              height: 50,
              padding: 10,
              width: 50,
              backgroundColor:
                diningselected?.label === element.label ? '#0989B8' : '#E5E5E5',
              marginHorizontal: 5,
              borderRadius: 50 / 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // color:
                //   itemData.item.name === formFirlds.fueltype
                //     ? Colors.white
                //     : Colors.gray,
                color:
                  diningselected?.label === element.label ? 'white' : 'black',
                fontSize: 11,
              }}>
              {element.label}
            </Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
      );
    });
  };

  const SelectedLaundry = value => {
    setlaundryselected(value);
    //console.log(value + ' val');
  };
  const LaundryList = () => {
    return laundrydata.map((element, i) => {
      return (
        <View style={{marginTop: 1}}>
          <TouchableOpacity
            onPress={() =>
              // setFormFields({
              //   ...formFirlds,
              //   fueltype: itemData.item.name,
              // })
              SelectedLaundry(element)
            }
            style={{
              height: 50,
              padding: 10,
              width: 50,
              backgroundColor:
                laundryselected?.label === element.label
                  ? '#0989B8'
                  : '#E5E5E5',
              marginHorizontal: 5,
              borderRadius: 50 / 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // color:
                //   itemData.item.name === formFirlds.fueltype
                //     ? Colors.white
                //     : Colors.gray,
                color:
                  laundryselected?.label === element.label ? 'white' : 'black',
                fontSize: 11,
              }}>
              {element.label}
            </Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
      );
    });
  };

  const SelectedGargaes = value => {
    setgaragesselected(value);
    //console.log(value + ' val');
  };
  const GargaesList = () => {
    return garagesdata.map((element, i) => {
      return (
        <View style={{marginTop: 1}}>
          <TouchableOpacity
            onPress={() =>
              // setFormFields({
              //   ...formFirlds,
              //   fueltype: itemData.item.name,
              // })
              SelectedGargaes(element)
            }
            style={{
              height: 50,
              padding: 10,
              width: 50,
              backgroundColor:
                garagesselected?.label === element.label
                  ? '#0989B8'
                  : '#E5E5E5',
              marginHorizontal: 5,
              borderRadius: 50 / 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // color:
                //   itemData.item.name === formFirlds.fueltype
                //     ? Colors.white
                //     : Colors.gray,
                color:
                  garagesselected?.label === element.label ? 'white' : 'black',
                fontSize: 11,
              }}>
              {element.label}
            </Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
      );
    });
  };

  const SelectedTransmission = value => {
    settransimssionselected(value);
  };

  const transmissionList = () => {
    if (languagee === 'en') {
      return transimssiondata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() => {
                SelectedTransmission(element);
              }}
              style={{
                height: 39,
                //padding: 35,
                width: 86,
                backgroundColor:
                  // itemData.item.name === formFirlds.fueltype
                  //   ? Colors.blue
                  //   : '#0989b814',
                  transimssionselected?.label === element.label
                    ? '#0989B8'
                    : '#E5E5E5',

                marginHorizontal: 10,
                borderRadius: 39 / 2,
                //marginVertical: 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    transimssionselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 11,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    } else {
      return arabictransimssiondata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() => {
                SelectedTransmission(element);
              }}
              style={{
                height: 39,
                //padding: 35,
                width: 86,
                backgroundColor:
                  // itemData.item.name === formFirlds.fueltype
                  //   ? Colors.blue
                  //   : '#0989b814',
                  transimssionselected?.label === element.label
                    ? '#0989B8'
                    : '#E5E5E5',

                marginHorizontal: 10,
                borderRadius: 39 / 2,
                //marginVertical: 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    transimssionselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 11,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    }
  };

  const Selectedfuel = value => {
    setfuelselected(value);
  };

  const fuelList = () => {
    //console.log('rrom list' + JSON.stringify(roomsdata));
    if (languagee === 'en') {
      return fueldata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() => {
                // setFormFields({
                //   ...formFirlds,
                //   fueltype: itemData.item.name,
                // })
                Selectedfuel(element);
                //console.log('click');
              }}
              style={{
                height: 39,
                //padding: 35,
                width: 86,
                backgroundColor:
                  // itemData.item.name === formFirlds.fueltype
                  //   ? Colors.blue
                  //   : '#0989b814',
                  fuelselected?.label === element.label ? '#0989B8' : '#E5E5E5',

                marginHorizontal: 10,
                borderRadius: 39 / 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    fuelselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 11,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    } else {
      return arabicfueldata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() => {
                // setFormFields({
                //   ...formFirlds,
                //   fueltype: itemData.item.name,
                // })
                Selectedfuel(element);
                //console.log('click');
              }}
              style={{
                height: 39,
                //padding: 35,
                width: 86,
                backgroundColor:
                  // itemData.item.name === formFirlds.fueltype
                  //   ? Colors.blue
                  //   : '#0989b814',
                  fuelselected?.label === element.label ? '#0989B8' : '#E5E5E5',

                marginHorizontal: 10,
                borderRadius: 39 / 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    fuelselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 11,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    }
  };

  const SelectedDoors = value => {
    setdoorselected(value);
    //console.log(value + ' val');
  };
  const DoorList = () => {
    return doordata.map((element, i) => {
      return (
        <View style={{marginTop: 1}}>
          <TouchableOpacity
            onPress={() =>
              // setFormFields({
              //   ...formFirlds,
              //   fueltype: itemData.item.name,
              // })
              SelectedDoors(element)
            }
            style={{
              height: 50,
              padding: 10,
              width: 50,
              backgroundColor:
                doorselected?.label === element.label ? '#0989B8' : '#E5E5E5',
              marginHorizontal: 5,
              borderRadius: 50 / 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // color:
                //   itemData.item.name === formFirlds.fueltype
                //     ? Colors.white
                //     : Colors.gray,
                color:
                  doorselected?.label === element.label ? 'white' : '#19191940',
                fontSize: 11,
              }}>
              {element.label}
            </Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
      );
    });
  };

  const SelectedWheels = value => {
    setwheelselected(value);
    //console.log(value + ' val');
  };
  const WheelList = () => {
    return wheeldata.map((element, i) => {
      return (
        <View style={{marginTop: 1}}>
          <TouchableOpacity
            onPress={() =>
              // setFormFields({
              //   ...formFirlds,
              //   fueltype: itemData.item.name,
              // })
              SelectedWheels(element)
            }
            style={{
              height: 50,
              padding: 10,
              width: 50,
              backgroundColor:
                wheelselected?.label === element.label ? '#0989B8' : '#E5E5E5',
              marginHorizontal: 5,
              borderRadius: 50 / 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // color:
                //   itemData.item.name === formFirlds.fueltype
                //     ? Colors.white
                //     : Colors.gray,
                color:
                  wheelselected?.label === element.label
                    ? 'white'
                    : '#19191940',
                fontSize: 11,
              }}>
              {element.label}
            </Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
      );
    });
  };

  const Selectedcapacity = value => {
    setcapacityselected(value);
  };

  const capacityList = () => {
    //console.log('rrom list' + JSON.stringify(roomsdata));
    if (languagee === 'en') {
      return capacitydata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() => {
                // setFormFields({
                //   ...formFirlds,
                //   fueltype: itemData.item.name,
                // })
                Selectedcapacity(element);
                //console.log('click');
              }}
              style={{
                height: 42,
                //padding: 35,
                width: 86,
                backgroundColor:
                  // itemData.item.name === formFirlds.fueltype
                  //   ? Colors.blue
                  //   : '#0989b814',
                  capacityselected?.label === element.label
                    ? '#0989B8'
                    : '#E5E5E5',

                marginHorizontal: 5,
                //marginVertical: 4,
                borderRadius: 42 / 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    capacityselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 11,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    } else {
      return arabiccapacitydata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() => {
                // setFormFields({
                //   ...formFirlds,
                //   fueltype: itemData.item.name,
                // })
                Selectedcapacity(element);
                //console.log('click');
              }}
              style={{
                height: 42,
                //padding: 35,
                width: 86,
                backgroundColor:
                  // itemData.item.name === formFirlds.fueltype
                  //   ? Colors.blue
                  //   : '#0989b814',
                  capacityselected?.label === element.label
                    ? '#0989B8'
                    : '#E5E5E5',

                marginHorizontal: 5,
                //marginVertical: 4,
                borderRadius: 42 / 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    capacityselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 11,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    }
  };

  const Selectedsteering = value => {
    setsteeringselected(value);
  };

  const steeringList = () => {
    //console.log('rrom list' + JSON.stringify(roomsdata));
    if (languagee === 'en') {
      return steeringdata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() => {
                // setFormFields({
                //   ...formFirlds,
                //   fueltype: itemData.item.name,
                // })
                Selectedsteering(element);
                //console.log('click');
              }}
              style={{
                height: 41,
                //padding: 35,
                width: 93,
                backgroundColor:
                  // itemData.item.name === formFirlds.fueltype
                  //   ? Colors.blue
                  //   : '#0989b814',
                  steeringselected?.label === element.label
                    ? '#0989B8'
                    : '#E5E5E5',

                marginHorizontal: 5,
                borderRadius: 41 / 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    steeringselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 11,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    } else {
      return arabicsteeringdata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() => {
                // setFormFields({
                //   ...formFirlds,
                //   fueltype: itemData.item.name,
                // })
                Selectedsteering(element);
                //console.log('click');
              }}
              style={{
                height: 41,
                //padding: 35,
                width: 93,
                backgroundColor:
                  // itemData.item.name === formFirlds.fueltype
                  //   ? Colors.blue
                  //   : '#0989b814',
                  steeringselected?.label === element.label
                    ? '#0989B8'
                    : '#E5E5E5',

                marginHorizontal: 5,
                borderRadius: 41 / 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    steeringselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 11,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    }
  };

  const Selectedbody = value => {
    setbodyselected(value);
  };

  const bodyList = () => {
    //console.log('rrom list' + JSON.stringify(roomsdata));
    return bodydata.map((element, i) => {
      return (
        <View style={{marginTop: 1}}>
          <TouchableOpacity
            onPress={() => {
              // setFormFields({
              //   ...formFirlds,
              //   fueltype: itemData.item.name,
              // })
              Selectedbody(element);
              //console.log('click');
            }}
            style={{
              height: 41,
              padding: 10,
              width: 66,
              backgroundColor:
                // itemData.item.name === formFirlds.fueltype
                //   ? Colors.blue
                //   : '#0989b814',
                bodyselected?.label === element.label ? '#0989B8' : '#E5E5E5',
              marginHorizontal: 5,
              borderRadius: 41 / 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // color:
                //   itemData.item.name === formFirlds.fueltype
                //     ? Colors.white
                //     : Colors.gray,
                color:
                  bodyselected?.label === element.label ? 'white' : '#19191940',
                fontSize: 14,
              }}>
              {element.label}
            </Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
      );
    });
  };

  const Selectedmechanical = value => {
    setmechanicalselected(value);
  };

  const mechanicalList = () => {
    //console.log('rrom list' + JSON.stringify(roomsdata));
    if (languagee === 'en') {
      return mechanicaldata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() => {
                // setFormFields({
                //   ...formFirlds,
                //   fueltype: itemData.item.name,
                // })
                Selectedmechanical(element);
                //console.log('click');
              }}
              style={{
                //height: 45,
                //padding: 35,

                // width: 98,
                padding: 10,
                minHeight: 45,
                backgroundColor:
                  // itemData.item.name === formFirlds.fueltype
                  //   ? Colors.blue
                  //   : '#0989b814',
                  mechanicalselected?.label === element.label
                    ? '#0989B8'
                    : '#E5E5E5',

                marginHorizontal: 6,
                borderRadius: 45 / 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    mechanicalselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 12,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    } else {
      return arabicmechanicaldata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() => {
                // setFormFields({
                //   ...formFirlds,
                //   fueltype: itemData.item.name,
                // })
                Selectedmechanical(element);
                //console.log('click');
              }}
              style={{
                //height: 45,
                //padding: 35,

                // width: 98,
                padding: 10,
                minHeight: 45,
                backgroundColor:
                  // itemData.item.name === formFirlds.fueltype
                  //   ? Colors.blue
                  //   : '#0989b814',
                  mechanicalselected?.label === element.label
                    ? '#0989B8'
                    : '#E5E5E5',

                marginHorizontal: 6,
                borderRadius: 45 / 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    mechanicalselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 12,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    }
  };

  const Selectedcylinders = value => {
    setcylinderselected(value);
    //console.log(value + ' val');
  };
  const cylinderList = () => {
    if (languagee === 'en') {
      return cylinderdata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() =>
                // setFormFields({
                //   ...formFirlds,
                //   fueltype: itemData.item.name,
                // })
                Selectedcylinders(element)
              }
              style={{
                height: 49,
                paddingHorizontal: 21,
                // width: 50,
                backgroundColor:
                  cylinderselected?.label === element.label
                    ? '#0989B8'
                    : '#E5E5E5',
                marginHorizontal: 5,

                borderRadius: 50 / 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    cylinderselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 12,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    } else {
      return arabiccylinderdata.map((element, i) => {
        return (
          <View style={{marginTop: 1}}>
            <TouchableOpacity
              onPress={() =>
                // setFormFields({
                //   ...formFirlds,
                //   fueltype: itemData.item.name,
                // })
                Selectedcylinders(element)
              }
              style={{
                height: 49,
                paddingHorizontal: 21,
                // width: 50,
                backgroundColor:
                  cylinderselected?.label === element.label
                    ? '#0989B8'
                    : '#E5E5E5',
                marginHorizontal: 5,

                borderRadius: 50 / 2,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // color:
                  //   itemData.item.name === formFirlds.fueltype
                  //     ? Colors.white
                  //     : Colors.gray,
                  color:
                    cylinderselected?.label === element.label
                      ? 'white'
                      : '#19191940',
                  fontSize: 12,
                }}>
                {element.label}
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        );
      });
    }
  };

  const SliderRender = () => {
    return (
      // <SliderBarPrice
      //   title={localizedString.priceText}
      //   onchange={SetPrice}
      //   value={price}
      //   initialvalue={initalprice}
      //   maxprice={
      //     name === 'Property' ? propertyMasterData.price : motorMasterData.value
      //   }
      //   name="AED"
      // />
      <SliderRange
        title={localizedString.priceText}
        onchange={SetPrice}
        value={price}
        initialvalue={initalprice}
        maxprice={
          name === 'Property'
            ? Math.trunc(propertyMasterData?.price) === 0
              ? 1
              : propertyMasterData?.price.toFixed()
            : Math.trunc(motorMasterData?.value) === 0
            ? 1
            : motorMasterData?.value.toFixed()
        }
        range={pricerange}
        name="AED"
      />
    );
  };

  const SliderBathRender = () => {
    return (
      <SliderBarPrice
        title={localizedString.bathText}
        onchange={funSetBath}
        value={bath}
        initialvalue={initalbath}
        maxprice={name === 'Property' ? propertyMasterData?.baths : 0}
        name={localizedString.bathText}
      />
    );
  };

  const SliderBedRender = () => {
    return (
      <SliderBarPrice
        title={localizedString.bedText}
        onchange={funSetBed}
        value={bed}
        initialvalue={initalbed}
        maxprice={name === 'Property' ? propertyMasterData?.beds : 0}
        name={localizedString.bedText}
      />
    );
  };

  const SlidersizeRender = () => {
    return (
      <SliderBarPrice
        title={localizedString.sizeText}
        onchange={funSetSize}
        value={size}
        initialvalue={initalsize}
        maxprice={name === 'Property' ? propertyMasterData?.size : 0}
        name={localizedString.sizeText}
      />
    );
  };

  useEffect(() => {
    //alert('set city data');
    setCities(citydata);
  }, [citydata]);

  useEffect(() => {
    //alert('set city data');
    setcarCategories(motorcategory);
  }, [motorcategory]);

  useEffect(() => {
    //alert('set city data');
    setcarFeature(motorfeature);
  }, [motorfeature]);

  useEffect(() => {
    //alert('set city data');
    // console.log('USE EFEFCT CALL');
    setpropertyCategories(propertycategory);
  }, [propertycategory]);

  useEffect(() => {
    //alert('set city data');
    setpropertyfeature(propertyfeatures);
  }, [propertyfeatures]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (citydata && citydata.length) {
        //.log(citydata);
        setloading(loader);
      } else {
        console.log('null');
        setloading(loader);
        dispatch(citycategoryfeatureFilter.getCities(languagee, accessToken));
        dispatch(
          citycategoryfeatureFilter.getcategoryProperty(languagee, accessToken),
        );
        dispatch(
          citycategoryfeatureFilter.getfeatureProperty(languagee, accessToken),
        );
        dispatch(
          citycategoryfeatureFilter.getcategoryCar(languagee, accessToken),
        );
        dispatch(
          citycategoryfeatureFilter.getfeatureCar(languagee, accessToken),
        );
      }

      getyears();
      AllmasterData();
      //setloading(loader);
      //AllCities();
      //AllPropertycategory();
      // AllCarcategory();
      //AllPropertyfeature();
      //AllCarfeature();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (propertyCategories && propertyCategories.length) {
      // alert('call');
      // console.log(propertyfeature[0].isSelected);
      // console.log(JSON.stringify(propertyCategories) + 'USAMA data -----');
      SetperviouFilterOnScreenLoadCategory();
    }
  }, [propertyCategories]);

  useEffect(() => {
    if (propertyfeature && propertyfeature.length) {
      //alert('call');
      //console.log(propertyfeature[0].isSelected);
      SetperviouFilterOnScreenLoadFeature();
    }
  }, [propertyfeature]);

  useEffect(() => {
    if (carCategories.length > 0) {
      // alert('call');
      SetperviouFilterOnScreenLoadCategoryCar();
    }
  }, [carCategories]);

  useEffect(() => {
    if (carFeature.length > 0) {
      //alert('call');
      SetperviouFilterOnScreenLoadFeatureCar();
    }
  }, [carFeature]);

  const SetPropertyFilter = () => {
    dispatch(Filteraction.propertyFilter(propertyFilterObj));
    setTimeout(() => {
      navigation.navigate('PropertyFilter', {type: type});
    }, 1000);
  };

  const SetCarFilter = () => {
    dispatch(Filteraction.carFilter(carFilterObj));
    setTimeout(() => {
      navigation.navigate('CarFilter', {type: 'Motor'});
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader show={loader} />

      <View
        style={{
          width: '100%',
          //justifyContent: 'space-around',
          height: 46,
          flexDirection: 'row',
          alignItems: 'center',
          //backgroundColor: 'red',
        }}>
        <View style={{marginLeft: 14}}>
          <Icon
            name="arrow-back"
            size={20}
            color="#191919"
            onPress={() =>
              name === 'Property'
                ? navigation.navigate('PropertyFilter')
                : navigation.navigate('CarFilter')
            }
          />
        </View>
        <View style={{width: '72%'}}>
          <Text
            style={{
              color: '#191919',
              fontSize: 20,
              fontFamily: 'Inter-Bold',
              textAlign: 'center',
            }}>
            {localizedString.filterText}
          </Text>
        </View>
        <TouchableOpacity
          onPress={name === 'Property' ? clearPropertyFilter : clearCarFilter}>
          <Text
            style={{
              color: '#0989B8',
              fontSize: 12,
              fontFamily: 'Inter-Bold',
            }}>
            {localizedString.clearAllText}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: 'red',
          }}>
          <View
            style={{
              height: '100%',
              width: '90%',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                ...RtlStyles.containerRow,
                //backgroundColor: 'red',
              }}>
              <TouchableOpacity
                style={{
                  // backgroundColor: 'red',
                  width: '80%',
                  //justifyContent: 'center',
                }}
                onPress={() => {
                  setCategoriesShown(!categoryShown);
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontSize: 17,
                    fontFamily: 'Inter-SemiBold',
                    marginTop: 10,
                    marginLeft: 3,
                    textAlign: isRtl ? 'right' : 'left',
                  }}>
                  {localizedString.categoriesText}
                </Text>
              </TouchableOpacity>
              <Icon
                onPress={() => {
                  setCategoriesShown(!categoryShown);
                }}
                name={
                  !categoryShown ? 'chevron-down-sharp' : 'chevron-up-sharp'
                }
                size={20}
                style={{marginTop: 10}}
              />
            </View>
            {categoryShown && (
              <FilterPropertyCategoryCard
                title={localizedString.categoriesText}
                Heading="Categories"
                data={name === 'Property' ? propertyCategories : carCategories}
                Name={name}
                selectCategoryId={
                  name === 'Property' ? propertyCategories : carCategories
                }
                onSelectCategory={
                  name === 'Property'
                    ? SelectPropertyCategoryByIndex
                    : SelectcarCategoryByIndex
                }
              />
            )}
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 12,
                ...RtlStyles.containerRow,
              }}>
              <TouchableOpacity
                style={{
                  // backgroundColor: 'red',
                  width: '80%',
                  //justifyContent: 'center',
                }}
                onPress={() => {
                  setcitiesShown(!citiesShown);
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontSize: 17,
                    fontFamily: 'Inter-SemiBold',
                    marginTop: 10,
                    marginLeft: 3,
                    textAlign: isRtl ? 'right' : 'left',
                  }}>
                  {localizedString.cityText}
                </Text>
              </TouchableOpacity>
              <Icon
                onPress={() => {
                  setcitiesShown(!citiesShown);
                }}
                name={!citiesShown ? 'chevron-down-sharp' : 'chevron-up-sharp'}
                size={20}
                style={{marginTop: 10}}
              />
            </View>
            {citiesShown && (
              <FilterCard
                Heading={localizedString.cityText}
                data={cities}
                //data={citydata}
                Name={name}
                type={type}
                selectCityId={selectedcityId}
                onSeletCity={SelectCityByIndex}
              />
            )}

            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 12,
                ...RtlStyles.containerRow,
                //backgroundColor: 'yellow',
              }}>
              <TouchableOpacity
                style={{
                  // backgroundColor: 'red',
                  width: '80%',
                  //justifyContent: 'center',
                }}
                onPress={() => {
                  setfaetureShown(!faetureShown);
                }}>
                <Text
                  style={{
                    color: '#191919',
                    fontSize: 17,
                    fontFamily: 'Inter-SemiBold',
                    marginTop: 10,
                    marginLeft: 3,
                    textAlign: isRtl ? 'right' : 'left',
                  }}>
                  {localizedString.featuresText}
                </Text>
              </TouchableOpacity>
              <Icon
                onPress={() => {
                  setfaetureShown(!faetureShown);
                }}
                name={!faetureShown ? 'chevron-down-sharp' : 'chevron-up-sharp'}
                size={20}
                style={{marginTop: 10}}
              />
            </View>
            {faetureShown && (
              <FilterPropertyCategoryCard
                title={localizedString.featuresText}
                Heading="Features"
                data={name === 'Property' ? propertyfeature : carFeature}
                Name={name}
                selectFeatureId={
                  name === 'Property' ? propertyfeature : carFeature
                }
                onSelectFeature={
                  name === 'Property'
                    ? SelectPropertyFeatureByIndex
                    : SelectcarFeatureByIndex
                }
              />
            )}
            <HorizontalLine container={{marginTop: 30}} />
            {name === 'Property' ? (
              <View style={{width: '100%', marginTop: 12}}>
                <View style={{width: '100%', flexDirection: 'row'}}>
                  <View style={{width: '50%', justifyContent: 'flex-end'}}>
                    <Text
                      style={{
                        //paddingLeft: 27,
                        marginHorizontal: 30,
                        paddingBottom: 5,
                        color: '#191919',
                        fontSize: 13,
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      {localizedString.furnishedtext}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Switch
                      trackColor={{false: '#767577', true: '#0989B8'}}
                      thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View style={{width: '100%', marginTop: 10}}>
                <View style={{width: '100%', flexDirection: 'row'}}>
                  <View style={{width: '50%', justifyContent: 'flex-end'}}>
                    <Text
                      style={{
                        paddingLeft: 30,
                        paddingBottom: 5,
                        color: '#191919',
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      {localizedString.serviceHistory}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Switch
                      trackColor={{false: '#767577', true: '#0989B8'}}
                      thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>

                {/* <View style={{width: '100%', flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '50%',
                      justifyContent: 'flex-end',
                      paddingTop: 14,
                    }}>
                    <Text
                      style={{
                        paddingLeft: 30,
                        color: '#191919',
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      Furnished
                    </Text>
                  </View> */}
                {/* <View
                    style={{
                      width: '50%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Switch
                      trackColor={{false: '#E5E5E5', true: '##0989B8'}}
                      thumbColor={isEnabled ? '#0989B8' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View> */}
                {/* </View> */}
              </View>
            )}
            <View style={{paddingTop: 18}}>
              <HorizontalLine />
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 10,
                //backgroundColor: 'red',
                height: 80,
                flexDirection: 'row',
                padding: 10,
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
                  placeHolder="AED 4500"
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
                  placeHolder="AED 4500"
                  onChange={onChangeText}
                  value={maxprice}
                  keyboardType="numeric"
                />
              </View>
            </View>
            {name === 'Property' ? (
              <>
                <View
                  style={{
                    width: '100%',
                    marginTop: 10,
                    //backgroundColor: 'red',
                    height: 80,
                    flexDirection: 'row',
                    padding: 10,
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
                      formTitle={localizedString.minSize}
                      placeHolder="AED 4500"
                      onChange={onChangeText}
                      value={minsize}
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
                      formTitle={localizedString.maxsize}
                      placeHolder="AED 4500"
                      onChange={onChangeText}
                      value={maxsize}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    height: 80,
                    alignItems: 'center',
                    marginTop: 20,

                    // padding: 17,
                  }}>
                  <View
                    style={{
                      width: '92%',
                      height: '100%',
                      // padding: 17,
                      backgroundColor: 'white',
                    }}>
                    <Text
                      style={{
                        color: '#191919',
                        fontSize: 14,
                        fontFamily: 'Inter-SemiBold',
                        textAlign: isRtl ? 'right' : 'left',
                      }}>
                      {localizedString.fyear}
                    </Text>
                    <Dropdown
                      style={styles.dropdown}
                      data={years}
                      maxHeight={200}
                      labelField="name"
                      valueField="id"
                      placeholder={localizedString.Syear}
                      placeholderStyle={{
                        color: 'black',
                        fontFamily: 'Inter-Medium',
                        fontSize: 13,
                        marginLeft: 10,
                        textAlign: isRtl ? 'right' : 'left',
                      }}
                      value={yeardropdown}
                      onChange={item => {
                        setyeardropdown(item.id);
                      }}
                      selectedTextStyle={{
                        marginLeft: 10,
                        textAlign: isRtl ? 'right' : 'left',
                      }}
                    />
                  </View>
                </View>

                {/* <View style={{paddingTop: 35}}>
                  <HorizontalLine />
                </View> */}
              </>
            ) : null}
            {name === 'Property' ? null : (
              <View
                style={{
                  width: '100%',
                  height: 80,
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  marginTop: 20,
                  //marginTop: 13,

                  // padding: 17,
                }}>
                <View
                  style={{
                    width: '90%',
                    height: '100%',
                    //padding: 17,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      color: '#191919',
                      fontSize: 14,
                      fontFamily: 'Inter-SemiBold',
                      textAlign: isRtl ? 'right' : 'left',
                    }}>
                    {localizedString.carMakeText}
                  </Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={makes}
                    maxHeight={200}
                    labelField="name"
                    valueField="id"
                    placeholder={localizedString.selectMake}
                    placeholderStyle={{
                      color: 'black',
                      fontFamily: 'Inter-Medium',
                      fontSize: 13,
                      marginLeft: 10,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                    value={cardropdownmakes}
                    onChange={item => {
                      setcardropdownmakes(item.id);
                    }}
                    selectedTextStyle={{
                      marginLeft: 10,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  />
                </View>
              </View>
            )}
            {name === 'Property' ? null : (
              <View
                style={{
                  width: '100%',
                  height: 80,
                  alignItems: 'center',
                  marginTop: 10,
                  //backgroundColor: 'red',

                  // padding: 17,
                }}>
                <View
                  style={{
                    width: '90%',
                    height: '100%',
                    //padding: 17,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      color: '#191919',
                      fontSize: 14,
                      fontFamily: 'Inter-SemiBold',
                      textAlign: isRtl ? 'right' : 'left',
                    }}>
                    {localizedString.carbodyText}
                  </Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={bodyType}
                    maxHeight={200}
                    labelField="name"
                    valueField="id"
                    placeholder={localizedString.selectBody}
                    placeholderStyle={{
                      color: 'black',
                      fontFamily: 'Inter-Medium',
                      fontSize: 13,
                      marginLeft: 10,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                    value={cardropdownbody}
                    onChange={item => {
                      setcardropdownbody(item.id);
                    }}
                    selectedTextStyle={{
                      marginLeft: 10,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  />
                </View>
              </View>
            )}
            {name === 'Property' ? null : (
              <View
                style={{
                  width: '100%',
                  height: 80,
                  alignItems: 'center',
                  marginTop: 10,

                  // padding: 17,
                }}>
                <View
                  style={{
                    width: '90%',
                    height: '100%',
                    //padding: 17,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      color: '#191919',
                      fontSize: 14,
                      fontFamily: 'Inter-SemiBold',
                      textAlign: isRtl ? 'right' : 'left',
                    }}>
                    {localizedString.carmodelText}
                  </Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={model}
                    maxHeight={200}
                    labelField="name"
                    valueField="id"
                    placeholder={localizedString.selectmodel}
                    placeholderStyle={{
                      color: 'black',
                      fontFamily: 'Inter-Medium',
                      fontSize: 13,
                      marginLeft: 10,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                    value={cardropdownmodel}
                    onChange={item => {
                      setcardropdownmodel(item.id);
                    }}
                    selectedTextStyle={{
                      marginLeft: 10,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                    // renderLeftIcon={() => (
                    //   <Iconsort
                    //     name="sort"
                    //     size={19}
                    //     color="#0989B8"
                    //     style={{padding: 4, marginLeft: 3}}
                    //   />
                    // )}
                  />
                </View>
              </View>
            )}
            {name === 'Property' ? null : (
              <View
                style={{
                  width: '100%',
                  height: 80,
                  alignItems: 'center',
                  marginTop: 10,

                  // padding: 17,
                }}>
                <View
                  style={{
                    width: '90%',
                    height: '100%',
                    // padding: 17,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      color: '#191919',
                      fontSize: 14,
                      fontFamily: 'Inter-SemiBold',
                      textAlign: isRtl ? 'right' : 'left',
                    }}>
                    {localizedString.fyear}
                  </Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={years}
                    maxHeight={200}
                    labelField="name"
                    valueField="id"
                    placeholder={localizedString.Syear}
                    placeholderStyle={{
                      color: 'black',
                      fontFamily: 'Inter-Medium',
                      fontSize: 13,
                      marginLeft: 10,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                    value={yeardropdown}
                    onChange={item => {
                      setyeardropdown(item.id);
                    }}
                    selectedTextStyle={{
                      marginLeft: 10,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  />
                </View>
              </View>
            )}
            {name === 'Property' ? null : (
              <View
                style={{
                  width: '100%',
                  //marginTop: 10,
                  //backgroundColor: 'red',
                  height: 90,
                  flexDirection: 'row',
                  padding: 10,
                  paddingTop: 0,
                }}>
                <View
                  style={{
                    width: '45%',
                    marginTop: 3,
                    //backgroundColor: 'red',
                    height: '100%',
                  }}>
                  <MyInput
                    formTitle={localizedString.minKM}
                    placeHolder="Min Km"
                    onChange={onChangeText}
                    value={minkm}
                    keyboardType="numeric"
                  />
                </View>
                <View
                  style={{
                    width: '10%',
                    //marginTop: 25,
                    //backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 7,
                    //marginTop: 13,
                  }}>
                  <Text style={{borderRadius: 1}}>__</Text>
                </View>
                <View
                  style={{
                    width: '45%',
                    marginTop: 4,
                    //backgroundColor: 'red',
                    height: '100%',
                  }}>
                  <MyInput
                    formTitle={localizedString.maxKM}
                    placeHolder="Max Km"
                    onChange={onChangeText}
                    value={maxKm}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            )}
            {name === 'Property' ? null : (
              <View
                style={{
                  width: '100%',
                  //marginTop: 10,
                  //backgroundColor: 'red',
                  //height: 90,
                  flexDirection: 'row',
                  padding: 10,
                  paddingTop: 14,
                }}>
                <MyInput
                  formTitle={localizedString.enginecc}
                  placeHolder="1200"
                  onChange={onChangeText}
                  value={engine}
                  keyboardType="numeric"
                />
              </View>
            )}
            {name === 'Property' ? null : (
              <View
                style={{
                  width: '100%',
                  height: 80,
                  alignItems: 'center',
                  //backgroundColor: 'red',
                  //marginTop: 10,
                  //marginTop: 13,

                  // padding: 17,
                }}>
                <View
                  style={{
                    width: '90%',
                    height: '80%',
                    //padding: 17,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      color: '#191919',
                      fontSize: 14,
                      fontFamily: 'Inter-SemiBold',
                      textAlign: isRtl ? 'right' : 'left',
                    }}>
                    {localizedString.regionalSpecificationText}
                  </Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={languagee === 'en' ? regionSpec : arabicregionSpec}
                    maxHeight={200}
                    labelField="name"
                    valueField="id"
                    placeholder={localizedString.selectMake}
                    placeholderStyle={{
                      color: 'black',
                      fontFamily: 'Inter-Medium',
                      fontSize: 13,
                      marginLeft: 10,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                    value={regionspec}
                    onChange={item => {
                      setregionspec(item.id);
                    }}
                    selectedTextStyle={{
                      marginLeft: 10,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  />
                </View>
              </View>
            )}
            <View style={{paddingTop: 14}}>
              <HorizontalLine />
            </View>
            {/*properrty type*/}
            {name === 'Property' ? (
              <>
                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 10,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.nbRooms}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '96%',
                      flexWrap: 'wrap',
                      // backgroundColor: 'red',
                      //height: '100%',
                      ...RtlStyles.containerRow,
                      paddingHorizontal: 4,
                      //marginHorizontal: 9,
                    }}>
                    {RoomList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 10,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                        // marginHorizontal: 9,
                      }}>
                      {localizedString.nbBaths}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '96%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      //height: '100%',
                      //marginHorizontal: 9,
                      ...RtlStyles.containerRow,
                      paddingHorizontal: 4,
                    }}>
                    {BathList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 10,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.nbDining}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '96%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '100%',
                      //marginHorizontal: 9,
                      ...RtlStyles.containerRow,
                      paddingHorizontal: 4,
                    }}>
                    {DiningList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 10,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.nbLaudry}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '96%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '100%',
                      ...RtlStyles.containerRow,
                      paddingHorizontal: 4,
                      // marginHorizontal: 9,
                    }}>
                    {LaundryList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 10,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.nbGarages}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '96%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '96%',
                      ...RtlStyles.containerRow,
                      paddingHorizontal: 4,
                      //marginHorizontal: 9,
                    }}>
                    {GargaesList()}
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 11,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.transmissionText}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '100%',
                      ...RtlStyles.containerRow,
                    }}>
                    {transmissionList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 11,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.fuelTypeText}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      flexWrap: 'wrap',
                      // backgroundColor: 'red',
                      height: '100%',
                      ...RtlStyles.containerRow,
                      //paddingHorizontal: 4,
                    }}>
                    {fuelList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 11,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.noDoor}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '100%',
                      ...RtlStyles.containerRow,
                    }}>
                    {DoorList()}
                  </View>
                </View>
                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 11,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.noWheels}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '100%',
                      ...RtlStyles.containerRow,
                    }}>
                    {WheelList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 11,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.capacityText}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '100%',
                      //marginHorizontal: 10,
                      ...RtlStyles.containerRow,
                    }}>
                    {capacityList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 11,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.steeringsideText}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '100%',
                      ...RtlStyles.containerRow,
                    }}>
                    {steeringList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 11,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.bodyCondition}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '100%',
                      ...RtlStyles.containerRow,
                    }}>
                    {bodyList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 11,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.mechanicalConditionText}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '100%',
                      ...RtlStyles.containerRow,
                    }}>
                    {mechanicalList()}
                  </View>
                </View>

                <View style={{width: '100%', flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 20,
                      marginVertical: 10,
                      marginHorizontal: 11,
                      ...RtlStyles.containerRow,
                    }}>
                    {/* <Icon name="gas-pump" size={12} color="black" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        marginLeft: 5,
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 13,
                      }}>
                      {localizedString.cylinderText}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      flexWrap: 'wrap',
                      //backgroundColor: 'red',
                      height: '100%',
                      ...RtlStyles.containerRow,
                    }}>
                    {cylinderList()}
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          backgroundColor: 'white',
          //position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 180,
          //bottom: 76,
        }}>
        <View
          style={{
            width: '84%',
            bottom: 90,
            right: 45,
            borderRadius: 7,
            position: 'absolute',
            left: 29,

            //height: 90,
            //backgroundColor: 'yellow',
            //padding: 17,
            //position: 'absolute',
            //bottom: 76,
            //right: 45,
          }}>
          <Text
            style={{
              color: '#191919',
              fontSize: 14,
              fontFamily: 'Inter-SemiBold',
              textAlign: isRtl ? 'right' : 'left',
            }}>
            {localizedString.sortByText}
          </Text>
          <Dropdown
            style={styles.dropdown}
            data={languagee === 'ar' ? arabicdata : data}
            labelField="label"
            valueField="value"
            label="Dropdown"
            placeholder={localizedString.sortPlaceholder}
            placeholderStyle={{
              color: 'black',
              fontFamily: 'Inter-Medium',
              fontSize: 13,
              textAlign: isRtl ? 'right' : 'left',
            }}
            selectedTextStyle={{textAlign: isRtl ? 'right' : 'left'}}
            value={dropdown}
            maxHeight={140}
            onChange={item => {
              setDropdown(item.value);
              // console.log('selected', item);
            }}
            renderLeftIcon={() => (
              <Iconsort
                name="sort"
                size={19}
                color="#0989B8"
                style={{padding: 4, marginLeft: 3}}
              />
            )}
          />
        </View>
        <FlatButton
          label={localizedString.applyfilterText}
          buttonStyle={{
            width: '81%',
            paddingVertical: 14,
            backgroundColor: '#0989B8',
            position: 'absolute',
            bottom: 11,
            right: 37,
            borderRadius: 7,
          }}
          labelStyle={{textTransform: 'uppercase', fontSize: 16}}
          onPress={() =>
            name === 'Property' ? SetPropertyFilter() : SetCarFilter()
          }></FlatButton>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F6F8F9',
  },
  dropdown: {
    //backgroundColor: 'white',
    borderColor: '#19191933',
    //borderBottomWidth: 0.5,
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 6,
    width: '100%',
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default Filter;
