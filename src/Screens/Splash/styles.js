import { StyleSheet } from "react-native";
import { height, moderateScale, width } from "../../Styles/ResponsiveSizes";
import Colors from "../../Styles/Colors";

const Styles = StyleSheet.create({
    container:{
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white
    },
    image:{
        height: moderateScale(200),
        width: moderateScale(200),
    }
})

export default Styles;