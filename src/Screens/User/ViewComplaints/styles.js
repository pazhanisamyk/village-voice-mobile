import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        backgroundColor: themes.background
    },
    topContainer: {
        marginTop: moderateScale(30),
        width: width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headertext: {
        textAlign: 'center',
        fontSize: textScale(16),
        color: themes.white,
        fontWeight: '400'
    },
    createComplaint: {
        height: moderateScale(60),
        width: moderateScale(60),
        borderRadius: moderateScale(100),
        backgroundColor: themes.red,
        position: 'absolute',
        right: moderateScale(30),
        bottom: moderateScale(60),
    },
    plusIcon: {
        height: moderateScale(20),
        width: moderateScale(20),
    },
    plusBtn: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backArrow: {
        position: 'absolute',
        left: moderateScale(20),
    },
    outerContainer: {
        marginHorizontal: moderateScale(20),
        alignItems: 'center'
    },
    backIcon: {
        height: moderateScale(20),
        width: moderateScale(20),
    },
    image: {
        marginTop: moderateScale(10),
        height: moderateScale(130),
        width: moderateScale(130),
        borderRadius: moderateScale(100)
    },
    desContainer: {
        width: '100%',
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(16),
        borderColor: themes.gray1,
        padding: moderateScale(15)
    },
    descriptionText:{
        fontSize: textScale(12),
        color: themes.gray2,
        fontWeight: '500',
        marginTop: moderateScale(40),
        marginBottom: moderateScale(10)
    },
    description:{
        fontSize: textScale(12),
        color: themes.white,
        fontWeight: '500',
    }    
});

export default getStyles;