import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        backgroundColor: themes.background,
        flex: 1
    },
    topContainer: {
        marginTop: moderateScale(30),
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: moderateScale(10)
    },
    headertext: {
        textAlign: 'center',
        fontSize: textScale(16),
        color: themes.white,
        fontWeight: 'bold'
    },
    backArrow:{
        position: 'absolute',
        left: moderateScale(20),
    },
    backIcon:{
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor: themes.white
    },    
    outerContainer:{
        marginHorizontal: moderateScale(20),
        alignItems: 'center'
    },    
    formContainer:{
        width: '100%',
        marginTop: moderateScale(30),
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
        fontWeight: '500',
        marginBottom: moderateScale(5)
    },
    inputStyle:{
        color: themes.white,
        borderWidth:moderateScale(1),
        borderColor:themes.gray,
        borderRadius: moderateScale(16),
        paddingLeft: moderateScale(10),
        paddingVertical: moderateScale(8),
        marginBottom: moderateScale(15),
        width: '100%',
        fontWeight: '600',
        fontSize: textScale(12)
    },
    imagePicker: {
        width: '100%',
        height: moderateScale(120),
        borderWidth: 1,
        borderColor: themes.gray,
        borderStyle: 'dashed',
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: moderateScale(5)
    },
    pickerPlaceholder: {
        color: themes.gray,
        fontSize: textScale(12)
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
});

export default getStyles;
