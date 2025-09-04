import React, {Component, createRef} from 'react';
import {View, Image, StyleSheet, TextInput} from 'react-native';
import {colors, fontSize, spacing, shadow} from '../themes/theme';
import DerivedText from '../components/DerivedText';

type Props = {
  inputType: 'email' | 'password' | 'text',
};

export default class Input extends Component<Props> {
  static defaultProps = {
    source: '',
    textInputProps: null,
    placeholder: '',
  };

  textInput = createRef();

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false,
      isFocus: false,
    };
  }

  getValue = () => {
    const {value} = this.state;
    return value;
  };

  focus = () => {
    this.textInput.current?.focus();
  };

  setValue = value => {
    this.setState({value});
  };

  causeError = () => {
    this.setState({error: true});
    this.timeout = setTimeout(() => {
      this.setState({error: false});
      clearTimeout(this.timeout);
    }, 4000);
  };

  render() {
    const {props, state} = this;

    let alteredProps = {
      keyboardType: 'default',
      textContentType: 'none',
    };
    if (props.inputType === 'email')
      alteredProps = {
        keyboardType: 'email-address',
        // textContentType: 'emailAddress',
        autoCapitalize: 'none',
      };
    else if (props.inputType === 'password')
      alteredProps = {
        keyboardType: 'default',
        textContentType: 'password',
      };
    else if (props.inputType === 'contact')
      alteredProps = {
        keyboardType: 'numeric',
      };
    // console.log(props.textInputProps);
    return (
      <>
      <View style={{...styles.heading,...props.heading}}>
      {props.headingtxt && <DerivedText>{props.headingtxt}</DerivedText>}
      </View>
      <View
        style={[
          styles.view,
          state.error
            ? {
                borderWidth: 1,
                borderColor: colors.error,
                borderRadius: 10,
              }
            : {},
          {
            borderColor: state.isFocus
              ? colors.primary
              : props.isLight
              ? colors.primaryOpacity
              : colors.backgroundDark,
          },
          props.style,
        ]}>
   
        <View style={{flex: 1, paddingVertical: 6}}>
          {/* {props.placeholder ? (
            <DerivedText
              style={{
                fontSize: fontSize.text,
                color: state.error ? colors.error : colors.primary,
                fontFamily: '-SemiBold',
                marginLeft: 3,
                // opacity: state.error ? 1 : 0.4,
                // textTransform: 'uppercase',
                // ...RTLStyles.text,
              }}>
              {props.placeholder}
            </DerivedText>
          ) : null} */}
   
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* {props.placholder && <DerivedText>{props.placholder}</DerivedText>} */}
            <TextInput
              ref={this.textInput}
              placeholder={props.placeholdertxt}
              style={[
                styles.input,
                props.inputStyle,
                // RTLStyles.text,
                //   props.textInputProps.multiline ? {textAlignVertical: 'top'} : {},
              ]}
              value={state.value}
              placeholderTextColor={props.placeholderTextColor}
              onChangeText={text => {
                this.setState({value: text});
              }}
              keyboardType={alteredProps.keyboardType}
              textContentType={alteredProps.textContentType}
              secureTextEntry={props.inputType === 'password'}
              // eslint-disable-next-line
              onFocus={() => {
                this.setState({isFocus: true});
              }}
              onBlur={() => this.setState({isFocus: false})}
              {...props.textInputProps}
            />
          </View>
        </View>
        {props.source !== '' && (
          <View
            style={{
              width: global.isTablet ? '4%' : '7%',
              aspectRatio: 1,
              // marginRight: 18,
            }}>
            {props.source && (
              <Image
                style={styles.image}
                source={props.source}
                resizeMode="contain"
              />
            )}
          </View>
        )}
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: colors.background,
  },
  heading:{
   width:"100%"
  },
  input: {
    paddingVertical: 4,
    margin: 0,
    fontSize: fontSize.text,
    //color:"red",
    //color: colors.primaryText,
    width: '100%',
    fontFamily: 'Montserrat-Medium',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});