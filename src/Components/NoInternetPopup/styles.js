import { StyleSheet } from "react-native";
import { moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    modalContainer: {
      backgroundColor: themes.white,
      paddingHorizontal: moderateScale(18),
      paddingTop: moderateScale(20),
      borderTopLeftRadius: moderateScale(16),
      borderTopRightRadius: moderateScale(16),
      position: 'absolute',
      width: width,
      bottom: moderateScale(0),
      paddingBottom: moderateScale(30),
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: textScale(22),
      fontWeight: '700',
      color: themes.lightgray
    },
    modalText: {
      fontSize: textScale(18),
      color: themes.background,
      fontWeight: '400',
      marginTop: moderateScale(14),
      textAlign: 'center',
      marginVertical: moderateScale(30),
    },
  });

  export default getStyles;