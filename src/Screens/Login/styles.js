import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.background
    },
    gradient: {
        zIndex: -1,
        height: height,
        width: width
    },
    bottomContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: moderateScale(30),
        width: '90%',
        marginLeft: '5%'
    },
    topContainer: {
        position: 'absolute',
        top: moderateScale(30),
        width: width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headertext: {
        textAlign: 'center',
        fontSize: textScale(18),
        color: themes.white,
        fontWeight: 'bold'
    },
    title:{
        alignSelf: 'flex-start',
        fontSize: textScale(12),
        color: themes.white,
        fontWeight: '500'
    },
    inputStyle:{
        zIndex:1,
        borderWidth:moderateScale(1),
        borderColor:themes.gray,
        borderRadius: moderateScale(16),
        marginTop: moderateScale(5),
        paddingLeft: moderateScale(10),
        marginBottom: moderateScale(15),
        width: '100%',
        color: themes.white,
        fontWeight: '600',
        fontSize: textScale(12)
    },
    signintext:{
        fontSize: textScale(14),
        fontWeight: '400',
        color: themes.white,
        marginTop: moderateScale(50),
    },
    forgotpassword:{
        alignSelf: 'flex-end'
    },
    forgottext:{
        fontSize: textScale(14),
        fontWeight: '400',
        color: themes.white
    },
    passwordContainer:{
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    eye:{
        height: moderateScale(25),
        width: moderateScale(25),
    },
    eyeOutline:{
        zIndex: 1,
        position: 'absolute',
        top: moderateScale(15),
        right: moderateScale(20)
    }
});

export default getStyles;