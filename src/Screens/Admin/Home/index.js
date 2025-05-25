import { BackHandler, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import Imagepaths from "../../../Constants/Imagepaths";
import { useEffect, useState } from "react";
import AlertPopup from "../../../Components/AlertPopup";
import strings from "../../../Constants/languages";
import { useTheme } from "../../../Constants/themes";
import { moderateScale } from "../../../Styles/ResponsiveSizes";
import { useSelector } from "react-redux";
import actions from "../../../Redux/actions";
import { useIsFocused } from "@react-navigation/native";
import { ListEmptyComponent } from "../../../Components/ListEmptyComponent";
import CustomLoader from "../../../Components/Loaders";

const AdminHomeScreen = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const isFocused = useIsFocused();
    const [selectedTAb, setSelectedTab] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state?.auth?.userData);
    const [complaintsData, setComplaintsData] = useState([])
    const [complaintsCategory, setComplaintsCategory] = useState([])


    useEffect(() => {
        if (isFocused) {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', androidBackButtonHandler);
        return () => backHandler.remove();
    }
    }, []);

    useEffect(() => {
        if (isFocused) {
            getAllComplaints()
        }
    }, [isFocused]);

    const getAllComplaints = async () => {
        setIsLoading(true);
        try {
            const res = await actions.getAllUserComplaint();
            const complaintBoxes = await actions.getAllComplaintBox();
            setComplaintsData(res);
            setComplaintsCategory(complaintBoxes);
        } catch (error) {
            console.log(error, '❌ Error while fetching complaint boxes');
        }
        finally {
            setIsLoading(false);
        }
    }

    const onPressCancel = () => {
        setIsModalVisible(false);
    };

    const onPressSubmit = () => {
        setIsModalVisible(false);
        BackHandler.exitApp();
    };

    const androidBackButtonHandler = () => {
        setIsModalVisible(true);
        return true;
    };


    const TAbs = [{ id: 1, name: strings.RESOLVED }, { id: 2, name: strings.UNRESOLVED }, { id: 3, name: strings.INPROGRESS }, { id: 4, name: strings.REJECTED}]

    const seleTab = (id) => {
        setSelectedTab(id)
    }
    const statusMap = {
        1: "resolved",
        2: "unresolved",
        3: "inprogress",
        4: "rejected"
    };

    const filteredComplaints = complaintsData.filter(item => item.status === statusMap[selectedTAb]);
    const solvedComplaints = complaintsData.filter(item => {
        return (item.status === "resolved");
    });
    const rendertabs = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => seleTab(item.id)}
                style={item.id === selectedTAb ? Styles.selectedtabOutline : Styles.unselectedtabOutline}>
                <Text style={[Styles.tabTitle, { color: item.id === selectedTAb ? themes.white : themes.black }]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    }

    const renderComplaints = ({ item, index }) => (
        <View key={item?._id} style={Styles.complaintlistOutline}>
            <View style={Styles.complainIndexOutline}>
                <Text style={Styles.complainText}>{index + 1}</Text>
            </View>
            <View style={Styles.complaindesOutline}>
                <Text style={[Styles.complainText, { alignSelf: 'flex-start' }]}>{item?.title}</Text>
            </View>
            <View style={Styles.complainactionOutline}>
                <TouchableOpacity onPress={() => navigation.navigate('ComplaintDetail', { data: item })} style={Styles.viewOutline}>
                    <Text style={[Styles.complainText, { color: themes.background }]}>{strings.VIEW}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={Styles.container}>
            <View style={Styles.topview}>
                <View style={Styles.profileView}>
                    {userData?.profileImage ? <Image source={{ uri: userData?.profileImage }} style={Styles.image} /> : <Image source={Imagepaths.Launcher} style={Styles.image} />}
                    <Text style={Styles.userNmae}>{userData?.username}</Text>
                </View>
                <View style={Styles.statusContainer}>
                    <View style={Styles.ComplaintBox}>
                        <View style={[Styles.complainboxlilne, { backgroundColor: themes.blue }]}></View>
                        <Text style={Styles.ComplaintText}>{strings.COMPLAINT_BOX}</Text>
                        <Text style={Styles.ComplaintcountText}>{complaintsCategory?.length}</Text>
                    </View>
                    <View style={Styles.ComplaintBox}>
                        <View style={[Styles.complainboxlilne, { backgroundColor: themes.purple }]}></View>
                        <Text style={Styles.ComplaintText}>{strings.COMPLAINTS}</Text>
                        <Text style={Styles.ComplaintcountText}>{complaintsData?.length}</Text>
                    </View>
                    <View style={Styles.ComplaintBox}>
                        <View style={[Styles.complainboxlilne, { backgroundColor: themes.green }]}></View>
                        <Text style={Styles.ComplaintText}>{`${strings.RESOLVED} ${strings.COMPLAINTS}`}</Text>
                        <Text style={Styles.ComplaintcountText}>{solvedComplaints?.length}</Text>
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
                    contentContainerStyle={{ paddingBottom: moderateScale(100) }}
                    renderItem={renderComplaints}
                    ListEmptyComponent={ListEmptyComponent}
                    keyExtractor={item => item?._id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
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

export default AdminHomeScreen;