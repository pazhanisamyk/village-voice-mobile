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

const ChangePassword = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const inputRef = useRef(null);


    const errorMethod = (error) => {
        console.log(error?.message || error?.error);
        showError(error?.message || error?.error);
      };


    const onPressBack = () => {
        navigation.goBack();
    }

    const isValidPassword = (text) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(text);
    };

    const changePassword = async () => {
        const data = {
            currentPassword,
            newPassword
        }

        await actions.changePassword(data)
        .then((res) => {
            showSuccess(res?.message)
            navigation.goBack();
        })
        .catch(errorMethod);
    }

    const validateInput = () => { 
        if (!currentPassword) {
            setAlertMessage('Old password is required');
            setIsModalVisible(true);
        } else if (!isValidPassword(currentPassword)) {
            setAlertMessage('Old password must be at least 8 characters, including letters, numbers, and symbols');
            setIsModalVisible(true);
        } else if (!newPassword) {
            setAlertMessage('New password is required');
            setIsModalVisible(true);
        } else if (!isValidPassword(newPassword)) {
            setAlertMessage('New password must be at least 8 characters, including letters, numbers, and symbols');
            setIsModalVisible(true);
        } else if (!confirmPassword) {
            setAlertMessage('Confirm password is required');
            setIsModalVisible(true);
        } else if (newPassword !== confirmPassword) {
            setAlertMessage('New password and Confirm password do not match');
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
                    <Text style={Styles.headertext}>Change Password</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <View style={Styles.profileOutline}>
                        <Image source={Imagepaths.logo} style={Styles.image} />
                    </View>
                    <View style={Styles.editprofileContainer}>
                        <Text style={Styles.title}>Old Password</Text>
                        <View style={Styles.passwordContainer}>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
                            value={currentPassword}
                            placeholder="Enter Old Password"
                            keyboardType={'default'}
                            secureTextEntry={!showCurrentPassword}
                            onChangeText={(text) => setCurrentPassword(text)}
                            style={Styles.inputStyle}
                        />
                                               <TouchableOpacity onPress={togglecurrentPassword} style={Styles.eyeOutline}>
                            <Image source={showCurrentPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={themes.gray} resizeMode="contain" style={Styles.eye} />
                        </TouchableOpacity>
                    </View>
                        <Text style={Styles.title}>New Password</Text>
                        <View style={Styles.passwordContainer}>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
                            value={newPassword}
                            placeholder="Enter New Password"
                            secureTextEntry={!showNewPassword}
                            onChangeText={(text) => setNewPassword(text)}
                            style={Styles.inputStyle}
                        />
                                                <TouchableOpacity onPress={toggleNewPassword} style={Styles.eyeOutline}>
                            <Image source={showNewPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={themes.gray} resizeMode="contain" style={Styles.eye} />
                        </TouchableOpacity>
                    </View>
                        <Text style={Styles.title}>Enter Password Again</Text>
                        <View style={Styles.passwordContainer}>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
                            value={confirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            placeholder="Confirm Your Password"
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
                        title="Update password"
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(40) }} />
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage}/>
            </View>
        </ScrollView>
    )
}

export default ChangePassword;