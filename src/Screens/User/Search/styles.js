import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: themes.background
    },
    outerContainer: {
        margin: moderateScale(20),
        alignItems: 'center'
    },
    inputStyle: {
        color: themes.white,
        width: '80%'
    },
    searchContainer: {
        borderRadius: moderateScale(16),
        marginVertical: moderateScale(20),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        paddingHorizontal: moderateScale(10),
        backgroundColor: themes.card
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
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(16),
        borderColor: themes.gray1,
        padding: moderateScale(10),
        maxHeight: height/3.1,
        paddingBottom: moderateScale(20)
    },
    recentSearchesText: {
        textAlign: 'left',
        fontSize: textScale(16),
        color: themes.white,
        fontWeight: '600',
        paddingVertical: moderateScale(10)
    },
    searchHistoryText: {
        fontSize: textScale(16),
        color: themes.white,
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
    ComplaintsList:{
        width: width-moderateScale(60),
        borderRadius: moderateScale(10),
        backgroundColor: themes.card1,
        padding: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',        
        marginVertical: moderateScale(10),
    },
    complaintId:{
        fontSize: textScale(16),
        color: themes.white,
        fontWeight: '500'
    },
    complaintTitle:{
        fontSize: textScale(14),
        color: themes.gray,
        fontWeight: '400'
    },
    ComplaintsText:{
        width: '65%'
    },
    image:{
        height: moderateScale(55),
        width: moderateScale(95),
        borderRadius:moderateScale(8)
    },
    noResultText:{
        fontSize: textScale(12),
        color: themes.gray,
        fontWeight: '500'
    }
})
export default getStyles;