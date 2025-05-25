import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import Imagepaths from "../../../Constants/Imagepaths";
import { useTheme } from "../../../Constants/themes";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import actions from "../../../Redux/actions";
import { moderateScale } from "../../../Styles/ResponsiveSizes";
import { ListEmptyComponent } from "../../../Components/ListEmptyComponent";
import CustomButton from "../../../Components/CustomButton";
import CustomLoader from "../../../Components/Loaders";
import strings from "../../../Constants/languages";
import NavigationStrings from "../../../Constants/NavigationStrings";

const ViewComplaints = ({ navigation, route }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const complaintDetails = route?.params?.data || {};
    const [complaintsData, setComplaintsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getAllComplaints()
        }
    }, [isFocused]);

    const getAllComplaints = async () => {
        setIsLoading(true);
        try {
            const res = await actions.getAllUserComplaint(); // API response   
            const complaintBoxes = await actions.getAllComplaintBox();

            let filteredData = [];
            let filteredCategoryData = [];

            if (res.length > 0) {
                filteredData = res.filter(item => item?.category === complaintDetails?.category);
            }
            if (complaintBoxes.length > 0) {
                filteredCategoryData = complaintBoxes.filter(item => item?.category === complaintDetails?.category);
            }

            setComplaintsData(filteredData);
        } catch (error) {
            console.log(error, '❌ Error while fetching complaint boxes');
        }
        finally{
            setIsLoading(false);
        }
    }




    const onPressBack = () => {
        navigation.goBack();
    }

    const ConvertDateFormat = () => {
        const isoDate = complaintDetails?.createdAt;
        const date = new Date(isoDate);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    const renderComplaintsList = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.COMPLAINT_DETAIL, { data: item })} key={item?._id} style={Styles.ComplaintsList}>
                <View style={Styles.ComplaintsText}>
                    <Text style={Styles.complaintId}>{item.complaintId}</Text>
                    <Text style={Styles.complaintTitle}>{`${strings.TITLE} : ${item.title}`}</Text>
                </View>
                {item?.imageUrl ? <Image source={{ uri: item?.imageUrl }} resizeMode="cover" style={Styles.complaintimage} /> : <Image source={Imagepaths.transparent_logo} resizeMode="contain" style={Styles.complaintimage} />}
            </TouchableOpacity>
        )
    }

    return (
        <>
        <FlatList
            data={complaintsData}
            keyExtractor={item => item._id}
            renderItem={renderComplaintsList}
            ListEmptyComponent={ListEmptyComponent}
            style={Styles.container}
            contentContainerStyle={{ paddingBottom: moderateScale(100) }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <>
                    <View>
                        <View style={Styles.topContainer}>
                            <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                                <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                            </TouchableOpacity>
                            <Text style={Styles.headertext}>{complaintDetails?.category}</Text>
                        </View>
                        <View style={Styles.outerContainer}>
                            <View style={Styles.profileOutline}>
                                {complaintDetails?.imageUrl ? (
                                    <Image source={{ uri: complaintDetails?.imageUrl }} style={Styles.image} />
                                ) : (
                                    <Image source={Imagepaths.Launcher} style={Styles.image} />
                                )}
                            </View>
                            <CustomButton
                                onPress={() => navigation.navigate(NavigationStrings.CREATE_COMPLAINT_BOX, { data: complaintDetails })}
                                gradientColors={[themes.red, themes.red]}
                                title={`${strings.EDIT} ${strings.COMPLAINT_BOX}`}
                                textColor={themes.white} />
                            <View style={Styles.editprofileContainer}>
                                <Text style={Styles.complaintBoxDetails}>
                                    <Text style={{ fontWeight: '600', color: themes.white }}>{strings.COMPLAINT_BOX} : </Text>
                                    {complaintDetails?.complaintBoxName}
                                </Text>
                                <Text style={Styles.complaintBoxDetails}>
                                    <Text style={{ fontWeight: '600', color: themes.white }}>{strings.CREATED_ON} : </Text>
                                    {ConvertDateFormat()}
                                </Text>
                                <Text style={Styles.complaintBoxDetails}>
                                    <Text style={{ fontWeight: '600', color: themes.white }}>{strings.DESCRIPTION} : </Text>
                                    {complaintDetails?.description}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[Styles.complaintBoxDetails, { fontWeight: '600', color: themes.white, marginLeft: '5%', marginTop: moderateScale(15) }]}>{complaintDetails?.category} {strings.COMPLAINTS}</Text>
                </>
            }
        />
        <CustomLoader visible={isLoading} />
        </>

    )
}

export default ViewComplaints;