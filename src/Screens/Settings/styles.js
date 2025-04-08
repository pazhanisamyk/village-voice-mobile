import { StyleSheet } from "react-native";
import { height, moderateScale, textScale } from "../../Styles/ResponsiveSizes";

const getStyles = (themes) => StyleSheet.create({
    container: {
        height: height,
        flex: 1,
        backgroundColor: themes.background
    },
    outerContainer:{
        marginHorizontal: moderateScale(20),
        alignItems: 'center'
    },
    image:{
        height: moderateScale(120),
        width: moderateScale(120),
        borderRadius: moderateScale(100),
        marginVertical: moderateScale(10)
    },
    userName:{
        fontSize: textScale(20),
        color: themes.white,
        fontWeight: '700'
    },
    email:{
        fontSize: textScale(12),
        color: themes.gray,
        fontWeight: '500'
    },
    editProfileText:{
        fontSize: textScale(12),
        color: themes.white,
        fontWeight: '600'
    },
    editProfileBtn:{
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: moderateScale(50),
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        marginTop: moderateScale(10)
    },
    generalContainer:{
        width: '100%',
        marginTop: moderateScale(20)
    },
    general:{
        fontSize: textScale(14),
        color: themes.white,
        fontWeight: '600'
    },
    card:{
        backgroundColor: themes.card,
        borderWidth: moderateScale(1),
        borderColor: themes.gray1,
        borderRadius: moderateScale(16),
        padding: moderateScale(20),
        marginTop: moderateScale(5)
    },
    cardContainer:{
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon:{
        height: moderateScale(20),
        width: moderateScale(20),
        marginRight: moderateScale(15)
    },    
    title:{
        fontSize: textScale(14),
        color: themes.white,
        fontWeight: '600',
    },
    rightIcon:{
        height: moderateScale(12),
        width: moderateScale(12),
        position: 'absolute',
        right: moderateScale(20)
    },
    Switch:{
        position: 'absolute',
        right: moderateScale(0)
    }
});

export default getStyles;