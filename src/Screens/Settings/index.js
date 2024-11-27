import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import Styles from "./styles";
import Imagepaths from "../../Constants/Imagepaths";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import { useEffect, useState } from "react";
import Colors from "../../Styles/Colors";
import AlertPopup from "../../Components/AlertPopup";
import { useSelector } from 'react-redux';
import actions from "../../Redux/actions";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import strings, { changeLaguage } from "../../Constants/languages";

const Settings = ({ navigation }) => {
    const [userData, setUserData] = useState()
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
    const [isLangEnabled, setIsLangEnabled] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isVisibleReport, setIsVisibleReport] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [reportMessage, setReportMessage] = useState('');
    // const userData = useSelector((state) => state?.auth?.userData);

    const isFocused = useIsFocused();

    const errorMethod = (error) => {
        console.log(error?.message || error?.error);
        showError(error?.message || error?.error);
    };

    useEffect(() => {
        if (isFocused) {
            const viewProfile = async () => {
                await actions.viewProfile()
                    .then((res) => {
                        setUserData(res?.data);
                        setIsDarkModeEnabled(res?.data?.darkMode);
                        setIsLangEnabled(res?.data?.language !== 'en');
                        showSuccess(res?.message)
                    })
                    .catch(errorMethod);
            }

            viewProfile();
        }

    }, [isFocused])

    const switchTheme = async () => {
        const data = { isDarkModeEnabled: !isDarkModeEnabled }

        await actions.changeDarkmode(data)
            .then((res) => {
                showSuccess(res?.message)
                setIsDarkModeEnabled(previousState => !previousState);
            })
            .catch(errorMethod);
    }
    const switchLanguage = async() =>{        

         const data = { isLangEnabled: isLangEnabled ? 'en' : 'ta' }

         await actions.changeLanguage(data)
             .then((res) => {
                 showSuccess(res?.message)
                 setIsLangEnabled(previousState => !previousState);
             })
             .catch(errorMethod);
    }

    const onPressLogout = () => {
        setAlertMessage(strings.LOGOUT_MSG);
        setIsModalVisible(true)
    }

    const onPressEditProfile = () => {
        navigation.navigate('EditProfile', { userData: userData });
    };

    const onPressSubmit = async () => {
        await actions.logout()
            .then((res) => {
                navigation.navigate('WelcomeScreen')
                showSuccess(res?.message)
                setIsModalVisible(false)
            })
            .catch(errorMethod);

    }

    const onPressCancel = () => {
        setIsModalVisible(false)
    }

    const onHelpPress = () => {
        navigation.navigate('HelpScreen')
    }

    const onPressReport = async() => {

        await actions.reportProblem()
        .then((res) => {
            showSuccess(res?.message)
            if(userData?.role === 'admin'){
            setReportMessage(res?.data?.admin)
            }
            else{
                setReportMessage(res?.data?.user)
            }
            setIsVisibleReport(true)
        })
        .catch(errorMethod);        
    }

    const onPressReportSubmit = () => {
        setIsVisibleReport(false);
    }

    const onPressPolicies = () => {
        navigation.navigate('PoliciesScreen')
    }

    const onPressChangePassword = () => {
        navigation.navigate('ChangePassword')
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <View style={Styles.outerContainer}>
                    <Image source={Imagepaths.logo} style={Styles.image} />
                    <Text style={Styles.userName}>{userData?.username}</Text>
                    <Text style={Styles.email}>{userData?.email}</Text>
                    <Text style={Styles.email}>+91 {userData?.phoneNumber}</Text>
                    <TouchableOpacity style={Styles.editProfileBtn} onPress={onPressEditProfile}>
                        <Text style={Styles.editProfileText}>{strings.EDIT_PROFILE}</Text>
                    </TouchableOpacity>
                    <View style={Styles.generalContainer}>
                        <Text style={Styles.general}>{strings.GENERAL}</Text>
                        <View style={Styles.card} >
                            <TouchableOpacity onPress={onPressChangePassword} style={Styles.cardContainer}>
                                <Image source={Imagepaths.face} style={Styles.icon} />
                                <Text style={Styles.title}>{strings.CHANGE_PASSWORD}</Text>
                                <Image source={Imagepaths.arrow_right} style={Styles.rightIcon} />
                            </TouchableOpacity>

                            <View style={[Styles.cardContainer, { marginTop: moderateScale(20) }]}>
                                <Image source={Imagepaths.cloud} style={Styles.icon} />
                                <Text style={Styles.title}>{strings.DARK_MODE}</Text>
                                <Switch
                                    style={Styles.Switch}
                                    trackColor={{ false: Colors.card1, true: Colors.white }}
                                    thumbColor={isDarkModeEnabled ? Colors.card1 : Colors.white}
                                    onValueChange={switchTheme}
                                    value={isDarkModeEnabled}

                                />
                            </View>
                            <View style={[Styles.cardContainer, { marginTop: moderateScale(20) }]}>
                                <Image resizeMode="contain" source={Imagepaths.lang} tintColor={Colors.gray} style={Styles.icon} />
                                <Text style={Styles.title}>{strings.LANGUAGE}</Text>
                                <Switch
                                    style={Styles.Switch}
                                    trackColor={{ false: Colors.card1, true: Colors.white }}
                                    thumbColor={isLangEnabled ? Colors.card1 : Colors.white}
                                    onValueChange={switchLanguage}
                                    value={isLangEnabled}

                                />
                            </View>
                        </View>
                    </View>
                    <View style={Styles.generalContainer}>
                        <Text style={Styles.general}>{strings.HELP_AND_LEGAL}</Text>
                        <View style={Styles.card} >
                            <TouchableOpacity onPress={onHelpPress} style={Styles.cardContainer}>
                                <Image source={Imagepaths.help} style={Styles.icon} />
                                <Text style={Styles.title}>{strings.HELP}</Text>
                                <Image source={Imagepaths.arrow_right} style={Styles.rightIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressPolicies} style={[Styles.cardContainer, { marginTop: moderateScale(20) }]}>
                                <Image source={Imagepaths.chart} style={Styles.icon} />
                                <Text style={Styles.title}>{strings.POLICIES}</Text>
                                <Image source={Imagepaths.arrow_right} style={Styles.rightIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressReport} style={[Styles.cardContainer, { marginTop: moderateScale(20) }]}>
                                <Image source={Imagepaths.money} style={Styles.icon} />
                                <Text style={Styles.title}>{strings.REPORT_PROBLEM}</Text>
                                <Image source={Imagepaths.arrow_right} style={Styles.rightIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.generalContainer}>
                        <View style={[Styles.card, { marginTop: moderateScale(0) }]} >
                            <TouchableOpacity onPress={onPressLogout} style={Styles.cardContainer}>
                                <Image source={Imagepaths.logout} style={Styles.icon} />
                                <Text style={[Styles.title, { color: Colors.red1 }]}>{strings.LOGOUT}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={onPressSubmit} onPressCancel={onPressCancel} isCancelVisible={isModalVisible} message={alertMessage} />
                <AlertPopup header={"Information"} isModalVisible={isVisibleReport} onPressSubmit={onPressReportSubmit} message={reportMessage} />
            </View>
        </ScrollView>
    );
}

export default Settings;