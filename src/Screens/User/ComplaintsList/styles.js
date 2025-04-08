import { StyleSheet } from "react-native";
import { moderateScale, textScale, width } from "../../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: themes.background
    },
    editprofileContainer:{ 
        margin: moderateScale(20),
        paddingVertical: moderateScale(20),
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(16),
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        marginBottom: moderateScale(100)
    },
    ComplaintsList:{
        width: width-moderateScale(60),
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
    image:{
        height: moderateScale(55),
        width: moderateScale(95)
    }
})

export default getStyles