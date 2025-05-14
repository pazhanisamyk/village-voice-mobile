import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.background
    },
    topview:{
        paddingTop:moderateScale(20),
        height: height/2.3,
        width: width,
        borderBottomLeftRadius: moderateScale(24),
        borderBottomRightRadius: moderateScale(24),
        backgroundColor: themes.lightgray,
    },
    eventText:{
        fontSize: textScale(40),
        paddingLeft: moderateScale(20),
        color: themes.white,
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
        backgroundColor: themes.gray1,
        borderRadius: moderateScale(16),
        height: moderateScale(40),
        width: moderateScale(160),
        borderWidth: moderateScale(1),
        borderColor: themes.gray2,
        marginLeft: moderateScale(10),
        marginTop: moderateScale(10)
    },
    pickerText: {
        fontSize: textScale(14),
        color: themes.white,
        fontWeight: '600'
    },
    arrowIcon:{
        height:moderateScale(12),
        width:moderateScale(12),
    },
    deleteIcon:{
        height:moderateScale(18),
        width:moderateScale(18),
    },
    eventcount:{
        fontSize: textScale(14),
        fontWeight: '600',
        color: themes.gray,
        paddingLeft:moderateScale(20),
        marginVertical: moderateScale(20),
    },
    eventDateList:{
        borderColor: themes.gray1,
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
        color: themes.white,
        fontWeight: '700'
    },
    eventContainer:{
        marginHorizontal: moderateScale(10),
        paddingLeft:moderateScale(10)
    },
    day:{
        fontSize: textScale(12),
        color: themes.gray,
        fontWeight: '500'
    },
    redDot:{
        backgroundColor: themes.red,
        borderRadius: moderateScale(100),
        height: moderateScale(6),
        width: moderateScale(6),
        marginTop: moderateScale(15)
    },
    bottomview:{
        height: height/1.8,
    },
    month:{
        fontSize: textScale(20),
        color: themes.white,
        fontWeight: '700'
    },
    fullDate:{
        fontSize: textScale(12),
        color: themes.gray,
        fontWeight: '500'
    },
    events:{
        borderRadius: moderateScale(16),
        borderWidth: moderateScale(1),
        backgroundColor: themes.card,
        borderColor: themes.gray1,
        marginBottom: moderateScale(10),
        padding: moderateScale(15)
    },
    eventnumber:{
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.red
    },
    eventnum:{
        fontSize: textScale(16),
        color: themes.white,
        fontWeight: '600'
    },
    eventdetail:{
        fontSize: textScale(14),
        color: themes.white,
        fontWeight: '600',
        marginTop: moderateScale(5)
    },
    eventTime:{
        fontSize: textScale(18),
        color: themes.white,
        marginTop: moderateScale(5),
        fontWeight: '700',
    },
    addEventOutline:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: moderateScale(20),
        paddingHorizontal: moderateScale(20)
    },
    remoEventOutile:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

export default getStyles;