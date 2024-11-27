import { Image, View } from "react-native"
import Imagepaths from "../../Constants/Imagepaths"
import Styles from "./styles"
import { useEffect } from "react"
import { getProfileData } from "../../Utils/Utils"
import { changeLaguage } from "../../Constants/languages"

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        const UserData = async () => {
            navigation.navigate('WelcomeScreen');
            // try {
            //     const res = await getProfileData();
            //     if (res?.language === 'en') {
            //         changeLaguage('en');
            //     }
            //     else if (res?.language === 'ta') {
            //         changeLaguage('ta');
            //     }
            //     if (res?.role === 'user') {
            //         navigation.navigate('UserTabroutes');
            //     } else if (res?.role === 'admin') {
            //         navigation.navigate('AdminTabroutes');
            //     } else {
            //         navigation.navigate('WelcomeScreen');
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        };
        
        setTimeout(() => {
            UserData();            
        }, 2000);
        
    }, []);
    
    
    return(
        <View style={Styles.container}>
            <Image source={Imagepaths.Launcher} style={Styles.image} />
        </View>
    )
}

export default SplashScreen;