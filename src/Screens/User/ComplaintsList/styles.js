import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../../Styles/ResponsiveSizes";
import Colors from "../../../Styles/Colors";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    editprofileContainer:{ 
        margin: moderateScale(20),
        paddingVertical: moderateScale(20),
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(16),
        backgroundColor: Colors.card,
        borderWidth: moderateScale(1),
        borderColor: Colors.gray1,
    },
    ComplaintsList:{
        width: width-moderateScale(60),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.black3,
        padding: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',        
        marginVertical: moderateScale(10),
    },
    complaintId:{
        fontSize: textScale(16),
        color: Colors.white,
        fontWeight: '500'
    },
    complaintTitle:{
        fontSize: textScale(14),
        color: Colors.gray,
        fontWeight: '400'
    },
    ComplaintsText:{
        width: '65%'
    },
    image:{
        height: moderateScale(55),
        width: moderateScale(95),
        borderRadius: moderateScale(5),
        backgroundColor: Colors.white,
        borderWidth: moderateScale(1),
        borderColor: Colors.gray
    }
})

export default Styles