import { Image, Text, TouchableOpacity, View } from "react-native";
import Styles from "./Styles";
import CustomButton from "../../Components/CustomButton";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import Colors from "../../Styles/Colors";
import Imagepaths from "../../Constants/Imagepaths";

const WelcomeScreen = ({navigation}) => {

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
                    gradientColors={[Colors.blue, Colors.blue]}
                    title="Get started"
                    textColor={Colors.white}
                    ButtonStyles={{ marginTop: moderateScale(30)}} />
                <CustomButton
                    onPress={onPressOldUser}
                    gradientColors={[Colors.red, Colors.red]}
                    title="I have an account"
                    textColor={Colors.white}
                    ButtonStyles={{ marginTop: moderateScale(20) }} />
            </View>
        </View>
    )

}

export default WelcomeScreen;