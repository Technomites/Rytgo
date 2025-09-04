//import liraries
import React, {Component, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {FeeddBlogDeatils} from '../../shared/ApiMiddleware/api';
import {localizedString} from '../../shared/localization/localization';
import AIcon from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const NewsDeatils = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  const refVideo = useRef();
  const {id} = props.route.params;
  const [deatils, setdeatils] = useState({});
  const [playVideo, setplayVideo] = useState(true);

  useEffect(() => {
    FeeddBlogDeatils(id)
      .then(res => {
        if (res.status === 'success') {
          setdeatils(res.newsfeed);
          console.log(res.newsfeed);
        } else {
          //console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const PlayVideo = () => {
    setplayVideo(false);
  };

  const ResetVideo = () => {
    refVideo.current.seek(0);
    setplayVideo(true);
  };
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: colors.bgGray}}>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}>
        {/* <SafeAreaView style={{flex: 1, backgroundColor: colors.bgGray}}> */}
        <BackHeader
          title={localizedString.newsText}
          onPress={() => props.navigation.goBack()}
        />
        <View
          style={{
            width: '100%',
            flex: 1,
            padding: 13,
            //backgroundColor: 'red',
          }}>
          <View
            style={{
              width: '100%',
            }}>
            {playVideo === false ? (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Video
                  resizeMode="cover"
                  paused={playVideo}
                  ref={refVideo}
                  style={{
                    //aspectRatio: 100,
                    height: 180,
                    width: '100%',
                    //borderRadius: 8,
                    //marginTop: 10,
                    //marginBottom: 20,
                  }}
                  source={{
                    uri: deatils.video,
                  }}
                  onEnd={() => ResetVideo()}
                  //style={{flex: 1}}
                  // controls={true}
                />
              </View>
            ) : (
              <ImageBackground
                //resizeMode="cover"
                style={{
                  width: '100%',
                  height: 180,
                }}
                imageStyle={
                  {
                    //borderRadius: 8,
                  }
                }
                source={{uri: deatils.bannerImage}}
              />
            )}

            {deatils.video !== '' && playVideo === true ? (
              <View
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  //borderRadius: 6,
                  bottom: 0,
                  right: 0,
                  top: 70,
                  left: 160,
                  //backgroundColor: '#0989B8',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => PlayVideo()}>
                  <Image
                    style={{width: 50, height: 50}}
                    resizeMode="cover"
                    source={require('../../shared/assests/propertydeatils/play.png')}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            <Text
              style={{
                color: '#191919',
                fontSize: 17,
                fontFamily: 'Inter-Bold',
                marginTop: 14,
                textAlign: isRtl ? 'right' : 'left',
              }}>
              {deatils.title}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 4}}>
              {/* <Image
                resizeMode="contain"
                style={{marginTop: 2}}
                source={require('../../shared/assests/NewsFeed/date.png')}
              /> */}
              <AIcon name="calendar" size={12} color="#0989B8" />
              <Text
                style={{
                  color: '#989898',
                  fontSize: 12,
                  marginLeft: 4,
                  //marginBottom: 12,
                }}>
                {deatils.createdOn?.split('T')[0]}
              </Text>
            </View>
            <View style={{marginTop: 12}}>
              <Text
                style={{
                  color: '#989898',
                  fontFamily: 'Inter-SemiBold',
                  fontSize: 13,
                  lineHeight: 26,
                  textAlign: isRtl ? 'right' : 'justify',
                }}>
                {deatils.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
export default NewsDeatils;
