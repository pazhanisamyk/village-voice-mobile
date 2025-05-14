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
    },
    createComplaint:{
        height: moderateScale(60),
        width: moderateScale(60),
        borderRadius: moderateScale(100),
        backgroundColor: themes.red,
        position: 'absolute',
        right: moderateScale(20),
        bottom: moderateScale(100),
    },
    plusIcon:{
        height: moderateScale(20),
        width: moderateScale(20),
    },
    plusBtn:{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default getStyles;