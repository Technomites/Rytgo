import React from 'react';
import {View, Text} from 'react-native';
import {localizedString} from '../../shared/localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

const languageChange = () => {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const languageChange = () => {
    setLanguage(language !== 'ar' ? 'ar' : 'en');
  };
};

export default languageChange;
