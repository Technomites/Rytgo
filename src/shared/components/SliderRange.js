//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// create a component
const SliderRange = props => {
  // const [count, setCount] = useState(0);
  //alert(props.initialvalue[0]);
  //console.log(props.maxprice + ' max-----');
  return (
    <View
      style={{
        width: '93%',
        // backgroundColor: 'red',
        height: 90,
        marginLeft: 8,
        // height: 41,
        // backgroundColor: 'yellow',
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginTop: 10,
      }}>
      <View
        style={{
          width: '100%',
          // height: '79%',
          flexDirection: 'row',
          // backgroundColor: 'red',
        }}>
        <Text
          style={{
            color: '#191919',
            fontSize: 14,
            marginTop: 5,
            fontFamily: 'Inter-SemiBold',
            // backgroundColor: 'yellow',
          }}>
          {props.title}
        </Text>
        <View
          style={{
            // justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: '87%',
            marginTop: 9,
            // marginBottom: 15,
          }}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Inter-SemiBold',
              color: '#0989B8',
              // marginBottom: 10,
            }}>
            {/* {'Range(' + props.range[0] + ',' + props.range[1] === 0
              ? props.maxprice
              : props.range[1] + ')'} */}

            {`Range( ${props.range[0]} - ${props.range[1] === 0 ? props.maxprice : props.range[1]
              } )`}
          </Text>
        </View>
        {/* <View
          style={{
            width: '100%',
            flexDirection: 'row',
          
            marginBottom: 10,

          }}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Inter-SemiBold',
              color: '#0989B8',
              marginLeft: 4,
            }}>
          </Text> */}
        {/* <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              width: '88%',
              // marginBottom: 15,
            }}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Inter-SemiBold',
                color: '#0989B8',
                // marginBottom: 10,
              }}>
              Range (100 -300)
            </Text>
          </View> */}
        {/* </View> */}
      </View>
      <MultiSlider
        // onValuesChangeStart={true}
        // onValuesChangeFinish={true}
        // enabledTwo={true}
        step={1000}
        onValuesChangeFinish={val => {
          // console.log(val);
          props.onchange(val);
        }}
        // showStepMarkers={true}
        // showSteps-={true}
        showStepLabels={true}
        isMarkersSeparated={true}
        sliderLength={Dimensions.get('window').width / 1.23}
        min={0}
        max={props.maxprice} //props.maxprice
        smoothSnapped={true}
        // snapped
        containerStyle={{
          height: 15,
          marginTop: 6,
          // backgroundColor: 'red',

          // backgroundColor: 'red',
        }}
        markerStyle={{
          backgroundColor: '#0989B8',
          height: 14,
          width: 14,
        }}
        trackStyle={{
          height: 3,
          // backgroundColor: 'white',
        }}
        selectedStyle={{
          backgroundColor: '#0989B8',
        }}
        values={[props.initialvalue[0], props.initialvalue[1]]}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          //backgroundColor: 'red',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <View
          style={{
            height: 35,
            width: 110,
            backgroundColor: '#0989B810',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginLeft: 4,
              fontFamily: 'Inter-Medium',
              color: '#0989B8',
              fontSize: 12,
            }}>
            {props.name}
          </Text>
          <Text
            style={{
              marginLeft: 4,
              fontFamily: 'Inter-Medium',
              color: '#0989B8',
              fontSize: 12,
            }}>
            {props.range[0]}
          </Text>
        </View>
        <View
          style={{
            height: 35,
            width: 110,
            backgroundColor: '#0989B810',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginLeft: 4,
              fontFamily: 'Inter-Medium',
              color: '#0989B8',
              fontSize: 12,
            }}>
            {props.name}
          </Text>
          <Text
            style={{
              marginLeft: 4,
              fontFamily: 'Inter-Medium',
              color: '#0989B8',
              fontSize: 12,
            }}>
            {props.range[1] === 0 ? props.maxprice : props.range[1]}
          </Text>
        </View>
      </View>
    </View>
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
export default SliderRange;
