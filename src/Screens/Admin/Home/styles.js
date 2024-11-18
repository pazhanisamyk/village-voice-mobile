import { StyleSheet } from "react-native";
import { height, moderateScale, moderateScaleVertical, textScale, width } from "../../../Styles/ResponsiveSizes";
import Colors from "../../../Styles/Colors";

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.background
    },
    userNmae:{
        marginTop: moderateScale(10),
        fontSize: textScale(14),
        fontWeight: '600',
        color: Colors.white
    },
    topview:{
        height: height/2.4,
        width: width,
        borderBottomLeftRadius: moderateScale(24),
        borderBottomRightRadius: moderateScale(24),
        backgroundColor: Colors.lightgray,
    },
    profileView:{
        height: moderateScale(height/5),        
        width: '100%',
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        height: moderateScale(100),
        width: moderateScale(100),
        borderRadius: moderateScale(100)
    },
    statusContainer:{
        height: moderateScale(height/5),
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    ComplaintBox:{
        width: '30%',
        backgroundColor: Colors.card,
        borderWidth: moderateScale(1),
        borderColor: Colors.gray1,
        borderRadius: moderateScale(16),
        height: moderateScale(90),
        alignItems: 'center',
        justifyContent: 'center'
    },
    ComplaintText:{
        textAlign: 'center',
        fontSize: textScale(12),
        fontWeight: '600',
        color: Colors.white,
    },
    ComplaintcountText:{
        fontSize: textScale(14),
        fontWeight: '600',
        color: Colors.white,
    },
    bottomContainer:{
        paddingBottom: moderateScaleVertical(10),
        height: height/2.1,
        width: '90%',
        marginLeft: '5%',
        backgroundColor: 'transparent',
    },
    tabContainer: {
        borderRadius: moderateScale(16),
        backgroundColor: Colors.black1,
        height: moderateScale(50),
        marginVertical: moderateScaleVertical(20),
        flexDirection: 'row',
        alignItems: 'center',
    },    
    selectedtabOutline: {
        backgroundColor: Colors.card,     
        borderWidth: moderateScale(1),
        borderColor: Colors.gray1,
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(6), 
        margin: moderateScale(5),
    },
    
    unselectedtabOutline: {
        backgroundColor: Colors.black1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(6),
        margin: moderateScale(5), 
    },
    tabTitle:{
        fontSize: textScale(12),
        padding: moderateScaleVertical(8),
        fontWeight: '600',
    },
    complaintlistOutline:{
        width: '100%',
        minHeight: moderateScale(65),
        borderWidth: moderateScale(1),
        borderColor: Colors.lightgray,
        borderRadius: moderateScale(16),
        padding: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(10)
    },
    complainIndexOutline:{
        width: '10%',
        alignItems:'center',
        justifyContent: 'center'
    },
    complaindesOutline:{
        width: '70%',
        alignItems:'center',
        justifyContent: 'center'
    },
    complainactionOutline:{
        width: '20%',
        alignItems:'center',
        justifyContent: 'center'
    },
    complainText:{
        fontSize: textScale(14),
        fontWeight: '600',
        color: Colors.white
    },
    complainboxlilne:{        
         height: moderateScale(1),
         borderRadius: moderateScale(10),
         width: '50%',
         marginLeft: '25%',
         position: 'absolute',
        top: moderateScale(0)
    }
})

export default Styles;