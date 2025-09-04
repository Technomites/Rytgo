import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../themes/theme';
import IoIcon from './Icon/IoIcon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {localizedString} from '../localization/localization';

const PopUpModel = props => {
  return (
    // <View style={styles.centeredView}>
    //   <Modal animationType="fade" transparent={true} visible={props.visible}>
    //     <View
    //       style={{
    //         flex: 1,
    //         backgroundColor: '#00000059',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <View
    //         style={{
    //           height: '30%',
    //           width: '90%',
    //           backgroundColor: colors.white,
    //           borderRadius: 10,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}>
    //         <View
    //           style={{
    //             height: '20%',
    //             width: '100%',
    //             backgroundColor: colors.blue,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderTopStartRadius: 10,
    //             borderTopEndRadius: 10,
    //           }}>
    //           <Text
    //             style={{color: colors.white, fontSize: 15, fontWeight: 'bold'}}>
    //             Message
    //           </Text>
    //         </View>

    //         <View
    //           style={{
    //             height: '50%',
    //             width: '100%',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderTopStartRadius: 10,
    //             borderTopEndRadius: 10,
    //           }}>
    //           <Text
    //             style={{color: colors.black, fontSize: 15, fontWeight: '600'}}>
    //             {props.message}
    //           </Text>
    //         </View>

    //         <View style={{height: '30%', width: '80%', alignItems: 'center'}}>
    //           <TouchableOpacity
    //             onPress={props.onPress}
    //             style={{
    //               height: 40,
    //               width: 100,
    //               backgroundColor: colors.blue,
    //               borderRadius: 10,
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //             }}>
    //             <Text style={{fontWeight: 'bold', color: colors.white}}>
    //               OK
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View>
    //   </Modal>
    // </View>

    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000059',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '36%',
              width: '83%',
              backgroundColor: colors.white,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {props.Success === true ? (
              <IoIcon name="checkmark-circle" size={56} color={colors.blue} />
            ) : (
              <FontAwesome5 name="exclamation" size={50} color={colors.blue} />
            )}

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
                marginTop: 18,
              }}>
              {props.Success === true
                ? localizedString.successText
                : localizedString.oppsText}
            </Text>
            <TouchableOpacity style={{width: '90%'}} onPress={props.onPress}>
              <Text
                style={{
                  // fontWeight: '600',
                  fontSize: 12,
                  color: 'black',
                  marginTop: 1,
                  textAlign: 'center',
                  // fontWeight: 'bold',
                }}>
                {props.message}
              </Text>
            </TouchableOpacity>
            <View style={{width: '90%', marginTop: 13}}>
              <TouchableOpacity
                onPress={props.onPress}
                style={{
                  height: 47,
                  width: '100%',
                  backgroundColor: colors.blue,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.white,
                    textTransform: 'uppercase',
                  }}>
                  {props.btntext}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity onPress={props.onPress}>
                <Text
                  style={{
                    // fontWeight: '600',
                    fontSize: 14,
                    color: colors.gray,
                    marginTop: 6,
                    // fontWeight: 'bold',
                  }}>
                  {props.message}
                </Text>
              </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default PopUpModel;
