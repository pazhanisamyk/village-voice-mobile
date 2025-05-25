import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import { useTheme } from "../../Constants/themes";
import RNPickerSelect from 'react-native-picker-select';
import Imagepaths from "../../Constants/Imagepaths";
import { moderateScale, textScale } from "../../Styles/ResponsiveSizes";
import CustomButton from "../../Components/CustomButton";
import { useRef, useState } from "react";
import AlertPopup from "../../Components/AlertPopup";
import { showError, showSuccess } from "../../Utils/helperfunctions";
import actions from "../../Redux/actions";
import CustomLoader from "../../Components/Loaders";
import strings from "../../Constants/languages";

const AddEvent = ({ navigation, route }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const eventData = route?.params?.data || {};
    const [eventDate, setEventDate] = useState(eventData?.date || '');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const inputRef = useRef(null);

    const onPressBack = () => {
        navigation.goBack();
    }

    const eventTimeList = [
        { label: '8:00 AM', value: '8:00 AM' },
        { label: '8:30 AM', value: '8:30 AM' },
        { label: '9:00 AM', value: '9:00 AM' },
        { label: '9:30 AM', value: '9:30 AM' },
        { label: '10:00 AM', value: '10:00 AM' },
        { label: '10:30 AM', value: '10:30 AM' },
        { label: '11:00 AM', value: '11:00 AM' },
        { label: '11:30 AM', value: '11:30 AM' },
        { label: '12:00 PM', value: '12:00 PM' },
        { label: '12:30 PM', value: '12:30 PM' },
        { label: '1:00 PM', value: '1:00 PM' },
        { label: '1:30 PM', value: '1:30 PM' },
        { label: '2:00 PM', value: '2:00 PM' },
        { label: '2:30 PM', value: '2:30 PM' },
        { label: '3:00 PM', value: '3:00 PM' },
        { label: '3:30 PM', value: '3:30 PM' },
        { label: '4:00 PM', value: '4:00 PM' },
        { label: '4:30 PM', value: '4:30 PM' },
        { label: '5:00 PM', value: '5:00 PM' },
        { label: '5:30 PM', value: '5:30 PM' },
        { label: '6:00 PM', value: '6:00 PM' },
        { label: '6:30 PM', value: '6:30 PM' },
        { label: '7:00 PM', value: '7:00 PM' },
        { label: '7:30 PM', value: '7:30 PM' },
        { label: '8:00 PM', value: '8:00 PM' },
        { label: '8:30 PM', value: '8:30 PM' }
    ];

    const errorMethod = (error) => {
        console.log(error?.response?.data?.message);
        showError(error?.response?.data?.message);
    };


    const createEvent = async () => {
        setIsLoading(true);
        const data = {
            date: eventDate,
            event: eventName,
            eventDescription: eventDescription,
            time: eventTime
        };

        try {
            const res = await actions.createEvent(data);
            showSuccess(res?.message);
            onPressBack();
        } catch (error) {
            errorMethod(error);
            console.log('Error on creating event:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const validateInput = () => {
        if (!eventDate) {
            setAlertMessage(`${strings.EVENT_DATE} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!eventName?.trim()) {
            setAlertMessage(`${strings.EVENT_NAME} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!eventDescription?.trim()) {
            setAlertMessage(`${strings.EVENT_DESCRIPTION} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else if (!eventTime?.trim) {
            setAlertMessage(`${strings.EVENT_TIME} ${strings.IS_REQUIRED}`);
            setIsModalVisible(true);
        } else {
            createEvent();
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <TouchableOpacity style={Styles.backArrow} onPress={onPressBack}>
                        <Image source={Imagepaths.arrow_left} style={Styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headertext}>{strings.CREATE_EVENT}</Text>
                </View>
                <View style={Styles.outerContainer}>
                    <View style={Styles.editprofileContainer}>
                        <Text style={Styles.title}>{strings.EVENT_DATE}</Text>
                        <View style={Styles.passwordContainer}>
                            <TextInput
                                editable={false}
                                placeholderTextColor={themes.gray}
                                ref={inputRef}
                                value={eventDate}
                                placeholder={`${strings.ENTER} ${strings.EVENT_DATE}`}
                                keyboardType={'default'}
                                onChangeText={(text) => setEventDate(text)}
                                style={Styles.inputStyle}
                            />
                        </View>
                        <Text style={Styles.title}>{strings.EVENT_NAME}</Text>
                        <View style={Styles.passwordContainer}>
                            <TextInput
                                placeholderTextColor={themes.gray}
                                ref={inputRef}
                                value={eventName}
                                placeholder={`${strings.ENTER} ${strings.EVENT_NAME}`}
                                onChangeText={(text) => setEventName(text)}
                                style={Styles.inputStyle}
                            />
                        </View>
                        <Text style={Styles.title}>{strings.EVENT_DESCRIPTION}</Text>
                        <View style={Styles.passwordContainer}>
                            <TextInput
                                placeholderTextColor={themes.gray}
                                ref={inputRef}
                                value={eventDescription}
                                placeholder={`${strings.ENTER} ${strings.EVENT_DESCRIPTION}`}
                                onChangeText={(text) => setEventDescription(text)}
                                style={Styles.inputStyle}
                            />
                        </View>
                        <Text style={Styles.title}>{strings.EVENT_TIME}</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setEventTime(value)}
                            value={eventTime}
                            items={eventTimeList}
                            placeholder={{
                                label: `${strings.SELECT} ${strings.EVENT_TIME}`,
                                value: null,
                                color: themes.gray,
                            }}
                            style={{
                                inputIOS: {
                                    color: themes.white,
                                    fontWeight: '600',
                                    fontSize: textScale(12),
                                    paddingLeft: moderateScale(10),
                                    paddingVertical: moderateScale(10), // for iOS padding
                                },
                                inputAndroid: {
                                    color: themes.white,
                                    fontWeight: '600',
                                    fontSize: textScale(12),
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
                        title={strings.ADD_EVENT}
                        textColor={themes.white}
                        ButtonStyles={{ marginTop: moderateScale(40) }} />
                </View>
                <AlertPopup isModalVisible={isModalVisible} onPressSubmit={() => setIsModalVisible(false)} message={alertMessage} />
                <CustomLoader visible={isLoading} />
            </View>
        </ScrollView>
    )
}

export default AddEvent;