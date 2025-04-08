import { StyleSheet } from "react-native";
import { height, moderateScale, width } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container:{
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.white
    },
    image:{
        height: moderateScale(500),
        width: moderateScale(500),
    }
})

export default getStyles;