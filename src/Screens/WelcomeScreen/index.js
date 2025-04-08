import { Image, Text, View } from "react-native";
import getStyles from "./Styles";
import CustomButton from "../../Components/CustomButton";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import Imagepaths from "../../Constants/Imagepaths";
import { useTheme } from "../../Constants/themes";

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
                <Text style={Styles.description}>Make your village complain free with</Text>
                <Text style={Styles.description}>“Village Complain Box”</Text>
                <CustomButton
                    onPress={onPressNewUser}
                    gradientColors={[themes.blue, themes.blue]}
                    title="Get started"
                    textColor={themes.white}
                    ButtonStyles={{ marginTop: moderateScale(30)}} />
                <CustomButton
                    onPress={onPressOldUser}
                    gradientColors={[themes.red, themes.red]}
                    title="I have an account"
                    textColor={themes.white}
                    ButtonStyles={{ marginTop: moderateScale(20) }} />
            </View>
        </View>
    )

}

export default WelcomeScreen;