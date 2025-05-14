import { StyleSheet } from "react-native";
import { height, moderateScale, moderateScaleVertical, textScale, width } from "../../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: themes.background
    },
    userNmae:{
        marginTop: moderateScale(10),
        fontSize: textScale(14),
        fontWeight: '600',
        color: themes.white
    },
    topview:{
        height: height/2.4,
        width: width,
        borderBottomLeftRadius: moderateScale(24),
        borderBottomRightRadius: moderateScale(24),
        backgroundColor: themes.lightgray,
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
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        borderRadius: moderateScale(16),
        height: moderateScale(90),
        alignItems: 'center',
        justifyContent: 'center'
    },
    ComplaintText:{
        textAlign: 'center',
        fontSize: textScale(12),
        fontWeight: '600',
        color: themes.white,
    },
    ComplaintcountText:{
        fontSize: textScale(14),
        fontWeight: '600',
        color: themes.white,
    },
    bottomContainer:{
        paddingBottom: moderateScaleVertical(10),
        height: height/1.7,
        width: '90%',
        marginLeft: '5%',
        backgroundColor: 'transparent',
    },
    tabContainer: {
        borderRadius: moderateScale(16),
        backgroundColor: themes.gray,
        height: moderateScale(50),
        marginVertical: moderateScaleVertical(20),
        flexDirection: 'row',
        alignItems: 'center',
    },    
    selectedtabOutline: {
        width: width/3.6,
        backgroundColor: themes.black,     
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(6), 
        margin: moderateScale(5),
    },
    
    unselectedtabOutline: {
        width: width/3.6,
        backgroundColor: themes.gray,     
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        borderRadius: moderateScale(16),
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
        borderColor: themes.lightgray,
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
        color: themes.white
    },
    complainboxlilne:{        
         height: moderateScale(1),
         borderRadius: moderateScale(10),
         width: '50%',
         position: 'absolute',
        top: moderateScale(0)
    },
    viewOutline:{
        borderWidth: moderateScale(1),
         borderColor: themes.white,
         borderRadius: moderateScale(4),
         backgroundColor: themes.white,
         paddingVertical: moderateScale(4),
         paddingHorizontal: moderateScale(10)
    }
})

export default getStyles;