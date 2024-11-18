import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../../Styles/ResponsiveSizes";
import Colors from "../../../Styles/Colors";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    createcomplainttext: {
        fontSize: textScale(14),
        fontWeight: '600',
        color: Colors.white
    },
    createcomplaintbtn: {
        height: moderateScale(60),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(16),
        borderColor: Colors.card1,
        marginBottom: moderateScale(20),
        marginTop: moderateScale(10)
    },
    complaintlist: {
        height: moderateScale(85),
        borderRadius: moderateScale(16),
        backgroundColor: Colors.card,
        borderWidth: moderateScale(1),
        borderColor: Colors.gray1,
        marginBottom: moderateScale(10)
    },
    bottomcontainer: {
        width: '90%',
        marginLeft: '5%'
    },
    totalcomplaints: {
        fontSize: textScale(12),
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.gray
    },
    complaintscount: {
        fontSize: textScale(24),
        fontWeight: '700',
        color: Colors.white,
        textAlign: 'center'
    },
    chartouterview: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height/3,
        marginTop: moderateScale(20)
    },
    complaindetails: {
        flexDirection: 'row',
        height: moderateScale(65),
        alignItems: 'center',
        width: '96%',
        marginLeft: '2%'
    },
    imgview: {
        width: '16%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: moderateScale(40),
        width: moderateScale(40)
    },
    detailtxtoutline: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
        paddingLeft: moderateScale(10),
        justifyContent: 'space-between'
    },
    complaintname: {
        fontSize: textScale(14),
        fontWeight: '600',
        color: Colors.white,
    },
    compsolvecount: {
        fontSize: textScale(12),
        fontWeight: '500',
        color: Colors.gray,
    },
    progressoutline:{
        height: moderateScale(3),
        borderRadius: moderateScale(9),
        backgroundColor: Colors.card1,
        width: '90%',
        marginLeft: '5%'
    },
    progress:{
        height: moderateScale(3),
        borderRadius: moderateScale(9),
    }
})

export default Styles;