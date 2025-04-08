import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import Imagepaths from "../../Constants/Imagepaths";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../Redux/actions";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import { useTheme } from "../../Constants/themes";
import { moderateScale } from "../../Styles/ResponsiveSizes";

const PoliciesScreen = ({ navigation }) => {
    const {themes } = useTheme();
    const Styles = getStyles(themes);
    const [policiesData, setPoliciesData] = useState({})
    const isFocused = useIsFocused();

    const errorMethod = (error) => {
        console.log(error?.message || error?.error);
        showError(error?.message || error?.error);
    };

    useEffect(() => {
        if (isFocused) {
            const getPoliciesData = async () => {
                await actions.policies()
                    .then((res) => {
                        console.log(res?.policies);
                        
                        setPoliciesData(res?.policies);
                        showSuccess(res?.message)
                    })
                    .catch(errorMethod);
            }

            getPoliciesData();
        }

    }, [isFocused])

    const onPressBack = () => {
        navigation.goBack();
    }


    return (
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>Policies</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <ScrollView contentContainerStyle={{paddingBottom:moderateScale(80)}} showsVerticalScrollIndicator = {false}>
                {Object.values(policiesData).map((policy, index) => (
                <View key={index} style={Styles.policySection}>
                    <Text style={Styles.policyTitle}>{policy.title}</Text>
                    {policy.content.map((paragraph, i) => (
                        <Text key={i} style={Styles.policyText}>{paragraph}</Text>
                    ))}
                </View>
            ))}
            </ScrollView>

                </View>
            </View>
    )
}

export default PoliciesScreen;