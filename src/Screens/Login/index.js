import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Imagepaths from "../../Constants/Imagepaths";
import getStyles from "./styles";
import { useRef, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import AlertPopup from "../../Components/AlertPopup";
import actions from "../../Redux/actions";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import { useTheme } from "../../Constants/themes";
import { setUserData } from "../../Utils/Utils";
import { saveUserData } from "../../Redux/actions/auth";

const LoginScreen = ({navigation}) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
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
            setUserData(res);
            saveUserData(res?._doc);
            if(res?._doc?.role == "user"){
                navigation.navigate('UserTabroutes')
            }
            else{
                navigation.navigate('AdminTabroutes')
            }
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
            <Image source={Imagepaths.transparent_logo} style={{height:300, width: 300}} resizeMode='contain' />
            </View>
            <View style={Styles.bottomContainer}>
                <Text style={Styles.title}>Phone Number </Text>
                <TextInput
                    ref={inputRef}
                    value={phoneNumber}
                    placeholderTextColor={themes.gray}
                    keyboardType={'phone-pad'}
                    placeholder="Enter Phone Number"
                    onChangeText={(text) => setPhoneNumber(text)}
                    style={Styles.inputStyle}
                />

                <Text style={Styles.title}>Password</Text>
                <View style={Styles.passwordContainer}>
                <TextInput
                    ref={inputRef}
                    placeholderTextColor={themes.gray}
                    value={password}
                    placeholder="Enter Password"
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => setPassword(text)}
                    style={Styles.inputStyle}
                />
                <TouchableOpacity onPress={togglePassword} style={Styles.eyeOutline}>
                 <Image source={showPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={themes.gray} resizeMode="contain" style={Styles.eye} />
                 </TouchableOpacity>
                </View>
                <TouchableOpacity style={Styles.forgotpassword} onPress={()=>{}}>
                    <Text style={Styles.forgottext}>Forgot passoword?</Text>
                </TouchableOpacity>
                <CustomButton
                    onPress={validateInput}
                    gradientColors={[themes.red, themes.red]}
                    title="Sign In"
                    textColor={themes.white}
                    ButtonStyles={{ marginTop: moderateScale(20) }} />
                <Text style={Styles.signintext}>If you don't have an account yet?</Text>
                <CustomButton
                    onPress={onPressSignUp}
                    gradientColors={[themes.blue, themes.blue]}
                    title="Sign Up"
                    textColor={themes.white}
                    ButtonStyles={{ marginTop: moderateScale(10) }} />
            </View>
            <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage}/>
        </View>
        </ScrollView>
    );
}

export default LoginScreen;
