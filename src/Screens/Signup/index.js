import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Imagepaths from "../../Constants/Imagepaths";
import getStyles from "./styles";
import { useRef, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import AlertPopup from "../../Components/AlertPopup";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import actions from "../../Redux/actions";
import { useTheme } from "../../Constants/themes";
import CustomLoader from "../../Components/Loaders";
import strings from "../../Constants/languages";
import NavigationStrings from "../../Constants/NavigationStrings";

const SignUpScreen = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const inputRef = useRef(null);

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };

    const onPressSignUp = async () => {
        setIsLoading(true);
        const data = {
            username,
            email,
            phoneNumber,
            password
        }

        try{
       const res = await actions.signUpApi(data)
                showSuccess(res?.message)
                navigation.navigate(NavigationStrings.LOGIN_SCREEN);
            }
            catch(error){
                errorMethod(error);
            }
            finally{
                setIsLoading(false);
            }
    }

    const onPressLogin = () => {
        navigation.navigate(NavigationStrings.LOGIN_SCREEN);
    }

    const isPhoneNumber = (text) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(text) && phoneNumber.length === 10;
    };

    const isEmail = (text) => {
        const emailRegex = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;
        return emailRegex.test(text);
    };

    const isUsername = (text) => {
        const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        return nameRegex.test(text);
    };

    const isValidPassword = (text) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(text);
    };

    const validateInput = () => {
        if (!username) {
            setAlertMessage(`${strings.USERNAME} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (username.length < 4) {
            setAlertMessage(strings.USERNAME_VALIDATION_LESS);
            setIsModalVisible(true);
        } else if (!isUsername(username)) {
            setAlertMessage(strings.USERNAME_VALIDATION_LETTERS_ONLY);
            setIsModalVisible(true);
        } else if (username.length > 15) {
            setAlertMessage(strings.USERNAME_VALIDATION_MORE);
            setIsModalVisible(true);
        } else if (!isEmail(email)) {
            setAlertMessage(strings.EMAIL_VALIDATION);
            setIsModalVisible(true);
        } else if (!isPhoneNumber(phoneNumber)) {
            setAlertMessage(strings.VALID_PHONE_NUMBER_ERROR);
            setIsModalVisible(true);
        } else if (!password) {
            setAlertMessage(`${strings.PASSWORD} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!isValidPassword(password)) {
            setAlertMessage(strings.PASSWORD_ERROR);
            setIsModalVisible(true);
        } else if (!confirmPassword) {
            setAlertMessage(`${strings.CONFIRM} ${strings.PASSWORD} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (password !== confirmPassword) {
            setAlertMessage(strings.SIGN_UP_PASSWORD_MATCH_ERROR);
            setIsModalVisible(true);
        } else {
            onPressSignUp();
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <Image source={Imagepaths.gradient} resizeMode="stretch" style={Styles.gradient} />

                <View style={Styles.topContainer}>
                    <Text style={Styles.headertext}>VCB</Text>
                </View>
                <View style={Styles.bottomContainer}>
                    <Text style={Styles.title}>{strings.USERNAME}</Text>
                    <TextInput
                        placeholderTextColor={themes.gray}
                        ref={inputRef}
                        value={username}
                        keyboardType={'default'}
                        placeholder={`${strings.ENTER} ${strings.USERNAME}`}
                        onChangeText={(text) => setUsername(text)}
                        style={Styles.inputStyle}
                    />
                    <Text style={Styles.title}>{strings.EMAIL}</Text>
                    <TextInput
                        placeholderTextColor={themes.gray}
                        ref={inputRef}
                        value={email}
                        keyboardType={'email-address'}
                        placeholder={`${strings.ENTER} ${strings.EMAIL}`}
                        onChangeText={(text) => setEmail(text)}
                        style={Styles.inputStyle}
                    />
                    <Text style={Styles.title}>{strings.PHONE_NUMBER}</Text>
                    <TextInput
                        placeholderTextColor={themes.gray}
                        ref={inputRef}
                        value={phoneNumber}
                        keyboardType={'phone-pad'}
                        placeholder={`${strings.ENTER} ${strings.PHONE_NUMBER}`}
                        onChangeText={(text) => setPhoneNumber(text)}
                        style={Styles.inputStyle}
                    />

                    <Text style={Styles.title}>{strings.PASSWORD}</Text>
                    <View style={Styles.passwordContainer}>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
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

                    <Text style={Styles.title}>{strings.ENTER} {strings.PASSWORD} {strings.AGAIN}</Text>
                    <View style={Styles.passwordContainer}>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
                            value={confirmPassword}
                            placeholder={`${strings.CONFIRM} ${strings.YOUR} ${strings.PASSWORD}`}
                            secureTextEntry={!showConfirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            style={Styles.inputStyle}
                        />
                        <TouchableOpacity onPress={toggleConfirmPassword} style={Styles.eyeOutline}>
                            <Image source={showConfirmPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={themes.gray} resizeMode="contain" style={Styles.eye} />
                        </TouchableOpacity>
                    </View>
                    <Text style={Styles.passwordtext}>{strings.PASSWORD_INFO}</Text>
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[themes.red, themes.red]}
                        title={strings.SIGN_UP}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(20) }} />
                    <Text style={Styles.signintext}>{strings.OLD_USER}</Text>
                    <CustomButton
                        onPress={onPressLogin}
                        gradientColors={[themes.blue, themes.blue]}
                        title={strings.SIGN_IN}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(10) }} />
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>
    );
}

export default SignUpScreen;
