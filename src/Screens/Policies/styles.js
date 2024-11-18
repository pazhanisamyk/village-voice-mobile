import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";
import Colors from "../../Styles/Colors";

const Styles = StyleSheet.create({
    container: {
        height: height,
        flex: 1,
        backgroundColor: Colors.background
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
        color: Colors.white,
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
    toggleIcon:{
        height: moderateScale(15),
        width: moderateScale(15),
    },
    outerContainer:{
        marginHorizontal: moderateScale(20),
        marginBottom: moderateScale(60),
        alignItems: 'center'
    },
    helpContainer:{
        marginTop: moderateScale(20),
        width: '100%',
        marginBottom: moderateScale(80)
    },
    helpTitleView:{
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    helpContentView:{
        borderTopWidth: moderateScale(1),
        borderTopColor: Colors.gray1,
        marginTop:moderateScale(20),
        paddingTop: moderateScale(10)
    },
    card:{        
        backgroundColor: Colors.card,
        borderWidth: moderateScale(1),
        borderColor: Colors.gray1,
        borderRadius: moderateScale(16),
        padding: moderateScale(15),
        marginVertical: moderateScale(10)
    },
    cardTitle:{
        fontSize: textScale(14),
        color: Colors.white,
        fontWeight: '600',
    },
    cardContent:{
        fontSize: textScale(12),
        color: Colors.white,
        fontWeight: '600',
    },
    policySection:{
        marginVertical: moderateScale(20),
    },
    policyTitle: {
        fontSize: textScale(18),
        fontWeight: '600',
        marginBottom: moderateScale(8),
        color: Colors.gray2,
    },
    policyText: {
        fontSize: textScale(16),
        fontWeight: '400',
        color: Colors.gray1,
        marginBottom: moderateScale(4),
    },
});

export default Styles;