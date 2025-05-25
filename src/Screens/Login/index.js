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
import strings, { changeLaguage } from "../../Constants/languages";
import CustomLoader from "../../Components/Loaders";

const LoginScreen = ({navigation}) => {
    const { themes, changeTheme } = useTheme();
    const Styles = getStyles(themes);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const inputRef = useRef(null);

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message );
        showError(error?.response?.data?.message );
      };
      

    const onPressLogin = async () => {
        setIsLoading(true);
        const data = {
            phoneNumber,
            password
        }

        try{

        const res = await actions.login(data)
            showSuccess(res?.message)
            setUserData(res);            
            saveUserData(res?._doc);
            changeTheme(res?._doc?.theme);
            changeLaguage(res?._doc?.language);
            if(res?._doc?.role == "user"){
                navigation.navigate('UserTabroutes')
            }
            else{
                navigation.navigate('AdminTabroutes')
            }
        }
        catch(error){
            errorMethod(error);
        }
        finally{
            setIsLoading(false);
        }
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
            setAlertMessage(`${strings.PHONE_NUMBER} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!isPhoneNumber(phoneNumber)) {
            setAlertMessage(strings.VALID_PHONE_NUMBER_ERROR);
            setIsModalVisible(true);
        } else if (!password) {
            setAlertMessage(`${strings.PASSWORD} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!isValidPassword(password)) {
            setAlertMessage(strings.VALID_PASSWORD_ERROR);
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
                <Text style={Styles.title}>{strings.PHONE_NUMBER} </Text>
                <TextInput
                    ref={inputRef}
                    value={phoneNumber}
                    placeholderTextColor={themes.gray}
                    keyboardType={'phone-pad'}
                    placeholder={`${strings.ENTER} ${strings.PHONE_NUMBER}`}
                    onChangeText={(text) => setPhoneNumber(text)}
                    style={Styles.inputStyle}
                />

                <Text style={Styles.title}>{strings.PASSWORD}</Text>
                <View style={Styles.passwordContainer}>
                <TextInput
                    ref={inputRef}
                    placeholderTextColor={themes.gray}
                    value={password}
                    placeholder={`${strings.ENTER} ${strings.PASSWORD}`}
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => setPassword(text)}
                    style={Styles.inputStyle}
                />
                <TouchableOpacity onPress={togglePassword} style={Styles.eyeOutline}>
                 <Image source={showPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={themes.gray} resizeMode="contain" style={Styles.eye} />
                 </TouchableOpacity>
                </View>
                <TouchableOpacity style={Styles.forgotpassword} onPress={()=>{}}>
                    <Text style={Styles.forgottext}>{strings.FORGET} {strings.PASSWORD}?</Text>
                </TouchableOpacity>
                <CustomButton
                    onPress={validateInput}
                    gradientColors={[themes.red, themes.red]}
                    title={strings.SIGN_IN}
                    textColor={themes.white}
                    ButtonStyles={{ marginTop: moderateScale(20) }} />
                <Text style={Styles.signintext}>{strings.NEW_USER}</Text>
                <CustomButton
                    onPress={onPressSignUp}
                    gradientColors={[themes.blue, themes.blue]}
                    title={strings.SIGN_UP}
                    textColor={themes.white}
                    ButtonStyles={{ marginTop: moderateScale(10) }} />
            </View>
            <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage}/>
            <CustomLoader visible={isLoading} />
        </View>
        </ScrollView>
    );
}

export default LoginScreen;
