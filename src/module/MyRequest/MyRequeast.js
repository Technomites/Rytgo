import React from 'react';
import {View, SafeAreaView} from 'react-native';
import BackHeader from '../../shared/components/BackHeader';
import {RequestabNavigator} from '../../navigation/TopTabs';
import {colors} from '../../shared/themes/theme';
import HorizontalLine from '../../shared/components/HorizontalLine';
import {localizedString} from '../../shared/localization/localization';

const MyRequest = props => {
  return (
    <SafeAreaView
      style={{height: '100%', backgroundColor: '#F6F8F9', width: '100%'}}>
      <BackHeader
        title={localizedString.myrequestsText}
        onPress={() => props.navigation.goBack()}
      />
      <HorizontalLine />
      <RequestabNavigator />
    </SafeAreaView>
  );
};

export default MyRequest;
