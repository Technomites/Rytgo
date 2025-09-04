import React, {useEffect} from 'react';
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
  Dimensions,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyRequestRent from '../module/MyRequest/MyRequestRent';
import MyRequestSale from '../module/MyRequest/MyRequestSale';
import MyRequestMotor from '../module/MyRequest/MyRequestMotor';
import MotorListingRequest from '../module/MyRequest/MotorListingRequest';
import PropertRentListingRequest from '../module/MyRequest/PropertRentListingRequest';
import PropertSaleListingRequest from '../module/MyRequest/PropertSaleListingRequest';
import {localizedString} from '../shared/localization/localization';
const TopTab = createMaterialTopTabNavigator();
export function RequestabNavigator(props) {
  return (
    <>
      <TopTab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {
            fontSize: 13,
            color: '#141414',
            fontFamily: 'Inter-Bold',
            textTransform: 'none',
            flexShrink: 1,
            textAlign: 'center',
            marginLeft: 13,
            marginTop: 14,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#0989B8',
            height: 4,
          },

          tabBarStyle: {backgroundColor: '#F6F8F9'},
          tabBarItemStyle: {
            flexDirection: 'row',
            width: 200,
            height: 65,
            marginHorizontal: 1,
          },
        }}>
        <TopTab.Screen
          name="MyRequestRent"
          component={MyRequestRent}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 30, height: 30}}
                source={require('../shared/assests/home/Rent.png')}
              />
            ),
            tabBarLabel: localizedString.requestPropertyText,
          }}
        />
        <TopTab.Screen
          name="MyRequestSale"
          component={MyRequestSale}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 30, height: 30}}
                source={require('../shared/assests/home/Sale.png')}
              />
            ),
            tabBarLabel: localizedString.requestSaleText,
          }}
        />

        <TopTab.Screen
          name="Motor"
          component={MyRequestMotor}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 30, height: 30}}
                source={require('../shared/assests/home/Motor.png')}
              />
            ),

            tabBarLabel: localizedString.requestMotorText,
          }}
        />
      </TopTab.Navigator>
    </>
  );
}

export function ListingabNavigator(props) {
  //console.log(props?.IsMotor);
  console.log(props?.IsProperty);
  return (
    <>
      <TopTab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {
            fontSize: 12,
            color: '#141414',
            fontFamily: 'Inter-Bold',
            textTransform: 'none',
            flexShrink: 1,
            textAlign: 'center',
            marginLeft: 13,
            marginTop: 14,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#0989B8',
            height: 4,
          },

          tabBarStyle: {backgroundColor: '#F6F8F9'},
          tabBarItemStyle: {
            flexDirection: 'row',
            width: 200,
            height: 61,
            marginHorizontal: 1,
          },
          tabBarItemStyle: {
            flexDirection: 'row',
            width: props?.IsProperty
              ? Dimensions.get('window').width * 0.5
              : Dimensions.get('window').width * 1,
            // width:"25%",
            // height: 50,
            marginHorizontal: 1,
          },
        }}>
        {props?.IsProperty === false ? null : (
          <>
            <TopTab.Screen
              name="MyRequestRent"
              component={PropertRentListingRequest}
              initialParams="Home Params"
              options={{
                tabBarIcon: ({color}) => (
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../shared/assests/home/Rent.png')}
                  />
                ),
                tabBarLabel: localizedString.requestlistingPropertyText,
              }}
            />
            <TopTab.Screen
              name="MyRequestSale"
              component={PropertSaleListingRequest}
              //initialParams="Home Params"
              options={{
                tabBarIcon: ({color}) => (
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../shared/assests/home/Sale.png')}
                  />
                ),
                tabBarLabel: localizedString.requestlistingSaleText,
              }}
            />
          </>
        )}

        {props?.IsMotor === false ? null : (
          <TopTab.Screen
            name="Motor"
            component={MotorListingRequest}
            options={{
              tabBarIcon: ({color}) => (
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../shared/assests/home/Motor.png')}
                />
              ),

              tabBarLabel: localizedString.motortabTex,
            }}
          />
        )}
      </TopTab.Navigator>
    </>
  );
}
