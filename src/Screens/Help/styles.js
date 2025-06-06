import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        height: height,
        flex: 1,
        backgroundColor: themes.background
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
        borderTopColor: themes.gray1,
        marginTop:moderateScale(20),
        paddingTop: moderateScale(10)
    },
    card:{        
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        borderRadius: moderateScale(16),
        padding: moderateScale(15),
        marginVertical: moderateScale(10)
    },
    cardTitle:{
        fontSize: textScale(14),
        color: themes.white,
        fontWeight: '600',
    },
    cardContent:{
        fontSize: textScale(12),
        color: themes.white,
        fontWeight: '600',
    }
});

export default getStyles;