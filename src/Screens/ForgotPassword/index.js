import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../Constants/Imagepaths";
import strings from "../../Constants/languages";
import getStyles from "./styles";
import { useTheme } from "../../Constants/themes";
import { useRef, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import NavigationStrings from "../../Constants/NavigationStrings";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import AlertPopup from "../../Components/AlertPopup";
import CustomLoader from "../../Components/Loaders";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import actions from "../../Redux/actions";

const ForgotPasswordScreen = ({ navigation, route }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const paramsData = route?.params?.data || {};
    const inputRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isValidPassword = (text) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(text);
    };

    const onPressSignIn = () => {
        navigation.navigate(NavigationStrings.LOGIN_SCREEN);
    }

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };

    const forgotpassword = async () => {
        setIsLoading(true);
        const data = {
            newPassword: password,
            email: paramsData?.email
        }

        try {
            const res = await actions.forgotPassword(data)
            showSuccess(res?.message);
            navigation.navigate(NavigationStrings.LOGIN_SCREEN);
        }
        catch (error) {
            errorMethod(error);

        }
        finally {
            setIsLoading(false);
        }
    }

    const validateInput = () => { 
        if (!password) {
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
            forgotpassword();
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                    <Text style={Styles.verifySubTitle}>
                        {strings.PLEASE_REMEMBER} <Text style={{ fontWeight: 'bold' }}>{strings.PASSWORD}</Text> {strings.YOU_SET_BELOW}
                    </Text>
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
                        title={strings.CHANGE_PASSWORD}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(20) }} />
                    <Text style={Styles.signintext}>{strings.REMEMBER_PASSWORD}</Text>
                    <CustomButton
                        onPress={onPressSignIn}
                        gradientColors={[themes.blue, themes.blue]}
                        title={strings.SIGN_IN}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(10) }} />
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>
    )
}

export default ForgotPasswordScreen;