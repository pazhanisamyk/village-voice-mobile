import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Imagepaths from "../../../Constants/Imagepaths";
import getStyles from "./styles";
import { moderateScale } from "../../../Styles/ResponsiveSizes";
import strings from "../../../Constants/languages";
import { useTheme } from "../../../Constants/themes";

const ViewComplaints = ({ navigation, route }) => {
    const {themes } = useTheme();
    const Styles = getStyles(themes);
    const complaintData = route?.params?.data || {};
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
                    <Text style={Styles.headertext}>{complaintData?.category}</Text>
                </View>
                <View style={Styles.outerContainer}>
                    {complaintData?.imageUrl ? <Image source={{uri:complaintData?.imageUrl}} style={Styles.image} /> : <Image source={Imagepaths.Launcher} style={Styles.image} />}
                    <Text style={Styles.descriptionText}>{strings.DESCRIPTION}</Text>
                    <View style={Styles.desContainer}>
                        <Text style={Styles.description}>{complaintData?.description}</Text>
                    </View>
                    <Text style={[Styles.descriptionText, {marginTop: moderateScale(20)}]}>{strings.RULES_TO_FOLOW}</Text>
                    <View style={Styles.desContainer}>
                        <Text style={Styles.description}>1. {strings.RULE_ONE} </Text>
                        <Text style={Styles.description}>2. {strings.RULE_TWO} </Text>
                        <Text style={Styles.description}>3. {strings.RULE_THREE} </Text>
                        <Text style={Styles.description}>4. {strings.RULE_FOUR} </Text>
                    </View>
                </View>
                <View style={Styles.createComplaint}>
                    <TouchableOpacity style={Styles.plusBtn} onPress={() => navigation.navigate('AddComplaint', {data: complaintData})}>
                        <Image source={Imagepaths.Plus} style={Styles.plusIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default ViewComplaints;