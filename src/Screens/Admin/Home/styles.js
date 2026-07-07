import { StyleSheet } from "react-native";
import { height, moderateScale, moderateScaleVertical, textScale, width } from "../../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.background
    },
    userNmae: {
        marginTop: moderateScale(5),
        fontSize: textScale(14),
        fontWeight: '600',
        color: themes.white
    },
    topview: {
        height: height / 2.1,
        width: width,
        borderBottomLeftRadius: moderateScale(24),
        borderBottomRightRadius: moderateScale(24),
        backgroundColor: themes.lightgray,
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(30),
        paddingBottom: moderateScale(10),
        borderBottomWidth: 1,
        borderBottomColor: themes.gray1,
        backgroundColor: 'transparent'
    },
    headerLogo: {
        fontSize: textScale(18),
        fontWeight: 'bold',
        color: themes.white
    },
    notificationBtn: {
        position: 'relative',
        padding: moderateScale(5)
    },
    bellIcon: {
        width: moderateScale(24),
        height: moderateScale(24),
        tintColor: themes.white
    },
    unreadBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: themes.red,
        width: moderateScale(16),
        height: moderateScale(16),
        borderRadius: moderateScale(8),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: themes.lightgray
    },
    unreadText: {
        color: themes.white,
        fontSize: textScale(8),
        fontWeight: 'bold'
    },
    quickLinksRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10)
    },
    quickLinkCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.card,
        borderWidth: 1,
        borderColor: themes.gray1,
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(8),
        paddingHorizontal: moderateScale(15),
        width: '47%',
        justifyContent: 'center'
    },
    quickLinkText: {
        color: themes.white,
        fontSize: textScale(12),
        fontWeight: 'bold',
        marginLeft: moderateScale(8)
    },
    quickLinkEmoji: {
        fontSize: textScale(16)
    },
    profileView: {
        height: moderateScale(height / 6),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(5)
    },
    image: {
        height: moderateScale(100),
        width: moderateScale(100),
        borderRadius: moderateScale(100)
    },
    statusContainer: {
        height: moderateScale(height / 5),
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    ComplaintBox: {
        width: '30%',
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        borderRadius: moderateScale(16),
        height: moderateScale(90),
        alignItems: 'center',
        justifyContent: 'center'
    },
    ComplaintText: {
        textAlign: 'center',
        fontSize: textScale(12),
        fontWeight: '600',
        color: themes.white,
    },
    ComplaintcountText: {
        fontSize: textScale(14),
        fontWeight: '600',
        color: themes.white,
    },
    bottomContainer: {
        paddingBottom: moderateScaleVertical(10),
        height: height / 1.7,
        width: '90%',
        marginLeft: '5%',
        backgroundColor: 'transparent',
    },
    tabContainer: {
        borderRadius: moderateScale(16),
        backgroundColor: themes.gray,
        height: moderateScale(50),
        paddingHorizontal: moderateScale(6),
        marginVertical: moderateScaleVertical(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedtabOutline: {
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
        backgroundColor: themes.gray,
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(6),
        margin: moderateScale(5),
    },
    tabTitle: {
        fontSize: textScale(12),
        padding: moderateScaleVertical(8),
        fontWeight: '600',
    },
    complaintlistOutline: {
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
    complainIndexOutline: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    complaindesOutline: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    complainactionOutline: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    complainText: {
        fontSize: textScale(14),
        fontWeight: '600',
        color: themes.white
    },
    complainboxlilne: {
        height: moderateScale(1),
        borderRadius: moderateScale(10),
        width: '50%',
        position: 'absolute',
        top: moderateScale(0)
    },
    viewOutline: {
        borderWidth: moderateScale(1),
        borderColor: themes.white,
        borderRadius: moderateScale(4),
        backgroundColor: themes.white,
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(10)
    },
    tabRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    countBadge: {
        minWidth: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
})

export default getStyles;