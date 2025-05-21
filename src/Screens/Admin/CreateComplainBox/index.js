import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import getStyles from "./styles";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../../../Components/CustomButton";
import { moderateScale } from "../../../Styles/ResponsiveSizes";
import { useTheme } from "../../../Constants/themes";
import { launchImageLibrary } from "react-native-image-picker";
import AlertPopup from "../../../Components/AlertPopup";
import { showError, showSuccess } from "../../../Utils/helperfunctions";
import actions from "../../../Redux/actions";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const CreateComplainBox = ({ navigation, route }) => {
    const complaintData = route?.params?.data || {};    
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [complaintBoxName, setComplaintBoxName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const inputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTAb, setSelectedTab] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updateComplaintBox, setUpdateComplaintBox] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const userData = useSelector((state) => state?.auth?.userData);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && complaintData?.complaintBoxName) {
            setComplaintBoxName(complaintData?.complaintBoxName);
            setDescription(complaintData?.description);
            setCategory(complaintData?.category);
            setUpdateComplaintBox(true);
            setSelectedImage(complaintData?.imageUrl);
            
        }
    }, [isFocused]);

    const onPressBack = () => {
        navigation.goBack();
    }

    const validateInput = () => {
        if (!complaintBoxName.trim()) {
            setAlertMessage("Validation Error, Please enter the complaint box name.");
            setIsModalVisible(true);
        } else if (!description.trim()) {
            setAlertMessage("Validation Error, Please enter the description.");
            setIsModalVisible(true);
        } else if (!category.trim()) {
            setAlertMessage("Validation Error, Please select or enter a category.");
            setIsModalVisible(true);
        } else if (!selectedImage) {
            setAlertMessage("Validation Error, Please select an image.");
            setIsModalVisible(true);
        } else {                
            createComplaintBox();
        }
    };
    const errorMethod = (error) => {
        setIsModalVisible(true);
        setAlertMessage(error?.response?.data?.message);
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };

    const createComplaintBox = async () => {
        const fileName = selectedImage.split('/').pop();
        const fileType = fileName.split('.').pop();
        const formData = new FormData();
        formData.append('complaintBoxName', complaintBoxName);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('image', {
            uri: selectedImage,
            name: String(userData?.phoneNumber),
            type: `image/${fileType}`,
        });

        let headers = {
            'Content-Type': 'multipart/form-data',
        }

        if(updateComplaintBox){
            
        try {
            await actions.updateComplaintBox(formData, headers)
                .then((res) => {
                    navigation.navigate('CreatedComplaintBoxes');
                    showSuccess(res?.message);
                })
                .catch(errorMethod);
        } catch (error) {
            console.error('Upload error:', error);
        }
    }
    else{
        try {
            await actions.createComplaintBox(formData, headers)
                .then((res) => {
                    onPressBack();
                    showSuccess(res?.message);
                })
                .catch(errorMethod);
        } catch (error) {
            console.error('Upload error:', error);
        }        

    }
    };

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

    const seleTab = (id) => {
        setSelectedTab(id)
    }

    const rendertabs = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => seleTab(item.id)}
                style={item.id === selectedTAb ? Styles.selectedtabOutline : Styles.unselectedtabOutline}>
                <Text style={[Styles.tabTitle, { color: item.id === selectedTAb ? themes.white : themes.black }]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>{updateComplaintBox ? 'Update Complain Box' : 'Create Complain Box'}</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <TouchableOpacity onPress={selectImage} style={Styles.profileOutline}>
                        {selectedImage ? (
                            <Image
                                source={{ uri: selectedImage }}
                                style={Styles.image}
                                resizeMode="cover"
                            />
                        ) : (
                            <Image
                                resizeMode="contain"
                                source={Imagepaths.Launcher}
                                style={Styles.image}
                            />
                        )}
                        <Image source={Imagepaths.camera} style={Styles.camera} />
                    </TouchableOpacity>
                    <View style={Styles.editprofileContainer}>
                        <Text style={Styles.title}>Complaint Box Name</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
                            value={complaintBoxName}
                            placeholder="Enter Complaint Box Name"
                            onChangeText={(text) => setComplaintBoxName(text)}
                            style={Styles.inputStyle}
                        />
                        <Text style={Styles.title}>Description</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            ref={inputRef}
                            value={description}
                            placeholder="Enter Description"
                            onChangeText={(text) => setDescription(text)}
                            style={[Styles.inputStyle, { height: moderateScale(150) }]}
                            multiline={true}
                            textAlignVertical="top"
                        />
                        <Text style={Styles.title}>{updateComplaintBox ? 'Category ( view only )' : 'Category'}</Text>
                            <TextInput
                                placeholderTextColor={themes.gray}
                                editable={!updateComplaintBox}
                                ref={inputRef}
                                value={category}
                                placeholder="Enter Category"
                                onChangeText={(text) => setCategory(text)}
                                style={Styles.inputStyle}
                            />



                    </View>
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[themes.red, themes.red]}
                        title="Save"
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(40), marginBottom: moderateScale(60) }} />
                </View>
            </View>
            <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
        </ScrollView>
    )
}

export default CreateComplainBox;