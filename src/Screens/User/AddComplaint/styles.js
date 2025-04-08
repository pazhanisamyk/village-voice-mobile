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
    editprofileContainer:{
        width: '100%',
        marginTop: moderateScale(40),
        padding: moderateScale(20),
        borderRadius: moderateScale(16),
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderColor: themes.gray1
    },
    title:{
        alignSelf: 'flex-start',
        fontSize: textScale(12),
        color: themes.gray,
        fontWeight: '500'
    },
    inputStyle:{
        color: themes.white,
        borderWidth:moderateScale(1),
        borderColor:themes.gray,
        borderRadius: moderateScale(16),
        marginTop: moderateScale(5),
        paddingLeft: moderateScale(10),
        marginBottom: moderateScale(15),
        width: '100%',
        fontWeight: '600',
        fontSize: textScale(12)
    },
    imageOutline:{
        alignItems: 'center',
        justifyContent: 'center',
        height:moderateScale(150),
        borderWidth:moderateScale(1),
        borderColor:themes.gray,
        borderRadius: moderateScale(16),
        marginTop: moderateScale(5),
        paddingLeft: moderateScale(10),
        marginBottom: moderateScale(15),
        width: '100%',
    },
    cameraIcon:{
        height: moderateScale(60),
        width: moderateScale(60),
    },
    selectedImage:{
        height: moderateScale(120),
        width: moderateScale(120),
        borderRadius: moderateScale(16)
    }
});

export default getStyles;