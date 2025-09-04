import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Switch,
} from 'react-native';
import {UsereProfileData, _setLanguage} from '../shared/Constant/Constant';
import {useSelector, useDispatch} from 'react-redux';
import * as HomeAction from '../redux/action/setWishList';
import * as citycategoryfeatureFilter from '../redux/action/citycategoryfeatureFilter';
import {TestFunction} from '../module/Home/Home';

import IoIcon from '../shared/components/Icon/IoIcon';
import MaIcon from '../shared/components/Icon/MaIcon';
import FIcon from 'react-native-vector-icons/FontAwesome';
import AIcon from 'react-native-vector-icons//AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';

import {colors} from '../shared/themes/theme';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localizedString} from '../shared/localization/localization';
import {logout} from '../shared/ApiMiddleware/api';
import DeviceInfo from 'react-native-device-info';
import * as openGuestPopup from '../redux/action/Guestpopupaction';

//import CustomDrawerStyle from '../../src/module/Drawer/CustomDrawerStyle';

//Signup Screens
// import SignUp from '../Screens/SignUp/SignUp';
// import GetStarted from '../Screens/SignUp/GetStarted';
// import PhoneNo from '../Screens/SignUp/PhoneNo';
// import EmailAddress from '../Screens/SignUp/EmailAddress';
// import Password from '../Screens/SignUp/Password';
// import YourName from '../Screens/SignUp/YourName';
// import Personal from '../Screens/SignUp/Personal';
// import SelectionScreen from '../Screens/SignUp/SelectionScreen';
// import SchoolRate from '../Screens/SignUp/SchoolRate';
// import SelectInstructionSports from '../Screens/SignUp/SelectInstructSports';
// import SetSchoolInstrutor from '../Screens/SignUp/SetSchoolInstrutor';
// import EditSchedule from '../Screens/SignUp/EditSchedule';
// import MyRate from '../Screens/SignUp/MyRate';
// import Repeat from '../Screens/SignUp/Repeat';
// import AcceptTerms from '../Screens/SignUp/AcceptTems';
// import AcceptTermsOne from '../Screens/SignUp/AcceptTermsOne';
// import Welcome from '../Screens/Welcome/Welcome';

// Bottom Naviagation
// import Map from '../Screens/BottomTabScreens/Map/Map';
// import Discover from '../Screens/BottomTabScreens/Discover/Discover';
// import PeoplelistMessanger from '../Screens/BottomTabScreens/Messanger/PeoplelistMessanger';
// import ProfileMessanger from '../Screens/BottomTabScreens/Messanger/ProfileMessanger';
// import ProfileMessangertabs from '../Screens/BottomTabScreens/Messanger/ProfileMessangertabs';
// import Chat from '../Screens/BottomTabScreens/Messanger/Chat';
// import {Colors} from '../common';
// import Search from '../Screens/Search/Search';
// import EditProfile from '../Screens/BottomTabScreens/Profile.js/EditProfile';
// import FullSearch from '../Screens/Search/FullSearch';
// import ReportIssue from '../Screens/BottomTabScreens/Profile.js/ReportIssue';
// import SetMyRate from '../Screens/BottomTabScreens/Profile.js/SetMyRate';
// import SetSchoolRate from '../Screens/BottomTabScreens/Profile.js/SetSchoolRate';
// import Feed from '../Screens/UploadUniversity/Feed';
// import UploadUniversity from '../Screens/UploadUniversity/UploadUniversity';
// import Comment from '../Screens/UploadUniversity/Comment';

