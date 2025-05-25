import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import Imagepaths from "../../Constants/Imagepaths";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../Redux/actions";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import { useTheme } from "../../Constants/themes";
import { ListEmptyComponent } from "../../Components/ListEmptyComponent";
import CustomLoader from "../../Components/Loaders";
import strings from "../../Constants/languages";

const HelpScreen = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [helpData, setHelpData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };

    useEffect(() => {
        if (isFocused) {
            getHelpData();
        }

    }, [isFocused]);

    const getHelpData = async () => {
        setIsLoading(true);
        try{
                const res = await actions.help()
                        setHelpData(res?.helpTopics);
                        showSuccess(res?.message)
                    }
                    catch(error){
                        errorMethod(error);
                    }
                    finally{
                        setIsLoading(false);
                    }
            }

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
            <View key={index} style={Styles.card}>
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
                    <Text style={Styles.headertext}>{strings.HELP}</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <FlatList
                    style={Styles.helpContainer}
                    data={helpData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderHelp}
                    ListEmptyComponent={ListEmptyComponent}
                    showsVerticalScrollIndicator = {false}
                    />

                </View>
                <CustomLoader visible={isLoading} />
            </View>
    )
}

export default HelpScreen;