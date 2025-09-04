import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';

const PostAnAddScreen = props => {
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: colors.bgGray}}>
      <ScrollView style={{height: '100%', width: '100%'}}>
        <BackHeader
          title="Create a Request"
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
                backgroundColor: colors.gray,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.gray,
                borderRadius: 10,
              }}></View>
          </View>

          <View
            style={{
              height: '70%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 20, color: colors.black, fontWeight: 'bold'}}>
              What are you listing?
            </Text>
            <Text style={{fontSize: 15, color: 'gray', fontWeight: '400'}}>
              Select one of the option
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{width: '90%'}}>
            {/* RENT TILE */}
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('PropertyForRentScreen', {
                  name: 'Property',
                  forsale: 0,
                })
              }
              style={Styles.tileContainer}>
              <View
                style={{
                  height: '100%',
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 50, width: 50, resizeMode: 'contain'}}
                  source={require('../../shared/assests/postad/addrent.png')}
                />
              </View>
              <View
                style={{
                  height: '100%',
                  width: '70%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.black,
                    fontSize: 15,
                  }}>
                  Property For Rent
                </Text>
              </View>
            </TouchableOpacity>

            {/* RENT TILE */}
            <TouchableOpacity
              style={Styles.tileContainer}
              onPress={() =>
                props.navigation.navigate('PropertyForRentScreen', {
                  name: 'Property',
                  forsale: 1,
                })
              }>
              <View
                style={{
                  height: '100%',
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 50, width: 50, resizeMode: 'contain'}}
                  source={require('../../shared/assests/postad/addBui.png')}
                />
              </View>
              <View
                style={{
                  height: '100%',
                  width: '70%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.black,
                    fontSize: 15,
                  }}>
                  Property For Sale
                </Text>
              </View>
            </TouchableOpacity>

            {/* RENT TILE */}
            <TouchableOpacity
              style={Styles.tileContainer}
              onPress={() =>
                props.navigation.navigate('PropertyForRentScreen', {
                  name: 'Motor',
                  forsale: 2,
                })
              }>
              <View
                style={{
                  height: '100%',
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 50, width: 50, resizeMode: 'contain'}}
                  source={require('../../shared/assests/postad/adCar.png')}
                />
              </View>
              <View
                style={{
                  height: '100%',
                  width: '70%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.black,
                    fontSize: 15,
                  }}>
                  Motors
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tileContainer: {
    height: 80,
    width: '100%',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default PostAnAddScreen;
