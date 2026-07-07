import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.background
    },
    complaints:{
        height: moderateScale(180),
        width: '45%',
        borderRadius: moderateScale(16),
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        backgroundColor: themes.card,
        margin: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(10)
    },
    image:{
        height: moderateScale(75),
        width: moderateScale(75),
        borderRadius: moderateScale(8)
    },
    complaintText:{
        fontSize: textScale(14),
        color: themes.white,
        fontWeight: '600',
        marginVertical: moderateScale(10)
    },
    arrowRight:{
        alignSelf: 'flex-end',
        height: moderateScale(26),
        width: moderateScale(26),
        marginRight: moderateScale(10),
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(40),
        paddingBottom: moderateScale(15),
        borderBottomWidth: 1,
        borderBottomColor: themes.gray1,
        backgroundColor: themes.background
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
        borderColor: themes.background
    },
    unreadText: {
        color: themes.white,
        fontSize: textScale(8),
        fontWeight: 'bold'
    },
    quickLinksRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(15),
        marginTop: moderateScale(15),
        marginBottom: moderateScale(5)
    },
    quickLinkCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.card,
        borderWidth: 1,
        borderColor: themes.gray1,
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(12),
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
    }
});

export default getStyles;