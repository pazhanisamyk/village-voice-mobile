import { Image, ScrollView, Text, TextInput, View } from "react-native"
import Imagepaths from "../../Constants/Imagepaths";
import strings from "../../Constants/languages";
import getStyles from "./styles";
import { useTheme } from "../../Constants/themes";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import NavigationStrings from "../../Constants/NavigationStrings";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import AlertPopup from "../../Components/AlertPopup";
import CustomLoader from "../../Components/Loaders";
import actions from "../../Redux/actions";
import { showError, showSuccess } from "../../Utils/helperfunctions";

const OtpScreen = ({ navigation, route }) => {
    const paramsData = route?.params?.data || {};
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const inputRef = useRef(null);
    const [email, setEmail] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setEmail(paramsData?.email)
    }, [paramsData])

    const onPressSignIn = () => {
        navigation.navigate(NavigationStrings.LOGIN_SCREEN)
    }

    const onPressCancel = () => {
        navigation.goBack();
    }

    const isEmail = (text) => {
        const emailRegex = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;
        return emailRegex.test(text);
    };

    const validateInput = () => {
        if (!isEmail(email)) {
            setAlertMessage(strings.EMAIL_VALIDATION);
            setIsModalVisible(true);
        }
        else {
            sendOtp();
        }
    };

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };

    const sendOtp = async () => {
        setIsLoading(true);
        const data = {
            email: email
        };

        try {
            const res = await actions.sendOtp(data);            
            showSuccess(res?.message);
            let params = {
                email: email,
                comesFrom: NavigationStrings.OTP_SCREEN,
                goto: paramsData?.goto
            }
            navigation.navigate(NavigationStrings.VERIFY_OTP_SCREEN, { data: params })
        } catch (error) {
            errorMethod(error);
        } finally {
            setIsLoading(false);
        }
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
                    <Text style={Styles.verifyTitle}>{strings.VERIFY_EMAIL}</Text>
                    <Text style={Styles.verifySubTitle}>
                        {strings.WE_WILL_SEND} <Text style={{ fontWeight: 'bold' }}>{strings.ONE_TIME_PASSWORD}</Text> {strings.TO_THIS_EMAIL}
                    </Text>
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
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[themes.red, themes.red]}
                        title={strings.SEND_OTP}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(20) }} />
                    {paramsData?.comesFrom == NavigationStrings.LOGIN_SCREEN ?
                        <>
                            <Text style={Styles.signintext}>{strings.REMEMBER_PASSWORD}</Text>
                            <CustomButton
                                onPress={onPressSignIn}
                                gradientColors={[themes.blue, themes.blue]}
                                title={strings.SIGN_IN}
                                textColor={themes.white}
                                ButtonStyles={{ marginTop: moderateScale(10) }} />
                        </> :
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

export default OtpScreen;