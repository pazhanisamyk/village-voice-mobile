import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";

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
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headertext: {
        textAlign: 'center',
        fontSize: textScale(16),
        color: themes.white,
        fontWeight: '400'
    },
    backArrow:{
        position: 'absolute',
        left: moderateScale(20),
    },
    outerContainer:{
        marginHorizontal: moderateScale(20),
        alignItems: 'center'
    },
    backIcon:{
        height: moderateScale(20),
        width: moderateScale(20),
    },
    profileOutline:{
        height: moderateScale(150),
        width: moderateScale(150),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(100),
    },
    image:{
        height: moderateScale(130),
        width: moderateScale(130),
        borderRadius: moderateScale(100)
    },
    camera:{
        height: moderateScale(40),
        width: moderateScale(40),
        position: 'absolute',
        right: moderateScale(10),
        bottom: moderateScale(10)
    },
    editprofileContainer:{
        width: '100%',
        marginTop: moderateScale(60),
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