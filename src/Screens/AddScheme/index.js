import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import getStyles from "./styles";
import { useTheme } from "../../Constants/themes";
import Imagepaths from "../../Constants/Imagepaths";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import CustomButton from "../../Components/CustomButton";
import { useRef, useState } from "react";
import AlertPopup from "../../Components/AlertPopup";
import { launchImageLibrary } from 'react-native-image-picker';
import { showError, showSuccess } from "../../Utils/helperfunctions";
import actions from "../../Redux/actions";
import CustomLoader from "../../Components/Loaders";
import strings from "../../Constants/languages";

const AddScheme = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);

    const [schemeName, setSchemeName] = useState('');
    const [schemeUrl, setSchemeUrl] = useState('');
    const [schemeDesc, setSchemeDesc] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

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
            } else if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const handleCreateScheme = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('schemeName', schemeName);
        formData.append('schemeUrl', schemeUrl);
        formData.append('schemeDesc', schemeDesc);

        const fileName = imageUri.split('/').pop();
        const fileType = fileName.split('.').pop();
        formData.append('image', {
            uri: imageUri,
            name: fileName,
            type: `image/${fileType}`
        });

        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        try {
            const res = await actions.createScheme(formData, headers);
            showSuccess(res?.message || 'Scheme created successfully');
            navigation.goBack();
        } catch (error) {
            console.log(error);
            showError(error?.response?.data?.message || 'Failed to create scheme');
        } finally {
            setIsLoading(false);
        }
    };

    const validateInput = () => {
        if (!schemeName.trim()) {
            setAlertMessage(`${strings.SCHEME_NAME} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!schemeUrl.trim()) {
            setAlertMessage(`${strings.SCHEME_URL} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!schemeDesc.trim()) {
            setAlertMessage(`${strings.SCHEME_DESC} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!imageUri) {
            setAlertMessage(`${strings.SCHEME_IMAGE} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else {
            handleCreateScheme();
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={() => navigation.goBack()}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>{strings.CREATE_SCHEME}</Text>
                </View>

                <View style={Styles.outerContainer}>
                    <View style={Styles.formContainer}>
                        <Text style={Styles.title}>{strings.SCHEME_NAME}</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            value={schemeName}
                            placeholder={strings.ENTER_SCHEME_NAME}
                            onChangeText={setSchemeName}
                            style={Styles.inputStyle}
                        />

                        <Text style={Styles.title}>{strings.SCHEME_URL}</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            value={schemeUrl}
                            placeholder={strings.ENTER_SCHEME_URL}
                            onChangeText={setSchemeUrl}
                            style={Styles.inputStyle}
                            autoCapitalize="none"
                            keyboardType="url"
                        />

                        <Text style={Styles.title}>{strings.SCHEME_DESC}</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            value={schemeDesc}
                            placeholder={strings.ENTER_SCHEME_DESC}
                            onChangeText={setSchemeDesc}
                            multiline
                            numberOfLines={4}
                            style={[Styles.inputStyle, { height: moderateScale(80), textAlignVertical: 'top', paddingTop: moderateScale(10) }]}
                        />

                        <Text style={Styles.title}>{strings.SCHEME_IMAGE}</Text>
                        <TouchableOpacity onPress={selectImage} style={Styles.imagePicker}>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={Styles.previewImage} />
                            ) : (
                                <Text style={Styles.pickerPlaceholder}>Select Image</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[themes.red, themes.red]}
                        title={strings.CREATE_SCHEME}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(30), marginBottom: moderateScale(40) }}
                    />
                </View>

                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>
    );
};

export default AddScheme;
