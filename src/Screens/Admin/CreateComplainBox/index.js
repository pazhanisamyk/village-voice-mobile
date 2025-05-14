import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import getStyles from "./styles";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../../../Components/CustomButton";
import { moderateScale, textScale } from "../../../Styles/ResponsiveSizes";
import { useTheme } from "../../../Constants/themes";
import { launchImageLibrary } from "react-native-image-picker";
import RNPickerSelect from 'react-native-picker-select';
import AlertPopup from "../../../Components/AlertPopup";
import { showError, showSuccess } from "../../../Utils/helperfunctions";
import actions from "../../../Redux/actions";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const CreateComplainBox = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [complaintBoxName, setComplaintBoxName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const inputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTAb, setSelectedTab] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isWarningVisible, setIsWarningVisible] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [categoryList, setCategoryList] = useState([])
    const userData = useSelector((state) => state?.auth?.userData);
    const isFocused = useIsFocused();

    const TAbs = [{ id: 1, name: 'Add new category' }, { id: 2, name: 'Use old category' }];

    useEffect(() => {
        if (isFocused) {
            getAllComplaintBoxes();
        }
    }, [isFocused]);

    const getAllComplaintBoxes = async () => {
        try {
            const res = await actions.getAllComplaintBox(); // remove the callback, assume it returns a Promise
            console.log(res, '📦 All Complaint Boxes');
            let category = [];
            res?.map(item => {
                category.push({ label: item.category, value: item.category })
            })
            setCategoryList(category)
        } catch (error) {
            console.log(error, '❌ Error while fetching complaint boxes');
        }
    };

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
        } else if (categoryList.length > 0) {
            
            const existingCategory = categoryList.find(item => item.label == category);
        
            if (existingCategory) {
                setIsWarningVisible(true);
                setWarningMessage(
                    `A complaint box for the '${category}' category already exists. This action won't create a new one but will update the existing '${category}' complaint box. Would you like to proceed with the update?`
                );
            } else {                
                createComplaintBox();
            }
        } else {
            createComplaintBox();
        }
    };
    const errorMethod = (error) => {
        console.log(error?.message || error?.error);
        showError(error?.message || error?.error);
    };

    const createComplaintBox = async () => {
        setIsWarningVisible('');
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

        try {
            await actions.createComplaintBox(formData, headers)  // ✅ send formData instead of data object
                .then((res) => {
                    onPressBack();
                    showSuccess(res?.message);
                })
                .catch(errorMethod);
        } catch (error) {
            console.error('Upload error:', error);
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
                    <Text style={Styles.headertext}>Create Complain Box</Text>
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
                        <Text style={Styles.title}>Category</Text>
                        {categoryList.length > 0 ?
                            <>
                                <View style={Styles.tabContainer}>
                                    <FlatList
                                        data={TAbs}
                                        renderItem={rendertabs}
                                        keyExtractor={item => item.id.toString()}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                                {selectedTAb == 1 ? <TextInput
                                    placeholderTextColor={themes.gray}
                                    ref={inputRef}
                                    value={category}
                                    placeholder="Enter Category"
                                    onChangeText={(text) => setCategory(text)}
                                    style={Styles.inputStyle}
                                /> : <RNPickerSelect
                                    onValueChange={(value) => setCategory(value)}
                                    value={category}
                                    items={categoryList}
                                    placeholder={{
                                        label: 'Select a category',
                                        value: null,
                                        color: themes.gray,
                                    }}
                                    style={{
                                        inputIOS: {
                                            color: themes.white,
                                            fontWeight: '600',
                                            fontSize: textScale(12),
                                            paddingLeft: moderateScale(10),
                                            paddingVertical: moderateScale(10), // for iOS padding
                                        },
                                        inputAndroid: {
                                            color: themes.white,
                                            fontWeight: '600',
                                            fontSize: textScale(12),
                                            paddingLeft: moderateScale(10),
                                        },
                                        placeholder: {
                                            color: themes.gray,
                                        },
                                        viewContainer: {
                                            borderWidth: moderateScale(1),
                                            borderColor: themes.gray,
                                            borderRadius: moderateScale(16),
                                            marginTop: moderateScale(5),
                                            marginBottom: moderateScale(15),
                                            width: '100%',
                                        },
                                    }}
                                />}
                            </> :
                            <TextInput
                                placeholderTextColor={themes.gray}
                                ref={inputRef}
                                value={category}
                                placeholder="Enter Category"
                                onChangeText={(text) => setCategory(text)}
                                style={Styles.inputStyle}
                            />}



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
            <AlertPopup isCancelVisible={isWarningVisible} isModalVisible={isWarningVisible} onPressCancel={() => setIsWarningVisible(false)} onPressSubmit={createComplaintBox} message={warningMessage} />
        </ScrollView>
    )
}

export default CreateComplainBox;