import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import Imagepaths from "../../Constants/Imagepaths";
import { useTheme } from "../../Constants/themes";
import { useState } from "react";
import actions from "../../Redux/actions";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import CustomButton from "../../Components/CustomButton";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import AlertPopup from "../../Components/AlertPopup";
import { useSelector } from "react-redux";
import CustomLoader from "../../Components/Loaders";
import strings from "../../Constants/languages";

const ComplaintDetail = ({ navigation, route }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [isModalVisible, setIsModalVisible] = useState({ enable: false, status: '' });
    const [deletePopup, setDeletePopup] = useState({ visible: false, deleteId: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const complaintData = route?.params?.data || {};
    const userData = useSelector((state) => state?.auth?.userData);


    const onPressBack = () => {
        navigation.goBack();
    }

    const ConvertDateFormat = () => {
        const isoDate = complaintData?.createdAt;
        const date = new Date(isoDate);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };

    const deleteComplaint = async () => {
        setIsLoading(true);
        try {
            const res = await actions.deletedComplaint(deletePopup.deleteId);
            showSuccess(res?.message);
            setDeletePopup({ visible: false, deleteId: 0 });
            onPressBack();
        }
        catch (error) {
            errorMethod(error);
        }
        finally {
            setIsLoading(false);
        }

    };

    const openDeletePopup = (deleteId) => {
        setDeleteMessage(strings.COMPLAINT_DELETE_MGS);
        setDeletePopup({ visible: true, deleteId: deleteId });
    };

    const updateStatus = async () => {        
        let data = {};

        switch (isModalVisible.status) {
            case "unresolved":
                data = {
                    complaintId: complaintData?._id,
                    status: "inprogress",
                    reason: "Your complaint is now in progress",
                };
                break;

            case "inprogress":
                data = {
                    complaintId: complaintData?._id,
                    status: "resolved",
                    reason: "Your complaint was resolved",
                };
                break;

            case "reject":
                data = {
                    complaintId: complaintData?._id,
                    status: "rejected",
                    reason: "Your complaint was rejected",
                };
                break;

            case "resolved":
            case "rejected":
                setAlertMessage('');
                setIsModalVisible({ enable: false, status: '' });
                return;

            default:
                return;
        }
        try {
            setIsLoading(true);
            const res = await actions.updateComplaintStatus(data)
            showSuccess(res?.message);
            setIsModalVisible({ enable: false, status: '' });
            onPressBack();
        } catch (error) {
            errorMethod(error);
        }
        finally {
            setIsLoading(false);
        }
    };


   const onPressChangeStatus = (status) => {
    const statusMessages = {
        unresolved: strings.UNRESOLVE_MSG,
        inprogress: strings.INPROGRESS_MSG,
        resolved: strings.RESOLVED_MSG,
        rejected: strings.REJECTED_MSG,
        reject: strings.REJECT_MSG,
    };

    const message = statusMessages[status];
    if (message) {
        setIsModalVisible({ enable: true, status });
        setAlertMessage(message);
    }
};


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>{complaintData?.category}</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <View style={Styles.profileOutline}>
                        {complaintData?.imageUrl ? (
                            <Image source={{ uri: complaintData?.imageUrl }} style={Styles.image} />
                        ) : (
                            <Image source={Imagepaths.Launcher} style={Styles.image} />
                        )}
                    </View>
                    <View style={Styles.editprofileContainer}>
                        <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>{strings.COMPLAINT} {strings.TITLE} : </Text>
                            {complaintData?.title}
                        </Text>
                        <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>{strings.COMPLAINT} {strings.ID} : </Text>
                            {complaintData?.complaintId}
                        </Text>
                        <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>{strings.CREATED_ON} : </Text>
                            {ConvertDateFormat()}
                        </Text>
                        <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>{strings.DESCRIPTION} : </Text>
                            {complaintData?.description}
                        </Text>
                        <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>{strings.STATUS} : </Text>
                            {complaintData?.status}
                        </Text>
                        {userData?.role !== 'admin' && <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>{strings.MESSAGE} : </Text>
                            {complaintData?.reason}
                        </Text>}
                    </View>
                    {complaintData?.status !== "rejected" && userData?.role === 'admin' && <CustomButton
                        onPress={() => onPressChangeStatus(complaintData?.status)}
                        gradientColors={[themes.red, themes.red]}
                        title={complaintData?.status === "unresolved" ? strings.INPROGRESS_BTN_NAME : complaintData?.status === "inprogress" ? strings.RESOLVE_BTN_NAME : complaintData?.status === "resolved" ? strings.RESOLVED_BTN_NAME : ''}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(60) }} />
                    }
                    {userData?.role === 'user' && <CustomButton
                        onPress={() => openDeletePopup(complaintData?._id)}
                        gradientColors={[themes.red, themes.red]}
                        title={strings.DELETE_COMPLAINT_BTN_NAME}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(40) }} />
                    }
                    {complaintData?.status !== "resolved" && userData?.role === 'admin' && <CustomButton
                        onPress={() => onPressChangeStatus(complaintData?.status !== "rejected" ? 'reject' : "rejected")}
                        gradientColors={[themes.purple, themes.purple]}
                        title={complaintData?.status !== "rejected" ? strings.REJECT_COMPLAINT_BTN_NAME : strings.REJECTED_COMPLAINT_BTN_NAME}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(40) }} />}
                </View>
                <AlertPopup isCancelVisible={isModalVisible?.enable && complaintData?.status !== "resolved" && complaintData?.status !== "rejected"} isModalVisible={isModalVisible?.enable} onPressCancel={() => setIsModalVisible({ enable: false, status: '' })} onPressSubmit={updateStatus} message={alertMessage} />
                <AlertPopup isCancelVisible={deletePopup?.visible} isModalVisible={deletePopup?.visible} onPressCancel={() => setDeletePopup({ visible: false, deleteId: 0 })} onPressSubmit={deleteComplaint} message={deleteMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>

    )
}

export default ComplaintDetail;