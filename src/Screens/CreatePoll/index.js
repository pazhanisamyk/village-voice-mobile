import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import getStyles from "./styles";
import { useTheme } from "../../Constants/themes";
import Imagepaths from "../../Constants/Imagepaths";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import CustomButton from "../../Components/CustomButton";
import { useRef, useState } from "react";
import AlertPopup from "../../Components/AlertPopup";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import actions from "../../Redux/actions";
import CustomLoader from "../../Components/Loaders";
import strings from "../../Constants/languages";
import RNPickerSelect from 'react-native-picker-select';

const CreatePoll = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [expiresIn, setExpiresIn] = useState('7'); // days
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const expiryOptions = [
        { label: '1 Day', value: '1' },
        { label: '3 Days', value: '3' },
        { label: '7 Days', value: '7' },
        { label: '14 Days', value: '14' },
        { label: '30 Days', value: '30' }
    ];

    const handleAddOption = () => {
        if (options.length < 10) {
            setOptions([...options, '']);
        } else {
            showError("Maximum 10 options are allowed.");
        }
    };

    const handleRemoveOption = (index) => {
        if (options.length > 2) {
            const newOptions = [...options];
            newOptions.splice(index, 1);
            setOptions(newOptions);
        } else {
            showError("Minimum 2 options are required.");
        }
    };

    const handleOptionChange = (text, index) => {
        const newOptions = [...options];
        newOptions[index] = text;
        setOptions(newOptions);
    };

    const handleCreatePoll = async () => {
        setIsLoading(true);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + parseInt(expiresIn));

        // Format options for backend
        const formattedOptions = options
            .filter(opt => opt.trim() !== '')
            .map(opt => ({ optionText: opt }));

        const data = {
            question,
            options: formattedOptions,
            expiresAt
        };

        try {
            const res = await actions.createPoll(data);
            showSuccess(res?.message || 'Poll created successfully');
            navigation.goBack();
        } catch (error) {
            console.log(error);
            showError(error?.response?.data?.message || 'Failed to create poll');
        } finally {
            setIsLoading(false);
        }
    };

    const validateInput = () => {
        const validOptions = options.filter(opt => opt.trim() !== '');

        if (!question.trim()) {
            setAlertMessage(`${strings.QUESTION} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (validOptions.length < 2) {
            setAlertMessage(`At least 2 non-empty ${strings.OPTIONS} are required.`);
            setIsModalVisible(true);
        } else if (!expiresIn) {
            setAlertMessage(`${strings.EXPIRES_ON} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else {
            handleCreatePoll();
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={() => navigation.goBack()}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>{strings.CREATE_POLL}</Text>
                </View>

                <View style={Styles.outerContainer}>
                    <View style={Styles.formContainer}>
                        <Text style={Styles.title}>{strings.QUESTION}</Text>
                        <TextInput
                            placeholderTextColor={themes.gray}
                            value={question}
                            placeholder={strings.ENTER_QUESTION}
                            onChangeText={setQuestion}
                            style={Styles.inputStyle}
                        />

                        <Text style={Styles.title}>{strings.OPTIONS}</Text>
                        {options.map((option, index) => (
                            <View key={index} style={Styles.optionRow}>
                                <TextInput
                                    placeholderTextColor={themes.gray}
                                    value={option}
                                    placeholder={`${strings.ENTER_OPTION} ${index + 1}`}
                                    onChangeText={(text) => handleOptionChange(text, index)}
                                    style={[Styles.inputStyle, { flex: 1, marginBottom: 0 }]}
                                />
                                {options.length > 2 && (
                                    <TouchableOpacity onPress={() => handleRemoveOption(index)} style={Styles.removeBtn}>
                                        <Text style={Styles.removeBtnText}>✕</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}

                        <TouchableOpacity onPress={handleAddOption} style={Styles.addOptionBtn}>
                            <Text style={Styles.addOptionBtnText}>+ Add Option</Text>
                        </TouchableOpacity>

                        <Text style={Styles.title}>{strings.EXPIRES_ON}</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setExpiresIn(value)}
                            value={expiresIn}
                            items={expiryOptions}
                            style={{
                                inputIOS: {
                                    color: themes.white,
                                    fontWeight: '600',
                                    fontSize: moderateScale(12),
                                    paddingLeft: moderateScale(10),
                                    paddingVertical: moderateScale(10),
                                },
                                inputAndroid: {
                                    color: themes.white,
                                    fontWeight: '600',
                                    fontSize: moderateScale(12),
                                    paddingLeft: moderateScale(10),
                                },
                                placeholder: {
                                    color: themes.gray,
                                },
                                viewContainer: {
                                    borderWidth: moderateScale(1),
                                    borderColor: themes.gray,
                                    borderRadius: moderateScale(16),
                                    marginTop: moderateScale(5),
                                    marginBottom: moderateScale(15),
                                    width: '100%',
                                },
                            }}
                        />
                    </View>

                    <CustomButton
                        onPress={validateInput}
                        gradientColors={[themes.red, themes.red]}
                        title={strings.CREATE_POLL}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(30), marginBottom: moderateScale(40) }}
                    />
                </View>

                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>
    );
};

export default CreatePoll;
