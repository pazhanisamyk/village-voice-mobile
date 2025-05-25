import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import Imagepaths from "../../../Constants/Imagepaths";
import getStyles from "./styles";
import { useTheme } from "../../../Constants/themes";
import { height, moderateScale } from "../../../Styles/ResponsiveSizes";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../../Redux/actions";
import { ListEmptyComponent } from "../../../Components/ListEmptyComponent";
import CustomLoader from "../../../Components/Loaders";
import NavigationStrings from "../../../Constants/NavigationStrings";

const CreatedComplaintBoxes = ({navigation}) => {
    const {themes } = useTheme();
    const Styles = getStyles(themes);
    const [complaintBoxData, setComplaintBoxData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused)
        {
        getAllComplaintBoxes();
        }
    }, [isFocused]);
    
    const getAllComplaintBoxes = async () => {
        setIsLoading(true);
        try {
            const res = await actions.getAllComplaintBox();
            setComplaintBoxData(res)
        } catch (error) {
            console.log(error, '❌ Error while fetching complaint boxes');
        }
        finally{
            setIsLoading(false);
        }
    };

    const renderComplaintBoxes = ({ item }) => {
        return (
            <TouchableOpacity key={item?._id} onPress={() => navigation.navigate(NavigationStrings.VIEW_COMPLAINTS,{data: item})} style={Styles.complaints}>
                {item.imageUrl ? <Image source={{uri: item.imageUrl}} resizeMode="cover" style={Styles.image} /> : <Image source={Imagepaths.transparent_logo} resizeMode="contain" style={Styles.image} />}
                <Text style={Styles.complaintText}>{item.category}</Text>
            </TouchableOpacity>
        )
    }

    const renderEmpty = () => {
        return(
            <ListEmptyComponent
            containerStyle={{height: moderateScale(height-80)}} />
        )
    };

    return (
        <View style={Styles.container}>
                <FlatList
                    numColumns={2}
                    data={complaintBoxData}
                    contentContainerStyle={{paddingBottom: moderateScale(100)}}
                    keyExtractor={item => item?._id}
                    renderItem={renderComplaintBoxes}
                    ListEmptyComponent={renderEmpty}
                    showsVerticalScrollIndicator={false} />
                <View style={Styles.createComplaint}>
                    <TouchableOpacity style={Styles.plusBtn} onPress={() => navigation.navigate(NavigationStrings.CREATE_COMPLAINT_BOX)}>
                        <Image source={Imagepaths.Plus} style={Styles.plusIcon} />
                    </TouchableOpacity>
                </View>
                <CustomLoader visible={isLoading} />
            </View>
    )
}

export default CreatedComplaintBoxes;