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

const ComplaintDetail = ({ navigation, route }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [isModalVisible, setIsModalVisible] = useState({enable: false, status: '' });
    const [alertMessage, setAlertMessage] = useState('');
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
        console.log(error?.message || error?.error);
        showError(error?.message || error?.error);
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
    
        console.log(data, '📦 Preparing to update complaint status with the following data:');
    
        await actions.updateComplaintStatus(data)
            .then((res) => {
                showSuccess(res?.message);
                setIsModalVisible({ enable: false, status: '' });
                onPressBack();
            })
            .catch(errorMethod);
    };
    

    const onPressChangeStatus = (status) => {
        const statusMessages = {
            unresolved: 'This action cannot be undone. Are you sure you want to proceed this complaint to In Progress?',
            inprogress: 'This action cannot be undone. Are you sure you want to proceed this complaint to Resolve?',
            resolved: 'This complaint has already been resolved and cannot be updated further.',
            rejected: 'This complaint has already been rejected and cannot be updated further.',
            reject: 'This action cannot be undone. Are you sure you want to proceed this complaint to Reject?',
        };
    
        if (statusMessages[status]) {
            setIsModalVisible({ enable: true, status });
            setAlertMessage(statusMessages[status]);
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
                            <Text style={{ fontWeight: '600', color: themes.white }}>Complaint Title : </Text>
                            {complaintData?.title}
                        </Text>
                        <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>Complaint ID : </Text>
                            {complaintData?.complaintId}
                        </Text>
                        <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>Created on : </Text>
                            {ConvertDateFormat()}
                        </Text>
                        <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>Description : </Text>
                            {complaintData?.description}
                        </Text>
                        <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>Status : </Text>
                            {complaintData?.status}
                        </Text>
                        {userData?.role !== 'admin' && <Text style={Styles.complaintBoxDetails}>
                            <Text style={{ fontWeight: '600', color: themes.white }}>message : </Text>
                            {complaintData?.reason}
                        </Text>}
                    </View>
                    {complaintData?.status !=="rejected" && userData?.role === 'admin' &&  <CustomButton
                        onPress={() => onPressChangeStatus(complaintData?.status)}
                        gradientColors={[themes.red, themes.red]}
                        title={complaintData?.status === "unresolved" ? "Move this to In Progress" : complaintData?.status === "inprogress" ? "Resolve this complaint" : complaintData?.status === "resolved" ? "This complaint is already resolved" : ''}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(60) }} />
                    }
                    {complaintData?.status !== "resolved" && userData?.role === 'admin' && <CustomButton
                        onPress={() => onPressChangeStatus(complaintData?.status !=="rejected" ? 'reject' : "rejected")}
                        gradientColors={[themes.purple, themes.purple]}
                        title={complaintData?.status !=="rejected" ? "Reject this complaint" : "This complaint is already rejected"}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(40)}} />}
                </View>
                <AlertPopup isCancelVisible={isModalVisible?.enable && complaintData?.status !== "resolved" && complaintData?.status !== "rejected"} isModalVisible={isModalVisible?.enable} onPressCancel={() => setIsModalVisible({enable: false, status: '' })} onPressSubmit={updateStatus} message={alertMessage}/>
            </View>
        </ScrollView>

    )
}

export default ComplaintDetail;