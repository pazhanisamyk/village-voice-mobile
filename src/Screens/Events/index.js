import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import { useEffect, useState } from "react";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import CustomSelect from "../../Components/CustomSelect";
import Imagepaths from "../../Constants/Imagepaths";
import strings from "../../Constants/languages";
import { useTheme } from "../../Constants/themes";
import CustomButton from "../../Components/CustomButton";
import { useSelector } from "react-redux";
import AlertPopup from "../../Components/AlertPopup";
import { useIsFocused } from "@react-navigation/native";
import actions from "../../Redux/actions";
import { showSuccess } from "../../Utils/helperfunctions";
import { ListEmptyComponent } from "../../Components/ListEmptyComponent";
import CustomLoader from "../../Components/Loaders";

const Events = ({ navigation }) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [isYearModalVisible, setIsYearModalVisible] = useState(false);
    const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedFullDate, setSelectedFullDate] = useState(null);
    const [dateData, setDateData] = useState([]);
    const [eventsData, setEventsData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState({ status: false, deleteId: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const userData = useSelector((state) => state?.auth?.userData);
    const isFocused = useIsFocused();

    const colorArray = [themes.blue, themes.red, themes.purple, themes.green, themes.blue1];

    useEffect(() => {
        if (isFocused) {
            getAllEventsData();
        }
    }, [isFocused, selectedFullDate, isModalVisible])

    const getAllEventsData = async () => {
        setIsLoading(true);
        const [day, month, year] = selectedFullDate.split('-');
        try {
            const res = await actions.getallEvents(`?year=${year}&month=${month}&day=${day}`);
            setEventsData(res)
        } catch (error) {
            console.log(error.message, '❌ Error while fetching complaint boxes');
        }
        finally{
            setIsLoading(false);
        }
    }

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => (2000 + i).toString());

    const yearConvertor = () => {
        let convertedYears = []
        years.map(year => {
            convertedYears.push({ id: year, label: year })
        })
        return convertedYears
    }
    const onpressAddEvent = () => {
        let data = {
            date: selectedFullDate,
        }
        navigation.navigate('AddEvent', { data: data })
    }
    const months = [
        { id: 1, label: strings.JANUARY },
        { id: 2, label: strings.FEBRUARY },
        { id: 3, label: strings.MARCH },
        { id: 4, label: strings.APRIL },
        { id: 5, label: strings.MAY },
        { id: 6, label: strings.JUNE },
        { id: 7, label: strings.JULY },
        { id: 8, label: strings.AUGUST },
        { id: 9, label: strings.SEPTEMBER },
        { id: 10, label: strings.OCTOBER },
        { id: 11, label: strings.NOVEMBER },
        { id: 12, label: strings.DECEMBER },
    ];

    const onPressDelete = (id, event) => {
        setAlertMessage(`${strings.DELETE_MSG} ${event}`)
        setIsModalVisible({ status: true, deleteId: id });
    }

    const onConfirmDelete = async () => {
        setIsLoading(true);
        try {
            const res = await actions.deletedEvent(isModalVisible.deleteId);
            console.log(res);
            setIsModalVisible({ status: false, deleteId: 0 })
            showSuccess(res?.message);
        } catch (error) {
            console.log(error.message, '❌ Error while deleting event');
        }
        finally{
            setIsLoading(false);
        }

    }

    const isFutureOrToday = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        const inputDate = new Date(`${year}-${month}-${day}`);
        const today = new Date();
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return inputDate >= today;
    };

    const generateDateData = (year, month) => {
        const dateArray = [];
        const daysOfWeek = [strings.SUN, strings.MON, strings.TUE, strings.WED, strings.THU, strings.FRI, strings.SAT];
        const daysInMonth = new Date(year, month, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month - 1, i);
            dateArray.push({
                id: i,
                date: i.toString().padStart(2, '0'),
                day: daysOfWeek[date.getDay()],
                fulldate: date,
            });
        }
        setDateData(dateArray);
        setSelectedDate(dateArray[0].id);
        const date = new Date(dateArray[0].fulldate);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        setSelectedFullDate(formattedDate)
    };

    useEffect(() => {
        generateDateData(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);

    const setDateAndDay = (item) => {
        setSelectedDate(item.id);
        const date = new Date(item.fulldate);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        setSelectedFullDate(formattedDate)
    }

    const renderEventDate = ({ item }) => {
        const isSelected = selectedDate === item.id;
        return (
            <TouchableOpacity
                key={item?.id}
                onPress={() => setDateAndDay(item)}
                style={[Styles.eventDateList, { backgroundColor: isSelected ? themes.card1 : themes.card }]}
            >
                <Text style={Styles.date}>{item.date}</Text>
                <Text style={Styles.day}>{item.day}</Text>
                {isSelected && <View style={Styles.redDot} />}
            </TouchableOpacity>
        );
    };

    const renderEvents = ({ item, index }) => {

        const usedColors = new Set();
        // Assign color
        let color;
        if (index < colorArray.length) {
            color = colorArray[index];
            usedColors.add(color);
        } else {
            // Pick a random color from array if exceeded
            const unusedColors = colorArray.filter(c => !usedColors.has(c));
            color = unusedColors.length > 0
                ? unusedColors[Math.floor(Math.random() * unusedColors.length)]
                : colorArray[Math.floor(Math.random() * colorArray.length)];
        }
        return (
            <View key={item?._id} style={Styles.events}>
                <View style={Styles.remoEventOutile}>
                    <View style={[Styles.eventnumber, { backgroundColor: color }]}>
                        <Text style={Styles.eventnum}>{index + 1}</Text>
                    </View>
                    {userData?.role === 'admin' && <TouchableOpacity onPress={() => onPressDelete(item?._id, item?.event)} style={Styles.eventnumber}>
                        <Image tintColor={themes.white} resizeMode="contain" source={Imagepaths.delete} style={Styles.deleteIcon} />
                    </TouchableOpacity>}
                </View>
                <Text style={Styles.eventTime}>{item.event}</Text>
                <Text style={Styles.eventdetail}>{item.eventDescription}</Text>
                <Text style={Styles.eventTime}>{item.time}</Text>

            </View>
        )
    }
    return (
        <View style={Styles.container}>
            <View style={Styles.topview}>
                <View style={Styles.eventTitle}>
                    <View>
                        <Text style={Styles.eventText}>{strings.EVENT}</Text>
                        <Text style={Styles.eventText}>{strings.SCHEDULE}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setIsYearModalVisible(true)} style={Styles.pickerContainer}>
                            <Text style={Styles.pickerText}>{selectedYear}</Text>
                            <Image tintColor={themes.white} resizeMode="contain" source={isYearModalVisible ? Imagepaths.arrow_up : Imagepaths.arrow_down} style={Styles.arrowIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsMonthModalVisible(true)} style={Styles.pickerContainer}>
                            <Text style={Styles.pickerText}>{months[selectedMonth - 1]?.label}</Text>
                            <Image tintColor={themes.white} resizeMode="contain" source={isMonthModalVisible ? Imagepaths.arrow_up : Imagepaths.arrow_down} style={Styles.arrowIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={Styles.eventcount}>{eventsData?.length} {strings.EVENTS_FOR_TODAY}</Text>
                <FlatList
                    horizontal
                    style={Styles.eventContainer}
                    data={dateData}
                    renderItem={renderEventDate}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={Styles.bottomview}>
                <View style={Styles.addEventOutline}>
                    <View>
                        <Text style={Styles.month}>{months[selectedMonth - 1]?.label}</Text>
                        <Text style={Styles.fullDate}>{selectedFullDate}</Text>
                    </View>
                    {userData?.role === 'admin' && selectedFullDate && isFutureOrToday(selectedFullDate) && <CustomButton
                        onPress={onpressAddEvent}
                        ButtonStyles={{ width: '50%' }}
                        gradientColors={[themes.red, themes.red]}
                        title={strings.ADD_NEW_EVENT}
                        textColor={themes.white} />}
                </View>
                <FlatList
                    data={eventsData}
                    contentContainerStyle={{ paddingBottom: moderateScale(100) }}
                    style={[Styles.eventContainer, { marginTop: moderateScale(20) }]}
                    renderItem={renderEvents}
                    ListEmptyComponent={ListEmptyComponent}
                    keyExtractor={(item) => item?._id}
                    showsVerticalScrollIndicator={false}
                />

            </View>
            <CustomSelect
                data={yearConvertor()}
                header={`${strings.SELECT} ${strings.YEAR}`}
                isModalVisible={isYearModalVisible}
                closeModal={(data) => setIsYearModalVisible(data)}
                onSubmit={(itemValue) => setSelectedYear(itemValue)} />
            <CustomSelect
                data={months}
                header={`${strings.SELECT} ${strings.MONTH}`}
                isModalVisible={isMonthModalVisible}
                closeModal={(data) => setIsMonthModalVisible(data)}
                onSubmit={(itemValue) => setSelectedMonth(itemValue)} />
            <AlertPopup isModalVisible={isModalVisible.status} isCancelVisible={isModalVisible.status} onPressCancel={() => setIsModalVisible({ status: false, deleteId: 0 })} onPressSubmit={onConfirmDelete} message={alertMessage} />
            <CustomLoader visible={isLoading} />
        </View>
    )
}

export default Events;