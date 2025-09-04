/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Share,
  useWindowDimensions,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';
import Properytags from '../../shared/components/Properytags';
import ProperyDeatilstags from '../../shared/components/ProperyDeatilstags';
import Video from 'react-native-video';
import FlatButton from '../../shared/components/FlatButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import HorizontalLine from '../../shared/components/HorizontalLine';
import MyInput from '../../shared/components/MyInput';
import ContactSellerHeader from '../../shared/components/ContactSellerHeader';
import ContactSellerBody from '../../shared/components/ContactSellerBody';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UsereProfileData, _setLanguage} from '../../shared/Constant/Constant';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import SeeMore from 'react-native-see-more-inline';
import HTMLView from 'react-native-htmlview';
import {useSelector, useDispatch} from 'react-redux';
import SuccessFailModel from '../../shared/components/SuccessFailModel';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

import {
  propertyDeatils,
  carDeatils,
  addWishList,
  deleteWishList,
  contactSeller,
  SheduleMeeting,
} from '../../shared/ApiMiddleware/api';
import {SliderBox} from 'react-native-image-slider-box';
import Loader from '../../shared/components/Loader';
import {localizedString} from '../../shared/localization/localization';
import PopUpModel from '../../shared/components/PopUp';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from '../../shared/components/DatePicker';
import * as VendorIdaction from '../../redux/action/VendorIdaction';
import * as openGuestPopup from '../../redux/action/Guestpopupaction';
import AccessDeniedModel from '../../shared/components/AccessDeniedModel';
import CallnowPopup from '../../shared/components/CallnowPopup';
import LocalizedStrings from 'react-native-localization';

