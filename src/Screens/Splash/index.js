import { Image, View } from "react-native"
import Imagepaths from "../../Constants/Imagepaths"
import Styles from "./styles"
import { useEffect } from "react"
import { getUserData } from "../../Utils/Utils"

const SplashScreen = ({navigation}) => {

    useEffect(()=>{
        const UserData = async()=>{
            await getUserData().then(res => {
                console.log(res);
                
            }).catch(error =>{
                console.log(error);
                
            })
        }
        UserData()
    },[])
    
    return(
        <View style={Styles.container}>
            <Image source={Imagepaths.Launcher} style={Styles.image} />
        </View>
    )
}

export default SplashScreen;