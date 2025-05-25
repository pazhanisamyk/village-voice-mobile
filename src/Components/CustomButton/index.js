import { Text, TouchableOpacity } from "react-native";
import getStyles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../Constants/themes";
import strings from "../../Constants/languages";

const CustomButton = ({
    title = strings.SUBMIT,
    onPress = () => { },
    ButtonStyles = {},
    gradientColors = [themes.white, themes.white],
    gradientStart = { x: 0, y: 0 },
    gradientEnd = { x: 1, y: 1 },
    textColor = themes.black
}) => {
    const { theme } = useTheme();
    const Styles = getStyles(theme);
  
    const colors = gradientColors || [theme.white, theme.white];
    const txtColor = textColor || theme.black;
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