// create a component
const PropertyDeatils = props => {
  const {RtlStyles, isRtl, setLanguage} = useRtlContext();
  let popstate = useSelector(state => state.GuestPopup.popup);
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();

  const {id, name} = props.route.params;
  //alert(id);
  const refRBSheet = useRef();
  const refVideo = useRef();
  const [wishStatus, setwishStatus] = useState(false);
  const [deatils, setdeatils] = useState({});
  const [featuredDeatils, setfeaturedDeatils] = useState([]);
  const [playVideo, setplayVideo] = useState(true);
  const [sliderImages, setsliderImages] = useState([]);
  const [contactNumber, setcontactNumber] = useState('');
  const [contactMessage, setcontactMessage] = useState('');
  const [vendorname, setvendorname] = useState('');
  const [vendoremail, setvendoremail] = useState('');
  const [loading, setloading] = useState(false);
  const [zoomInImage, setzoomInImage] = useState('');
  const [popupvisble, setIspopupvisble] = useState(false);
  const [callnowPopupvisble, setcallnowPopupvisble] = useState(false);
  const [contactSellerr, setcontactSeller] = useState(true);
  const [errorValidation, seterrorValidation] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDate, setisDate] = useState('');
  const [isDateE, setisDateE] = useState(new Date());
  const [apiPopup, setapiPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [descripation, setdescripation] = useState(
    '<p>Some Dummy <b>HTML</b> code</p>',
  );
  const [seeMore, setseeMore] = useState(false);

  const FeaturedDATA = [
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      heading: 'Vehicle ID:',
      title: 'HZ27',
    },
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      heading: 'Make',
      title: 'Mercedez',
    },
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      heading: 'Model',
      title: 'AMG G63',
    },
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      heading: 'Year',
      title: '2021',
    },
  ];

  const PROPERTDETAILSDATA = [
    {
      image: require('../../shared/assests/propertydeatils/airconditioning.png'),
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Air Conditioner',
    },
    {
      image: require('../../shared/assests/propertydeatils/Barbeque.png'),
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Barbeque',
    },
    {
      image: require('../../shared/assests/propertydeatils/Diningroom.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Dining room',
    },
    {
      image: require('../../shared/assests/propertydeatils/Dryer.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Dryer',
    },
    {
      image: require('../../shared/assests/propertydeatils/Gym.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Gym',
    },
  ];
  const Featureddeatilslist = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            //justifyContent: 'space-between',
            marginTop: 20,
            //backgroundColor: 'red',
            width: '100%',
            ...RtlStyles.containerRow,
          }}>
          <View
            style={{
              width: '33.333%',
              alignItems: 'center',
              //justifyContent: 'center',
            }}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.PropertyReference
                  : localizedString.MotorReference
              }
              value={
                name === 'Property'
                  ? deatils?.adsReferenceCode
                  : deatils?.adsReferenceCode
              }
            />
          </View>
          <View
            style={{
              width: '33.333%',
              //backgroundColor: 'green',
              alignItems: 'center',
            }}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.propertyAdsdate
                  : localizedString.carAdsdate
              }
              value={
                name === 'Property'
                  ? deatils?.adPostedDate === ''
                    ? '-'
                    : deatils?.adPostedDate
                  : deatils?.adPostedDate === ''
                  ? '-'
                  : deatils?.adPostedDate
              }
            />
          </View>

          <View style={{width: '33.333%', alignItems: 'center'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.propertylastupdate
                  : localizedString.carlastupdate
              }
              value={
                name === 'Property'
                  ? deatils?.adPostedDate === ''
                    ? '-'
                    : deatils?.adPostedDate
                  : deatils?.adPostedDate === ''
                  ? '-'
                  : deatils?.adPostedDate
              }
            />
          </View>
        </View>

        <View style={{marginTop: 11, width: '100%'}}>
          <HorizontalLine />
        </View>

        <View
          style={{
            flexDirection: 'row',
            //justifyContent: 'space-between',
            // marginTop: 14,
            width: '90%',
            marginTop: 13,

            //backgroundColor: 'red',
            ...RtlStyles.containerRow,
          }}>
          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.diningText
                  : localizedString.makeText
              }
              value={name === 'Property' ? deatils.dinning : deatils.make.name}
            />
          </View>
          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.laundryText
                  : localizedString.modelText
              }
              value={name === 'Property' ? deatils.laundry : deatils.model.name}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            //justifyContent: 'space-between',
            marginTop: 20,
            // backgroundColor: 'red',
            width: '90%',
          }}>
          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.furnishedtext
                  : localizedString.bodyTypeText
              }
              value={
                name === 'Property'
                  ? deatils.isFurnished === true
                    ? 'Yes'
                    : 'No'
                  : deatils.bodyType.name
              }
            />
          </View>

          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.yearText
                  : localizedString.regionalSpecificationText
              }
              value={
                name === 'Property'
                  ? deatils.buildYear
                  : deatils?.regionalSpecification !== null
                  ? deatils?.regionalSpecification
                  : '-'
              }
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            width: '90%',
            ...RtlStyles.containerRow,
          }}>
          <View
            style={{
              width: '50%',

              // ...RtlStyles.containerRow,
            }}>
            <ProperyDeatilstags
              heading={
                name === 'Motor'
                  ? localizedString.yearText
                  : name === 'Property' && deatils?.status.includes('Rent')
                  ? localizedString.rentproceText
                  : localizedString.priceText
              }
              value={name === 'Property' ? deatils?.price : deatils?.year}
            />
          </View>
          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={name === 'Property' ? '' : localizedString.kmDriven}
              value={name === 'Property' ? '' : deatils?.mileage}
            />
          </View>
        </View>

        {/* property end here */}

        {name === 'Motor' && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              width: '90%',
            }}>
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? localizedString.propertysizeText
                    : localizedString.priceText
                }
                value={name === 'Property' ? deatils?.size : deatils?.price}
              />
            </View>
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? localizedString.yearText
                    : localizedString.fuelTypeText
                }
                value={name === 'Property' ? deatils?.year : deatils?.fuelType}
              />
            </View>
          </View>
        )}

        {name === 'Motor' && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              width: '90%',
            }}>
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? localizedString.priceText
                    : localizedString.transmissionText
                }
                value={
                  name === 'Property' ? deatils?.price : deatils?.transmission
                }
              />
            </View>

            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? localizedString.propertysizeText
                    : localizedString.capacityText
                }
                value={name === 'Property' ? deatils?.size : deatils?.capacity}
              />
            </View>
          </View>
        )}
        {name === 'Motor' && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              width: '90%',
            }}>
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? localizedString.priceText
                    : localizedString.steeringSideText
                }
                value={
                  name === 'Property' ? deatils.price : deatils?.steeringSide
                }
              />
            </View>

            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? localizedString.propertysizeText
                    : localizedString.conditionText
                }
                value={name === 'Property' ? deatils?.size : deatils?.condition}
              />
            </View>
          </View>
        )}

        {name === 'Motor' && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              width: '90%',
            }}>
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? localizedString.priceText
                    : localizedString.mechanicalConditionText
                }
                value={
                  name === 'Property'
                    ? deatils.price
                    : deatils?.mechanicalCondition
                }
              />
            </View>

            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? localizedString.propertysizeText
                    : localizedString.cylinderText
                }
                value={name === 'Property' ? deatils?.size : deatils?.cylinder}
              />
            </View>
          </View>
        )}
        {name === 'Motor' && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              width: '90%',
            }}>
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? localizedString.priceText
                    : localizedString.warrantyText
                }
                value={
                  name === 'Property'
                    ? deatils.price
                    : deatils?.warranty === true
                    ? 'Yes'
                    : 'No'
                }
              />
            </View>

            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? localizedString.propertysizeText
                    : localizedString.serviceHistoryText
                }
                value={
                  name === 'Property'
                    ? deatils.size
                    : deatils?.serviceHistory === true
                    ? 'Yes'
                    : 'No'
                }
              />
            </View>
          </View>
        )}

        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            width: '90%',
          }}>
          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.priceText
                  : localizedString.conditionText
              }
              value={name === 'Property' ? deatils.price : deatils.condition}
            />
          </View>
          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.propertysizeText
                  : localizedString.bodyTypeText
              }
              value={name === 'Property' ? deatils.size : deatils.bodyType.name}
            />
          </View>
        </View> */}

        {/* <View
          style={{
            flexDirection: 'row',
         
            marginTop: 20,
          
            width: '90%',
          }}>
          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.yearBuildText
                  : localizedString.warrantyText
              }
              value={
                name === 'Property'
                  ? deatils?.buildYear === ''
                    ? '-'
                    : deatils?.buildYear
                  : deatils?.warranty === true
                  ? 'Yes'
                  : 'No'
              }
            />
          </View>
          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.garagesText
                  : localizedString.fuelTypeText
              }
              value={
                name === 'Property'
                  ? deatils.garages
                  : deatils?.fuelType + '/' + deatils?.mileage
              }
            />
          </View>
        </View> */}

        {/* <View
          style={{
            flexDirection: 'row',
           
            marginTop: 20,
            
            width: '90%',
          }}>
          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.cityText
                  : localizedString.cityText
              }
              value={
                name === 'Property'
                  ? '-'
                  : deatils?.address?.area === ''
                  ? '-'
                  : deatils?.address?.area
              }
            />
          </View>
          <View style={{width: '50%'}}>
            <ProperyDeatilstags
              heading={
                name === 'Property'
                  ? localizedString.furnishedText
                  : localizedString.steeringSideText
              }
              value={
                name === 'Property'
                  ? deatils.isFurnished === true
                    ? 'Yes'
                    : 'No'
                  : deatils?.steeringSide !== null
                  ? deatils?.steeringSide
                  : '-'
              }
            />
          </View>
        </View> */}

        <>
          {/* {name === 'Motor' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                //backgroundColor: 'red',
                width: '90%',
              }}>
              <View style={{width: '50%'}}>
                <ProperyDeatilstags
                  heading={
                    name === 'Property' ? '' : localizedString.addressText
                  }
                  value={
                    name === 'Property'
                      ? ''
                      : deatils?.address.address === ''
                      ? '-'
                      : deatils?.address.address.toString().substring(0, 12)
                  }
                />
              </View>

              <View style={{width: '50%'}}>
                <ProperyDeatilstags
                  heading={
                    name === 'Property' ? '' : localizedString.cylinderText
                  }
                  value={
                    name === 'Property'
                      ? ''
                      : deatils?.cylinder === ''
                      ? '-'
                      : deatils?.cylinder
                  }
                />
              </View>
            </View>
          ) : null} */}
        </>
        <>
          {/* {name === 'Motor' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                //backgroundColor: 'red',
                width: '90%',
              }}>
             
              <View style={{width: '50%'}}>
                <ProperyDeatilstags
                  heading={
                    name === 'Property'
                      ? ''
                      : localizedString.serviceHistoryText
                  }
                  value={
                    name === 'Property'
                      ? ''
                      : deatils?.serviceHistory === true
                      ? 'Yes'
                      : 'No'
                  }
                />
              </View>
              <View style={{width: '50%'}}>
                <ProperyDeatilstags
                  heading={
                    name === 'Property'
                      ? ''
                      : localizedString.mechanicalConditionText
                  }
                  value={
                    name === 'Property'
                      ? ''
                      : deatils?.mechanicalCondition !== null
                      ? deatils?.mechanicalCondition
                      : '-'
                  }
                />
              </View>
            </View>
          ) : null} */}
        </>
        <>
          {name === 'Motor' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                //backgroundColor: 'red',
                width: '90%',
              }}>
              <View style={{width: '50%'}}>
                <ProperyDeatilstags
                  heading={
                    name === 'Property'
                      ? ''
                      : localizedString.engineDisplacementText
                  }
                  value={name === 'Property' ? '' : deatils?.engineDisplacement}
                />
              </View>

              <View style={{width: '50%'}}>
                <ProperyDeatilstags
                  heading={
                    name === 'Property' ? '' : localizedString.horsePowerText
                  }
                  value={name === 'Property' ? '' : deatils?.horsePower}
                />
              </View>
            </View>
          ) : null}
        </>
      </>
    );
    // });
  };

  const Featuredlist = () => {
    let k = 0;
    return featuredDeatils.map((element, i) => {
      if (i > 0) {
        k += 2;
        //console.log(k + ' k');
      }

      if (k >= featuredDeatils.length) {
        return;
      }

      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            backgroundColor: '#F1F3F5',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //justifyContent: 'center',
              //backgroundColor: 'red',
              width: '50%',
            }}>
            <Properytags key={k} item={featuredDeatils[k]} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 14,
              alignItems: 'center',
              //justifyContent: 'center',
              width: '50%',
              //backgroundColor: 'red',
            }}>
            <Properytags key={k + 1} item={featuredDeatils[k + 1]} />
          </View>
        </View>
      );
    });
  };
  const addwishlist = name => {
    //alert(name);
    if (name === 'Motor') {
      let carData = {
        CarID: id,
      };
      addWishList(carData)
        .then(res => {
          if (res.status === 'success') {
            //alert('success');
            setwishStatus(true);
            //setdeatils(res.data);
            //console.log(res.data.features);
            //setfeaturedDeatils(res.data.features);
          } else {
            //console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      let propertyData = {
        PropertyID: id,
      };
      addWishList(propertyData)
        .then(res => {
          if (res.status === 'success') {
            setwishStatus(true);
            //setdeatils(res.data);
            //console.log(res.data.features);
            //setfeaturedDeatils(res.data.features);
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const deletewishlist = ID => {
    //alert(ID);
    let Data = {
      CarID: name === 'Motor' ? id : null,
      PropertyID: name === 'Property' ? id : null,
    };
    deleteWishList(Data)
      .then(res => {
        if (res.status === 'success') {
          // alert('sucees');
          setwishStatus(false);
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const PlayVideo = () => {
    setplayVideo(false);
  };

  const ResetVideo = () => {
    refVideo.current.seek(2);
    setplayVideo(true);
  };
  const setVendorDeatils = () => {
    setvendorname(
      UsereProfileData !== null &&
        UsereProfileData !== '' &&
        UsereProfileData !== undefined
        ? UsereProfileData.name
        : '',
    );
    setvendoremail(
      UsereProfileData !== null &&
        UsereProfileData !== '' &&
        UsereProfileData !== undefined
        ? UsereProfileData.email
        : '',
    );
  };

  const openCallnowPopup = () => {
    setcallnowPopupvisble(true);
  };
  const closeCallnowPopup = () => {
    setcallnowPopupvisble(false);
  };
  const OpenDialer = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const ZoomInView = () => {
    return (
      <View
        style={{
          // flex: 1,
          width: '100%',
          height: '100%',
          zIndex: 100,
          //position: 'absolute',
          backgroundColor: `rgba(0,0,0,${0.85})`,
          //backgroundColor: 'red',
        }}>
        <View
          style={{
            width: '100%',
            // backgroundColor: 'yellow',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: 14,
            zIndex: 200,
            marginTop: 6,
          }}>
          <Icon
            name="close"
            size={33}
            color="white"
            style={{paddingLeft: 26}}
            onPress={() => setzoomInImage('')}
          />
        </View>
        <View
          style={{
            width: '90%',
            height: '80%',
            backgroundColor: 'black',
            overflow: 'hidden',
            //justifyContent: 'center',
            //alignItems: 'center',
            margin: '5%',
          }}>
          <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            onZoomAfter={this.logOutZoomState}
            style={
              {
                //padding: 10,
                //backgroundColor: `rgba(0,0,0,${0.8})`,
                //zIndex: 100,
                //elevation: 100,
                // flex: 1,
                // width: '90%',
                // height: '90%',
              }
            }>
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                //backgroundColor: 'red',
              }}>
              <Image
                resizeMode="contain"
                style={{width: '95%', height: '95%'}}
                source={{uri: zoomInImage}}
              />
            </View>
          </ReactNativeZoomableView>
        </View>
      </View>
    );
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          name === 'Property'
            ? 'https://nowbuysell.com/property/' + deatils.slug
            : 'https://nowbuysell.com/vehicle/' + deatils.slug,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChangeContact = (value, name) => {
    if (name === localizedString.phoneText) {
      //Phone Number
      setcontactNumber(value);
    } else if (name === localizedString.meesageText) {
      //Message
      setcontactMessage(value);
    } else if (name === localizedString.nameInput) {
      //Message
      setvendorname(value);
    } else if (name === localizedString.emailInpit) {
      //Message
      setvendoremail(value);
    }
  };

  const OnSheetClose = () => {
    refRBSheet.current.close();
  };

  const OnMessageSend = () => {
    refRBSheet.current.close();
    setTimeout(() => {
      if (
        vendorname === '' ||
        contactNumber === '' ||
        vendoremail === '' ||
        contactMessage === ''
      ) {
        // alert('123');
        setapiPopup(true);
        setSuccess(false);
        //setSuccess(true);
        seterrorValidation(localizedString.fieldemypt);
        return;
      }
      setloading(true);
      let userData = {};
      {
        name === 'Property'
          ? (userData = {
              Name: vendorname,
              PhoneNo: contactNumber,
              Email: vendoremail,
              Comments: contactMessage,
              VendorID: deatils.vendor.id,
              PropertyID: id,
            })
          : (userData = {
              Name: vendorname,
              PhoneNo: '971' + contactNumber,
              Email: vendoremail,
              Comments: contactMessage,
              VendorID: deatils.vendor.id,
              CarID: id,
            });
      }
      setvendorname('');
      setcontactNumber('');
      setvendoremail('');
      setcontactMessage('');
      contactSeller(userData)
        .then(res => {
          console.log(' res  osama' + JSON.stringify(res));
          if (res.success === true) {
            // setIspopupvisble(true);
            setloading(false);
            setapiPopup(true);
            setSuccess(true);
            seterrorValidation(res.message);
            //props.navigation.navigate('Home');
          } else {
            setloading(false);
            //alert('error ot save');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 400);
  };

  const OnMessageShedule = () => {
    refRBSheet.current.close();
    setTimeout(() => {
      if (
        UsereProfileData !== null &&
        UsereProfileData !== '' &&
        UsereProfileData !== undefined
      ) {
        if (isDateE === '' || contactMessage === '') {
          setapiPopup(true);
          setSuccess(false);
          seterrorValidation(localizedString.fieldemypt);
          return;
        }
        setloading(true);
        let userData = {};
        {
          name === 'Property'
            ? (userData = {
                VendorID: deatils.vendor.id,
                Message: contactMessage,
                PropertyID: id,
                MeetingDate: isDateE.toLocaleDateString(),
              })
            : (userData = {
                VendorID: deatils.vendor.id,
                Message: contactMessage,
                CarID: id,
                MeetingDate: isDateE.toLocaleDateString(),
              });
        }
        setisDate('');
        setcontactMessage('');
        SheduleMeeting(userData)
          .then(res => {
            console.log(' res  osama' + JSON.stringify(res));
            if (res.success === true) {
              //setIspopupvisble(true);
              setloading(false);
              setapiPopup(true);
              setSuccess(true);
              seterrorValidation(res.message);
              //props.navigation.navigate('Home');
            } else {
              setloading(false);
              //alert('error ot save');
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        dispatch(openGuestPopup.openGuestPopup(true));
      }
    }, 400);
  };

  useEffect(() => {
    //alert(id);
    setloading(true);
    if (name === 'Property') {
      propertyDeatils(id)
        .then(res => {
          if (res.status === 'success') {
            // console.log('call api');
            setdeatils(res.data);
            //console.log(res.data.description.length + ' descrlength');

            setdescripation(res.data.description);
            setcontactNumber(res.data.vendor?.contact?.replace('971', ''));
            setVendorDeatils();
            for (let index = 0; index < res.data.images.length; index++) {
              //setsliderImages([...sliderImages, res.data.images[index].image]);
              setsliderImages(oldArray => [
                ...oldArray,
                res.data.images[index].image,
              ]);
            }
            if (res.data.wishlistId > 0) {
              //alert('true' + res.data.wishlistId + res.data.id);
              setwishStatus(true);
            }
            setfeaturedDeatils(res.data.features);
            setloading(false);
            // alert(source.html);
            // console.log(source.html);
          } else {
            setloading(false);
            //console.log(res);
          }
        })
        .catch(err => {
          setloading(false);
          console.log(err);
        });
    } else {
      carDeatils(id)
        .then(res => {
          if (res.status === 'success') {
            //console.log(res);
            setdeatils(res.data);
            setfeaturedDeatils(res.data.features);
            //console.log(res.data.description.length + ' descrlength');
            setdescripation(res.data.description);

            if (res.data.wishlistId > 0) {
              // alert('true' + res.data.wishlistId + res.data.id);
              setwishStatus(true);
            }
            for (let index = 0; index < res.data.images.length; index++) {
              //setsliderImages([...sliderImages, res.data.images[index].image]);
              setsliderImages(oldArray => [
                ...oldArray,
                res.data.images[index].image,
              ]);
            }
            //setsliderImages(res.data.images);
            //alert(sliderImages);
            //console.log(sliderImages);
            setloading(false);
          } else {
            console.log(res);
            setloading(false);
          }
        })
        .catch(err => {
          setloading(false);
          console.log(err);
        });
    }
  }, []);
  const showDatePicker = () => {
    refRBSheet.current.close();
    console.log('hsghshgsd');

    setTimeout(() => {
      setDatePickerVisibility(true);
    }, 1000);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.log(date.toLocaleDateString());
    setisDate(date.toLocaleDateString());
    hideDatePicker();
  };

  const onChange = selectedDate => {
    const currentDate = selectedDate;

    setisDateE(currentDate);
    hidedate1();
  };

  function hidedate1() {
    setDatePickerVisibility(false);
    setTimeout(() => {
      refRBSheet.current.open();
    }, 1000);
  }
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      {/* <DateTimePickerModal
        // iOSDatePickerComponent={props => (
        //   <RNDatePicker
        //     {...props}
        //     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        //   />
        // )}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        // style={{width: 320, backgroundColor: 'white'}}
      /> */}

      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDateE}
          mode="date"
          onConfirm={onChange}
          onCancel={hidedate1}
          // onConfirm={handleConfirm}
          // onCancel={hideDatePicker}
        />
      )}
      {zoomInImage !== '' && ZoomInView()}
      <Loader show={loading} />
      {deatils.id ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          keyboardShouldPersistTaps="handled">
          <RBSheet
            height={Dimensions.get('window').height / 1.35}
            animationType="slide"
            ref={refRBSheet}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {
                backgroundColor: '#19191950',
              },
              container: {
                borderTopRightRadius: 22,
                borderTopLeftRadius: 22,
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            <View
              style={{
                height: 50,
                // backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ContactSellerHeader
                heading={
                  contactSellerr
                    ? localizedString.contactseller
                    : localizedString.videoshedule
                }
                onclose={OnSheetClose}
              />
            </View>

            <HorizontalLine />
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}>
              <View
                style={{
                  height: 130,
                  // backgroundColor: 'red',
                  padding: 26,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ContactSellerBody
                  permitheading={localizedString.permitText}
                  viewlisting={localizedString.viewlisiting}
                  permitno={deatils.vendor?.permitno}
                  name={deatils.vendor.name}
                  image={deatils.vendor.image}
                  rerano={deatils.vendor?.rerano}
                  dedno={deatils.vendor?.dedno}
                  onpress={() => {
                    refRBSheet.current.close();
                    props.navigation.navigate('MyRequetpropertymotorListing', {
                      name: deatils.vendor?.name,
                      image: deatils.vendor?.image,
                      isProperty: deatils.vendor?.hasPropertyModule,
                      isMotor: deatils.vendor?.hasMotorModule,
                    });
                  }}
                />
              </View>

              <HorizontalLine />

              <View
                style={{
                  width: '100%',
                  height: 61,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  marginTop: 4,
                }}>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 4,
                  }}
                  onPress={() => setcontactSeller(true)}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 4,
                      //backgroundColor: 'red',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontFamily: 'Inter-Medium',
                        textTransform: 'uppercase',
                        fontSize: 11,
                      }}>
                      {localizedString.contactseller}
                    </Text>
                    {contactSellerr ? (
                      <View
                        style={{
                          width: '100%',
                          borderBottomColor: '#0989B8',
                          borderBottomWidth: 4,
                          padding: 4,
                        }}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 4,
                  }}
                  onPress={() => setcontactSeller(false)}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 4,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: 11,
                        fontFamily: 'Inter-Medium',
                      }}>
                      {localizedString.videoshedule}
                    </Text>
                    {contactSellerr === false ? (
                      <View
                        style={{
                          width: '90%',
                          borderBottomColor: '#0989B8',
                          borderBottomWidth: 3,
                          padding: 4,
                        }}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              </View>
              {/* tabs flow end here */}

              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {contactSellerr === true ? (
                  <View style={{width: '80%', marginTop: 10, marginBottom: 20}}>
                    <MyInput
                      formTitle={localizedString.nameInput}
                      placeHolder={localizedString.nameplaceholder}
                      onChange={onChangeContact}
                      value={vendorname}
                    />
                    <MyInput
                      formTitle={localizedString.emailInpit}
                      placeHolder={localizedString.emailplaceholder}
                      onChange={onChangeContact}
                      value={vendoremail}
                    />

                    <MyInput
                      formTitle={localizedString.phoneText}
                      placeHolder="089-0784"
                      onChange={onChangeContact}
                      value={contactNumber}
                      number="hdhhd"
                      keyboardType="numeric"
                      maxlength={9}
                    />

                    <MyInput
                      desc
                      formTitle={localizedString.meesageText}
                      placeHolder={localizedString.helloText}
                      onChange={onChangeContact}
                      value={contactMessage}
                    />

                    <FlatButton
                      label={localizedString.sendMessageText}
                      buttonStyle={{
                        width: '100%',
                        backgroundColor: '#0989B8',
                        marginTop: 20,
                        borderRadius: 8,
                        paddingVertical: 15,
                      }}
                      labelStyle={{textTransform: 'uppercase', fontSize: 16}}
                      onPress={() => {
                        OnMessageSend();
                      }}></FlatButton>
                  </View>
                ) : (
                  <View
                    style={{
                      width: '80%',
                      marginTop: 10,
                      marginBottom: 13,
                      //alignItems: 'center',
                      //justifyContent: 'center',
                    }}>
                    <DatePicker
                      title={localizedString.pickdateText}
                      onPicker={showDatePicker}
                      pickValue={isDateE.toLocaleDateString()}
                    />

                    <MyInput
                      desc
                      formTitle={localizedString.meesageText}
                      placeHolder={localizedString.helloText}
                      onChange={onChangeContact}
                      value={contactMessage}
                    />

                    <FlatButton
                      label={localizedString.sheduledText}
                      buttonStyle={{
                        width: '100%',
                        backgroundColor: '#0989B8',
                        marginTop: 20,
                        borderRadius: 8,
                        paddingVertical: 15,
                      }}
                      labelStyle={{textTransform: 'uppercase', fontSize: 16}}
                      onPress={() => OnMessageShedule()}></FlatButton>
                  </View>
                )}
              </View>
            </ScrollView>
          </RBSheet>

          <View style={styles.topImgageContainer}>
            {/* <ImageBackground
              resizeMode="stretch"
              style={{
                width: '100%',
                height: 200,
              }}
              source={{
                uri: deatils.thumbnail,
              }}>
              <View style={styles.backImageContainer}>
                <Ionicons
                  name="arrow-back"
                  size={36}
                  //color="blacK"
                  onPress={() => props.navigation.goBack()}
                />
              </View>
            </ImageBackground> */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                width: 40,
                height: 40,
                marginTop: 10,
                marginLeft: 10,
                backgroundColor: 'white',
                borderRadius: 40,
                zIndex: 100,
                alignItems: 'center',
                justifyContent: 'center',
                //backgroundColor: 'red',
              }}
              activeOpacity={1}
              onPress={() => props.navigation.goBack()}>
              <View
                style={{
                  position: 'absolute',
                  width: 40,
                  height: 40,
                  marginTop: 10,
                  marginLeft: 10,
                  backgroundColor: 'white',
                  borderRadius: 40,
                  zIndex: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  //backgroundColor: 'red',
                }}>
                <Ionicons
                  name="arrow-back"
                  size={25}
                  // color="red"
                />
              </View>
            </TouchableOpacity>
            <SliderBox
              images={sliderImages}
              sliderBoxHeight={200}
              onCurrentImagePressed={index =>
                //console.warn(`image ${index} pressed`)
                setzoomInImage(sliderImages[index])
              }
              autoplay={true}
              circleLoop={true}
              // parentWidth={'100%'}
            />
          </View>

          <View style={styles.firstContainer}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 6,
                ...RtlStyles.containerRow,
              }}>
              <View style={{marginTop: 20, paddingLeft: 14}}>
                <View style={styles.btnContainer1}>
                  <Text
                    style={{
                      color: '#19191950',
                      fontFamily: 'Inter-SemiBold',
                      fontSize: 10,
                    }}>
                    {deatils.category && deatils.category
                      ? deatils.category.name
                      : 'SUV'}
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 20, marginLeft: 8}}>
                <View style={styles.btnContainer2}>
                  <Text
                    style={{
                      color: '#19191950',
                      fontFamily: 'Inter-SemiBold',
                      fontSize: 10,
                    }}>
                    {deatils.status && deatils.status
                      ? deatils.status
                      : 'For Sale'}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={(styles.sharehearttextContainer, RtlStyles.containerRow)}>
              <View style={{width: '60%', marginTop: 7}}>
                <Text
                  numberOfLines={2}
                  style={{
                    ...styles.propertyText,
                    fontSize: 18,
                    fontFamily: 'Inter-Bold',
                    paddingLeft: 14,
                    textAlign: isRtl ? 'right' : 'left',
                    paddingHorizontal: 7,
                  }}>
                  {deatils.title}
                </Text>
              </View>
              <View style={styles.btnsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    onShare();
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: 26, height: 26}}
                    source={require('../../shared/assests/propertydeatils/share-altnew.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    wishStatus === false
                      ? name === 'Motor'
                        ? addwishlist('Motor')
                        : addwishlist('Property')
                      : deletewishlist(id);
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: 26, height: 26, marginLeft: 12}}
                    // source={require('../../shared/assests/propertydeatils/heart.png')}
                    source={
                      wishStatus === true
                        ? require('../../shared/assests/propertydeatils/heartfill.png')
                        : require('../../shared/assests/propertydeatils/heart.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 16,
                alignItems: 'center',
                marginTop: 8,
                width: '88%',
              }}>
              <Icon name="map-marker" size={21} />
              <Text
                numberOfLines={1}
                style={{
                  ...styles.propertyText,
                  fontSize: 12,
                  marginLeft: 5,
                  color: '#19191940',
                  fontFamily: 'Inter-Medium',
                  //  ...RtlStyles.containerRow,
                }}>
                {deatils.address.address}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 0.6,
                marginTop: 14,
              }}
            />
            <View style={{flex: 1, backgroundColor: '#F6F8F9'}}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  backgroundColor: '#F6F8F9',
                  flexDirection: 'row',
                  marginTop: 10,
                  //backgroundColor: 'red',
                  height: 50,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '25%',
                    //backgroundColor: 'red',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: 22, height: 22}}
                    source={
                      name === 'Motor'
                        ? require('../../shared/assests/home/autonew.png')
                        : require('../../shared/assests/property/bed.png')
                    }
                  />
                  <Text
                    numberOfLines={2}
                    style={{
                      color: '#989898',
                      fontFamily: 'Inter-Medium',
                      fontSize: 9,
                      textAlign: 'center',
                    }}>
                    {deatils.rooms && deatils.rooms
                      ? deatils.rooms
                      : deatils.transmission}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '25%',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: 22, height: 22}}
                    source={
                      name === 'Motor'
                        ? require('../../shared/assests/home/Doornew.png')
                        : require('../../shared/assests/property/bath.png')
                    }
                  />
                  <Text
                    style={{
                      color: '#989898',
                      color: '#989898',
                      fontFamily: 'Inter-Medium',
                      fontSize: 9,
                    }}>
                    {deatils.baths && deatils.baths
                      ? deatils.baths
                      : deatils.door}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '25%',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: 22, height: 22}}
                    source={
                      name === 'Motor'
                        ? require('../../shared/assests/home/wheel.png')
                        : require('../../shared/assests/home/garagenew1.png')
                    }
                  />
                  <Text
                    style={{
                      color: '#989898',
                      color: '#989898',
                      fontFamily: 'Inter-Medium',
                      fontSize: 9,
                    }}>
                    {deatils.garages && deatils.garages
                      ? deatils.garages
                      : deatils.wheels}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '25%',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: 22, height: 22}}
                    source={
                      name === 'Motor'
                        ? require('../../shared/assests/home/carbattery.png')
                        : require('../../shared/assests/property/ruler-triangle.png')
                    }
                  />
                  <Text
                    style={{
                      color: '#989898',
                      color: '#989898',
                      fontFamily: 'Inter-Medium',
                      fontSize: 9,
                    }}>
                    {deatils.size && deatils.size
                      ? deatils.size
                      : deatils.engineDisplacement}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#F1F3F5',
                }}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#F1F3F5',
                    height:
                      seeMore === false && descripation?.length >= 500
                        ? 140
                        : 'auto',
                    padding: 18,
                    overflow: 'hidden',
                  }}>
                  <View style={{marginBottom: 3, ...RtlStyles.containerRow}}>
                    <Text
                      style={{
                        color: '#191919',
                        fontSize: 16,
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      {localizedString.descriptionText}
                    </Text>
                  </View>

                  {/* <SeeMore
                    numberOfLines={3}
                    seeMoreText={'Read More'}
                    style={{
                      fontSize: 12,
                      fontFamily: 'Inter-SemiBold',
                      color: '#989898',
                      textAlign: 'center',
                    }}
                    linkStyle={{
                      fontSize: 12,
                      fontFamily: 'Inter-SemiBold',
                    }}
                    linkColor="#0989B8"
                    linkPressedColor="#0989B8">
                    {deatils.description}
                  </SeeMore> */}
                  <HTMLView
                    value={descripation}
                    stylesheet={{
                      width: '96%',
                      fontSize: 12,
                      fontFamily: 'Inter-SemiBold',
                      //color: 'red',
                      textAlign: 'center',
                      zIndex: 2,
                    }}
                  />
                </View>
                {descripation?.length >= 500 ? (
                  <View
                    style={{padding: 18, bottom: seeMore === false ? 14 : 30}}>
                    <TouchableOpacity onPress={() => setseeMore(v => !v)}>
                      <Text
                        style={{
                          color: '#0989B8',
                          fontSize: 12,
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                        }}>
                        {seeMore === false
                          ? localizedString.seemore
                          : localizedString.seeLess}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                <View
                  style={{
                    borderBottomColor: 'lightgrey',
                    borderBottomWidth: 0.6,
                    marginTop: 2,
                  }}
                />
                {featuredDeatils && featuredDeatils.length ? (
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#F1F3F5',
                      padding: 20,
                      //...RtlStyles.containerRow,
                    }}>
                    <View style={{...RtlStyles.containerRow}}>
                      <Text
                        style={{
                          color: '#191919',
                          fontSize: 16,
                          fontFamily: 'Inter-SemiBold',
                        }}>
                        {localizedString.featuresText}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '91%',
                        backgroundColor: '#F1F3F5',
                        //padding: 20,
                      }}>
                      {Featuredlist()}
                    </View>
                  </View>
                ) : null}
                <View
                  style={{
                    borderBottomColor: 'lightgrey',
                    borderBottomWidth: 0.8,
                    marginTop: 8,
                  }}
                />
                <View
                  style={{
                    width: '100%',
                    //backgroundColor: 'red',
                    padding: 20,
                  }}>
                  <View style={{...RtlStyles.containerRow}}>
                    <Text
                      style={{
                        color: '#191919',
                        fontSize: 16,
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      {name === 'Property'
                        ? localizedString.propertyDeatils
                        : localizedString.motorDeatils}
                    </Text>
                  </View>
                  {Featureddeatilslist()}
                </View>
                {deatils.video !== null ? (
                  <View
                    style={{
                      borderBottomColor: 'lightgrey',
                      borderBottomWidth: 0.8,
                      marginTop: 8,
                    }}
                  />
                ) : null}

                {deatils.video !== null ? (
                  <>
                    <View
                      style={{
                        width: '96%',
                        backgroundColor: '#F1F3F5',
                        //marginLeft: 20,
                        marginLeft: 20,
                        marginTop: 15,
                        ...RtlStyles.containerRow,
                        //height: 50,
                      }}>
                      <Text
                        style={{
                          color: '#191919',
                          fontSize: 17,
                          fontFamily: 'Inter-SemiBold',
                        }}>
                        {localizedString.videoText}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Video
                        resizeMode="cover"
                        paused={playVideo}
                        ref={refVideo}
                        style={{
                          //aspectRatio: 100,
                          height: 160,
                          width: '89%',
                          borderRadius: 8,
                          marginTop: 10,
                        }}
                        source={{
                          uri: deatils.video,
                        }}
                        onLoad={() => {
                          refVideo.current.seek(2);
                        }}
                        onEnd={() => ResetVideo()}
                        //style={{flex: 1}}
                        // controls={true}
                      />
                      {playVideo === true ? (
                        <View
                          style={{
                            width: 60,
                            height: 60,
                            position: 'absolute',
                            borderRadius: 6,
                            bottom: 0,
                            right: 0,
                            top: 58,
                            left: 160,
                            //backgroundColor: '#0989B8',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TouchableOpacity onPress={() => PlayVideo()}>
                            <Image
                              style={{width: 50, height: 50}}
                              resizeMode="cover"
                              source={require('../../shared/assests/propertydeatils/play.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                  </>
                ) : null}

                <View
                  style={{
                    borderBottomColor: 'lightgrey',
                    borderBottomWidth: 0.8,
                    marginTop: 18,
                  }}
                />
                <View
                  style={{
                    width: '96%',
                    backgroundColor: '#F1F3F5',
                    marginLeft: 20,
                    marginTop: 15,
                    ...RtlStyles.containerRow,
                  }}>
                  <Text
                    style={{
                      color: '#191919',
                      fontSize: 18,
                      fontFamily: 'Inter-SemiBold',
                    }}>
                    {localizedString.locationText}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 11,
                    //backgroundColor: 'red',
                    backgroundColor: '#F1F3F5',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: '90%',
                      height: 166,
                      backgroundColor: '#F1F3F5',
                      // backgroundColor: 'red',
                    }}
                    onPress={() =>
                      props.navigation.navigate('PropertyMotorMap', {
                        lon: deatils?.longitude,
                        lat: deatils?.latitude,
                      })
                    }>
                    <ImageBackground
                      //resizeMode="cover"
                      resizeMode="cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 8,
                        backgroundColor: '#F1F3F5',
                        //backgroundColor: 'yellow',
                      }}
                      source={require('../../shared/assests/propertydeatils/map.png')}></ImageBackground>
                  </TouchableOpacity>
                </View>
                {name === 'Property' ? (
                  <>
                    <View
                      style={{
                        borderBottomColor: 'lightgrey',
                        borderBottomWidth: 0.8,
                        marginTop: 14,
                      }}
                    />
                    <View
                      style={{
                        width: '96%',
                        backgroundColor: '#F1F3F5',
                        //padding: 20,
                        //marginLeft: 20,
                        marginHorizontal: 20,
                        marginTop: 15,
                      }}>
                      <View style={{...RtlStyles.containerRow}}>
                        <Text
                          style={{
                            color: '#191919',
                            fontSize: 18,
                            fontFamily: 'Inter-SemiBold',
                            marginHorizontal: isRtl == true ? 20 : 0,
                          }}>
                          {localizedString.floorPlansText}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '95%',
                        backgroundColor: '#F1F3F5',
                        marginTop: 3,
                        justifyContent: 'space-between',
                        marginHorizontal: 12,
                        flexWrap: 'wrap',
                        // backgroundColor: 'red',
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: 'Inter-SemiBold',
                          fontWeight: 'bold',
                        }}>
                        {localizedString.floorText}
                      </Text>
                      <Text style={{fontSize: 9, fontFamily: 'Inter-Medium'}}>
                        {`${localizedString.sizeText}: ${deatils.size}`}
                      </Text>
                      <Text style={{fontSize: 9, fontFamily: 'Inter-Medium'}}>
                        {`${localizedString.roomText}:${deatils.rooms}`}
                      </Text>
                      <Text style={{fontSize: 9, fontFamily: 'Inter-Medium'}}>
                        {`${localizedString.bathtext}: ${deatils.baths}`}
                      </Text>
                      <Text style={{fontSize: 9, fontFamily: 'Inter-Medium'}}>
                        {`${localizedString.priceText}:${deatils.price}`}
                      </Text>
                    </View>
                    {deatils.floorPlans?.map((item, i) => {
                      return (
                        <View
                          style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            //borderWidth: 3,
                            marginTop: 11,
                          }}>
                          <ImageBackground
                            resizeMode="cover"
                            style={{
                              width: '94%',
                              height: 150,
                              marginLeft: '5%',
                            }}
                            source={{uri: deatils?.floorPlans[i].image}}>
                            <View style={styles.backImageContainer}></View>
                          </ImageBackground>
                        </View>
                      );
                    })}
                  </>
                ) : null}
              </View>
            </View>
            <View style={{backgroundColor: '#F1F3F5', width: '100%'}}>
              <Text></Text>
            </View>
          </View>
          <PopUpModel
            visible={apiPopup}
            message={errorValidation}
            Success={success}
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
                setSuccess(false);
                setapiPopup(false);
              }
            }}
          />
          <CallnowPopup
            vendorData={deatils?.vendor}
            refernceid={deatils?.adsReferenceCode}
            visible={callnowPopupvisble}
            guest={false}
            // message={localizedString.callpopupMessage}
            userClick={() => {
              closeCallnowPopup();
            }}
            //btntext="Login/SignUp"
            openDialer={() => {
              OpenDialer(deatils?.vendor?.mobile);
            }}
            // heading={localizedString.callpopupHeading}
            onPress={() => {
              openCallnowPopup();
            }}
          />
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
                props.navigation.reset({
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
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: 'SignIn2'}],
                  });
                }, 2000);
              } else {
                setIspopupvisble(false);
              }
            }}
          />
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
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'SignIn2'}],
                });
              }, 2000);
              // AsyncStorage.clear();
              // props.navigation.reset({
              //   index: 0,
              //   routes: [{name: 'SignIn2'}],
              // });
            }}
            btntext={localizedString.successModelbtntext}
            heading={localizedString.successModelheading}
            onPress={() => {
              if (errorValidation.includes('denied')) {
                dispatch(openGuestPopup.closeGuestPopup(false));
                setTimeout(() => {
                  AsyncStorage.clear();
                  setLanguage('en');
                  _setLanguage('en');
                  props.navigation.reset({
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
        </ScrollView>
      ) : null}
      <View
        style={{
          width: '100%',
          //backgroundColor: 'red',
          height: 86,
          position: 'absolute',
          bottom: 0,
          right: 0,
          borderRadius: 8,
          left: 0,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '50%',
            height: '100%',
            //backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatButton
            label={localizedString.contactSellerText}
            buttonStyle={{
              width: '93%',
              backgroundColor: '#0989B8',
              position: 'absolute',
              bottom: 0,
              right: 0,
              borderRadius: 8,
              left: 10,
              //left: 20,
              paddingVertical: 15,
            }}
            labelStyle={{
              textTransform: 'uppercase',
              fontSize: 11,
            }}
            onPress={() => {
              dispatch(VendorIdaction.VendorId(deatils?.vendor?.id));
              refRBSheet.current.open();
            }}></FlatButton>
        </View>
        <View
          style={{
            width: '50%',
            height: '100%',
            //backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatButton
            label={localizedString.callnowText}
            buttonStyle={{
              width: '93%',
              backgroundColor: '#191919',
              position: 'absolute',
              bottom: 0,
              right: 0,
              borderRadius: 8,
              left: 10,
              //right: 20,
              paddingVertical: 15,
            }}
            labelStyle={{textTransform: 'uppercase', fontSize: 11}}
            onPress={() => {
              //dispatch(VendorIdaction.VendorId(deatils?.vendor?.id));
              //refRBSheet.current.open();
              openCallnowPopup();
            }}></FlatButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  topImgageContainer: {
    height: 200,
    //backgroundColor: 'red',
    width: '100%',
  },
  backImageContainer: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#FFFFFF50',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstContainer: {
    flex: 1,
    //height: 200,
    backgroundColor: '#F6F8F9',
    width: '100%',
  },
  btnContainer1: {
    height: 24,
    padding: 6,
    //width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  btnContainer2: {
    height: 24,
    padding: 6,
    //width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  sharehearttextContainer: {
    marginTop: 20,
    marginLeft: 14,
    width: '100%',
    flexDirection: 'row',
    marginHorizontal: 3,
    //backgroundColor: 'yellow',
  },
  propertyText: {
    color: '#191919',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnsContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PropertyDeatils;

const Featureddeatilslist = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          //justifyContent: 'space-between',
          marginTop: 20,
          //backgroundColor: 'red',
          width: '90%',
        }}>
        <View style={{width: '33.333%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.PropertyReference
                : localizedString.MotorReference
            }
            value={
              name === 'Property'
                ? deatils?.adsReferenceCode
                : deatils?.adsReferenceCode
            }
          />
        </View>
        <View style={{width: '33.333%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.propertyAdsdate
                : localizedString.carAdsdate
            }
            value={
              name === 'Property'
                ? deatils?.adPostedDate === ''
                  ? '-'
                  : deatils?.adPostedDate
                : deatils?.adPostedDate === ''
                ? '-'
                : deatils?.adPostedDate
            }
          />
        </View>

        <View style={{width: '33.333%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.propertylastupdate
                : localizedString.carlastupdate
            }
            value={
              name === 'Property'
                ? deatils?.adPostedDate === ''
                  ? '-'
                  : deatils?.adPostedDate
                : deatils?.adPostedDate === ''
                ? '-'
                : deatils?.adPostedDate
            }
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          //justifyContent: 'space-between',
          marginTop: 20,
          width: '90%',
          //backgroundColor: 'red',
        }}>
        <View style={{width: '50%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.bedroomsText
                : localizedString.motorDeatils
            }
            value={name === 'Property' ? deatils.rooms : deatils.make.name}
          />
        </View>
        <View style={{width: '50%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.bathroomsText
                : localizedString.modelText
            }
            value={name === 'Property' ? deatils.baths : deatils.model.name}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          //justifyContent: 'space-between',
          marginTop: 20,
          // backgroundColor: 'red',
          width: '90%',
        }}>
        <View style={{width: '50%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.bathroomsText
                : localizedString.modelText
            }
            value={name === 'Property' ? deatils.baths : deatils.model.name}
          />
        </View>
        <View style={{width: '50%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.properystatusText
                : localizedString.engineDisplacementText
            }
            value={
              name === 'Property'
                ? deatils.status
                : deatils?.engineDisplacement !== null
                ? deatils?.engineDisplacement
                : '-'
            }
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          //justifyContent: 'space-between',
          marginTop: 20,
          // backgroundColor: 'red',
          width: '90%',
        }}>
        <View style={{width: '50%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.priceText
                : localizedString.conditionText
            }
            value={name === 'Property' ? deatils.price : deatils.condition}
          />
        </View>
        <View style={{width: '50%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.propertysizeText
                : localizedString.bodyTypeText
            }
            value={name === 'Property' ? deatils.size : deatils.bodyType.name}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          //justifyContent: 'space-between',
          marginTop: 20,
          // backgroundColor: 'red',
          width: '90%',
        }}>
        <View style={{width: '50%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.yearBuildText
                : localizedString.warrantyText
            }
            value={
              name === 'Property'
                ? deatils?.buildYear === ''
                  ? '-'
                  : deatils?.buildYear
                : deatils?.warranty === true
                ? 'Yes'
                : 'No'
            }
          />
        </View>
        <View style={{width: '50%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.garagesText
                : localizedString.fuelTypeText
            }
            value={
              name === 'Property'
                ? deatils.garages
                : deatils?.fuelType + '/' + deatils?.mileage
            }
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          //justifyContent: 'space-between',
          marginTop: 20,
          //backgroundColor: 'red',
          width: '90%',
        }}>
        <View style={{width: '50%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.cityText
                : localizedString.cityText
            }
            value={
              name === 'Property'
                ? '-'
                : deatils?.address?.area === ''
                ? '-'
                : deatils?.address?.area
            }
          />
        </View>
        <View style={{width: '50%'}}>
          <ProperyDeatilstags
            heading={
              name === 'Property'
                ? localizedString.furnishedText
                : localizedString.steeringSideText
            }
            value={
              name === 'Property'
                ? deatils.isFurnished === true
                  ? 'Yes'
                  : 'No'
                : deatils?.steeringSide !== null
                ? deatils?.steeringSide
                : '-'
            }
          />
        </View>
      </View>

      <>
        {name === 'Motor' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              //backgroundColor: 'red',
              width: '90%',
            }}>
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={name === 'Property' ? '' : localizedString.addressText}
                value={
                  name === 'Property'
                    ? ''
                    : deatils?.address.address === ''
                    ? '-'
                    : deatils?.address.address.toString().substring(0, 12)
                }
              />
            </View>

            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property' ? '' : localizedString.cylinderText
                }
                value={
                  name === 'Property'
                    ? ''
                    : deatils?.cylinder === ''
                    ? '-'
                    : deatils?.cylinder
                }
              />
            </View>
          </View>
        ) : null}
      </>
      <>
        {name === 'Motor' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              //backgroundColor: 'red',
              width: '90%',
            }}>
            {/* <View style={{}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? ''
                    : localizedString.regionalSpecificationText
                }
                value={
                  name === 'Property'
                    ? ''
                    : deatils?.regionalSpecification !== null
                    ? deatils?.regionalSpecification
                    : '-'
                }
              />
            </View> */}
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property' ? '' : localizedString.serviceHistoryText
                }
                value={
                  name === 'Property'
                    ? ''
                    : deatils?.serviceHistory === true
                    ? 'Yes'
                    : 'No'
                }
              />
            </View>
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? ''
                    : localizedString.mechanicalConditionText
                }
                value={
                  name === 'Property'
                    ? ''
                    : deatils?.mechanicalCondition !== null
                    ? deatils?.mechanicalCondition
                    : '-'
                }
              />
            </View>
          </View>
        ) : null}
      </>
      <>
        {name === 'Motor' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              //backgroundColor: 'red',
              width: '90%',
            }}>
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property' ? '' : localizedString.capacityText
                }
                value={
                  name === 'Property'
                    ? ''
                    : deatils.capacity !== null
                    ? deatils.capacity
                    : '-'
                }
              />
            </View>
            {/* <View style={{}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? ''
                    : localizedString.serviceHistoryText
                }
                value={
                  name === 'Property'
                    ? ''
                    : deatils?.serviceHistory === true
                    ? 'Yes'
                    : 'No'
                }
              />
            </View> */}
            <View style={{width: '50%'}}>
              <ProperyDeatilstags
                heading={
                  name === 'Property'
                    ? ''
                    : localizedString.regionalSpecificationText
                }
                value={
                  name === 'Property'
                    ? ''
                    : deatils?.regionalSpecification !== null
                    ? deatils?.regionalSpecification
                    : '-'
                }
              />
            </View>
          </View>
        ) : null}
      </>
    </>
  );
  // });
};
