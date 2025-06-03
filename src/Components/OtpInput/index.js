import { View, TextInput } from 'react-native';
import { useRef } from 'react';
import getStyles from './styles';

const OtpInput = ({ otp1, otp2, otp3, otp4, otp5, otp6, setOtp1, setOtp2, setOtp3, setOtp4, setOtp5,  setOtp6,themes }) => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const Styles = getStyles(themes);

  const handleChange = (text, index) => {
    if (text.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }
    if (index === 0) setOtp1(text);
    if (index === 1) setOtp2(text);
    if (index === 2) setOtp3(text);
    if (index === 3) setOtp4(text);
    if (index === 4) setOtp5(text);
    if (index === 5) setOtp6(text);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (index > 0 && ![otp1, otp2, otp3, otp4, otp5, otp6][index]) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  return (
    <View style={Styles.otpContainer}>
      {[otp1, otp2, otp3, otp4, otp5, otp6].map((otp, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          style={Styles.otpInput}
          value={otp}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType='numeric'
          maxLength={1}
          placeholderTextColor={themes.gray}
        />
      ))}
    </View>
  );
};

export default OtpInput;
