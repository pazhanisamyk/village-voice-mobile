import { StyleSheet } from "react-native";
import Colors from "../../Styles/Colors";
import { moderateScale, moderateScaleVertical, textScale } from "../../Styles/ResponsiveSizes";

const Styles = StyleSheet.create({
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
        backgroundColor: Colors.white,
        padding: moderateScale(20),
        borderRadius: moderateScale(10),
    },
    messageText: {
        fontSize: textScale(14),
        fontWeight: '500',
        color: Colors.background
    },
    closeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(16),
        paddingHorizontal: moderateScale(15),
        backgroundColor: Colors.blue,
    },
    closeButtonText: {
        color: Colors.white,
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
        color: Colors.red1,
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

export default Styles;