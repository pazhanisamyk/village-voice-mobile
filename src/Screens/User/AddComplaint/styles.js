import { StyleSheet } from "react-native";
import Colors from "../../../Styles/Colors";
import { height, moderateScale, textScale, width } from "../../../Styles/ResponsiveSizes";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        backgroundColor: Colors.background
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
        color: Colors.white,
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
        backgroundColor: Colors.card,
        borderWidth: moderateScale(1),
        borderColor: Colors.gray1
    },
    title:{
        alignSelf: 'flex-start',
        fontSize: textScale(12),
        color: Colors.gray,
        fontWeight: '500'
    },
    inputStyle:{
        color: Colors.white,
        borderWidth:moderateScale(1),
        borderColor:Colors.gray,
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
        borderColor:Colors.gray,
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

export default Styles;