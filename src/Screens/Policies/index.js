import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import Imagepaths from "../../Constants/Imagepaths";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../Redux/actions";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import { useTheme } from "../../Constants/themes";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import CustomLoader from "../../Components/Loaders";
import strings from "../../Constants/languages";

const PoliciesScreen = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [policiesData, setPoliciesData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };

    useEffect(() => {
        if (isFocused) {
            getPoliciesData();
        }

    }, [isFocused]);

    const getPoliciesData = async () => {
        setIsLoading(true);
        try {
            const res = await actions.policies();
            setPoliciesData(res?.policies);
            showSuccess(res?.message)
        }
        catch (error) {
            errorMethod(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const onPressBack = () => {
        navigation.goBack();
    }


    return (
        <View style={Styles.container}>
            <View style={Styles.topContainer}>
                <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                    <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                </TouchableOpacity>
                <Text style={Styles.headertext}>{strings.POLICIES}</Text>
            </View>
            <View style={Styles.outerContainer}>
                <ScrollView contentContainerStyle={{ paddingBottom: moderateScale(80) }} showsVerticalScrollIndicator={false}>
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
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default PoliciesScreen;