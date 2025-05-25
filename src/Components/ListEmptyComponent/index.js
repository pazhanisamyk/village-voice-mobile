import { Text, View } from "react-native";
import { useTheme } from '../../Constants/themes';
import getStyles from "./styles";
import strings from "../../Constants/languages";

   export const ListEmptyComponent = ({
    containerStyle = {},
    title = strings.NO_DATA_FOUND
   }) => {
    const { themes } = useTheme();
  const Styles = getStyles(themes);
        return(
            <View style={[Styles.container, containerStyle]}>
                <Text style={Styles.title}>{title}</Text>
            </View>
        )
    }