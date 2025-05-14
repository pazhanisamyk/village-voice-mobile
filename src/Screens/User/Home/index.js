import { BackHandler, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import getStyles from "./styles";
import { useEffect, useState } from "react";
import AlertPopup from "../../../Components/AlertPopup";
import strings from "../../../Constants/languages";
import { useTheme } from "../../../Constants/themes";
import { moderateScale } from "../../../Styles/ResponsiveSizes";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../../Redux/actions";

const UserHomeScreen = ({ navigation }) => {
    const {themes } = useTheme();
    const Styles = getStyles(themes);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [complaintBoxData, setComplaintBoxData] = useState([])
    const isFocused = useIsFocused();


    useEffect(() => {
        // Add the back button event listener
        const backHandler = BackHandler.addEventListener('hardwareBackPress', androidBackButtonHandler);

        // Cleanup the event listener on component unmount
        return () => backHandler.remove();
    }, []);

        useEffect(() => {
            if (isFocused) {
                getAllComplaintBoxes();
            }
        }, [isFocused]);
    
        const getAllComplaintBoxes = async () => {
            try {
                const res = await actions.getAllComplaintBox(); // remove the callback, assume it returns a Promise
                console.log(res, '📦 All Complaint Boxes');
                setComplaintBoxData(res)
            } catch (error) {
                console.log(error, '❌ Error while fetching complaint boxes');
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
            <TouchableOpacity onPress={() => navigation.navigate('Viewcomplaints', { data: item })} style={Styles.complaints}>
                {item.imageUrl ? <Image resizeMode="cover" source={{uri: item.imageUrl}} style={Styles.image} /> : <Image resizeMode="contain" source={Imagepaths.transparent_logo} style={Styles.image} />}
                <Text style={Styles.complaintText}>{item.category}</Text>
                {/* <Image resizeMode="contain" tintColor={themes.white} source={Imagepaths.double_right} style={Styles.arrowRight} /> */}
            </TouchableOpacity>
        )
    }
    return (
        <View style={Styles.container}>
                <FlatList
                    numColumns={2}
                    contentContainerStyle={{paddingBottom: moderateScale(100)}}
                    data={complaintBoxData}
                    keyExtractor={item => item.id}
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