import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Imagepaths from "../../Constants/Imagepaths";
import Styles from "./styles";
import { useRef, useState } from "react";
import Colors from "../../Styles/Colors";
import CustomButton from "../../Components/CustomButton";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import AlertPopup from "../../Components/AlertPopup";
import actions from "../../Redux/actions";
import { showError, showSuccess } from "../../Utils/helperfunctions";

const LoginScreen = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const inputRef = useRef(null);

    const errorMethod = (error) => {
        console.log(error?.message || error?.error);
        showError(error?.message || error?.error);
      };
      

    const onPressLogin = async () => {
        const data = {
            phoneNumber,
            password
        }

        await actions.login(data)
        .then((res) => {
            showSuccess(res?.message)
            // navigation.navigate('AdminTabroutes')
            navigation.navigate('UserTabroutes')
        })
        .catch(errorMethod);
    }

    const onPressSignUp = () => {
        navigation.navigate('SignUpScreen')
    }
    

    const isPhoneNumber = (text) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(text) && phoneNumber.length === 10;
    };

    const isValidPassword = (text) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(text);
    };

    const validateInput = () => {
        if (!phoneNumber) {
            setAlertMessage('Phone number is required');
            setIsModalVisible(true);
        } else if (!isPhoneNumber(phoneNumber)) {
            setAlertMessage('Enter a valid phone number');
            setIsModalVisible(true);
        } else if (!password) {
            setAlertMessage('Password is required');
            setIsModalVisible(true);
        } else if (!isValidPassword(password)) {
            setAlertMessage('Enter a valid password');
            setIsModalVisible(true);
        }else {
            onPressLogin();
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <ScrollView>
        <View style={Styles.container}>
            <Image source={Imagepaths.gradient} resizeMode="stretch" style={Styles.gradient} />
            <View style={Styles.topContainer}>
                <Text style={Styles.headertext}>VCB</Text>
            </View>
            <View style={Styles.bottomContainer}>
                <Text style={Styles.title}>Phone Number </Text>
                <TextInput
                    ref={inputRef}
                    value={phoneNumber}
                    placeholderTextColor={Colors.gray}
                    keyboardType={'phone-pad'}
                    placeholder="Enter Phone Number"
                    onChangeText={(text) => setPhoneNumber(text)}
                    style={Styles.inputStyle}
                />

                <Text style={Styles.title}>Password</Text>
                <View style={Styles.passwordContainer}>
                <TextInput
                    ref={inputRef}
                    placeholderTextColor={Colors.gray}
                    value={password}
                    placeholder="Enter Password"
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => setPassword(text)}
                    style={Styles.inputStyle}
                />
                <TouchableOpacity onPress={togglePassword} style={Styles.eyeOutline}>
                 <Image source={showPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={Colors.gray} resizeMode="contain" style={Styles.eye} />
                 </TouchableOpacity>
                </View>
                <TouchableOpacity style={Styles.forgotpassword} onPress={()=>{}}>
                    <Text style={Styles.forgottext}>Forgot passoword?</Text>
                </TouchableOpacity>
                <CustomButton
                    onPress={validateInput}
                    gradientColors={[Colors.red, Colors.red]}
                    title="Sign In"
                    textColor={Colors.white}
                    ButtonStyles={{ marginTop: moderateScale(20) }} />
                <Text style={Styles.signintext}>If you don't have an account yet?</Text>
                <CustomButton
                    onPress={onPressSignUp}
                    gradientColors={[Colors.blue, Colors.blue]}
                    title="Sign Up"
                    textColor={Colors.white}
                    ButtonStyles={{ marginTop: moderateScale(10) }} />
            </View>
            <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage}/>
        </View>
        </ScrollView>
    );
}

export default LoginScreen;
