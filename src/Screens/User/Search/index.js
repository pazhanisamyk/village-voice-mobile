import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import getStyles from "./styles";
import { useRef, useState } from "react";
import Imagepaths from "../../../Constants/Imagepaths";
import { moderateScale } from "../../../Styles/ResponsiveSizes";
import strings from "../../../Constants/languages";
import { useTheme } from "../../../Constants/themes";

const Search = () => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [searchValue, setSearchValue] = useState('');
    const [showSearchHistory, setShowSearchHistory] = useState(false);
    const [searchHistory, setSearchHistory] = useState([
        { id: 1, title: 'Water Complaints' },
        { id: 2, title: 'Garbage Complaints' },
        { id: 3, title: 'Road Complaints' },
        { id: 4, title: 'Streetlight Complaints' },
        { id: 5, title: 'Electricity Complaints' },
    ]);

    const inputRef = useRef(null);

    // Filtered search data based on search value
    const filteredData = searchValue
        ? searchHistory.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        : searchHistory;

    const handleClearSearch = () => setSearchValue('');

    const handleDeleteHistoryItem = (id) => {
        setSearchHistory(prevHistory => prevHistory.filter(item => item.id !== id));
    };

    const onPressSearchText = (item) => {
        setSearchValue(item.title);
        setShowSearchHistory(false);
    }

    const renderSearchHistory = ({ item }) => {
        return (
            <View style={Styles.searchHistoryOutline}>
                <TouchableOpacity onPress={()=>onPressSearchText(item)} style={Styles.searchText}>
                    <Image resizeMode="contain" source={Imagepaths.search_new} style={Styles.search} />
                    <Text style={Styles.searchHistoryText}>{item.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteHistoryItem(item.id)}>
                    <Image resizeMode="contain" source={Imagepaths.close} style={Styles.close} />
                </TouchableOpacity>
            </View>
        );
    };

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
                        onFocus={()=> setShowSearchHistory(true)}
                        value={searchValue}
                        placeholder={strings.SEARCH_COMPLAINTS}
                        onChangeText={text => setSearchValue(text)}
                        style={Styles.inputStyle}
                    />
                    {searchValue ? (
                        <TouchableOpacity onPress={handleClearSearch} style={Styles.clearButton}>
                            <Image tintColor={themes.white} resizeMode="contain" source={Imagepaths.close} style={[Styles.close, {marginRight: moderateScale(10)}]} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => {}} style={Styles.searchIconOutline}>
                            <Image tintColor={themes.white} source={Imagepaths.mic} style={Styles.micIcon} />
                        </TouchableOpacity>
                    )}
                </View>
                {showSearchHistory && <View style={Styles.recentSearchesOutline}>
                    <Text style={Styles.recentSearchesText}>Recent Searches:</Text>
                    <FlatList
                        data={filteredData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderSearchHistory}
                        showsVerticalScrollIndicator={false}
                    />
                </View>}
            </View>
        </View>
    );
};

export default Search;
