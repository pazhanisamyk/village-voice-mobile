import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Imagepaths from "../../../Constants/Imagepaths";
import Styles from "./styles";
import { moderateScale } from "../../../Styles/ResponsiveSizes";

const ViewComplaints = ({ navigation, route }) => {
    const Header = route?.params?.Header || "Default Header";
    const onPressBack = () => {
        navigation.goBack();
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>{Header}</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <Image source={Imagepaths.logo} style={Styles.image} />
                    <Text style={Styles.descriptionText}>Description</Text>
                    <View style={Styles.desContainer}>
                        <Text style={Styles.description}>SETI Complaint Box provides an accessible, user-friendly, and secure platform for students to submit complaints and voice their concerns. By using the SETI Complaint Box, students can contribute to the ongoing improvement of SETI's academic and non-academic environment, ensuring a positive and productive learning experience for all.</Text>
                    </View>
                    <Text style={[Styles.descriptionText, {marginTop: moderateScale(20)}]}>Rules To Follow</Text>
                    <View style={Styles.desContainer}>
                        <Text style={Styles.description}>1. Be specific and detailed </Text>
                        <Text style={Styles.description}>2. Use respectful language </Text>
                        <Text style={Styles.description}>3. Provide evidence or examples </Text>
                        <Text style={Styles.description}>4. Avoid submitting duplicate complaints </Text>
                    </View>
                </View>
                <View style={Styles.createComplaint}>
                    <TouchableOpacity style={Styles.plusBtn} onPress={() => navigation.navigate('AddComplaint')}>
                        <Image source={Imagepaths.Plus} style={Styles.plusIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default ViewComplaints;