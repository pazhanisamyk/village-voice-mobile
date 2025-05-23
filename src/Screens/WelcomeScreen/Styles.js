import { StyleSheet } from "react-native";
import { height, moderateScale, textScale, width } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.background
    },
    image:{
        position: 'absolute',
        top: '10%',
        height: moderateScale(500),
        width: moderateScale(500)
    },
    gradient: {
        zIndex: -1,
        height: height,
        width: width
    },
    bottomContainer:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: moderateScale(30),
        width: '90%',
        marginLeft:'5%'
    },
    description:{
        textAlign: 'center',
        fontSize: textScale(14),
        fontWeight: '400',
        color: themes.white
    },
    topContainer:{
        position: 'absolute',
        top: moderateScale(30),
        width:width,
        alignItems:'center',
        justifyContent: 'center'
    },
    headertext:{
        textAlign: 'center',
        fontSize: textScale(18),
        color: themes.white,
        fontWeight: 'bold'
    },
})

export default getStyles;