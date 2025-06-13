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
import NavigationStrings from "../../Constants/NavigationStrings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const { themes, changeTheme } = useTheme();
    const Styles = getStyles(themes);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const inputRef = useRef(null);

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };


    const onPressLogin = async () => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        setIsLoading(true);
        const data = {
            email,
            password,
            fcmToken
        }

        try {

            const res = await actions.login(data)
            showSuccess(res?.message)
            setUserData(res);
            saveUserData(res?._doc);
            changeTheme(res?._doc?.theme);
            changeLaguage(res?._doc?.language);
            if (res?._doc?.role == "user") {
                navigation.navigate(NavigationStrings.USER_TAB_ROUTES);
            }
            else {
                navigation.navigate(NavigationStrings.ADMIN_TAB_ROUTES)
            }
        }
        catch (error) {
            errorMethod(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const onPressSignUp = () => {
        navigation.navigate(NavigationStrings.SIGNUP_SCREEN)
    }

    const onPressForgotPassword = () => {
        let data = {
            email: '',
            comesFrom: NavigationStrings.LOGIN_SCREEN,
            goto: NavigationStrings.FORGOT_PASSWORD_SCREEN
        }
        navigation.navigate(NavigationStrings.OTP_SCREEN, { data: data })
    }

    const isEmail = (text) => {
        const emailRegex = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;
        return emailRegex.test(text);
    };

    const isValidPassword = (text) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(text);
    };

    const validateInput = () => {
        if (!email) {
            setAlertMessage(`${strings.EMAIL} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!isEmail(email)) {
            setAlertMessage(strings.EMAIL_VALIDATION);
            setIsModalVisible(true);
        } else if (!password) {
            setAlertMessage(`${strings.PASSWORD} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!isValidPassword(password)) {
            setAlertMessage(strings.VALID_PASSWORD_ERROR);
            setIsModalVisible(true);
        } else {
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
                    <Image source={Imagepaths.transparent_logo} style={Styles.logo} resizeMode='contain' />
                </View>
                <View style={Styles.bottomContainer}>
                    <Text style={Styles.title}>{strings.EMAIL} </Text>
                    <TextInput
                        ref={inputRef}
                        value={email}
                        placeholderTextColor={themes.gray}
                        keyboardType={'email-address'}
                        placeholder={`${strings.ENTER} ${strings.EMAIL}`}
                        onChangeText={(text) => setEmail(text)}
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
                    <TouchableOpacity style={Styles.forgotpassword} onPress={onPressForgotPassword}>
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
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>
    );
}

export default LoginScreen;
