import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import Imagepaths from "../../Constants/Imagepaths";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import AlertPopup from "../../Components/AlertPopup";
import { launchImageLibrary } from 'react-native-image-picker';
import { showError, showSuccess } from "../../Utils/helperfunctions";
import actions from "../../Redux/actions";
import strings from "../../Constants/languages";
import { useTheme } from "../../Constants/themes";
import { saveUserData } from "../../Redux/actions/auth";
import { useSelector } from "react-redux";
import CustomLoader from "../../Components/Loaders";

const EditProfile = ({ navigation, route }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [username, setUsername] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const inputRef = useRef(null);
    const userData = useSelector((state) => state?.auth?.userData);

    useEffect(() => {
        setUsername(userData?.username);
        setEmail(userData?.email);
        setPhoneNumber(userData?.phoneNumber);
    }, [])

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('Image Picker Error: ', response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                setSelectedImage(uri);
                updateProfileImage();
            }
        });
    };

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };

    const updateProfileImage = async () => {
        setIsLoading(true);

        const formData = new FormData();

        const fileName = selectedImage.split('/').pop();
        const fileType = fileName.split('.').pop();

        formData.append('image', {
            uri: selectedImage,
            name: String(userData?.phoneNumber),
            type: `image/${fileType}`,
        });

        // Optional: if user ID or token is needed
        let headers = {
            'Content-Type': 'multipart/form-data',
        }

        try {
            const res = await actions.updateProfileImage(formData, headers);
            saveUserData(res?.user);
            showSuccess(res?.message)
        } catch (error) {
            errorMethod(error);
            console.error('Upload error:', error);
        }
        finally {
            setIsLoading(false);
        }
    };


    const updateProfile = async () => {
        setIsLoading(true);
        const data = {
            email,
            username
        }

        try {
            const res = await actions.updateProfile(data)
            saveUserData(res?.user);
            showSuccess(res?.message)
            navigation.goBack();
        }
        catch (error) {
            errorMethod(error);

        }
        finally {
            setIsLoading(false);
        }
    }

    const onPressBack = () => {
        navigation.goBack();
    }

    const isEmail = (text) => {
        const emailRegex = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;
        return emailRegex.test(text);
    };

    const isUsername = (text) => {
        const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        return nameRegex.test(text);
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
        } else {
            updateProfile();
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>{strings.EDIT_PROFILE}</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <TouchableOpacity onPress={selectImage} style={Styles.profileOutline}>
                        {userData?.profileImage ? <Image source={{ uri: userData?.profileImage }} style={Styles.image} /> : <Image source={Imagepaths.Launcher} style={Styles.image} />}
                        <Image source={Imagepaths.camera} style={Styles.camera} />
                    </TouchableOpacity>
                    <View style={Styles.editprofileContainer}>
                        <Text style={Styles.title}>{strings.USERNAME}</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
                            value={username}
                            placeholder={strings.ENTER_USERNAME}
                            keyboardType={'default'}
                            onChangeText={(text) => setUsername(text)}
                            style={Styles.inputStyle}
                        />
                        <Text style={Styles.title}>{strings.EMAIL}</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
                            value={email}
                            placeholder={strings.ENTER_EMAIL}
                            keyboardType={'email-address'}
                            onChangeText={(text) => setEmail(text)}
                            style={Styles.inputStyle}
                        />
                        <Text style={Styles.title}>{strings.PHONE_NUMBER} ( {strings.VIEW_ONLY} )</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            editable={false}
                            ref={inputRef}
                            value={phoneNumber}
                            placeholder={`${strings.ENTER} ${strings.PHONE_NUMBER}`}
                            onChangeText={(text) => setPhoneNumber(text)}
                            style={[Styles.inputStyle, { backgroundColor: themes.gray1 }]}
                        />

                    </View>
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[themes.red, themes.red]}
                        title={strings.UPDATE_PROFILE}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(40) }} />
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>
    )
}

export default EditProfile;