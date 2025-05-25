import { Image, View } from "react-native"
import Imagepaths from "../../Constants/Imagepaths"
import getStyles from "./styles"
import { useEffect, useState } from "react"
import { getUserData } from "../../Utils/Utils"
import { changeLaguage } from "../../Constants/languages"
import { useTheme } from "../../Constants/themes"
import actions from "../../Redux/actions"
import { saveUserData } from "../../Redux/actions/auth"
import NavigationStrings from "../../Constants/NavigationStrings"

const SplashScreen = ({navigation}) => {
    const {themes, changeTheme } = useTheme();
    const Styles = getStyles(themes);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        viewProfile();  
    }, []);

    const viewProfile = async () => {
        setIsLoading(true);
        let userData = await getUserData();
        console.log(userData,'userData');
        
        

        if(!userData?.token){
            navigation.navigate(NavigationStrings.WELCOME_SCREEN);
            setIsLoading(false);
        }
        else{
    
        try {
            const res = await actions.viewProfile();            
            changeTheme(res?.data?.theme);
            changeLaguage(res?.data?.language);
            saveUserData(res?.data);
    
            if (res?.data?.role === 'user') {
                navigation.navigate(NavigationStrings.USER_TAB_ROUTES);
            } else if (res?.data?.role === 'admin') {
                navigation.navigate(NavigationStrings.ADMIN_TAB_ROUTES);
            } else {
                navigation.navigate(NavigationStrings.WELCOME_SCREEN);
            }
        } catch (error) {
            navigation.navigate(NavigationStrings.WELCOME_SCREEN);
        } finally {
            setIsLoading(false);
        }

    }
    };    
    
    
    return(
        <>
        {isLoading ? <View style={Styles.container}>
            <Image source={Imagepaths.transparent_logo} style={Styles.image} />
        </View>
         : null}
         </>
    )
}

export default SplashScreen;