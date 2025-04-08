import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import getStyles from "./styles";
import { useTheme } from "../../../Constants/themes";
import { moderateScale } from "../../../Styles/ResponsiveSizes";

const CreatedComplaintBoxes = ({navigation}) => {
    const {themes } = useTheme();
    const Styles = getStyles(themes);
    const sampleData = [
        {
            id: 1,
            title: 'Water',
            image: Imagepaths.Water
        },
        {
            id: 2,
            title: 'Road',
            image: Imagepaths.road
        },
        {
            id: 3,
            title: 'Garbage',
            image: Imagepaths.streetLight
        },
        {
            id: 4,
            title: 'Electricity',
            image: Imagepaths.electricty
        },
        {
            id: 6,
            title: 'Street Light',
            image: Imagepaths.streetLight
        },
        {
            id: 7,
            title: 'Street Light',
            image: Imagepaths.streetLight
        },
        {
            id: 8,
            title: 'Street Light',
            image: Imagepaths.streetLight
        },
        {
            id: 9,
            title: 'Street Light',
            image: Imagepaths.streetLight
        }

    ];

    const renderComplaintBoxes = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { }} style={Styles.complaints}>
                <Image source={item.image} resizeMode="contain" style={Styles.image} />
                <Text style={Styles.complaintText}>{item.title}</Text>
                {/* <Image source={Imagepaths.double_right} style={Styles.arrowRight} /> */}
            </TouchableOpacity>
        )
    }
    return (
        <View style={Styles.container}>
                <FlatList
                    numColumns={2}
                    data={sampleData}
                    contentContainerStyle={{paddingBottom: moderateScale(100)}}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderComplaintBoxes}
                    showsVerticalScrollIndicator={false} />
                <View style={Styles.createComplaint}>
                    <TouchableOpacity style={Styles.plusBtn} onPress={() => navigation.navigate('CreateComplainBox')}>
                        <Image source={Imagepaths.Plus} style={Styles.plusIcon} />
                    </TouchableOpacity>
                </View>
            </View>
    )
}

export default CreatedComplaintBoxes;