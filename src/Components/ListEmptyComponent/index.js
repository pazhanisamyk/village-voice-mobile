import { Text, View } from "react-native";
import { useTheme } from '../../Constants/themes';
import getStyles from "./styles";

   export const ListEmptyComponent = ({
    containerStyle = {},
    title = 'No data found'
   }) => {
    const { themes } = useTheme();
  const Styles = getStyles(themes);
        return(
            <View style={[Styles.container, containerStyle]}>
                <Text style={Styles.title}>{title}</Text>
            </View>
        )
    }