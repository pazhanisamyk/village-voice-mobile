import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.background
    },
    topview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(15),
        borderBottomWidth: 1,
        borderColor: themes.gray1,
        marginTop: moderateScale(20),
        width: width,
    },
    headerText: {
        fontSize: textScale(16),
        color: themes.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    backArrow: {
        position: 'absolute',
        left: moderateScale(15)
    },
    backIcon: {
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor: themes.white
    },
    addBtn: {
        position: 'absolute',
        right: moderateScale(15)
    },
    addBtnText: {
        fontSize: textScale(14),
        color: themes.red,
        fontWeight: '600'
    },
    card: {
        borderRadius: moderateScale(16),
        borderWidth: 1,
        borderColor: themes.gray1,
        backgroundColor: themes.card,
        padding: moderateScale(15),
        marginBottom: moderateScale(15),
        position: 'relative'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: moderateScale(12)
    },
    question: {
        fontSize: textScale(14),
        color: themes.white,
        fontWeight: 'bold',
        flex: 1,
        marginRight: moderateScale(10)
    },
    expiredBadge: {
        backgroundColor: themes.gray1,
        color: themes.gray,
        fontSize: textScale(9),
        paddingHorizontal: moderateScale(6),
        paddingVertical: moderateScale(2),
        borderRadius: moderateScale(4),
        overflow: 'hidden',
        fontWeight: 'bold'
    },
    optionsContainer: {
        width: '100%'
    },
    optionBtn: {
        borderWidth: 1,
        borderColor: themes.gray,
        borderRadius: moderateScale(8),
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(12),
        marginBottom: moderateScale(8),
        alignItems: 'center'
    },
    optionBtnSelected: {
        borderColor: themes.red,
        backgroundColor: themes.card1
    },
    optionBtnText: {
        fontSize: textScale(12),
        color: themes.white
    },
    optionBtnTextSelected: {
        color: themes.red,
        fontWeight: 'bold'
    },
    resultRow: {
        marginBottom: moderateScale(10)
    },
    resultLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: moderateScale(4)
    },
    optionText: {
        fontSize: textScale(12),
        color: themes.white,
        flex: 1
    },
    percentageText: {
        fontSize: textScale(12),
        color: themes.gray,
        fontWeight: '600'
    },
    progressBarBg: {
        height: moderateScale(8),
        backgroundColor: themes.gray1,
        borderRadius: moderateScale(4),
        overflow: 'hidden',
        width: '100%'
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: themes.red,
        borderRadius: moderateScale(4)
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(12),
        borderTopWidth: 1,
        borderColor: themes.gray1,
        paddingTop: moderateScale(8)
    },
    footerText: {
        fontSize: textScale(10),
        color: themes.gray
    },
    deleteFloatBtn: {
        position: 'absolute',
        top: moderateScale(12),
        right: moderateScale(15),
        backgroundColor: themes.red,
        borderRadius: moderateScale(6),
        width: moderateScale(24),
        height: moderateScale(24),
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteIcon: {
        width: moderateScale(12),
        height: moderateScale(12)
    }
});

export default getStyles;
