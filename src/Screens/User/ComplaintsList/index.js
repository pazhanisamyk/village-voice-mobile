import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles"
import Imagepaths from "../../../Constants/Imagepaths";
import { useTheme } from "../../../Constants/themes";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../../Redux/actions";
import { ListEmptyComponent } from "../../../Components/ListEmptyComponent";
import CustomLoader from "../../../Components/Loaders";
import strings from "../../../Constants/languages";

const ComplaintsList = ({navigation}) => {
    const {themes } = useTheme();
    const Styles = getStyles(themes);
    const [complaintList, setComplaintList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();

        useEffect(() => {
            if (isFocused) {
                getSingleUserComplaints();
            }
        }, [isFocused]);
    
        const getSingleUserComplaints = async () => {
            setIsLoading(true);
            try {
                const res = await actions.getSingleUserComplaint();
                setComplaintList(res)
            } catch (error) {
                console.log(error, '❌ Error while fetching complaint boxes');
            }
            finally{
                setIsLoading(false);
            }
        };

    const renderComplaintsList = ({item}) => {
        return(
            <TouchableOpacity onPress={()=>navigation.navigate('ComplaintDetail', {data: item})} key={item?._id} style={Styles.ComplaintsList}>
                <View style={Styles.ComplaintsText}>
                <Text style={Styles.complaintId}>{item.complaintId}</Text>
                <Text style={Styles.complaintTitle}>{`${strings.TITLE} : ${item.title}`}</Text>
                </View>
                {item?.imageUrl ? <Image source={{uri: item?.imageUrl}} resizeMode="cover" style={Styles.image} /> : <Image source={Imagepaths.transparent_logo} resizeMode="contain" style={Styles.image} />}
            </TouchableOpacity>
        )
    }

    return(
        <View style={Styles.container}>
        <View style={Styles.editprofileContainer}>
            <FlatList 
            data={complaintList}
            keyExtractor={item => item._id}
            renderItem={renderComplaintsList}
            ListEmptyComponent={ListEmptyComponent}
            showsVerticalScrollIndicator={false}/>
            </View>
            <CustomLoader visible={isLoading} />
            </View>
    )
}

export default ComplaintsList;