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
        marginBottom: moderateScale(15),
        overflow: 'hidden'
    },
    image: {
        height: moderateScale(150),
        width: '100%'
    },
    cardContent: {
        padding: moderateScale(15)
    },
    title: {
        fontSize: textScale(15),
        color: themes.white,
        fontWeight: 'bold',
        marginBottom: moderateScale(5)
    },
    desc: {
        fontSize: textScale(12),
        color: themes.gray,
        lineHeight: moderateScale(16),
        marginBottom: moderateScale(12)
    },
    btnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    viewBtn: {
        backgroundColor: themes.red,
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(8),
        alignItems: 'center'
    },
    viewBtnText: {
        fontSize: textScale(12),
        color: themes.white,
        fontWeight: '600'
    },
    deleteBtn: {
        backgroundColor: themes.red,
        borderRadius: moderateScale(8),
        width: moderateScale(32),
        height: moderateScale(32),
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteIcon: {
        width: moderateScale(16),
        height: moderateScale(16)
    }
});

export default getStyles;
