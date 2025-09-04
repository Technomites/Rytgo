import React from 'react';
import {View, SafeAreaView, Text, Image} from 'react-native';
import BackHeader from '../../shared/components/BackHeader';
import {RequestabNavigator, ListingabNavigator} from '../../navigation/TopTabs';
import {colors} from '../../shared/themes/theme';
import HorizontalLine from '../../shared/components/HorizontalLine';
import {localizedString} from '../../shared/localization/localization';

const MyRequetpropertymotorListing = props => {
  const {name, image, isProperty, isMotor} = props.route.params;
  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#F6F8F9',
        width: '100%',
        position: 'relative',
      }}>
      <BackHeader
        title=""
        onPress={() => props.navigation.goBack()}
        containerStyle={{height: 76, backgroundColor: '#F1F3F5', zindex: 0}}
      />
      <HorizontalLine />
      <View
        style={{
          zindex: 10,
          backgroundColor: 'white',
          width: '100%',
          height: 88,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{
            uri: image,
          }}
          style={{
            height: 77,
            width: 77,
            borderRadius: 77 / 2,
            resizeMode: 'cover',
            position: 'absolute',
            bottom: 60,
          }}
        />
        <View
          style={{
            marginTop: 18,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{color: '#191919', fontSize: 13, fontFamily: 'Inter-Bold'}}>
            {name}
          </Text>
          <Text
            style={{
              color: '#19191940',
              fontSize: 13,
              fontFamily: 'Inter-Bold',
            }}>
            {localizedString.vendorText}
          </Text>
        </View>
      </View>
      <ListingabNavigator IsProperty={isProperty} IsMotor={isMotor} />
    </SafeAreaView>
  );
};

export default MyRequetpropertymotorListing;
