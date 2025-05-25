import { StyleSheet } from "react-native";
import { height, moderateScale, textScale } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        width: moderateScale(200),
        height: moderateScale(200)
    },
    loadingtxt:{
        fontSize: textScale(16),
        color: themes.white,
        fontWeight: '600',
    },
});

export default getStyles;