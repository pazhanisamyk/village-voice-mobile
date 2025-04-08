import { Text, TouchableOpacity } from "react-native";
import getStyles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../Constants/themes";

const CustomButton = ({
    title = '',
    onPress = () => { },
    ButtonStyles = {},
    gradientColors = [themes.white, themes.white],
    gradientStart = { x: 0, y: 0 },
    gradientEnd = { x: 1, y: 1 },
    textColor = themes.black
}) => {
    const { theme } = useTheme(); // ✅ use current theme
    const Styles = getStyles(theme); // ✅ pass theme to styles
  
    const colors = gradientColors || [theme.white, theme.white]; // fallback
    const txtColor = textColor || theme.black; // fallback
    return (
        <LinearGradient
            colors={colors}
            start={gradientStart}
            end={gradientEnd}
            style={{ ...Styles.Container, ...ButtonStyles }}
        >
            <TouchableOpacity style={Styles.button} onPress={onPress}>
                <Text style={{...Styles.title,color: txtColor}}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}
export default CustomButton;