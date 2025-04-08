import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import Imagepaths from "../../Constants/Imagepaths";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../Redux/actions";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import { useTheme } from "../../Constants/themes";

const HelpScreen = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [helpData, setHelpData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(null)
    const isFocused = useIsFocused();

    const errorMethod = (error) => {
        console.log(error?.message || error?.error);
        showError(error?.message || error?.error);
    };

    useEffect(() => {
        if (isFocused) {
            const getHelpData = async () => {
                await actions.help()
                    .then((res) => {
                        setHelpData(res?.helpTopics);
                        showSuccess(res?.message)
                    })
                    .catch(errorMethod);
            }

            getHelpData();
        }

    }, [isFocused])

    const onPressBack = () => {
        navigation.goBack();
    }

    const onPressHelp = (index) => {
        if(currentIndex !== index){
        setCurrentIndex(index)
        }
        else{
        setCurrentIndex(null)
        }
    }

    const renderHelp = ({item, index}) => {
        return(
            <View style={Styles.card}>
                <TouchableOpacity onPress={() => onPressHelp(index)} style={Styles.helpTitleView}>
                <Text style={Styles.cardTitle}>{item.title}</Text>
                <Image resizeMode="contain" style={Styles.toggleIcon} source={currentIndex === index ? Imagepaths.arrow_up : Imagepaths.arrow_down} />
                </TouchableOpacity>
                { currentIndex === index && 
                <View style={Styles.helpContentView}>
                <Text style={Styles.cardContent}>{item.description}</Text>
                </View> }

            </View>
        )
    }

    return (
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>Help</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <FlatList
                    style={Styles.helpContainer}
                    data={helpData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderHelp}
                    showsVerticalScrollIndicator = {false}
                    />

                </View>
            </View>
    )
}

export default HelpScreen;