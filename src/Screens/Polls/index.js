import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import getStyles from "./styles";
import { useEffect, useState } from "react";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import Imagepaths from "../../Constants/Imagepaths";
import strings from "../../Constants/languages";
import { useTheme } from "../../Constants/themes";
import CustomButton from "../../Components/CustomButton";
import { useSelector } from "react-redux";
import AlertPopup from "../../Components/AlertPopup";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../Redux/actions";
import { showSuccess, showError } from "../../Utils/helperfunctions";
import { ListEmptyComponent } from "../../Components/ListEmptyComponent";
import CustomLoader from "../../Components/Loaders";
import NavigationStrings from "../../Constants/NavigationStrings";

const Polls = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const isFocused = useIsFocused();
    const [polls, setPolls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state?.auth?.userData);
    const [selectedOptions, setSelectedOptions] = useState({}); // { pollId: optionId }
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState({ status: false, deleteId: null });

    useEffect(() => {
        if (isFocused) {
            fetchPolls();
        }
    }, [isFocused]);

    const fetchPolls = async () => {
        setIsLoading(true);
        try {
            const res = await actions.getAllPolls();
            setPolls(res || []);
        } catch (error) {
            console.log(error, 'Error while fetching polls');
            showError('Failed to load polls');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVote = async (pollId) => {
        const optionId = selectedOptions[pollId];
        if (!optionId) {
            showError("Please select an option first.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await actions.voteInPoll({ pollId, optionId });
            showSuccess(res?.message || 'Vote cast successfully');
            fetchPolls();
        } catch (error) {
            console.log(error);
            showError(error?.response?.data?.message || 'Failed to cast vote');
        } finally {
            setIsLoading(false);
        }
    };

    const onPressDelete = (id) => {
        setIsDeleteModalVisible({ status: true, deleteId: id });
    };

    const onConfirmDelete = async () => {
        setIsLoading(true);
        try {
            const res = await actions.deletePoll(isDeleteModalVisible.deleteId);
            setIsDeleteModalVisible({ status: false, deleteId: null });
            showSuccess(res?.message || 'Poll deleted successfully');
            fetchPolls();
        } catch (error) {
            console.log(error, 'Error while deleting poll');
            showError('Failed to delete poll');
        } finally {
            setIsLoading(false);
        }
    };

    const renderPollItem = ({ item }) => {
        const isExpired = new Date(item.expiresAt) < new Date();
        const hasVoted = item.votedUserIds?.includes(userData?._id);
        const totalVotes = item.options.reduce((sum, opt) => sum + opt.votes, 0);

        return (
            <View style={Styles.card}>
                <View style={Styles.cardHeader}>
                    <Text style={Styles.question}>{item.question}</Text>
                    {isExpired && <Text style={Styles.expiredBadge}>{strings.EXPIRED}</Text>}
                </View>

                <View style={Styles.optionsContainer}>
                    {item.options.map((opt) => {
                        const isSelected = selectedOptions[item._id] === opt._id;
                        const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;

                        if (hasVoted || isExpired) {
                            return (
                                <View key={opt._id} style={Styles.resultRow}>
                                    <View style={Styles.resultLabelRow}>
                                        <Text style={Styles.optionText}>{opt.optionText}</Text>
                                        <Text style={Styles.percentageText}>{percentage}% ({opt.votes})</Text>
                                    </View>
                                    <View style={Styles.progressBarBg}>
                                        <View style={[Styles.progressBarFill, { width: `${percentage}%` }]} />
                                    </View>
                                </View>
                            );
                        } else {
                            return (
                                <TouchableOpacity 
                                    key={opt._id} 
                                    onPress={() => setSelectedOptions({ ...selectedOptions, [item._id]: opt._id })}
                                    style={[Styles.optionBtn, isSelected && Styles.optionBtnSelected]}
                                >
                                    <Text style={[Styles.optionBtnText, isSelected && Styles.optionBtnTextSelected]}>{opt.optionText}</Text>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </View>

                {!hasVoted && !isExpired && (
                    <CustomButton
                        onPress={() => handleVote(item._id)}
                        gradientColors={[themes.red, themes.red]}
                        title={strings.VOTE}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(15), height: moderateScale(40) }}
                    />
                )}

                <View style={Styles.cardFooter}>
                    <Text style={Styles.footerText}>{strings.TOTAL_VOTES}: {totalVotes}</Text>
                    <Text style={Styles.footerText}>{strings.EXPIRES_ON}: {new Date(item.expiresAt).toLocaleDateString()}</Text>
                </View>

                {userData?.role === 'admin' && (
                    <TouchableOpacity onPress={() => onPressDelete(item._id)} style={Styles.deleteFloatBtn}>
                        <Image tintColor={themes.white} source={Imagepaths.delete} style={Styles.deleteIcon} />
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <View style={Styles.container}>
            <View style={Styles.topview}>
                <TouchableOpacity style={Styles.backArrow} onPress={() => navigation.goBack()}>
                    <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                </TouchableOpacity>
                <Text style={Styles.headerText}>{strings.POLLS}</Text>
                {userData?.role === 'admin' && (
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.CREATE_POLL_SCREEN)} style={Styles.addBtn}>
                        <Text style={Styles.addBtnText}>+ Create</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={polls}
                contentContainerStyle={{ paddingBottom: moderateScale(100), paddingHorizontal: moderateScale(15), paddingTop: moderateScale(10) }}
                renderItem={renderPollItem}
                ListEmptyComponent={ListEmptyComponent}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
            />

            <AlertPopup 
                isModalVisible={isDeleteModalVisible.status} 
                isCancelVisible={isDeleteModalVisible.status} 
                onPressCancel={() => setIsDeleteModalVisible({ status: false, deleteId: null })} 
                onPressSubmit={onConfirmDelete} 
                message={strings.DELETE_POLL_MSG} 
            />
            <CustomLoader visible={isLoading} />
        </View>
    );
};

export default Polls;
