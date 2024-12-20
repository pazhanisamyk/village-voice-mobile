import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";
import Colors from "../../Styles/Colors";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    topview:{
        paddingTop:moderateScale(20),
        height: height/2.3,
        width: width,
        borderBottomLeftRadius: moderateScale(24),
        borderBottomRightRadius: moderateScale(24),
        backgroundColor: Colors.lightgray,
    },
    eventText:{
        fontSize: textScale(40),
        paddingLeft: moderateScale(20),
        color: Colors.white,
        fontWeight: '700'
    },
    eventTitle:{
        flexDirection: 'row'
    },
    pickerContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: moderateScale(10),
        justifyContent: 'space-between',
        backgroundColor: Colors.gray1,
        borderRadius: moderateScale(50),
        height: moderateScale(40),
        width: moderateScale(160),
        borderWidth: moderateScale(1),
        borderColor: Colors.gray2,
        marginTop: moderateScale(10)
    },
    pickerText: {
        fontSize: textScale(14),
        color: Colors.white,
        fontWeight: '600'
    },
    arrowIcon:{
        height:moderateScale(12),
        width:moderateScale(12),
    },
    eventcount:{
        fontSize: textScale(14),
        fontWeight: '600',
        color: Colors.gray,
        paddingLeft:moderateScale(20),
        marginVertical: moderateScale(20),
    },
    eventDateList:{
        borderColor: Colors.gray1,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(16),
        height: moderateScale(100),
        width: moderateScale(50),
        alignItems: 'center',
        paddingVertical: moderateScale(10),
        marginRight: moderateScale(10)
    },
    date:{
        fontSize: textScale(20),
        color: Colors.white,
        fontWeight: '700'
    },
    eventContainer:{
        marginHorizontal: moderateScale(10),
        paddingLeft:moderateScale(10)
    },
    day:{
        fontSize: textScale(12),
        color: Colors.gray,
        fontWeight: '500'
    },
    redDot:{
        backgroundColor: Colors.red,
        borderRadius: moderateScale(100),
        height: moderateScale(6),
        width: moderateScale(6),
        marginTop: moderateScale(15)
    },
    bottomview:{
        height: height/2.3,
    },
    month:{
        fontSize: textScale(20),
        paddingLeft: moderateScale(20),
        marginTop: moderateScale(20),
        color: Colors.white,
        fontWeight: '700'
    },
    fullDate:{
        fontSize: textScale(12),
        paddingLeft: moderateScale(20),
        color: Colors.gray,
        fontWeight: '500'
    },
    events:{
        height: moderateScale(150),
        borderRadius: moderateScale(16),
        borderWidth: moderateScale(1),
        backgroundColor: Colors.card,
        borderColor: Colors.gray1,
        marginBottom: moderateScale(10),
        padding: moderateScale(15)
    },
    eventnumber:{
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.red
    },
    eventnum:{
        fontSize: textScale(16),
        color: Colors.white,
        fontWeight: '600'
    },
    eventdetail:{
        fontSize: textScale(14),
        color: Colors.white,
        fontWeight: '600',
        marginTop: moderateScale(10)
    },
    eventTime:{
        fontSize: textScale(20),
        color: Colors.white,
        marginTop: moderateScale(5),
        fontWeight: '700',
    }
});

export default Styles;