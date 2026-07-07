import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
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

const Notifications = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const isFocused = useIsFocused();
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isFocused) {
            fetchNotifications();
        }
    }, [isFocused]);

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const res = await actions.getNotifications();
            setNotifications(res?.data || []);
        } catch (error) {
            console.log(error, 'Error while fetching notifications');
            const errorMsg = error?.response?.data?.message || error?.message || 'Failed to load notifications';
            showError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsRead = async (item) => {
        console.log('Notification clicked:', item);
        try {
            await actions.markNotificationRead(item._id);
            fetchNotifications();

            // Navigate based on type
            if (item.type === 'complaint' && item.referenceId) {
                console.log('Navigating to Complaint Detail with ID:', item.referenceId);
                navigation.navigate(NavigationStrings.COMPLAINT_DETAIL, { complaintId: item.referenceId });
            } else if (item.type === 'event') {
                console.log('Navigating to Event Stack');
                navigation.navigate(NavigationStrings.CREATE_EVENT_STACK);
            } else if (item.type === 'scheme') {
                console.log('Navigating to Schemes Screen');
                navigation.navigate(NavigationStrings.SCHEMES_SCREEN);
            } else if (item.type === 'poll') {
                console.log('Navigating to Polls Screen');
                navigation.navigate(NavigationStrings.POLLS_SCREEN);
            } else {
                console.log('Unhandled type or missing reference:', item.type);
            }
        } catch (error) {
            console.log(error, 'Error marking notification read');
        }
    };

    const handleMarkAllRead = async () => {
        setIsLoading(true);
        try {
            await actions.markAllNotificationsRead();
            fetchNotifications();
            showSuccess('All notifications marked as read');
        } catch (error) {
            console.log(error, 'Error marking all read');
            showError('Failed to mark all as read');
        } finally {
            setIsLoading(false);
        }
    };

    const renderNotificationItem = ({ item }) => {
        return (
            <TouchableOpacity 
                onPress={() => handleMarkAsRead(item)} 
                style={[Styles.card, { backgroundColor: item.isRead ? themes.card : themes.card1 }]}
            >
                <View style={Styles.contentContainer}>
                    <View style={Styles.headerRow}>
                        <Text style={[Styles.title, { fontWeight: item.isRead ? '400' : 'bold' }]}>{item.title}</Text>
                        {!item.isRead && <View style={Styles.unreadBadge} />}
                    </View>
                    <Text style={Styles.body}>{item.body}</Text>
                    <Text style={Styles.date}>
                        {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={Styles.container}>
            <View style={Styles.topview}>
                <TouchableOpacity style={Styles.backArrow} onPress={() => navigation.goBack()}>
                    <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                </TouchableOpacity>
                <Text style={Styles.headerText}>{strings.NOTIFICATIONS}</Text>
                {notifications.some(n => !n.isRead) && (
                    <TouchableOpacity onPress={handleMarkAllRead} style={Styles.markAllBtn}>
                        <Text style={Styles.markAllText}>Mark all read</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={notifications}
                contentContainerStyle={{ paddingBottom: moderateScale(100), paddingHorizontal: moderateScale(15), paddingTop: moderateScale(10) }}
                renderItem={renderNotificationItem}
                ListEmptyComponent={ListEmptyComponent}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
            />
            <CustomLoader visible={isLoading} />
        </View>
    );
};

export default Notifications;
