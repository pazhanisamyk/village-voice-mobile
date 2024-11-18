import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import Styles from "./styles";
import Colors from "../../../Styles/Colors";
import { useRef, useState } from "react";
import CustomButton from "../../../Components/CustomButton";
import { moderateScale } from "../../../Styles/ResponsiveSizes";

const CreateComplainBox = ({navigation}) => {
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
                            placeholderTextColor={Colors.gray}
                            ref={inputRef}
                            value={complaintBoxName}
                            placeholder="Enter Complaint Box Name"
                            onChangeText={(text) => setComplaintBoxName(text)}
                            style={Styles.inputStyle}
                        />
                        <Text style={Styles.title}>Description</Text>
                        <TextInput
                            placeholderTextColor={Colors.gray}
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
                            placeholderTextColor={Colors.gray}
                            ref={inputRef}
                            value={category}
                            placeholder="Enter Category"
                            onChangeText={(text) => setCategory(text)}
                            style={Styles.inputStyle}
                        />

                    </View>
                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[Colors.red, Colors.red]}
                        title="Save"
                        textColor={Colors.white}
                        ButtonStyles={{ marginTop: moderateScale(40) }} />
                </View>
                </View>
                </ScrollView>
    )
}

export default CreateComplainBox;