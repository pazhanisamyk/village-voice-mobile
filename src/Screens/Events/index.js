import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import getStyles from "./styles";
import { useEffect, useState } from "react";
import { moderateScale } from "../../Styles/ResponsiveSizes";
import CustomSelect from "../../Components/CustomSelect";
import Imagepaths from "../../Constants/Imagepaths";
import strings from "../../Constants/languages";
import { useTheme } from "../../Constants/themes";

const Events = () => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);
    const [isYearModalVisible, setIsYearModalVisible] = useState(false);
    const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedFullDate, setSelectedFullDate] = useState(null);
    const [dateData, setDateData] = useState([]);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => (2000 + i).toString());

    const yearConvertor = () => {
        let convertedYears = []
        years.map(year => {
            convertedYears.push({ id: year, label: year })
        })
        return convertedYears
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
        { id: 10, label: strings.OCTOBER},
        { id: 11, label: strings.NOVEMBER},
        { id: 12, label: strings.DECEMBER },
    ];

    const eventsData = [
        {
            id: 1,
            event: 'Guest Lecture on Rising Technologies By Dr. D. S. Bhosale',
            time: '9:00 AM'
        },
        {
            id: 2,
            event: 'Guest Lecture on Rising Technologies By Dr. D. S. Bhosale',
            time: '9:00 AM'
        },
        {
            id: 3,
            event: 'Guest Lecture on Rising Technologies By Dr. D. S. Bhosale',
            time: '9:00 AM'
        },
        {
            id: 4,
            event: 'Guest Lecture on Rising Technologies By Dr. D. S. Bhosale',
            time: '9:00 AM'
        },
        {
            id: 5,
            event: 'Guest Lecture on Rising Technologies By Dr. D. S. Bhosale',
            time: '9:00 AM'
        },
    ];

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
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        setSelectedFullDate(formattedDate)
    };

    useEffect(() => {
        generateDateData(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);

    const setDateAndDay = (item) => {
        setSelectedDate(item.id);
        const date = new Date(item.fulldate);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        setSelectedFullDate(formattedDate)
    }

    const renderEventDate = ({ item }) => {
        const isSelected = selectedDate === item.id;
        return (
            <TouchableOpacity
                onPress={() => setDateAndDay(item)}
                style={[Styles.eventDateList, { backgroundColor: isSelected ? themes.card1 : themes.card }]}
            >
                <Text style={Styles.date}>{item.date}</Text>
                <Text style={Styles.day}>{item.day}</Text>
                {isSelected && <View style={Styles.redDot} />}
            </TouchableOpacity>
        );
    };

    const renderEvents = ({ item }) => {
        return (
            <View style={Styles.events}>
                <View style={Styles.eventnumber}>
                    <Text style={Styles.eventnum}>{item.id}</Text>
                </View>
                <Text style={Styles.eventdetail}>{item.event}</Text>
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
                            <Text style={Styles.pickerText}>{months[selectedMonth -1 ]?.label}</Text>
                            <Image tintColor={themes.white} resizeMode="contain" source={isMonthModalVisible ? Imagepaths.arrow_up : Imagepaths.arrow_down} style={Styles.arrowIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={Styles.eventcount}>{`2`} {strings.EVENTS_FOR_TODAY}</Text>
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
                <Text style={Styles.month}>{months[selectedMonth -1 ]?.label}</Text>
                <Text style={Styles.fullDate}>{selectedFullDate}</Text>
                <FlatList
                    data={eventsData}
                    contentContainerStyle={{paddingBottom: moderateScale(100)}}
                    style={[Styles.eventContainer, { marginTop: moderateScale(20) }]}
                    renderItem={renderEvents}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />

            </View>
            <CustomSelect
                data={yearConvertor()}
                header={'Select year'}
                isModalVisible={isYearModalVisible}
                closeModal={(data) => setIsYearModalVisible(data)}
                onSubmit={(itemValue) => setSelectedYear(itemValue)} />
            <CustomSelect
                data={months}
                header={'Select month'}
                isModalVisible={isMonthModalVisible}
                closeModal={(data) => setIsMonthModalVisible(data)}
                onSubmit={(itemValue) => setSelectedMonth(itemValue)} />
        </View>
    )
}

export default Events;