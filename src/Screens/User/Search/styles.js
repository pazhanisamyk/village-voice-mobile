import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../../Styles/ResponsiveSizes";
import Colors from "../../../Styles/Colors";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    outerContainer: {
        margin: moderateScale(20),
        alignItems: 'center'
    },
    inputStyle: {
        color: Colors.background,
        width: '80%'
    },
    searchContainer: {
        borderRadius: moderateScale(16),
        marginVertical: moderateScale(20),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: moderateScale(10),
        backgroundColor: Colors.gray3
    },
    searchIcon: {
        height: moderateScale(20),
        width: moderateScale(20),
    },
    micIcon: {
        height: moderateScale(25),
        width: moderateScale(25),
    },
    searchIconOutline: {
        width: '10%'
    },
    recentSearchesOutline: {
        width: width-40,
        backgroundColor: Colors.card,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(16),
        borderColor: Colors.gray1,
        padding: moderateScale(10),
        maxHeight: height/3.1,
        paddingBottom: moderateScale(20)
    },
    recentSearchesText: {
        textAlign: 'left',
        fontSize: textScale(16),
        color: Colors.white,
        fontWeight: '600',
        paddingVertical: moderateScale(10)
    },
    searchHistoryText: {
        fontSize: textScale(16),
        color: Colors.white,
        fontWeight: '600',
    },
    searchHistoryOutline: {
        marginVertical: moderateScale(10),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: moderateScale(10),
    },
    search: {
        height: moderateScale(20),
        width: moderateScale(20),
        marginHorizontal: moderateScale(10)
    },
    close: {
        height: moderateScale(15),
        width: moderateScale(15),
    },
    searchText: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
    },
})
export default Styles;