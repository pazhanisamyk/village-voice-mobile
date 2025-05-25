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
import CustomLoader from "../../../Components/Loaders";
import strings from "../../../Constants/languages";

const ComplaintBoxes = () => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const isFocused = useIsFocused();
    const [complaintsData, setComplaintsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isFocused) {
            getAllComplaints();
        }
    }, [isFocused]);

    const colorArray = [themes.blue, themes.red, themes.purple, themes.green, themes.blue1];

    const getAllComplaints = async () => {
        setIsLoading(true);
        try {
            const res = await actions.getAllUserComplaint();
            const complaintBoxes = await actions.getAllComplaintBox(); 
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

            const usedColors = new Set();
            const formatted = Object.entries(grouped).map(([category, counts], index) => {
                const box = complaintBoxes.find(cb => cb.category === category);
                const imageUrl = box?.imageUrl || Imagepaths.transparent_logo;

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
        finally{
            setIsLoading(false);
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
                                {item.total_complaints - item.solved - item.rejected} {strings.LEFT_TO_SOLVE}
                            </Text>
                        </View>
                        <View>
                            <Text style={Styles.complaintname}>{item.total_complaints}</Text>
                            <Text style={Styles.compsolvecount}>{item.solved} {strings.SOLVED}</Text>
                            <Text style={[Styles.compsolvecount, { color: themes.red }]}>{item.rejected} {strings.REJECTED}</Text>
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
                                <Text style={Styles.totalcomplaints}>{strings.RESOLVED}</Text>
                                <Text style={[Styles.totalcomplaints, { fontSize: 12, color: 'gray' }]}>
                                    {resolutionRate}% {strings.RESOLVED}
                                </Text>
                            </View>
                        );
                    }}
                />
            </View>
            <View style={Styles.bottomcontainer}>
                <View style={Styles.createcomplaintbtn}>
                    <Text style={Styles.createcomplainttext}>{strings.CREATED_COMPLAINT_BOXES}</Text>
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
            <CustomLoader visible={isLoading} />
        </View>
    );
};

export default ComplaintBoxes;
