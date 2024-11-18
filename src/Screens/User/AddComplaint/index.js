import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import Styles from "./styles";
import { useRef, useState } from "react";
import CustomButton from "../../../Components/CustomButton";
import { moderateScale } from "../../../Styles/ResponsiveSizes";
import Colors from "../../../Styles/Colors";

const AddComplaint = ({navigation}) => {
    const [complaintTitle, setComplaintTitle] = useState('');
    const [description, setDescription] = useState('');
    const inputRef = useRef(null);
    const onPressBack = () => {
        navigation.goBack();
    }

    const validateInput = () => {

    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.container}>
            <View style={Styles.topContainer}>
                <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                    <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                </TouchableOpacity>
                <Text style={Styles.headertext}>Add Complaint</Text>
            </View>
            <View style={Styles.outerContainer}>
            <View style={Styles.editprofileContainer}>
                        <Text style={Styles.title}>Title of Complaint</Text>
                        <TextInput
                            placeholderTextColor={Colors.gray}
                            ref={inputRef}
                            value={complaintTitle}
                            placeholder="Enter Title of Complaint"
                            onChangeText={(text) => setComplaintTitle(text)}
                            style={Styles.inputStyle}
                        />
                        <Text style={Styles.title}>Description</Text>
                        <TextInput
                            placeholderTextColor={Colors.gray}
                            ref={inputRef}
                            value={description}
                            placeholder="Enter Description of Complaint"
                            onChangeText={(text) => setDescription(text)}
                            style={[Styles.inputStyle, {height: moderateScale(150)}]}
                            multiline={true}
                            textAlignVertical="top" 
                        />
                        <Text style={Styles.title}>Additional Information</Text>
                        <TouchableOpacity style={Styles.imageOutline}>
                    <Image resizeMode="contain" source={Imagepaths.camera1} style={Styles.cameraIcon} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={Styles.imageOutline}>
                    <Image source={Imagepaths.logo} style={Styles.selectedImage} />
                        </TouchableOpacity> */}
                    </View>
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[Colors.red, Colors.red]}
                        title="Submit Your Complaint"
                        textColor={Colors.white}
                        ButtonStyles={{ marginTop: moderateScale(40) }} />
                </View>
                </View>
                </ScrollView>
    )
}

export default AddComplaint;