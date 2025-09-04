import React, {Component, useEffect, useState, useRef} from 'react';
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
import {FilterAllfaeturedMotors} from '../../shared/ApiMiddleware/api';
import FeaturedMotor from '../../shared/components/FeaturedMotor';
import Loader from '../../shared/components/Loader';
import {useSelector} from 'react-redux';

// create a component
const MotorListingRequest = ({navigation, route}) => {
  //   const {name} = route.params;
  //console.log(route.params);
  const vendorId = useSelector(state => state.VendorId.vendorid);
  // console.log(VENDORiD);
  const [CarDataa, setCarDataa] = useState([]);
  const [loading, setloading] = useState(false);
  const [offset, setoffset] = useState(0);

  function LoadMoreData() {
    setoffset(offset + 1);
  }
  const Carfilter = () => {
    let carData = {};
    carData = {
      Skip: offset * 40,
      PageSize: 40,
      VendorId: vendorId,
    };

    FilterAllfaeturedMotors(carData)
      .then(res => {
        if (res.status === 'success') {
          setloading(false);
          setCarDataa([...CarDataa, ...res.data]);
        } else {
          setloading(false);
          alert('error');
        }
      })
      .catch(err => {
        setloading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //setloading(true);
      Carfilter('');
    });
    const subscribe = navigation.addListener('blur', () => {
      //alert('call blur');
      setoffset(0);
    });
    return () => {
      // dispatch(Filteraction.setPaginationCount(0));
      setoffset(0);
      //alert('123');
      unsubscribe, subscribe;
    };
  }, []);

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    //setloading(true);
    Carfilter('');
    // });
    //return unsubscribe;
  }, [offset]);

  const NavigateToPropertyDeatilsScreen = (id, name) => {
    navigation.push('PropertyDeatils', {
      id: id,
      name: name,
    });
  };

  return (
    <View style={styles.container}>
      <Loader show={loading} />
      <>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={CarDataa}
          bounces={false}
          //extraData={CarDataa}
          style={{width: '98%'}}
          numColumns={2}
          legacyImplementation={true}
          updateCellsBatchingPeriod={90}
          removeClippedSubviews={true}
          maxToRenderPerBatch={50}
          windowSize={70}
          renderItem={({item, i}) => (
            <FeaturedMotor
              key={i}
              // onClick={() => NavigateToPropertyDeatilsScreen(item.id, 'Car')}
              conatinerStyle={{
                width: '48%',
                marginTop: 8,
                marginBottom: 4,
                marginLeft: 10,
              }}
              item={item}
              onClick={() =>
                NavigateToPropertyDeatilsScreen(item.id, 'Motor')
              }></FeaturedMotor>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd < 0) return;
            LoadMoreData();
          }}
          onEndReachedThreshold={0.1}
        />
        {/* <Text></Text> */}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // justifyContent: 'center',
    //alignItems: 'center',
    width: '100%',

    backgroundColor: '#F1F3F5',
  },
});

export default MotorListingRequest;
