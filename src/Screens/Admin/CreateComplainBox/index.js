import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import getStyles from "./styles";
import { useRef, useState } from "react";
import CustomButton from "../../../Components/CustomButton";
import { moderateScale } from "../../../Styles/ResponsiveSizes";
import { useTheme } from "../../../Constants/themes";

const CreateComplainBox = ({navigation}) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [complaintBoxName, setComplaintBoxName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
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
                <Text style={Styles.headertext}>Create Complain Box</Text>
            </View>
            <View style={Styles.outerContainer}>
                    <TouchableOpacity onPress={() => { }} style={Styles.profileOutline}>
                        <Image source={Imagepaths.logo} style={Styles.image} />
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
                            style={[Styles.inputStyle, {height: moderateScale(150)}]}
                            multiline={true}
                            textAlignVertical="top" 
                        />
                        <Text style={Styles.title}>Category</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
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
                        ButtonStyles={{ marginTop: moderateScale(40) }} />
                </View>
                </View>
                </ScrollView>
    )
}

export default CreateComplainBox;