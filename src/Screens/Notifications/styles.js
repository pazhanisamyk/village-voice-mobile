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
    markAllBtn: {
        position: 'absolute',
        right: moderateScale(15)
    },
    markAllText: {
        fontSize: textScale(12),
        color: themes.red,
        fontWeight: '600'
    },
    card: {
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: themes.gray1,
        padding: moderateScale(15),
        marginBottom: moderateScale(12)
    },
    contentContainer: {
        flexDirection: 'column'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'between',
        alignItems: 'center',
        marginBottom: moderateScale(5)
    },
    title: {
        fontSize: textScale(14),
        color: themes.white,
        flex: 1
    },
    unreadBadge: {
        width: moderateScale(8),
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        backgroundColor: themes.red,
        marginLeft: moderateScale(5)
    },
    body: {
        fontSize: textScale(12),
        color: themes.gray,
        marginBottom: moderateScale(8),
        lineHeight: moderateScale(16)
    },
    date: {
        fontSize: textScale(10),
        color: themes.gray,
        alignSelf: 'flex-end'
    }
});

export default getStyles;
