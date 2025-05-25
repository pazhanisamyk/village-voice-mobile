import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import Imagepaths from "../../Constants/Imagepaths";
import { useRef, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import AlertPopup from "../../Components/AlertPopup";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import actions from "../../Redux/actions";
import { useTheme } from "../../Constants/themes";
import { useSelector } from "react-redux";
import CustomLoader from "../../Components/Loaders";
import strings from "../../Constants/languages";

const ChangePassword = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const userData = useSelector((state) => state?.auth?.userData);

    const inputRef = useRef(null);


    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };


    const onPressBack = () => {
        navigation.goBack();
    }

    const isValidPassword = (text) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(text);
    };

    const changePassword = async () => {
        setIsLoading(true);
        const data = {
            currentPassword,
            newPassword
        }

        try {

            const res = await actions.changePassword(data)
            showSuccess(res?.message)
            navigation.goBack();
        } catch (error) {
            errorMethod(error);
        }
        finally {
            setIsLoading(false); 
        }
    }

    const validateInput = () => {
        if (!currentPassword) {
            setAlertMessage(`${strings.OLD} ${strings.PASSWORD} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!isValidPassword(currentPassword)) {
            setAlertMessage(`${strings.OLD} ${strings.PASSWORD_ERROR}`);
            setIsModalVisible(true);
        } else if (!newPassword) {
            setAlertMessage(`${strings.NEW} ${strings.PASSWORD} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!isValidPassword(newPassword)) {
            setAlertMessage(`${strings.NEW} ${strings.PASSWORD_ERROR}`);
            setIsModalVisible(true);
        } else if (!confirmPassword) {
            setAlertMessage(`${strings.CONFIRM} ${strings.PASSWORD} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (newPassword !== confirmPassword) {
            setAlertMessage(strings.PASSWORD_MATCH_ERROR);
            setIsModalVisible(true);
        } else {
            changePassword();
        }
    };

    const togglecurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    }

    const toggleNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    }

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>{strings.CHANGE_PASSWORD}</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <View style={Styles.profileOutline}>
                        {userData?.profileImage ? <Image source={{ uri: userData?.profileImage }} style={Styles.image} /> : <Image source={Imagepaths.Launcher} style={Styles.image} />}
                    </View>
                    <View style={Styles.editprofileContainer}>
                        <Text style={Styles.title}>{strings.OLD} {strings.PASSWORD}</Text>
                        <View style={Styles.passwordContainer}>
                            <TextInput
                                placeholderTextColor={themes.gray}
                                ref={inputRef}
                                value={currentPassword}
                                placeholder={`${strings.ENTER} ${strings.OLD} ${strings.PASSWORD}`}
                                keyboardType={'default'}
                                secureTextEntry={!showCurrentPassword}
                                onChangeText={(text) => setCurrentPassword(text)}
                                style={Styles.inputStyle}
                            />
                            <TouchableOpacity onPress={togglecurrentPassword} style={Styles.eyeOutline}>
                                <Image source={showCurrentPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={themes.gray} resizeMode="contain" style={Styles.eye} />
                            </TouchableOpacity>
                        </View>
                        <Text style={Styles.title}>{strings.NEW} {strings.PASSWORD}</Text>
                        <View style={Styles.passwordContainer}>
                            <TextInput
                                placeholderTextColor={themes.gray}
                                ref={inputRef}
                                value={newPassword}
                                placeholder={`${strings.ENTER} ${strings.NEW} ${strings.PASSWORD}`}
                                secureTextEntry={!showNewPassword}
                                onChangeText={(text) => setNewPassword(text)}
                                style={Styles.inputStyle}
                            />
                            <TouchableOpacity onPress={toggleNewPassword} style={Styles.eyeOutline}>
                                <Image source={showNewPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={themes.gray} resizeMode="contain" style={Styles.eye} />
                            </TouchableOpacity>
                        </View>
                        <Text style={Styles.title}>{strings.ENTER} {strings.PASSWORD} {strings.AGAIN}</Text>
                        <View style={Styles.passwordContainer}>
                            <TextInput
                                placeholderTextColor={themes.gray}
                                ref={inputRef}
                                value={confirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                placeholder={`${strings.CONFIRM} ${strings.YOUR} ${strings.PASSWORD}`}
                                onChangeText={(text) => setConfirmPassword(text)}
                                style={Styles.inputStyle}
                            />
                            <TouchableOpacity onPress={toggleConfirmPassword} style={Styles.eyeOutline}>
                                <Image source={showConfirmPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={themes.gray} resizeMode="contain" style={Styles.eye} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[themes.red, themes.red]}
                        title={`${strings.UPDATE} ${strings.PASSWORD}`}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(40) }} />
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>
    )
}

export default ChangePassword;