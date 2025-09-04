//import liraries
import React, {Component} from 'react';
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
import FlatButton from '../../shared/components/FlatButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {localizedString} from '../../shared/localization/localization';

// create a component
const CityProperty = ({navigation, route}) => {
  const TRENDINGDATA = [
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      image: require('../../shared/assests/property/Rectangle1881.png'),
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const Trendinglist = () => {
    return TRENDINGDATA.map((element, i) => {
      return (
        <FeaturedProperty
          key={i}
          onClick={NavigateToPropertyDeatilsScreen}
          conatinerStyle={{width: '45%', marginTop: 8}}
          item={element}></FeaturedProperty>
      );
    });
  };
  const NavigateToPropertyDeatilsScreen = () => {
    navigation.navigate('PropertyDeatils');
  };
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{backgroundColor: '#F1F3F5'}}>
        <View style={styles.topContainer}>
          <View style={styles.topHeader}>
            <TouchableOpacity
              //style={{height: 80, width: 80, backgroundColor: 'red'}}
              onPress={() => navigation.goBack()}>
              <Image
                resizeMode="cover"
                style={{marginLeft: 30}}
                source={require('../../shared/assests/Profile/arrow.png')}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '73%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#191919',
                  fontFamily: 'Inter-Bold',
                  fontSize: 18,
                }}>
                Vechile List
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              //flexDirection: 'row',
              //backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <Banner image="https://png.pngtree.com/png-clipart/20200727/original/pngtree-modern-website-abstract-banner-png-image_5363605.jpg" />
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-around',
              //flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <SearchBar
              placeholder={localizedString.perfectmotorText}
              onPress={() => console.log('sjdds')}
              onChangeText={text => console.log(text)}
              style={{
                borderRadius: 7,
                height: 50,
                borderColor: '#19191933',
                backgroundColor: '#F6F8F9',
                borderWidth: 1,
                width: '84%',
              }}
              placeholderTextColor="#19191940"
              textInputStyle={{fontSize: 15}}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            //backgroundColor: 'red',
            marginTop: 12,
          }}>
          {Trendinglist()}
        </View>
      </ScrollView>

      <View
        style={{
          width: 60,
          height: 60,
          position: 'absolute',
          borderRadius: 6,
          bottom: 4,
          right: 4,
          backgroundColor: '#0989B8',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name="filter" size={30} color="white" />
      </View>
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
});

export default CityProperty;
