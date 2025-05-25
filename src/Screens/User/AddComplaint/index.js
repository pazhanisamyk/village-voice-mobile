import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import { launchImageLibrary } from 'react-native-image-picker';
import getStyles from "./styles";
import { useRef, useState } from "react";
import CustomButton from "../../../Components/CustomButton";
import { moderateScale } from "../../../Styles/ResponsiveSizes";
import { useTheme } from "../../../Constants/themes";
import { showError, showSuccess } from "../../../Utils/helperfunctions";
import AlertPopup from "../../../Components/AlertPopup";
import actions from "../../../Redux/actions";
import CustomLoader from "../../../Components/Loaders";
import strings from "../../../Constants/languages";

const AddComplaint = ({ navigation, route }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [complaintTitle, setComplaintTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [description, setDescription] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const inputRef = useRef(null);
    const complaintData = route?.params?.data || {};
    console.log(complaintData);

    const onPressBack = () => {
        navigation.goBack();
    }

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
            }
        });
    };

    const validateInput = () => {
        if (!complaintTitle.trim()) {
            setAlertMessage(`${strings.TITLE} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!description.trim()) {
            setAlertMessage(`${strings.DESCRIPTION} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
            return;
        } else if (!selectedImage) {
            setAlertMessage(`${strings.IMAGE} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else {
            submitComplaint();
        }
    };

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };

    const submitComplaint = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('title', complaintTitle);
        formData.append('description', description);
        formData.append('category', complaintData?.category);
        formData.append('status', 'unresolved');

        const fileName = selectedImage.split('/').pop();
        const fileType = fileName.split('.').pop();
        formData.append('image', {
            uri: selectedImage,
            name: fileName,
            type: `image/${fileType}`,
        });

        let headers = {
            'Content-Type': 'multipart/form-data',
        }

        try {
            const res = await actions.createUserComplaint(formData, headers)
            navigation.navigate('UserHomeScreen');
            showSuccess(res?.message);
        } catch (error) {
            errorMethod(error);
            console.error('Upload error:', error);
        }
        finally {
            setIsLoading(false);
        }
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>{strings.ADD} {strings.COMPLAINT}</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <View style={Styles.editprofileContainer}>
                        <Text style={Styles.title}>{strings.TITLE_OF_COMPLAINT}</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
                            value={complaintTitle}
                            placeholder={`${strings.ENTER} ${strings.TITLE_OF_COMPLAINT}`}
                            onChangeText={(text) => setComplaintTitle(text)}
                            style={Styles.inputStyle}
                        />
                        <Text style={Styles.title}>{strings.DESCRIPTION}</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
                            value={description}
                            placeholder={`${strings.ENTER} ${strings.DESCRIPTION}`}
                            onChangeText={(text) => setDescription(text)}
                            style={[Styles.inputStyle, { height: moderateScale(150) }]}
                            multiline={true}
                            textAlignVertical="top"
                        />
                        <Text style={Styles.title}>{strings.ADDITIONAL} {strings.INFORMATION}</Text>
                        <TouchableOpacity style={Styles.imageOutline} onPress={selectImage}>
                            {selectedImage ? (
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={Styles.selectedImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Image
                                    tintColor={themes.white}
                                    resizeMode="contain"
                                    source={Imagepaths.camera1}
                                    style={Styles.cameraIcon}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[themes.red, themes.red]}
                        title={`${strings.SUBMIT} ${strings.YOUR} ${strings.COMPLAINT}`}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(40) }} />
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>
    )
}

export default AddComplaint;