import { StyleSheet } from "react-native";
import { height, moderateScale, moderateScaleVertical, textScale } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    modalContainer: {
        width: '90%',
        maxHeight: height/1.5,
        backgroundColor: themes.white,
        padding: moderateScale(10),
        borderWidth: moderateScale(1),
        borderColor: themes.gray2,
        borderRadius: moderateScale(10),
    },
    messageText: {
        fontSize: textScale(14),
        fontWeight: '500',
        color: themes.background
    },
    headerOutline:{
        width: '100%',
    },
    headerText:{
        fontSize: textScale(16),
        fontWeight: '700',
        color: themes.red1,
    },
    bodyContainer:{
        width: '100%',
        marginVertical: moderateScaleVertical(20),
        justifyContent: 'center',
        paddingBottom: moderateScale(20)
    },
    closeButton: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(16),
        backgroundColor: themes.red1,
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10)
    },
    closeButtonText: {
        color: themes.white,
        fontSize: textScale(16),
        fontWeight: '600',
        paddingVertical: moderateScale(7)
    },
    footerContainer:{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    options:{
        width: '100%',
        backgroundColor: themes.card1,
        marginVertical: moderateScale(5),
        padding: moderateScale(10),
        borderColor: themes.gray,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(16)
    },
    optionsText:{
        fontSize: textScale(14),
        fontWeight: '700',
        color: themes.white
    }
});

export default getStyles;