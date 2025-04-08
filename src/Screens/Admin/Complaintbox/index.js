import { FlatList, Image, Text, View } from "react-native";
import getStyles from "./styles";
import { height, moderateScale } from "../../../Styles/ResponsiveSizes";
import { PieChart } from "react-native-gifted-charts";
import Imagepaths from "../../../Constants/Imagepaths";
import { useTheme } from "../../../Constants/themes";

const ComplaintBoxes = () => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const complaintsData = [
        { id: 1, image: Imagepaths.Water, complaint_type: 'Water',value:70, solved: 70, total_complaints: 114, color: themes.blue },
        { id: 2, image: Imagepaths.electricty, complaint_type: 'Electricity',value:50, solved: 50, total_complaints: 56, color: themes.red },
        { id: 3, image: Imagepaths.road, complaint_type: 'Road',value:23, solved: 23, total_complaints: 64, color: themes.purple },
        { id: 4, image: Imagepaths.garbage, complaint_type: 'Garbage',value:15, solved: 15, total_complaints: 50, color: themes.green },
        { id: 5, image: Imagepaths.streetLight, complaint_type: 'Street Light',value:3, solved: 3, total_complaints: 5, color: themes.blue1 },
    ];

    const totalComplaints = complaintsData.reduce((acc, complaint) => acc + complaint.total_complaints, 0);

    const renderComplaints = ({ item }) => {
        return (
            <View style={Styles.complaintlist}>
                <View style={Styles.complaindetails}>
                    <View style={Styles.imgview}>
                        <Image source={item.image} resizeMode="contain" style={Styles.image} />
                    </View>
                    <View style={Styles.detailtxtoutline}>
                        <View>
                            <Text style={Styles.complaintname}> {item.complaint_type}</Text>
                            <Text style={Styles.compsolvecount}>{item.total_complaints - item.solved} left to solve</Text>
                        </View>
                        <View>
                            <Text style={Styles.complaintname}>{item.total_complaints}</Text>
                            <Text style={Styles.compsolvecount}>{item.solved} Sloved</Text>
                        </View>
                    </View>
                </View>
                <View style={Styles.progressoutline}>
                    <View style={[Styles.progress, { width: `${(item.solved / item.total_complaints) * 100}%`, backgroundColor: item.color }]}></View>
                </View>

            </View>
        )
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.chartouterview}>
                <PieChart
                    donut
                    innerRadius={moderateScale(80)}
                    innerCircleColor={themes.background}
                    data={complaintsData}
                    centerLabelComponent={() => {
                        return <View>
                            <Text style={Styles.complaintscount}>{complaintsData.length}</Text>
                            <Text style={Styles.totalcomplaints}>Total {totalComplaints} Complaints</Text>
                        </View>
                    }}
                />
            </View>
            <View style={Styles.bottomcontainer}>
                <View style={Styles.createcomplaintbtn} >
                    <Text style={Styles.createcomplainttext}>Created Complaint Boxes</Text>
                </View>
                <FlatList
                    style={{ height: height / 1.9 }}
                    contentContainerStyle={{paddingBottom: moderateScale(100)}}
                    data={complaintsData}
                    renderItem={renderComplaints}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </View>
    );
}

export default ComplaintBoxes