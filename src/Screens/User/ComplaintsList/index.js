import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles"
import Imagepaths from "../../../Constants/Imagepaths";
import { useTheme } from "../../../Constants/themes";

const ComplaintsList = () => {
    const {themes } = useTheme();
    const Styles = getStyles(themes);

    const sampleData = [
        {
            id:1,
            complaint_id: '#VCB0001',
            title: 'Water supply not delivered properly',
            image: Imagepaths.Water
        },
        {
            id:2,
            complaint_id: '#VCB0002',
            title: 'Electricity supply not delivered properly',
            image: Imagepaths.electricty
        },
        {
            id:3,
            complaint_id: '#VCB0003',
            title: 'Garbage not collected properly',
            image: Imagepaths.garbage
        },
        {
            id:4,
            complaint_id: '#VCB0004',
            title: 'Street light not Glow properly',
            image: Imagepaths.streetLight
        },
        {
            id:5,
            complaint_id: '#VCB0005',
            title: 'Road full of ups and downs',
            image: Imagepaths.road
        },
        {
            id:6,
            complaint_id: '#VCB0006',
            title: 'Water supply not delivered properly',
            image: Imagepaths.Water
        }    
    ];

    const renderComplaintsList = ({item}) => {
        return(
            <TouchableOpacity style={Styles.ComplaintsList}>
                <View style={Styles.ComplaintsText}>
                <Text style={Styles.complaintId}>{item.complaint_id}</Text>
                <Text style={Styles.complaintTitle}>{`Title : ${item.title}`}</Text>
                </View>
                <Image source={item.image} resizeMode="contain" style={Styles.image} />
            </TouchableOpacity>
        )
    }

    return(
        <View style={Styles.container}>
        <View style={Styles.editprofileContainer}>
            <FlatList 
            data={sampleData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderComplaintsList}
            showsVerticalScrollIndicator={false}/>
            </View>
            </View>
    )
}

export default ComplaintsList;