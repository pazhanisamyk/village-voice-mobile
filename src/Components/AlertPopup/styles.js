import { StyleSheet } from "react-native";
import { moderateScale, moderateScaleVertical, textScale } from "../../Styles/ResponsiveSizes";

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
        backgroundColor: themes.white,
        padding: moderateScale(20),
        borderRadius: moderateScale(10),
    },
    messageText: {
        fontSize: textScale(14),
        fontWeight: '500',
        color: themes.background
    },
    closeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(16),
        paddingHorizontal: moderateScale(15),
        backgroundColor: themes.blue,
    },
    closeButtonText: {
        color: themes.white,
        fontSize: textScale(16),
        fontWeight: '500',
        paddingVertical: moderateScale(5)
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
        justifyContent: 'center'
    },
    footerContainer:{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

export default getStyles;