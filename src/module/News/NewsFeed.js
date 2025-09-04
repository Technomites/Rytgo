//import liraries
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';
import FlatButton from '../../shared/components/FlatButton';
import NewsCard from '../../shared/components/NewsCard';
import {GetAllBlogs} from '../../shared/ApiMiddleware/api';
import {localizedString} from '../../shared/localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
// create a component
var screenname = '';
const NewsFeed = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  const [offsetproperty, setOffsetproperty] = useState(1);
  const [myNewsFeedData, setmyNewsFeedData] = useState([]);
  const notInitialRendeproperty = useRef(false);
  const NavigateToNewsDeatils = id => {
    props.navigation.navigate('NewsDeatils', {
      id: id,
    });
  };

  if (props.route.params === undefined) {
  } else {
    const {name} = props.route.params;
    screenname = name;
    //console.log(props.route.params.name);
  }
  function LoadMoreNewsFeed() {
    setOffsetproperty(offsetproperty + 1);
  }
  useEffect(() => {
    //User Profile && notofication count
    const unsubscribe = props.navigation.addListener('focus', () => {
      setmyNewsFeedData([]);
      setOffsetproperty(1);
    });
    const subscribe = props.navigation.addListener('blur', () => {
      setmyNewsFeedData([]);
      setOffsetproperty(10000000);
    });
    return unsubscribe, subscribe;
  }, []);

  useEffect(() => {
    GetAllBlogs(offsetproperty, 5)
      .then(res => {
        if (res.status === 'success') {
          setmyNewsFeedData([...myNewsFeedData, ...res.newsfeeds]);
        } else {
          //seterrorValidation(res.error + '.No user found');
          // console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [offsetproperty]);

  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: colors.bgGray}}>
      <BackHeader
        title={localizedString.newsfeedText}
        onPress={() => {
          screenname === 'newstab'
            ? props.navigation.goBack()
            : props.navigation.navigate('Setting');
          screenname = '';
        }}
      />
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={myNewsFeedData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, i}) => (
          <View
            style={{
              width: '100%',
              //backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <NewsCard
              key={i}
              item={item}
              readmore={localizedString.readmoreText}
              onClick={() => {
                //alert(item.id);
                NavigateToNewsDeatils(item.id);
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => LoadMoreNewsFeed()}
        onEndReachedThreshold={0.1}
      />
      <View
        style={{
          width: '100%',
          //backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text></Text>
      </View>
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

export default NewsFeed;
