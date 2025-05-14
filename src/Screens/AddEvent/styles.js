import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        backgroundColor: themes.background,
        height: height
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
    backIcon:{
        height: moderateScale(20),
        width: moderateScale(20),
    },    
    outerContainer:{
        marginHorizontal: moderateScale(20),
        alignItems: 'center'
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
});

export default getStyles;