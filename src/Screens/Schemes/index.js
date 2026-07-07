import { FlatList, Image, Text, TouchableOpacity, View, Linking, Alert } from "react-native";
import getStyles from "./styles";
import { useEffect, useState } from "react";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import Imagepaths from "../../Constants/Imagepaths";
import strings from "../../Constants/languages";
import { useTheme } from "../../Constants/themes";
import CustomButton from "../../Components/CustomButton";
import { useSelector } from "react-redux";
import AlertPopup from "../../Components/AlertPopup";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../Redux/actions";
import { showSuccess, showError } from "../../Utils/helperfunctions";
import { ListEmptyComponent } from "../../Components/ListEmptyComponent";
import CustomLoader from "../../Components/Loaders";
import NavigationStrings from "../../Constants/NavigationStrings";

const Schemes = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const isFocused = useIsFocused();
    const [schemes, setSchemes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state?.auth?.userData);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState({ status: false, deleteId: null });

    useEffect(() => {
        if (isFocused) {
            fetchSchemes();
        }
    }, [isFocused]);

    const fetchSchemes = async () => {
        setIsLoading(true);
        try {
            const res = await actions.getAllSchemes();
            setSchemes(res || []);
        } catch (error) {
            console.log(error, 'Error while fetching schemes');
            showError('Failed to load schemes');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenUrl = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                showError("Cannot open this URL.");
            }
        } catch (err) {
            showError("An error occurred opening the link.");
        }
    };

    const onPressDelete = (id) => {
        setIsDeleteModalVisible({ status: true, deleteId: id });
    };

    const onConfirmDelete = async () => {
        setIsLoading(true);
        try {
            const res = await actions.deleteScheme(isDeleteModalVisible.deleteId);
            setIsDeleteModalVisible({ status: false, deleteId: null });
            showSuccess(res?.message || 'Scheme deleted successfully');
            fetchSchemes();
        } catch (error) {
            console.log(error, 'Error while deleting scheme');
            showError('Failed to delete scheme');
        } finally {
            setIsLoading(false);
        }
    };

    const renderSchemeItem = ({ item }) => {
        return (
            <View style={Styles.card}>
                {item.imageUrl ? (
                    <Image source={{ uri: item.imageUrl }} style={Styles.image} resizeMode="cover" />
                ) : (
                    <Image source={Imagepaths.transparent_logo} style={Styles.image} resizeMode="contain" />
                )}
                <View style={Styles.cardContent}>
                    <Text style={Styles.title}>{item.schemeName}</Text>
                    <Text style={Styles.desc} numberOfLines={3}>{item.schemeDesc}</Text>
                    
                    <View style={Styles.btnRow}>
                        <TouchableOpacity onPress={() => handleOpenUrl(item.schemeUrl)} style={Styles.viewBtn}>
                            <Text style={Styles.viewBtnText}>{strings.VIEW}</Text>
                        </TouchableOpacity>

                        {userData?.role === 'admin' && (
                            <TouchableOpacity onPress={() => onPressDelete(item._id)} style={Styles.deleteBtn}>
                                <Image tintColor={themes.white} source={Imagepaths.delete} style={Styles.deleteIcon} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={Styles.container}>
            <View style={Styles.topview}>
                <TouchableOpacity style={Styles.backArrow} onPress={() => navigation.goBack()}>
                    <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                </TouchableOpacity>
                <Text style={Styles.headerText}>{strings.SCHEMES}</Text>
                {userData?.role === 'admin' && (
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.ADD_SCHEME_SCREEN)} style={Styles.addBtn}>
                        <Text style={Styles.addBtnText}>+ Add</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={schemes}
                contentContainerStyle={{ paddingBottom: moderateScale(100), paddingHorizontal: moderateScale(15), paddingTop: moderateScale(10) }}
                renderItem={renderSchemeItem}
                ListEmptyComponent={ListEmptyComponent}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
            />

            <AlertPopup 
                isModalVisible={isDeleteModalVisible.status} 
                isCancelVisible={isDeleteModalVisible.status} 
                onPressCancel={() => setIsDeleteModalVisible({ status: false, deleteId: null })} 
                onPressSubmit={onConfirmDelete} 
                message={strings.DELETE_SCHEME_MSG} 
            />
            <CustomLoader visible={isLoading} />
        </View>
    );
};

export default Schemes;
