import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import getStyles from "./styles";
import { useEffect, useRef, useState } from "react";
import Imagepaths from "../../../Constants/Imagepaths";
import { height, moderateScale } from "../../../Styles/ResponsiveSizes";
import strings from "../../../Constants/languages";
import { useTheme } from "../../../Constants/themes";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../../Redux/actions";
import { ListEmptyComponent } from "../../../Components/ListEmptyComponent";
import CustomLoader from "../../../Components/Loaders";
import NavigationStrings from "../../../Constants/NavigationStrings";

const Search = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const isFocused = useIsFocused();
    const [searchValue, setSearchValue] = useState('');
    const [showSearchHistory, setShowSearchHistory] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [complaintList, setComplaintList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (isFocused) {
            getAllComplaintBoxes();
            setSearchValue('')
            getSingleUserComplaints();
        }
    }, [isFocused]);

    const getAllComplaintBoxes = async () => {
        setIsLoading(true);
        try {
            const res = await actions.getAllComplaintBox();
            const uniqueCategories = [...new Set(res.map(item => item.category))];
            const categoryList = uniqueCategories.map((cat, index) => ({
                id: `${index}`,
                title: cat,
            }));
            setSearchHistory(categoryList);
        } catch (error) {
            console.log(error, '❌ Error while fetching complaint boxes');
        }
        finally {
            setIsLoading(false);
        }
    };

    const getSingleUserComplaints = async () => {
        setIsLoading(true);
        try {
            const res = await actions.getSingleUserComplaint();
            setComplaintList(res)
        } catch (error) {
            console.log(error, '❌ Error while fetching complaint boxes');
        }
        finally {
            setIsLoading(false);
        }
    };

    const filteredData = searchValue
        ? searchHistory.filter(item =>
            item.title.toLowerCase().includes(searchValue.trim().toLowerCase())
        )
        : searchHistory;

    const filteredComplaints = searchValue
        ? complaintList.filter(item =>
            item.category.toLowerCase().includes(searchValue.trim().toLowerCase())
        )
        : complaintList;
    console.log(filteredComplaints, complaintList);


    const handleClearSearch = () => { setSearchValue(''); setShowSearchHistory(true); }

    const onPressSearchText = (item) => {
        setSearchValue(item.title);
        setShowSearchHistory(false);
    };

    const renderComplaintCategory = ({ item }) => {
        return (
            <View key={item?._id} style={Styles.searchHistoryOutline}>
                <TouchableOpacity onPress={() => onPressSearchText(item)} style={Styles.searchText}>
                    <Image resizeMode="contain" source={Imagepaths.search_new} style={Styles.search} />
                    <Text style={Styles.searchHistoryText}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderComplaintsList = ({ item }) => {
        return (
            <TouchableOpacity key={item?._id} style={Styles.ComplaintsList} onPress={() => navigation.navigate(NavigationStrings.COMPLAINT_DETAIL, { complaintId: item?._id })}>
                <View style={Styles.ComplaintsText}>
                    <Text style={Styles.complaintId}>{item.complaintId}</Text>
                    <Text style={Styles.complaintTitle}>{`${strings.TITLE} : ${item.title}`}</Text>
                </View>
                {item?.imageUrl ? <Image source={{ uri: item?.imageUrl }} resizeMode="cover" style={Styles.image} /> : <Image source={Imagepaths.transparent_logo} resizeMode="contain" style={Styles.image} />}
            </TouchableOpacity>
        )
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.outerContainer}>
                <View style={Styles.searchContainer}>
                    <View style={Styles.searchIconOutline}>
                        <Image tintColor={themes.white} source={Imagepaths.search1} style={Styles.searchIcon} />
                    </View>
                    <TextInput
                        placeholderTextColor={themes.gray}
                        ref={inputRef}
                        onFocus={() => setShowSearchHistory(true)}
                        value={searchValue}
                        placeholder={strings.SEARCH_COMPLAINTS}
                        onChangeText={text => setSearchValue(text)}
                        style={[Styles.inputStyle, { width: searchValue ? '80%' : '90%' }]}
                    />
                    {searchValue && (
                        <TouchableOpacity onPress={handleClearSearch} style={Styles.clearButton}>
                            <Image
                                tintColor={themes.white}
                                resizeMode="contain"
                                source={Imagepaths.close}
                                style={[Styles.close, { marginRight: moderateScale(10) }]}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                {showSearchHistory && (
                    <View style={Styles.recentSearchesOutline}>
                        <Text style={Styles.recentSearchesText}>{strings.COMPLAINT_BOX}:</Text>
                        {filteredData.length > 0 ? (
                            <FlatList
                                data={filteredData}
                                keyExtractor={item => item._id}
                                renderItem={renderComplaintCategory}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={ListEmptyComponent}
                            />
                        ) : (
                            <Text style={Styles.noResultText}>{strings.NO_CATEGORY_FOUND}</Text>
                        )}
                    </View>
                )}
                <View
                    style={[
                        Styles.recentSearchesOutline,
                        { marginTop: showSearchHistory ? moderateScale(20) : moderateScale(0), maxHeight: showSearchHistory ? height / 3.1 : height / 1.4 },
                    ]}
                >
                    <Text style={Styles.recentSearchesText}>{strings.YOUR} {strings.COMPLAINTS}:</Text>
                    {filteredComplaints.length > 0 ? (
                        <FlatList
                            data={filteredComplaints}
                            keyExtractor={item => item.id}
                            renderItem={renderComplaintsList}
                            ListEmptyComponent={ListEmptyComponent}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <Text style={Styles.noResultText}>{strings.NO_COMPLAINTS_FOUND}</Text>
                    )}
                </View>
            </View>
            <CustomLoader visible={isLoading} />
        </View>
    );
};

export default Search;
