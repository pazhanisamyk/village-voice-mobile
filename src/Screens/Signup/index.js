import { Alert, Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Imagepaths from "../../Constants/Imagepaths";
import Styles from "./styles";
import { useEffect, useRef, useState } from "react";
import Colors from "../../Styles/Colors";
import CustomButton from "../../Components/CustomButton";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import AlertPopup from "../../Components/AlertPopup";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import actions from "../../Redux/actions";

const SignUpScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const inputRef = useRef(null);

    const errorMethod = (error) => {
        console.log(error?.message || error?.error);
        showError(error?.message || error?.error);
    };

    const onPressSignUp = async () => {
        const data = {
            username,
            email,
            phoneNumber,
            password
        }

        await actions.signUpApi(data)
            .then((res) => {
                showSuccess(res?.message)
                // navigation.navigate('AdminTabroutes')
                navigation.navigate('UserTabroutes')
            })
            .catch(errorMethod);
    }

    const onPressLogin = () => {
        navigation.navigate('LoginScreen')
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
            setAlertMessage('User name is required');
            setIsModalVisible(true);
        } else if (username.length < 4) {
            setAlertMessage('Enter a username with at least 4 letters');
            setIsModalVisible(true);
        } else if (!isUsername(username)) {
            setAlertMessage('Enter a valid username (only letters and spaces)');
            setIsModalVisible(true);
        } else if (username.length > 15) {
            setAlertMessage('Username should not be more than 15 characters');
            setIsModalVisible(true);
        } else if (!isEmail(email)) {
            setAlertMessage('Enter a valid email address');
            setIsModalVisible(true);
        } else if (!isPhoneNumber(phoneNumber)) {
            setAlertMessage('Enter a valid phone number');
            setIsModalVisible(true);
        } else if (!password) {
            setAlertMessage('Password is required');
            setIsModalVisible(true);
        } else if (!isValidPassword(password)) {
            setAlertMessage('Password must be at least 8 characters, including letters, numbers, and symbols');
            setIsModalVisible(true);
        } else if (!confirmPassword) {
            setAlertMessage('Confirm password is required');
            setIsModalVisible(true);
        } else if (password !== confirmPassword) {
            setAlertMessage('Password and Confirm password do not match');
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
                    <Text style={Styles.title}>Username</Text>
                    <TextInput
                        placeholderTextColor={Colors.gray}
                        ref={inputRef}
                        value={username}
                        keyboardType={'default'}
                        placeholder="Enter Username"
                        onChangeText={(text) => setUsername(text)}
                        style={Styles.inputStyle}
                    />
                    <Text style={Styles.title}>E-mail</Text>
                    <TextInput
                        placeholderTextColor={Colors.gray}
                        ref={inputRef}
                        value={email}
                        keyboardType={'email-address'}
                        placeholder="Enter E-mail"
                        onChangeText={(text) => setEmail(text)}
                        style={Styles.inputStyle}
                    />
                    <Text style={Styles.title}>Phone Number</Text>
                    <TextInput
                        placeholderTextColor={Colors.gray}
                        ref={inputRef}
                        value={phoneNumber}
                        keyboardType={'phone-pad'}
                        placeholder="Phone Number"
                        onChangeText={(text) => setPhoneNumber(text)}
                        style={Styles.inputStyle}
                    />

                    <Text style={Styles.title}>Password</Text>
                    <View style={Styles.passwordContainer}>
                        <TextInput
                            placeholderTextColor={Colors.gray}
                            ref={inputRef}
                            value={password}
                            placeholder="Enter Password"
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => setPassword(text)}
                            style={Styles.inputStyle}
                        />
                        <TouchableOpacity onPress={togglePassword} style={Styles.eyeOutline}>
                            <Image source={showPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={Colors.gray} resizeMode="contain" style={Styles.eye} />
                        </TouchableOpacity>
                    </View>

                    <Text style={Styles.title}>Enter Password Again</Text>
                    <View style={Styles.passwordContainer}>
                        <TextInput
                            placeholderTextColor={Colors.gray}
                            ref={inputRef}
                            value={confirmPassword}
                            placeholder="Confirm Your Password"
                            secureTextEntry={!showConfirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            style={Styles.inputStyle}
                        />
                        <TouchableOpacity onPress={toggleConfirmPassword} style={Styles.eyeOutline}>
                            <Image source={showConfirmPassword ? Imagepaths.eye_hide : Imagepaths.eye} tintColor={Colors.gray} resizeMode="contain" style={Styles.eye} />
                        </TouchableOpacity>
                    </View>
                    <Text style={Styles.passwordtext}>Use 8 or more characters with a mix of letters, numbers & symbols.</Text>
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[Colors.red, Colors.red]}
                        title="Get started"
                        textColor={Colors.white}
                        ButtonStyles={{ marginTop: moderateScale(20) }} />
                    <Text style={Styles.signintext}>Do you have already an account?</Text>
                    <CustomButton
                        onPress={onPressLogin}
                        gradientColors={[Colors.blue, Colors.blue]}
                        title="Sign In"
                        textColor={Colors.white}
                        ButtonStyles={{ marginTop: moderateScale(10) }} />
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
            </View>
        </ScrollView>
    );
}

export default SignUpScreen;
