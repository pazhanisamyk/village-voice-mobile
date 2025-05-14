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
    outerContainer:{
        marginHorizontal: moderateScale(20),
        alignItems: 'center',
        paddingBottom: moderateScale(100)
    },
    backIcon:{
        height: moderateScale(20),
        width: moderateScale(20),
    },
    editprofileContainer:{
        width: '100%',
        marginTop: moderateScale(20),
        padding: moderateScale(20),
        borderRadius: moderateScale(16),
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderColor: themes.gray1
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
    complaintBoxDetails:{
        fontSize: textScale(16),
        color: themes.gray,
        marginVertical: moderateScale(5),
        fontWeight: '400',
        lineHeight: moderateScale(25)
    },
    ComplaintsList:{
        width: '90%',
        marginLeft: '5%',
        borderRadius: moderateScale(10),
        backgroundColor: themes.card1,
        padding: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',        
        marginVertical: moderateScale(10),
    },
    complaintId:{
        fontSize: textScale(16),
        color: themes.white,
        fontWeight: '500'
    },
    complaintTitle:{
        fontSize: textScale(14),
        color: themes.gray,
        fontWeight: '400'
    },
    ComplaintsText:{
        width: '65%'
    },
    complaintimage:{
        height: moderateScale(55),
        width: moderateScale(95),
        borderRadius: moderateScale(8)
    }
});

export default getStyles;