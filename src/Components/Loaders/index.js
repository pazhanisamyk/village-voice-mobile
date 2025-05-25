import LottieView from "lottie-react-native"
import loaderjsons from "../../Constants/loaderjsons"
import getStyles from "./styles";
import { useTheme } from "../../Constants/themes";
import { Modal, Text, View } from "react-native";
import strings from "../../Constants/languages";

const CustomLoader = ({
    visible = true,
}) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    return (
        <View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={Styles.modalBackground}>
                    <LottieView
                        source={loaderjsons.book}
                        autoPlay
                        loop
                        style={Styles.loading}
                    />
                    <Text style={Styles.loadingtxt}>{strings.PLEASE_WAIT}</Text>
                </View>
        </Modal>
        </View>

    )
}

export default CustomLoader;