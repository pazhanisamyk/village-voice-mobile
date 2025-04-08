import { BackHandler, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import Imagepaths from "../../../Constants/Imagepaths";
import { useEffect, useState } from "react";
import AlertPopup from "../../../Components/AlertPopup";
import strings from "../../../Constants/languages";
import { useTheme } from "../../../Constants/themes";
import { moderateScale } from "../../../Styles/ResponsiveSizes";

const AdminHomeScreen = () => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [selectedTAb, setSelectedTab] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        // Add the back button event listener
        const backHandler = BackHandler.addEventListener('hardwareBackPress', androidBackButtonHandler);

        // Cleanup the event listener on component unmount
        return () => backHandler.remove();
    }, []);

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


    const TAbs = [{ id: 1, name: 'Solved Compliants' }, { id: 2, name: 'Unresloved Complaints' }]
    const sampleComplaints = [
        { id: 1, title: 'Water', description: 'Water not supplied correctly in West Street', status: 'solved' },
        { id: 2, title: 'Electricity', description: 'Frequent power cuts in East Street', status: 'solved' },
        { id: 3, title: 'Garbage', description: 'Garbage not collected in South Street', status: 'solved' },
        { id: 4, title: 'Road', description: 'Damaged roads in North Street', status: 'solved' }
    ];
    const seleTab = (id) => {
        setSelectedTab(id)
    }
    const filteredComplaints = sampleComplaints.filter(item => {
        return (item.status === 'solved' && selectedTAb === 1) || (item.status === 'unsolved' && selectedTAb === 2);
    });
    const rendertabs = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => seleTab(item.id)}
                style={item.id === selectedTAb ? Styles.selectedtabOutline : Styles.unselectedtabOutline}>
                <Text style={[Styles.tabTitle, { color: item.id === selectedTAb ? themes.white : themes.black }]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    }

    const renderComplaints = ({ item, index }) => (
        <View style={Styles.complaintlistOutline}>
            <View style={Styles.complainIndexOutline}>
                <Text style={Styles.complainText}>{index + 1}</Text>
            </View>
            <View style={Styles.complaindesOutline}>
                <Text style={[Styles.complainText, { alignSelf: 'flex-start' }]}>{`Complaint regarding to ${item.title}`}</Text>
            </View>
            <View style={Styles.complainactionOutline}>
                <TouchableOpacity style={Styles.viewOutline}>
                    <Text style={[Styles.complainText, {color: themes.background}]}>View</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={Styles.container}>
            <View style={Styles.topview}>
                <View style={Styles.profileView}>
                    <Image source={Imagepaths.logo} style={Styles.image} />
                    <Text style={Styles.userNmae}>Pazhani K</Text>
                </View>
                <View style={Styles.statusContainer}>
                    <View style={Styles.ComplaintBox}>
                        <View style={[Styles.complainboxlilne, { backgroundColor: themes.blue }]}></View>
                        <Text style={Styles.ComplaintText}>Complaint Box</Text>
                        <Text style={Styles.ComplaintcountText}>3</Text>
                    </View>
                    <View style={Styles.ComplaintBox}>
                        <View style={[Styles.complainboxlilne, { backgroundColor: themes.purple }]}></View>
                        <Text style={Styles.ComplaintText}>Compliants</Text>
                        <Text style={Styles.ComplaintcountText}>99</Text>
                    </View>
                    <View style={Styles.ComplaintBox}>
                        <View style={[Styles.complainboxlilne, { backgroundColor: themes.green }]}></View>
                        <Text style={Styles.ComplaintText}>Resolved Complaints</Text>
                        <Text style={Styles.ComplaintcountText}>56</Text>
                    </View>
                </View>
            </View>
            <View style={Styles.bottomContainer}>
                <View style={Styles.tabContainer}>
                    <FlatList
                        data={TAbs}
                        renderItem={rendertabs}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <FlatList
                    data={filteredComplaints}
                    contentContainerStyle={{paddingBottom: moderateScale(100)}}
                    renderItem={renderComplaints}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
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

export default AdminHomeScreen;