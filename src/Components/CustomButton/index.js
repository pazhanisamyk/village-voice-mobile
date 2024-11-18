import { Text, TouchableOpacity } from "react-native";
import Styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../Styles/Colors";

const CustomButton = ({
    title = '',
    onPress = () => { },
    ButtonStyles = {},
    gradientColors = [Colors.white, Colors.white],
    gradientStart = { x: 0, y: 0 },
    gradientEnd = { x: 1, y: 1 },
    textColor = Colors.black
}) => {
    return (
        <LinearGradient
            colors={gradientColors}
            start={gradientStart}
            end={gradientEnd}
            style={{ ...Styles.Container, ...ButtonStyles }}
        >
            <TouchableOpacity style={Styles.button} onPress={onPress}>
                <Text style={{...Styles.title,color: textColor}}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}
export default CustomButton;