// import SchoolSchedule from '../Screens/Rescheduling/SchoolSchedule';
// import EditSchedule1 from '../Screens/Rescheduling/EditSchedule1';
// import MyLessons from '../Screens/Rescheduling/MyLessons';
// import LessonRescheduled from '../Screens/Rescheduling/LessonRescheduled';
import Splash from '../module/Splash/Splash';
import SignIn from '../module/SignIn/SignIn';
import SignIn2 from '../module/SignIn/SignIn2';
import SignUp from '../module/SignIn/SignUp';
import SignInOptp from '../module/SignIn/SignInOptp';
import FogotPassword from '../module/SignIn/FogotPassword';
import SignInOptpVerfication from '../module/SignIn/SignInOptpVerfication';
import Home from '../module/Home/Home';
import Property from '../module/Property/Property.js';
import PropertyDeatils from '../module/Property/PropertyDeatils.js';
import BannerProperty from '../module/Property/BannerProperty.js';
import MotorProperty from '../module/Property/MotorProperty.js';
import CityProperty from '../module/Property/CityProperty.js';
import PropertyFilter from '../module/Property/PropertyFilter.js';
import CarFilter from '../module/Property/CarFilter';
import BannerCityProperty from '../module/Property/BannerCityProperty.js';
import PostAnAddScreen from '../module/PostAd/PostAnAddScreen';
import PropertyForRentScreen from '../module/PostAd/PropertyForRentScreen';
import PostAnAddStep3 from '../module/PostAd/PostAnAddStep3';
import PostAnAddStepMotor from '../module/PostAd/PostAnAddStepMotor';
import PropertyMotorMap from '../module/Map/PropertyMotorMap';
import Filter from '../../src/module/Filter/Filter';
import AccountInfo from '../module/Profile/AccountInfo';
import Setting from '../module/Profile/Setting';
import MyAlert from '../module/Alert/MyAlert';
import MyWishList from '../module/WishList/MyWishList';
import Chat from '../module/Chat/Chat';
import NewsFeed from '../module/News/NewsFeed';
import NewsDeatils from '../module/News/NewsDeatils';
import ContactUs from '../module/Profile/ContactUs';
import FeedBack from '../module/Profile/FeedBack.js';
import Help from '../module/Profile/Help';
import TermCondidtion from '../module/Profile/TermCondidtion';
import PrivacyPolicy from '../module/Profile/PrivacyPolicy';
import Faq from '../module/Profile/Faq';
import CustomerSupport from '../module/Profile/CustomerSupport';
import MyRequest from '../module/MyRequest/MyRequeast';
import MyRequetpropertymotorListing from '../module/MyRequest/MyRequetpropertymotorListing';
import RequestDeatils from '../module/MyRequest/RequestDeatils';
import RequestDeatilsMotor from '../module/MyRequest/RequestDeatilsMotor';
import ChangePassword from '../module/Profile/ChangePassword';
import {languageChange} from '../module/Profile/languageChange';
const Stack = createNativeStackNavigator(); // Main stack
const Tab = createBottomTabNavigator(); // Bottomtabs
const HomeStack = createNativeStackNavigator();
const AlertStack = createNativeStackNavigator();
const PostStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//const EditStack = createStackNavigator();
//const MessangerStack = createStackNavigator();
//const Tab = createBottomTabNavigator();

