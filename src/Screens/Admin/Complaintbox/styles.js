import { StyleSheet } from "react-native";
import { height, moderateScale, textScale } from "../../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.background
    },
    createcomplainttext: {
        fontSize: textScale(14),
        fontWeight: '600',
        color: themes.white
    },
    createcomplaintbtn: {
        height: moderateScale(60),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(16),
        borderColor: themes.card1,
        marginBottom: moderateScale(20),
        marginTop: moderateScale(10)
    },
    complaintlist: {
        height: moderateScale(85),
        borderRadius: moderateScale(16),
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
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
        color: themes.gray
    },
    complaintscount: {
        fontSize: textScale(24),
        fontWeight: '700',
        color: themes.white,
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
        width: moderateScale(40),
        borderRadius: moderateScale(8)
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
        color: themes.white,
    },
    compsolvecount: {
        fontSize: textScale(12),
        fontWeight: '500',
        color: themes.gray,
    },
    progressoutline:{
        height: moderateScale(3),
        borderRadius: moderateScale(9),
        backgroundColor: themes.card1,
        width: '90%',
        marginLeft: '5%'
    },
    progress:{
        height: moderateScale(3),
        borderRadius: moderateScale(9),
    }
})

export default getStyles;