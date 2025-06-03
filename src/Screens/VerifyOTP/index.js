import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../Constants/Imagepaths";
import strings from "../../Constants/languages";
import getStyles from "./styles";
import { useTheme } from "../../Constants/themes";
import { useEffect, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import NavigationStrings from "../../Constants/NavigationStrings";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import AlertPopup from "../../Components/AlertPopup";
import CustomLoader from "../../Components/Loaders";
import OtpInput from "../../Components/OtpInput";
import actions from "../../Redux/actions";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import { saveUserData } from "../../Redux/actions/auth";

const VerifyOtpScreen = ({ navigation, route }) => {
    const paramsData = route?.params?.data || {};
    console.log(paramsData, 'paramsData');
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');
    const [otp5, setOtp5] = useState('');
    const [otp6, setOtp6] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(120); // 2 mins
    const [otpTimer, setotpTimer] = useState('1:59');

    useEffect(() => {
        let timer = null;
        if (secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [secondsLeft]);

    useEffect(() => {
        if (secondsLeft > 0) {
            setotpTimer(formatTime(secondsLeft));
        } else {
            setotpTimer(strings.RESEND_OTP); // Show this when timer ends
        }
    }, [secondsLeft]);

    const onPressResend = async () => {
        if (secondsLeft === 0) {
            setIsLoading(true);
            const data = {
                email: paramsData?.email
            };

            try {
                const res = await actions.sendOtp(data);
                showSuccess(res?.message);
                setSecondsLeft(120);
            } catch (error) {
                errorMethod(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60).toString().padStart(1, '0');
        const sec = (seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    const onPressSignIn = () => {
        navigation.navigate(NavigationStrings.LOGIN_SCREEN)
    }

    const onPressCancel = () => {
        navigation.navigate(NavigationStrings.SETTINGS_SCREEN);
    }

    const validateInput = () => {
        switch (paramsData?.goto) {
            case NavigationStrings.FORGOT_PASSWORD_SCREEN:
                forgotPasswordScreen();
                break;
            case NavigationStrings.LOGIN_SCREEN:
                createNewAccount();
                break;
            case NavigationStrings.SETTINGS_SCREEN:
                changeEmailId();
                break;
            default:
                console.warn('Unhandled goto:', paramsData?.goto);
        }
    };

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };

    const verifyOtp = async () => {
        setIsLoading(true);
        const data = {
            email: paramsData?.email,
            otp: `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`
        };

        try {
            const res = await actions.verifyOtp(data);
            showSuccess(res?.message);
            return true; // OTP verified successfully
        } catch (error) {
            errorMethod(error);
            return false; // verification failed
        } finally {
            setIsLoading(false);
        }
    };


    const forgotPasswordScreen = async () => {
        const otpVeridied = await verifyOtp();
        const data = {
                email: paramsData?.email,
            }
        if (otpVeridied) {
            navigation.navigate(paramsData?.goto, {data: data});
            console.log('navigate to forgot password...');
        }
        else {
            console.log('otp verification failed');

        }
    }

    const createNewAccount = async () => {
        // create account api logics goes here...
        const otpVeridied = await verifyOtp();
        if (otpVeridied) {
            setIsLoading(true);
            const data = {
                username: paramsData?.data?.username,
                email: paramsData?.data?.email,
                phoneNumber: paramsData?.data?.phoneNumber,
                password: paramsData?.data?.password
            }

            try {
                const res = await actions.signUpApi(data)
                showSuccess(res?.message)
                navigation.navigate(paramsData?.goto);
            }
            catch (error) {
                errorMethod(error);
            }
            finally {
                setIsLoading(false);
            }
            console.log('Creating new account...');
        }
        else {
            console.log('otp verification failed');

        }
    };

    const changeEmailId = async () => {
        // change email api logics goes here...
        const otpVeridied = await verifyOtp();
        if (otpVeridied) {
            setIsLoading(true);
            const data = {
                email: paramsData?.email,
            }

            try {
                const res = await actions.updateProfile(data)
                saveUserData(res?.user);
                showSuccess(res?.message)
                navigation.navigate(paramsData?.goto);
            }
            catch (error) {
                errorMethod(error);

            }
            finally {
                setIsLoading(false);
            }
            console.log('Changing email ID...');
        }
        else {
            console.log('otp verification failed');

        }

    };



    return (
        <ScrollView>
            <View style={Styles.container}>
                <Image source={Imagepaths.gradient} resizeMode="stretch" style={Styles.gradient} />
                <View style={Styles.topContainer}>
                    <Text style={Styles.headertext}>VCB</Text>
                    <Image source={Imagepaths.transparent_logo} style={Styles.logo} resizeMode='contain' />
                </View>
                <View style={Styles.bottomContainer}>
                    <Text style={Styles.verifyTitle}>{strings.OTP_VERIFICATION}</Text>
                    <Text style={Styles.verifySubTitle}>
                        {strings.WE_SENT_TO} <Text style={{ fontWeight: 'bold' }}>{paramsData?.email}</Text>. {strings.PLEASE_ENTER_BELOW}
                    </Text>
                    <OtpInput
                        otp1={otp1}
                        otp2={otp2}
                        otp3={otp3}
                        otp4={otp4}
                        otp5={otp5}
                        otp6={otp6}
                        setOtp1={setOtp1}
                        setOtp2={setOtp2}
                        setOtp3={setOtp3}
                        setOtp4={setOtp4}
                        setOtp5={setOtp5}
                        setOtp6={setOtp6}
                        themes={themes}
                    />
                    <View style={Styles.resendOutline}>
                        <Text style={Styles.resendOtpText}>
                            {strings.RESEND_OTP_MSG}
                        </Text>
                        <TouchableOpacity onPress={onPressResend}>
                            <Text style={Styles.resendText}>
                                {' '}{otpTimer}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[themes.red, themes.red]}
                        title={strings.VERIFY_OTP}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(20) }} />
                    {paramsData?.goto !== NavigationStrings.SETTINGS_SCREEN ?
                     <>
                        <Text style={Styles.signintext}>{strings.REMEMBER_PASSWORD}</Text>
                        <CustomButton
                            onPress={onPressSignIn}
                            gradientColors={[themes.blue, themes.blue]}
                            title={strings.SIGN_IN}
                            textColor={themes.white}
                            ButtonStyles={{ marginTop: moderateScale(10) }} />
                    </>
                    :
                         <>
                            <CustomButton
                                onPress={onPressCancel}
                                gradientColors={[themes.blue, themes.blue]}
                                title={strings.CANCEL}
                                textColor={themes.white}
                                ButtonStyles={{ marginTop: moderateScale(50) }} />
                        </>
                    }
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>
    )
}

export default VerifyOtpScreen;