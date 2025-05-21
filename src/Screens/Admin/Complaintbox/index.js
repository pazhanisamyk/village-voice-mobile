import { FlatList, Image, Text, View } from "react-native";
import getStyles from "./styles";
import { height, moderateScale } from "../../../Styles/ResponsiveSizes";
import { PieChart } from "react-native-gifted-charts";
import Imagepaths from "../../../Constants/Imagepaths";
import { useTheme } from "../../../Constants/themes";
import { useEffect, useState } from "react";
import actions from "../../../Redux/actions";
import { useIsFocused } from "@react-navigation/native";
import { ListEmptyComponent } from "../../../Components/ListEmptyComponent";

const ComplaintBoxes = () => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const isFocused = useIsFocused();
    const [complaintsData, setComplaintsData] = useState([]);

    useEffect(() => {
        if (isFocused) {
            getAllComplaints();
        }
    }, [isFocused]);

    const colorArray = [themes.blue, themes.red, themes.purple, themes.green, themes.blue1];

    const getAllComplaints = async () => {
        try {
            const res = await actions.getAllUserComplaint(); // API response
            const complaintBoxes = await actions.getAllComplaintBox(); // Assuming you fetch this too

            console.log(res, '📦 All Complaint Data');
            console.log(complaintBoxes, '📦 Complaint Box Configs');

            // Step 1: Group complaints by category
            const grouped = res.reduce((acc, complaint) => {
                const category = complaint.category;

                if (!acc[category]) {
                    acc[category] = { total: 0, solved: 0, rejected: 0 };
                }

                acc[category].total += 1;

                const status = complaint.status.toLowerCase();
                if (status === 'resolved') {
                    acc[category].solved += 1;
                } else if (status === 'rejected') {
                    acc[category].rejected += 1;
                }

                return acc;
            }, {});

            // Step 2: Build final array
            const usedColors = new Set();
            const formatted = Object.entries(grouped).map(([category, counts], index) => {
                const box = complaintBoxes.find(cb => cb.category === category);
                const imageUrl = box?.imageUrl || Imagepaths.transparent_logo;

                // Assign color
                let color;
                if (index < colorArray.length) {
                    color = colorArray[index];
                    usedColors.add(color);
                } else {
                    const unusedColors = colorArray.filter(c => !usedColors.has(c));
                    color = unusedColors.length > 0
                        ? unusedColors[Math.floor(Math.random() * unusedColors.length)]
                        : colorArray[Math.floor(Math.random() * colorArray.length)];
                }

                return {
                    id: index + 1,
                    image: imageUrl,
                    complaint_type: category,
                    value: counts.solved,
                    solved: counts.solved,
                    rejected: counts.rejected,
                    total_complaints: counts.total,
                    color,
                };
            });

            setComplaintsData(formatted);
        } catch (error) {
            console.log(error, '❌ Error while fetching complaint boxes');
        }
    };

    const renderComplaints = ({ item }) => {
        return (
            <View style={Styles.complaintlist}>
                <View style={Styles.complaindetails}>
                    <View style={Styles.imgview}>
                        {item.image?.includes('https:')
                            ? <Image source={{ uri: item.image }} resizeMode="cover" style={Styles.image} />
                            : <Image source={Imagepaths.transparent_logo} resizeMode="contain" style={Styles.image} />}
                    </View>
                    <View style={Styles.detailtxtoutline}>
                        <View>
                            <Text style={Styles.complaintname}>{item.complaint_type}</Text>
                            <Text style={Styles.compsolvecount}>
                                {item.total_complaints - item.solved - item.rejected} left to solve
                            </Text>
                        </View>
                        <View>
                            <Text style={Styles.complaintname}>{item.total_complaints}</Text>
                            <Text style={Styles.compsolvecount}>{item.solved} Solved</Text>
                            <Text style={[Styles.compsolvecount, { color: themes.red }]}>{item.rejected} Rejected</Text>
                        </View>
                    </View>
                </View>
                <View style={Styles.progressoutline}>
                    <View
                        style={[
                            Styles.progress,
                            {
                                width: `${(item.solved / item.total_complaints) * 100}%`,
                                backgroundColor: item.color,
                            },
                        ]}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={Styles.container}>
            <View style={Styles.chartouterview}>
                <PieChart
                    donut
                    innerRadius={moderateScale(80)}
                    radius={moderateScale(130)}
                    innerCircleColor={themes.background}
                    strokeCap="round"
                    data={complaintsData.map(item => ({
                        value: item.total_complaints,
                        color: item.color,
                        text: `${item.complaint_type} (${item.total_complaints})`,
                    }))}
                    centerLabelComponent={() => {
                        const resolved = complaintsData.reduce((sum, item) => sum + item.solved, 0);
                        const total = complaintsData.reduce((sum, item) => sum + item.total_complaints, 0);
                        const resolutionRate = total ? Math.round((resolved / total) * 100) : 0;

                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={Styles.complaintscount}>{resolved}/{total}</Text>
                                <Text style={Styles.totalcomplaints}>Resolved</Text>
                                <Text style={[Styles.totalcomplaints, { fontSize: 12, color: 'gray' }]}>
                                    {resolutionRate}% Resolved
                                </Text>
                            </View>
                        );
                    }}
                />
            </View>
            <View style={Styles.bottomcontainer}>
                <View style={Styles.createcomplaintbtn}>
                    <Text style={Styles.createcomplainttext}>Created Complaint Boxes</Text>
                </View>
                <FlatList
                    style={{ height: height / 1.9 }}
                    contentContainerStyle={{ paddingBottom: moderateScale(100) }}
                    data={complaintsData}
                    renderItem={renderComplaints}
                    ListEmptyComponent={ListEmptyComponent}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default ComplaintBoxes;
