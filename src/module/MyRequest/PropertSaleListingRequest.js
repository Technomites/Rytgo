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
import {FilterAllfaeturedProperty} from '../../shared/ApiMiddleware/api';
import FeaturedProperty from '../../shared/components/FeaturedProperty';
import Loader from '../../shared/components/Loader';
import {useSelector} from 'react-redux';

// create a component
const PropertSaleListingRequest = ({navigation, route}) => {
  //   const {name} = route.params;
  //console.log(route.params);
  const vendorId = useSelector(state => state.VendorId.vendorid);
  // console.log(VENDORiD);
  const [propertDataa, setpropertDataa] = useState([]);
  const [loading, setloading] = useState(false);
  const [offset, setoffset] = useState(0);

  function LoadMoreData() {
    setoffset(offset + 1);
  }
  const Propertyfilter = () => {
    let propertyData = {};
    propertyData = {
      Skip: offset * 40,
      PageSize: 40,
      VendorId: vendorId,
      ForSale: true,
    };

    FilterAllfaeturedProperty(propertyData)
      .then(res => {
        if (res.status === 'success') {
          setloading(false);
          setpropertDataa([...propertDataa, ...res.data]);
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
      // setloading(true);
      Propertyfilter('');
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
    Propertyfilter('');
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
          bounces={false}
          data={propertDataa}
          //extraData={CarDataa}
          style={{width: '98%'}}
          numColumns={2}
          legacyImplementation={true}
          updateCellsBatchingPeriod={90}
          removeClippedSubviews={true}
          maxToRenderPerBatch={50}
          windowSize={70}
          renderItem={({item, i}) => (
            <FeaturedProperty
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
                NavigateToPropertyDeatilsScreen(item.id, 'Property')
              }></FeaturedProperty>
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

export default PropertSaleListingRequest;
