import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    Container:{
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(50),
        width: '100%',
        borderRadius: moderateScale(50)
    },
    title:{
        textAlign: 'center',
        fontSize: textScale(14),
        fontWeight: '600',
    },
    button:{
        height: '100%',
         width: '100%',
         alignItems: 'center',
         justifyContent: 'center'
        }
})
export default getStyles;