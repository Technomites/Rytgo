//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';
import {WebView} from 'react-native-webview';
import Loader from '../../shared/components/Loader';
import {localizedString} from '../../shared/localization/localization';
import {accessToken, languagee} from '../../shared/Constant/Constant';

// create a component
const TermCondidtion = props => {
  const {heading, url} = props.route.params;
  const [loading, setloading] = useState(true);
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: '#F6F8F9'}}>
      <BackHeader title={heading} onPress={() => props.navigation.goBack()} />
      <WebView
        source={{
          uri: url + '&Lang=' + languagee,
        }}
        injectedJavaScript={`document.querySelector('.nofixed').style.display = 'none'`}
        onLoadStart={() => setloading(true)}
        onLoad={() => setloading(false)}
      />
      <Loader show={loading} />
      {/* <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center', color: 'black', fontSize: 16}}>
          No Data
        </Text>
      </View> */}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default TermCondidtion;