function navigation() {
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* <Stack.Screen
          options={{headerShown: false}}
          name={'PropertyDeatils'}
          component={PropertyDeatils}
        /> */}
        <Stack.Screen
          options={{headerShown: false}}
          name={'Splash'}
          component={Splash}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SignIn'}
          component={SignIn}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SignIn2'}
          component={SignIn2}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SignUp'}
          component={SignUp}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SignInOptp'}
          component={SignInOptp}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'FogotPassword'}
          component={FogotPassword}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SignInOptpVerfication'}
          component={SignInOptpVerfication}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Mytab'}
          component={DrawerNavigator}
          // component={MyTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Filter'}
          component={Filter}
          // component={MyTabs}
        />
        {/* <Stack.Screen
          options={{headerShown: false}}
          name={'MyWishList'}
          component={MyWishList}
        
        /> */}
        <Stack.Screen
          options={{headerShown: false}}
          name={'MyAlert'}
          component={MyAlert}
          // component={MyTabs}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'NewsDeatils'}
          component={NewsDeatils}
          // component={MyTabs}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'ContactUs'}
          component={ContactUs}
          // component={MyTabs}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'FeedBack'}
          component={FeedBack}
          // component={MyTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'PropertyMotorMap'}
          component={PropertyMotorMap}
          // component={MyTabs}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'PostAnAddScreen'}
          component={PostAnAddScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'PropertyForRentScreen'}
          component={PropertyForRentScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'PostAnAddStep3'}
          component={PostAnAddStep3}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'PostAnAddStepMotor'}
          component={PostAnAddStepMotor}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'NewsFeed'}
          component={NewsFeed}
          // component={MyTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'AccountInfo'}
          component={AccountInfo}
          // component={MyTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Help'}
          component={Help}
          // component={MyTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'TermCondidtion'}
          component={TermCondidtion}
          // component={MyTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'PrivacyPolicy'}
          component={PrivacyPolicy}
          // component={MyTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'ChangePassword'}
          component={ChangePassword}
          // component={MyTabs}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'Faq'}
          component={Faq}
          // component={MyTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'CustomerSupport'}
          component={CustomerSupport}
          // component={MyTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'MyRequest'}
          component={MyRequest}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'RequestDeatils'}
          component={RequestDeatils}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'RequestDeatilsMotor'}
          component={RequestDeatilsMotor}
        />

        {/* <Stack.Screen
          options={{headerShown: false}}
          name={'EmailAddress'}
          component={EmailAddress}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Password'}
          component={Password}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'YourName'}
          component={YourName}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Personal'}
          component={Personal}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SelectionScreen'}
          component={SelectionScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SchoolRate'}
          component={SchoolRate}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'MyRate'}
          component={MyRate}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SelectInstructionSports'}
          component={SelectInstructionSports}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SetSchoolInstrutor'}
          component={SetSchoolInstrutor}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'EditSchedule'}
          component={EditSchedule}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Repeat'}
          component={Repeat}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'AcceptTerms'}
          component={AcceptTerms}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'AcceptTermsOne'}
          component={AcceptTermsOne}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Welcome'}
          component={Welcome}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Search'}
          component={Search}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'ReportIssue'}
          component={ReportIssue}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SetMyRate'}
          component={SetMyRate}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SetSchoolRate'}
          component={SetSchoolRate}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'ProfileMessanger'}
          component={ProfileMessanger}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Chat'}
          component={Chat}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Feed'}
          component={Feed}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'UploadUniversity'}
          component={UploadUniversity}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'Comment'}
          component={Comment}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SchoolSchedule'}
          component={SchoolSchedule}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'EditSchedule1'}
          component={EditSchedule1}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={'MyLessons'}
          component={MyLessons}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'LessonRescheduled'}
          component={LessonRescheduled}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={'SignUp'}
          component={SignUp}>
          {/* {props => <MyTabs {...props} />} */}
        {/* </Stack.Screen> */}
        {/* <Stack.Screen
          options={{headerShown: false}}
          name={'Mytab'}
          component={MyTabs}
        />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function funHomeStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{headerShown: false}}
        name={'Home'}
        component={Home}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name={'Property'}
        component={Property}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name={'PropertyDeatils'}
        component={PropertyDeatils}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name={'BannerProperty'}
        component={BannerProperty}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name={'MotorProperty'}
        component={MotorProperty}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name={'CityProperty'}
        component={CityProperty}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name={'PropertyFilter'}
        component={PropertyFilter}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name={'CarFilter'}
        component={CarFilter}
      />

      <HomeStack.Screen
        options={{headerShown: false}}
        name={'BannerCityProperty'}
        component={BannerCityProperty}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name={'MyWishList'}
        component={MyWishList}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name={'MyRequetpropertymotorListing'}
        component={MyRequetpropertymotorListing}
      />
    </HomeStack.Navigator>
  );
}

// function alertStack() {
//   return (
//     <AlertStack.Navigator>
//       <AlertStack.Screen
//         options={{headerShown: false}}
//         name={'MyAlert'}
//         component={MyAlert}
//       />
//     </AlertStack.Navigator>
//   );
// }

function FunPostStack() {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        options={{headerShown: false}}
        name={'PostAnAddScreen'}
        component={PostAnAddScreen}
      />
      <PostStack.Screen
        options={{headerShown: false}}
        name={'PropertyForRentScreen'}
        component={PropertyForRentScreen}
      />
      <PostStack.Screen
        options={{headerShown: false}}
        name={'PostAnAddStep3'}
        component={PostAnAddStep3}
      />
    </PostStack.Navigator>
  );
}

// function AccountStack() {
//   return (
//     <EditStack.Navigator>
//       <EditStack.Screen
//         options={{headerShown: false}}
//         name={'EditProfile'}
//         component={EditProfile}
//       />
//       <EditStack.Screen
//         options={{headerShown: false}}
//         name={'FullSearch'}
//         component={FullSearch}
//       />
//     </EditStack.Navigator>
//   );
// }

// function MessangerrStack() {
//   return (
//     <MessangerStack.Navigator>
//       <MessangerStack.Screen
//         options={{headerShown: false}}
//         name={'PeoplelistMessanger'}
//         component={PeoplelistMessanger}
//       />
//       <MessangerStack.Screen
//         options={{headerShown: false}}
//         name={'ProfileMessanger'}
//         component={ProfileMessanger}
//       />
//       <MessangerStack.Screen
//         options={{headerShown: false}}
//         name={'ProfileMessangertabs'}
//         component={ProfileMessangertabs}
//       />
//     </MessangerStack.Navigator>
//   );
// }
const CustomBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      bottom: 20,
      justifyContent: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        borderRadius: 12,
        left: 1,
      }}>
      <Text style={{fontSize: 8, color: 'black', fontWeight: 'bold'}}>12</Text>
    </View>
    <Image
      resizeMode="contain"
      source={
        focused
          ? require('../shared/assests/bottomtabs/bell-1.png')
          : require('../shared/assests/bottomtabs/bell.png')
      }
      style={{
        width: 21,
        height: 21,
      }}
    />
  </TouchableOpacity>
);

function MyTabs() {
  // let popstate = useSelector(state => state.GuestPopup.popup);
  // alert(popstate);
  const dispatch = useDispatch();
  const getUserProfile = async navigation => {
    try {
      const value = await AsyncStorage.getItem('UserDataLogin');
      const token = await JSON.parse(value);
      console.log(token + ' token');
      if (token?.user === 'guest') {
        dispatch(openGuestPopup.openGuestPopup(true));
        //alert('gasg');
      } else {
        navigation.navigate('Alertstack', {name: 'alert'});
        //alert('normal user');
      }
    } catch (e) {
      //console.log(e + ' oama');
      //alert('error');
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="Homestack"
      screenOptions={{headerShown: false}}
      //tabBarOptions={{activeTintColor: 'black'}}
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 7,
        },
      }}>
      <Tab.Screen
        name="Homestack"
        component={funHomeStack}
        options={{
          tabBarLabel: localizedString.homeText,
          tabBarIcon: ({color, size, focused, tintColor}) =>
            // <Image
            //   source={
            focused ? (
              <AIcon name="home" size={23} color="#0989B8" />
            ) : (
              <AIcon name="home" size={23} color="black" />
            ),
          //? require('../shared/assests/bottomtabs/Home.png')
          // : require('../shared/assests/bottomtabs/Home-1.png')
          // require('../shared/assests/bottomtabs/Home.png')
          //   }
          //   style={{
          //     // marginTop: -25,
          //     width: 21,
          //     height: 21,
          //     //color: focused ? 'blue' : 'grey',
          //   }}
          // />

          tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
          },
        }}
      />
      <Tab.Screen
        name="Alertstack"
        component={MyAlert}
        options={{
          tabBarLabel: localizedString.alertsText,
          tabBarIcon: ({color, size, focused, tintColor}) => (
            <>
              {focused ? (
                <MaIcon name="bell-ring" size={23} color="#0989B8" sty />
              ) : (
                <MaIcon name="bell-ring" size={23} color="black" />
              )}
            </>
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            getUserProfile(navigation);
            // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          },
        })}
      />
      <Tab.Screen
        name="posttack"
        component={NewsFeed}
        options={{
          tabBarLabel: localizedString.newsfeedText,
          tabBarIcon: ({color, size, focused}) =>
            // <Image
            //   resizeMode="contain"
            //   source={
            //     //focused
            //     //? require('../assets/userTabActive.png')
            //     // : require('../assets/userTabInActive.png')
            //     focused
            //       ? require('../shared/assests/NewsFeed/newsfeed_1.png')
            //       : require('../shared/assests/NewsFeed/feed.png')
            //   }
            //   style={{
            //     //marginTop: -25,
            //     width: 23,
            //     height: 23,
            //     //fontsize: 35,
            //     //color: focused ? 'blue' : 'red',
            //   }}
            // />
            focused ? (
              <AIcon name="profile" size={22} color="#0989B8" />
            ) : (
              <AIcon name="profile" size={22} color="black" />
            ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate('posttack', {name: 'newstab'}); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          },
        })}
      />

      {/* <Tab.Screen
        name="ChatStack"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={
                //focused
                //? require('../assets/userTabActive.png')
                // : require('../assets/userTabInActive.png')
                focused
                  ? require('../shared/assests/bottomtabs/comment-1.png')
                  : require('../shared/assests/bottomtabs/comment.png')
              }
              style={{
                //marginTop: -25,
                width: 23,
                height: 23,
                // color: focused ? 'blue' : 'red',
                //fontSize: 20,
              }}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: localizedString.profileText,
          tabBarIcon: ({color, size, focused}) =>
            // <Image
            //   source={
            //     //focused
            //     //? require('../assets/userTabActive.png')
            //     // : require('../assets/userTabInActive.png')
            //     focused
            //       ? require('../shared/assests/bottomtabs/user-1.png')
            //       : require('../shared/assests/bottomtabs/user.png')
            //   }
            //   style={{
            //     //marginTop: -25,
            //     width: 20,
            //     height: 20,
            //     // color: focused ? 'blue' : 'red',
            //   }}
            // />

            focused ? (
              <AIcon name="user" size={22} color="#0989B8" />
            ) : (
              <AIcon name="user" size={22} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

// const CustomDrawerStyle = props => {

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <ImageBackground
//         resizeMode="cover"
//         source={require('../shared/assests/drawer/DrawerBg.png')}
//         style={{flex: 1}}>
//         <View
//           style={{
//             height: '10%',
//             width: '100%',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Image
//             style={{height: 40, width: 120, resizeMode: 'contain'}}
//             source={require('../shared/assests/drawer/drawerLogo.png')}
//           />
//         </View>

//         <View
//           style={{
//             height: '20%',
//             width: '100%',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Image
//             source={{
//               uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//             }}
//             style={{
//               height: 80,
//               width: 80,
//               borderRadius: 50,
//               resizeMode: 'cover',
//             }}
//           />
//           <View style={{marginTop: 10}}>
//             <Text
//               style={{
//                 color: colors.white,
//                 fontSize: 15,
//                 fontWeight: '700',
//
//               }}>
//               Musharaf Ahmed
//             </Text>
//           </View>
//           <View
//             style={{
//               marginTop: 5,
//               width: '50%',
//               height: 20,
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text style={{color: colors.white, fontSize: 13, letterSpacing: 1}}>
//               Account Info.
//             </Text>
//             <TouchableOpacity
//               onPress={() => props.navigation.navigate('MyProfile')}>
//               <IoIcon name="chevron-forward" color={colors.blue} size={20} />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <ScrollView style={{marginTop: 50}}>
//           <DrawerItemList {...props} />
//           <TouchableOpacity
//             style={{
//               height: 50,
//               width: '100%',
//               alignItems: 'center',
//               marginLeft: 20,
//               flexDirection: 'row',
//             }}>
//             <MaIcon name="logout" color={colors.blue} />
//             <View style={{marginLeft: 30}}>
//               <Text
//                 style={{color: colors.white, fontSize: 15, fontWeight: 'bold'}}>
//                 Logout
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </ScrollView>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

const DrawerNavigator = () => {
  const dispatch = useDispatch();
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const [isEnabled, setIsEnabled] = useState(false);

  const storeLanguageKey = async value => {
    try {
      //alert('aysnc ' + value);
      await AsyncStorage.setItem('LanguageKey', value);
    } catch (e) {
      //alert('error savng kay');
      // saving error
    }
  };
  const CustomDrawerStyle = props => {
    const Logout = () => {
      //setloading(true);
      //alert('call');
      const userData = {
        DeviceID: DeviceInfo.getUniqueId(),
      };
      logout(userData)
        .then(res => {
          //console.log(' res  osama' + JSON.stringify(res));
          if (res.status === 'success') {
            //setloading(false);
            setLanguage('en');
            _setLanguage('en');
            AsyncStorage.clear();
            props.navigation.replace('SignIn2');
          } else {
            setLanguage('en');
            _setLanguage('en');
            AsyncStorage.clear();
            props.navigation.replace('SignIn2');
          }
        })
        .catch(err => {
          console.log(err);
        });
      // }
    };
    // console.log(
    //   UsereProfileData !== null &&
    //     UsereProfileData !== '' &&
    //     UsereProfileData !== undefined &&
    //     UsereProfileData.name,
    // );
    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          resizeMode="cover"
          source={require('../shared/assests/drawer/DrawerBg.png')}
          style={{flex: 1}}>
          <View
            style={{
              height: '10%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 40, width: 120, resizeMode: 'contain'}}
              source={require('../shared/assests/drawer/drawerLogo.png')}
            />
          </View>

          <View
            style={{
              height: '20%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri:
                  UsereProfileData !== null &&
                  UsereProfileData !== '' &&
                  UsereProfileData !== undefined &&
                  UsereProfileData.logo !== ''
                    ? UsereProfileData.logo
                    : 'https://cdn.imgbin.com/7/15/1/imgbin-computer-icons-user-profile-avatar-french-people-xM6vuY3iWZ6yhbNYaVeX2nvVL.jpg',
              }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 50,
                resizeMode: 'cover',
              }}
            />
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 15,
                  fontWeight: '700',
                  // letterSpacing: 1,
                }}>
                {UsereProfileData !== null &&
                UsereProfileData !== '' &&
                UsereProfileData !== undefined
                  ? UsereProfileData.name
                  : localizedString.guestuser}
              </Text>
            </View>
            {UsereProfileData !== null &&
            UsereProfileData !== '' &&
            UsereProfileData !== undefined ? (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('AccountInfo')}>
                <View
                  style={{
                    marginTop: 5,
                    width: '50%',
                    height: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 13,
                      // letterSpacing: 1,
                    }}>
                    {localizedString.accountInfoText}
                  </Text>

                  <IoIcon
                    name="chevron-forward"
                    color={colors.blue}
                    size={22}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.clear();
                  //props.navigation.replace('SignIn2');
                  setLanguage('en');
                  _setLanguage('en');
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: 'SignIn2'}],
                  });
                }}>
                <View
                  style={{
                    marginTop: 5,
                    width: '50%',
                    height: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 13,
                      // letterSpacing: 1,
                    }}>
                    {localizedString.loginuserText}
                  </Text>

                  <IoIcon
                    name="chevron-forward"
                    color={colors.blue}
                    size={22}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <ScrollView
            style={{marginTop: 40}}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}>
            {/* <DrawerItemList {...props} /> */}
            <TouchableOpacity
              style={{
                height: 45,
                //width: '100%',
                alignItems: 'center',
                //marginLeft: 20,
                marginHorizontal: 20,
                flexDirection: 'row',
                ...RtlStyles.containerRow,
                //backgroundColor: 'red',
              }}
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate('Mytab');
              }}>
              <IoIcon name="home-outline" size={22} color={colors.blue} />
              <View style={{marginHorizontal: 30}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    color: colors.white,
                    textTransform: 'uppercase',
                  }}>
                  {localizedString.homeText}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 45,
                //width: '100%',
                alignItems: 'center',
                //marginLeft: 20,
                marginHorizontal: 20,
                flexDirection: 'row',
                ...RtlStyles.containerRow,
              }}
              onPress={() => {
                props.navigation.closeDrawer();
                //props.navigation.navigate('MyRequest');

                UsereProfileData !== null &&
                UsereProfileData !== '' &&
                UsereProfileData !== undefined
                  ? props.navigation.navigate('MyRequest')
                  : dispatch(openGuestPopup.openGuestPopup(true));
                //navigation.navigate('Alertstack', {name: 'Setting'})
              }}>
              <MaIcon name="dresser" size={22} color={colors.blue} />
              <View style={{marginHorizontal: 30}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    color: colors.white,
                    textTransform: 'uppercase',
                  }}>
                  {localizedString.myrequestsText}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 45,
                //width: '100%',
                alignItems: 'center',
                //marginLeft: 20,
                marginHorizontal: 20,
                flexDirection: 'row',
                ...RtlStyles.containerRow,
              }}
              onPress={() => {
                props.navigation.closeDrawer();

                // props.navigation.navigate('MyWishList');
                UsereProfileData !== null &&
                UsereProfileData !== '' &&
                UsereProfileData !== undefined
                  ? props.navigation.navigate('MyWishList')
                  : dispatch(openGuestPopup.openGuestPopup(true));
              }}>
              <MaIcon name="heart-outline" size={22} color={colors.blue} />
              <View style={{marginHorizontal: 30}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    color: colors.white,
                    textTransform: 'uppercase',
                  }}>
                  {localizedString.wishlistText}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 45,
                //width: '100%',
                alignItems: 'center',
                //marginLeft: 20,
                marginHorizontal: 20,
                flexDirection: 'row',
                ...RtlStyles.containerRow,
              }}
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate('NewsFeed', {name: 'newstab'});
              }}>
              <MaIcon name="newspaper" size={22} color={colors.blue} />
              <View style={{marginHorizontal: 30}}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 12,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  {localizedString.newsfeedText}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 45,
                //width: '100%',
                alignItems: 'center',
                //marginLeft: 20,
                marginHorizontal: 20,
                flexDirection: 'row',
                ...RtlStyles.containerRow,
              }}
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate('Setting');
              }}>
              <IoIcon name="settings-outline" size={25} color={colors.blue} />
              <View style={{marginHorizontal: 30}}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 12,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  {localizedString.settingText}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 45,
                //width: '100%',
                alignItems: 'center',
                //marginLeft: 20,
                marginHorizontal: 20,
                flexDirection: 'row',
                ...RtlStyles.containerRow,
              }}
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate('Help');
              }}>
              <MaIcon name="help" size={22} color={colors.blue} />
              <View style={{marginHorizontal: 30}}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 12,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  {localizedString.helpText}
                </Text>
              </View>
            </TouchableOpacity>

            {UsereProfileData !== null &&
            UsereProfileData !== '' &&
            UsereProfileData !== undefined ? (
              <TouchableOpacity
                style={{
                  height: 45,
                  //width: '100%',
                  alignItems: 'center',
                  //marginLeft: 20,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  ...RtlStyles.containerRow,
                }}
                onPress={() => Logout()}>
                <MaIcon name="logout" size={22} color={colors.blue} />
                <View style={{marginHorizontal: 30}}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 12,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}>
                    {localizedString.logouttext}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}

            <View
              style={{
                width: '100%',
                //height: 100,
                //backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                //marginLeft: 15,
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: 'bold',
                  //marginLeft: 10,
                  marginRight: 5,
                  textTransform: 'uppercase',
                }}>
                EN
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#0989B8'}}
                thumbColor={isEnabled ? '#0989B8' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                style={{marginHorizontal: 3}}
                //style={{width: '50%', height: '50%'}}
                onValueChange={() => {
                  setLanguage(language !== 'ar' ? 'ar' : 'en');
                  //TestFunction();
                  setIsEnabled(!isEnabled);
                  _setLanguage(language !== 'ar' ? 'ar' : 'en');

                  storeLanguageKey(language !== 'ar' ? 'ar' : 'en');
                  dispatch(HomeAction.claearWishLIST());
                  dispatch(
                    citycategoryfeatureFilter.claearallcitiescategoriesandproperties(),
                  );
                  props.navigation.replace('Home');
                }}
                value={isEnabled}
              />
              <Text
                style={{
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: 'bold',
                  //marginLeft: 1,
                  textTransform: 'uppercase',
                }}>
                AR
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  };
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerStyle}
      initialRouteName="dashboard"
      headerMode={false}
      screenOptions={{
        drawerItemStyle: {
          backgroundColor: 'red',
          //...RtlStyles.containerRowInverse,
          height: 60,
        },
      }}>
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => (
            <IoIcon name="home-outline" size={25} color={colors.blue} />
          ),
          drawerLabel: () => (
            <Text
              style={{fontWeight: 'bold', fontSize: 15, color: colors.white}}>
              {localizedString.homeText}
            </Text>
          ),
        }}
        name="dashboard"
        component={MyTabs}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => (
            <MaIcon name="heart-outline" size={25} color={colors.blue} />
          ),
          drawerLabel: () => (
            <Text
              style={{fontWeight: 'bold', fontSize: 15, color: colors.white}}>
              {localizedString.myrequestsText}
            </Text>
          ),
        }}
        name="My Request"
        component={MyWishList}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => (
            <MaIcon name="newspaper" size={25} color={colors.blue} />
          ),
          drawerLabel: () => (
            <Text
              style={{fontWeight: 'bold', fontSize: 15, color: colors.white}}>
              {localizedString.newsfeedText}
            </Text>
          ),
        }}
        name="News Feed"
        component={NewsFeed}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => (
            <IoIcon name="settings-outline" size={25} color={colors.blue} />
          ),
          drawerLabel: () => (
            <Text
              style={{fontWeight: 'bold', fontSize: 15, color: colors.white}}>
              {localizedString.settingText}
            </Text>
          ),
        }}
        name="Setting"
        component={Setting}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => (
            <IoIcon name="settings-outline" size={25} color={colors.blue} />
          ),
          drawerLabel: () => (
            <Text
              style={{fontWeight: 'bold', fontSize: 15, color: colors.white}}>
              {localizedString.helpText}
            </Text>
          ),
        }}
        name="Help"
        component={Help}
      />

      {/* <Drawer.Screen
        options={{
          drawerIcon: () => (
            <IoIcon name="lock-closed-outline" size={25} color={colors.blue} />
          ),
          drawerLabel: () => (
            <Text
              style={{fontWeight: 'bold', fontSize: 15, color: colors.white}}>
              Logout
            </Text>
          ),
        }}
        name="Logout"
        component={Home}
      /> */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 23,
  },
  img: {
    height: 80,
    width: 80,
  },
  profiletab: {
    height: 100,
    width: 100,
  },
});

export default navigation;
