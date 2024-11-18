import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Styles from "./styles";
import Imagepaths from "../../Constants/Imagepaths";
import { useEffect, useRef, useState } from "react";
import Colors from "../../Styles/Colors";
import CustomButton from "../../Components/CustomButton";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import AlertPopup from "../../Components/AlertPopup";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import actions from "../../Redux/actions";

const EditProfile = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const inputRef = useRef(null);
    const userData = route?.params?.userData || {};

    useEffect(()=>{
        setUsername(userData?.username);
        setEmail(userData?.email);
        setPhoneNumber(userData?.phoneNumber);
    },[])

    const errorMethod = (error) => {
        console.log(error?.message || error?.error);
        showError(error?.message || error?.error);
      };

    const updateProfile = async () => {
        const data = {
            email,
            username
        }

        await actions.updateProfile(data)
        .then((res) => {
            showSuccess(res?.message)
            navigation.goBack();
        })
        .catch(errorMethod);
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
                    <Text style={Styles.headertext}>Edit Profile</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <TouchableOpacity onPress={() => { }} style={Styles.profileOutline}>
                        <Image source={Imagepaths.logo} style={Styles.image} />
                        <Image source={Imagepaths.camera} style={Styles.camera} />
                    </TouchableOpacity>
                    <View style={Styles.editprofileContainer}>
                        <Text style={Styles.title}>Username</Text>
                        <TextInput
                            placeholderTextColor={Colors.gray}
                            ref={inputRef}
                            value={username}
                            placeholder="Enter Username"
                            keyboardType={'default'}
                            onChangeText={(text) => setUsername(text)}
                            style={Styles.inputStyle}
                        />
                        <Text style={Styles.title}>E-mail</Text>
                        <TextInput
                            placeholderTextColor={Colors.gray}
                            ref={inputRef}
                            value={email}
                            placeholder="Enter E-mail"
                            keyboardType={'email-address'}
                            onChangeText={(text) => setEmail(text)}
                            style={Styles.inputStyle}
                        />
                        <Text style={Styles.title}>Phone Number ( view only )</Text>
                        <TextInput
                            placeholderTextColor={Colors.gray}
                            editable={false}
                            ref={inputRef}
                            value={phoneNumber}
                            placeholder="Enter Phone Number"
                            onChangeText={(text) => setPhoneNumber(text)}
                            style={[Styles.inputStyle,{backgroundColor: Colors.gray1}]}
                        />

                    </View>
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[Colors.red, Colors.red]}
                        title="Update profile"
                        textColor={Colors.white}
                        ButtonStyles={{ marginTop: moderateScale(40) }} />
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage}/>
            </View>
        </ScrollView>
    )
}

export default EditProfile;