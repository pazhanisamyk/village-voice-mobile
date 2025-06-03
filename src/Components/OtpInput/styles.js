import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScale(20),
  },
  otpInput: {
    zIndex: 1,
    borderColor: themes.gray,
    borderWidth: moderateScale(1),
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(16),
    textAlign: 'center',
    fontSize: textScale(20),
    color: themes.white,
    fontWeight: '600',
    marginRight: moderateScale(10),
  },
});

export default getStyles;