import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container:{
        borderRadius: moderateScale(16),
        borderWidth: moderateScale(1),
        backgroundColor: themes.card,
        borderColor: themes.gray1,
        marginBottom: moderateScale(10),
        padding: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(200)
    },
    title:{
        fontSize: textScale(18),
        color: themes.white,
        marginTop: moderateScale(5),
        fontWeight: '700',
    },
});

export default getStyles;