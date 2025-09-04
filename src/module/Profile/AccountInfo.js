import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Animated,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native';
// import TextInputComponent from '../Shared/TextInputComponent';
import CreateClassHeader from '../../shared/components/CreateClassHeader';
import MyInput from '../../shared/components/MyInput';
import AuthButton from '../../shared/components/AuthButton';
import ImagePicker from 'react-native-image-crop-picker';
import {UsereProfileData} from '../../shared/Constant/Constant';
import BackHeader from '../../shared/components/BackHeader';
import RNFetchBlob from 'rn-fetch-blob';
import PopUpModel from '../../shared/components/PopUp';
import AIcon from 'react-native-vector-icons//Ionicons';
import Loader from '../../shared/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import MyInput from '../../shared/components/MyInput';

import {
  saveProfilePicture,
  updateProfile,
  getuserProfile,
} from '../../shared/ApiMiddleware/api';

import {_setUsereProfileData} from '../../shared/Constant/Constant';
import {localizedString} from '../../shared/localization/localization';

const AccountInfo = props => {
  const [name, setname] = useState('');
  const [number, setnumber] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [pickImge, setPickImage] = useState();
  const [Imgeuri, setImgeuri] = useState(
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  );
  const [popupvisble, setIspopupvisble] = useState(false);
  const [loading, setloading] = useState(false);
  const [IsnumberChanged, setIsnumberChanged] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [Days, setDays] = useState([
    {
      index: 0,
      Day: 'Saturday',
      Letter: 'S',
      selected: 'false',
    },
    {
      index: 1,
      Day: 'Sunday',
      Letter: 'S',
      selected: 'false',
    },
    {
      index: 2,
      Day: 'Monday',
      Letter: 'M',
      selected: 'false',
    },
    {
      index: 3,
      Day: 'Tuesday',
      Letter: 'T',
      selected: 'false',
    },
    {
      index: 4,
      Day: 'Wednesday',
      Letter: 'W',
      selected: 'false',
    },
    {
      index: 5,
      Day: 'Thursday',
      Letter: 'T',
      selected: 'false',
    },
    {
      index: 6,
      Day: 'Friday',
      Letter: 'F',
      selected: 'false',
    },
  ]);

  let index = '';

  const imagePicker = async () => {
    let imagePick = [];
    ImagePicker.openPicker({
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(response => {
        setloading(true);
        setImgeuri(response.path);
        setPickImage(response);
        saveProfilePicture(response)
          .then(res => {
            console.log('picture update');
            setloading(false);
          })
          .catch(err => {
            console.log(err);
            setloading(false);
          });
        //saveProfilePicture(response);
      })
      .catch(e => console.log(e, 'Error'));
  };
  const SaveUserProfile = async data => {
    _setUsereProfileData(data);
    await AsyncStorage.setItem('ProfileData', JSON.stringify(data));
    setloading(false);
    setIspopupvisble(true);
    setTimeout(() => {
      setIspopupvisble(false);
      //console.log(IsnumberChanged);
      // if (IsnumberChanged) {
      //   console.log(IsnumberChanged);
      //   setIsnumberChanged(false);
      //   props.navigation.navigate('SignInOptpVerfication');
      // }
    }, 600);
  };

  // const userProfileImage = (token, pickImage) => {
  //       // let type = data.uri.split('.');
  //       let response = await RNFetchBlob.fetch(
  //         'PUT',
  //         `${BaseURL}/api/v1/vendor/account/profile/photo`,

  //         {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: 'Bearer ' + token,
  //         },
  //         [
  //           {
  //             name: 'profile',
  //             filename: 'abc.jpg',
  //             type: pickImage.mime,
  //             data: RNFetchBlob.wrap(pickImage.path),
  //           },
  //         ],
  //       );

  //       let res = await response.json();
  //       console.log(res, 'IMAGESSS');
  //       if (res.status === 'success') {
  //         dispatch({
  //           type: UpdateUserImage.UPDATE_IMAGE_SUCC,
  //         });
  //       } else {
  //         dispatch({
  //           type: UpdateUserImage.UPDATE_IMAGE_FAIL,
  //         });
  //       }
  // };

  const Name = title => {
    return (
      <View style={styleSheet.ClassNameView}>
        <Text style={styleSheet.ClassNameText}>{title}</Text>

        <TextInput
          style={styleSheet.TextInput}
          placeholder="Type Here"
          placeholderTextColor="#7e7e7e"
          onChangeText={text => setname(text)}
          defaultValue={name}
        />
      </View>
    );
  };

  const Number = title => {
    return (
      <View style={styleSheet.ClassNameView}>
        <Text style={styleSheet.ClassNameText}>{title}</Text>

        <TextInput
          style={styleSheet.TextInput}
          placeholder="Type Here"
          placeholderTextColor="#7e7e7e"
          onChangeText={text => setnumber(text)}
          defaultValue={number}
        />
      </View>
    );
  };

  const Email = title => {
    return (
      <View style={styleSheet.ClassNameView}>
        <Text style={styleSheet.ClassNameText}>{title}</Text>

        <TextInput
          style={styleSheet.TextInput}
          placeholder="Type Here"
          placeholderTextColor="#7e7e7e"
          onChangeText={text => setemail(text)}
          defaultValue={email}
        />
      </View>
    );
  };

  const Password = title => {
    return (
      <View style={styleSheet.ClassNameView}>
        <Text style={styleSheet.ClassNameText}>{title}</Text>

        <TextInput
          style={styleSheet.TextInput}
          placeholder="Type Here"
          placeholderTextColor="#7e7e7e"
          onChangeText={text => setpassword(text)}
          defaultValue={password}
        />
      </View>
    );
  };
  const onChangeText = (value, name) => {
    if (name === localizedString.nameInput) {
      setname(value);
    } else if (name === localizedString.emailphoneInput) {
      setemail(value);
    } else if (name === localizedString.phoneInput) {
      setnumber(value);
    }
  };

  const Confirmpassword = title => {
    return (
      <View style={styleSheet.ClassNameView}>
        <Text style={styleSheet.ClassNameText}>{title}</Text>

        <TextInput
          style={styleSheet.TextInput}
          placeholder="Type Here"
          placeholderTextColor="#7e7e7e"
          onChangeText={text => setconfirmpassword(text)}
          defaultValue={confirmpassword}
        />
      </View>
    );
  };
  useEffect(() => {
    //alert('call');
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log(
        UsereProfileData !== null &&
          UsereProfileData !== '' &&
          UsereProfileData !== undefined
          ? UsereProfileData.logo
          : '',
      );
      setname(
        UsereProfileData !== null &&
          UsereProfileData !== '' &&
          UsereProfileData !== undefined
          ? UsereProfileData.name
          : '',
      );

      setemail(
        UsereProfileData !== null &&
          UsereProfileData !== '' &&
          UsereProfileData !== undefined
          ? UsereProfileData.email
          : '',
      );
      setnumber(
        UsereProfileData !== null &&
          UsereProfileData !== '' &&
          UsereProfileData !== undefined
          ? UsereProfileData.contact.replace('971', '')
          : '',
      );

      setImgeuri(
        UsereProfileData !== null &&
          UsereProfileData !== '' &&
          UsereProfileData !== undefined
          ? UsereProfileData.logo
          : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      );
      //setImgeuri(UsereProfileData?.logo);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (IsnumberChanged === true) {
      props.navigation.navigate('SignInOptpVerfication', {
        phoneNo: '971' + number,
        name: 'profile',
      });
    }
  }, [IsnumberChanged]);

  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: '#F1F3F5'}}>
      {/* <ScrollView style={{flex: 1, width: '100%'}}> */}
      <Loader show={loading} />
      <BackHeader
        title={localizedString.accountinfoText}
        onPress={() => props.navigation.goBack()}
      />
      <PopUpModel
        visible={popupvisble}
        Success={true}
        btntext={localizedString.okayText}
        message={localizedString.profilesuccessmessage}
        onPress={() => {
          //setFeedback('');
          setIspopupvisble(false);
        }}
      />
      {/* <StatusBar hidden={true} /> */}

      <View
        style={{
          width: '100%',
          //alignItems: 'center',
          //justifyContent: 'center',
          height: '70%',
        }}>
        {/* <CreateClassHeader title="Account Info" /> */}

        {/* <PopUpModel
          visible={popupvisble}
          message="Pofile has been sumbited"
          onPress={() => {
            setFeedback('');
            setIspopupvisble(false);
          }}
        /> */}

        <View
          style={{
            //height: 150,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: 'red',
            //marginTop: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              //backgroundColor: 'yellow',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              //marginTop: 20,
              //marginLeft: 40,
            }}>
            <Image
              source={{uri: Imgeuri}}
              style={{
                width: 126,
                height: 126,
                borderRadius: 126 / 2,
                marginLeft: 20,
              }}
            />
            <TouchableOpacity
              onPress={imagePicker}
              style={{left: -80, top: 60}}>
              {/* </View>style={Styles.imagePickTile}> */}
              {/* <Image
                resizeMode="contain"
                source={require('../../shared/assests/Profile/ImageSelect.png')}
              /> */}
              <AIcon name="camera" size={44} color="#0989B8" />
            </TouchableOpacity>
          </View>
        </View>
        {/* {Name("Name")} */}
        {/* {Number("Number")} */}
        {/* {Email("Email Address")} */}
        {/* {Password("New Password")} */}
        {/* {Confirmpassword("Confirm Password")} */}

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
            <View style={{width: '100%', marginTop: 10, marginBottom: 20}}>
              {/* Title */}
              <MyInput
                formTitle={localizedString.nameInput}
                placeHolder={localizedString.nameplaceholder}
                onChange={onChangeText}
                value={name}
              />

              <MyInput
                formTitle={localizedString.emailphoneInput}
                placeHolder={localizedString.emailplaceholder}
                onChange={onChangeText}
                value={email}
                editable={false}
              />

              {/* <MyInput
                formTitle="Phone No"
                placeHolder="Enter your number"
                onChange={onChangeText}
                value={number}
              /> */}
              <MyInput
                formTitle={localizedString.phoneInput}
                number="hdhhd"
                placeHolder={localizedString.phoneplaceholder}
                onChange={onChangeText}
                keyboardType="numeric"
                maxlength={9}
                value={number}

                //value="+971"
              />
            </View>
          </View>
        </View>
      </View>
      {/* BUTTON */}
      <View
        style={{
          height: '15%',
          width: '100%',
          //backgroundColor: 'yellow',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '89%',
            marginTop: 7,
          }}>
          <AuthButton
            onPress={() => {
              // saveProfilePicture(pickImge)
              //   .then(res => {
              //     console.log('picture update');
              //   })
              //   .catch(err => {
              //     console.log(err);
              //   });
              let userData = {
                name: name,
                email: email,
                contact: '971' + number,
              };
              setloading(true);
              updateProfile(userData)
                .then(res => {
                  console.log(' res  osama' + JSON.stringify(res));
                  if (res.status === 'success') {
                    //props.navigation.navigate('Home');
                    setIsnumberChanged(res.isNumberChanged);
                    getuserProfile()
                      .then(res => {
                        //console.log(' res ' + JSON.stringify(res));

                        if (res.status === 'success') {
                          //alert(res.newNotifications);
                          //setloading(false);

                          SaveUserProfile(res.customer);
                        } else {
                          // setloading(false);
                        }
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  } else {
                    alert('error ot save');
                    //setIspopupvisble(true);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }}
            title={localizedString.saveBtn}
          />
        </View>
      </View>

      {/* <View style={{paddingBottom: 20}}></View> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styleSheet = StyleSheet.create({
  TextInput: {
    height: 50,
    width: '95%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingBottom: 10,
    color: '#7e7e7e',
    fontSize: 15,
    top: 5,
    paddingLeft: 10,
  },
  CreateButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  Button: {
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D50505',
    borderRadius: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  ClassNameView: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '5%',
    paddingTop: '5%',
    marginTop: '5%',
  },
  ClassNameText: {
    fontSize: 13,
    fontFamily: 'Inter-Bold',
    color: '#111111',
    opacity: 0.4,
  },
});
export default AccountInfo;
