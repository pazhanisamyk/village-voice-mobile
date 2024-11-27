import { BackHandler, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import Styles from "./styles";
import { useEffect, useState } from "react";
import AlertPopup from "../../../Components/AlertPopup";
import strings from "../../../Constants/languages";

const UserHomeScreen = ({ navigation }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);


    // useEffect(() => {
    //     // Add the back button event listener
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', androidBackButtonHandler);

    //     // Cleanup the event listener on component unmount
    //     return () => backHandler.remove();
    // }, []);

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


    const sampleData = [
        {
            id: 1,
            title: 'Water',
            image: Imagepaths.Water
        },
        {
            id: 2,
            title: 'Road',
            image: Imagepaths.road
        },
        {
            id: 3,
            title: 'Garbage',
            image: Imagepaths.garbage
        },
        {
            id: 4,
            title: 'Electricity',
            image: Imagepaths.electricty
        },
        {
            id: 6,
            title: 'Street Light',
            image: Imagepaths.streetLight
        },
        {
            id: 7,
            title: 'Street Light',
            image: Imagepaths.streetLight
        },
        {
            id: 8,
            title: 'Street Light',
            image: Imagepaths.streetLight
        },
        {
            id: 9,
            title: 'Street Light',
            image: Imagepaths.streetLight
        }

    ];

    const renderComplaintBoxes = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Viewcomplaints', { Header: item.title })} style={Styles.complaints}>
                <Image source={item.image} style={Styles.image} />
                <Text style={Styles.complaintText}>{item.title}</Text>
                <Image source={Imagepaths.double_right} style={Styles.arrowRight} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={Styles.container}>
                <FlatList
                    numColumns={2}
                    data={sampleData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderComplaintBoxes}
                    showsVerticalScrollIndicator={false} />
            <AlertPopup
                header="Hold On"
                isModalVisible={isModalVisible}
                isCancelVisible={isModalVisible}
                onPressCancel={onPressCancel}
                onPressSubmit={onPressSubmit}
                message={strings.LOGOUT_MSG}
            />
        </View>
    )
}

export default UserHomeScreen;