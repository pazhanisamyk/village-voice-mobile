import { BackHandler, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import getStyles from "./styles";
import { useEffect, useState } from "react";
import AlertPopup from "../../../Components/AlertPopup";
import strings from "../../../Constants/languages";
import { useTheme } from "../../../Constants/themes";
import { height, moderateScale } from "../../../Styles/ResponsiveSizes";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../../Redux/actions";
import { ListEmptyComponent } from "../../../Components/ListEmptyComponent";
import CustomLoader from "../../../Components/Loaders";
import NavigationStrings from "../../../Constants/NavigationStrings";

const UserHomeScreen = ({ navigation }) => {
    const {themes } = useTheme();
    const Styles = getStyles(themes);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [complaintBoxData, setComplaintBoxData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused) {
            // Add the back button event listener
        const backHandler = BackHandler.addEventListener('hardwareBackPress', androidBackButtonHandler);

        // Cleanup the event listener on component unmount
        return () => backHandler.remove();
    }
    }, [isFocused]);

        useEffect(() => {
            if (isFocused) {
                getAllComplaintBoxes();
            }
        }, [isFocused]);
    
        const getAllComplaintBoxes = async () => {
            setIsLoading(true);
            try {
                const res = await actions.getAllComplaintBox();
                setComplaintBoxData(res)
            } catch (error) {
                console.log(error, '❌ Error while fetching complaint boxes');
            }
            finally{
                setIsLoading(false);
            }
        };

    const onPressCancel = () => {
        setIsModalVisible(false);
    };

    const onPressSubmit = () => {
        setIsModalVisible(false);
        BackHandler.exitApp();
    };

    const androidBackButtonHandler = () => {
        setIsModalVisible(true);
        return true; // Prevent default back action
    };

    const renderComplaintBoxes = ({ item }) => {
        return (
            <TouchableOpacity key={item?._id} onPress={() => navigation.navigate(NavigationStrings.VIEW_COMPLAINTS, { data: item })} style={Styles.complaints}>
                {item.imageUrl ? <Image resizeMode="cover" source={{uri: item.imageUrl}} style={Styles.image} /> : <Image resizeMode="contain" source={Imagepaths.transparent_logo} style={Styles.image} />}
                <Text style={Styles.complaintText}>{item.category}</Text>
            </TouchableOpacity>
        )
    }

    const renderEmpty = () => {
        return(
            <ListEmptyComponent
            containerStyle={{height: moderateScale(height-80)}} />
        )
    }
    return (
        <View style={Styles.container}>
                <FlatList
                    numColumns={2}
                    contentContainerStyle={{paddingBottom: moderateScale(100)}}
                    data={complaintBoxData}
                    keyExtractor={item => item?._id}
                    renderItem={renderComplaintBoxes}
                    ListEmptyComponent={renderEmpty}
                    showsVerticalScrollIndicator={false} />
            <AlertPopup
                header={strings.HOLD_ON}
                isModalVisible={isModalVisible}
                isCancelVisible={isModalVisible}
                onPressCancel={onPressCancel}
                onPressSubmit={onPressSubmit}
                message={strings.LOGOUT_MSG}
            />
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default UserHomeScreen;