import { Image, Text, View } from "react-native";
import getStyles from "./Styles";
import CustomButton from "../../Components/CustomButton";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import Imagepaths from "../../Constants/Imagepaths";
import { useTheme } from "../../Constants/themes";
import strings from "../../Constants/languages";

const WelcomeScreen = ({navigation}) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);

    const onPressNewUser = () => {
        navigation.navigate('SignUpScreen')
    }

    const onPressOldUser = () => {
        navigation.navigate('LoginScreen')
    }

    return (
        <View style={Styles.container}>
            <Image source={Imagepaths.welcome} resizeMode="contain" style={Styles.image} />
            <Image source={Imagepaths.gradient} resizeMode="stretch" style={Styles.gradient} />
            <View style={Styles.topContainer}>
                <Text style={Styles.headertext}>VCB</Text>
            </View>
            <View style={Styles.bottomContainer}>
                <Text style={Styles.description}>{strings.WELCOME_MSG}</Text>
                <Text style={Styles.description}>{strings.VILLAGE_COMPLAINT_BOX}</Text>
                <CustomButton
                    onPress={onPressNewUser}
                    gradientColors={[themes.blue, themes.blue]}
                    title={strings.GET_STARTED}
                    textColor={themes.white}
                    ButtonStyles={{ marginTop: moderateScale(30)}} />
                <CustomButton
                    onPress={onPressOldUser}
                    gradientColors={[themes.red, themes.red]}
                    title={strings.I_HAVE_AN_ACCOUNT}
                    textColor={themes.white}
                    ButtonStyles={{ marginTop: moderateScale(20) }} />
            </View>
        </View>
    )

}

export default WelcomeScreen;