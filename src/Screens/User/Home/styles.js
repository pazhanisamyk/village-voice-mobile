import { StyleSheet } from "react-native";
import Colors from "../../../Styles/Colors";
import { height, moderateScale, textScale, width } from "../../../Styles/ResponsiveSizes";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    complaints:{
        height: moderateScale(180),
        width: '45%',
        borderRadius: moderateScale(16),
        borderWidth: moderateScale(1),
        borderColor: Colors.gray1,
        backgroundColor: Colors.card,
        margin: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(10)
    },
    image:{
        height: moderateScale(75),
        width: moderateScale(75),
        borderRadius: moderateScale(100),
        borderWidth: moderateScale(1),
        borderColor: Colors.black2,
        backgroundColor: Colors.white
    },
    complaintText:{
        fontSize: textScale(14),
        color: Colors.white,
        fontWeight: '600',
        marginVertical: moderateScale(10)
    },
    arrowRight:{
        alignSelf: 'flex-end',
        height: moderateScale(26),
        width: moderateScale(26),
        marginRight: moderateScale(10),
    }
});

export default Styles;