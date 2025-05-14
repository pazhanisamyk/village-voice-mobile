import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.background
    },
    complaints:{
        height: moderateScale(180),
        width: '45%',
        borderRadius: moderateScale(16),
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        backgroundColor: themes.card,
        margin: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(10)
    },
    image:{
        height: moderateScale(75),
        width: moderateScale(75),
        borderRadius: moderateScale(8)
    },
    complaintText:{
        fontSize: textScale(14),
        color: themes.white,
        fontWeight: '600',
        marginVertical: moderateScale(10)
    },
    arrowRight:{
        alignSelf: 'flex-end',
        height: moderateScale(26),
        width: moderateScale(26),
        marginRight: moderateScale(10),
    }
});

export default getStyles;