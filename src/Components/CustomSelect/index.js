import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Styles from './styles';

const CustomSelect = ({
    data = [{id: 1, label: 'Apple'},{id: 2, label: 'Orange'},{id: 3, label: 'Mango'}],
    header = 'Please select an option',
    isModalVisible = true,
    onSubmit = () => { },
    closeModal = () => { },
}) => {

    const onSelect = (data) => {
        onSubmit(data);
        closeModal(!isModalVisible)
    }

    const onClose = () => {
        closeModal(!isModalVisible)
    }

    const renderOptions = ({item}) => {
        return(
            <TouchableOpacity onPress={()=> onSelect(item.id)} style={Styles.options}>
                <Text style={Styles.optionsText}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={Styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                // onRequestClose={onSelect}
            >
                <View style={Styles.modalOverlay}>
                    <View style={Styles.modalContainer}>
                        <View style={Styles.headerOutline}>
                            <Text style={Styles.headerText}>{header}</Text>
                        </View>
                        <View style={Styles.bodyContainer}>
                            <FlatList 
                            data={data}
                            renderItem={renderOptions}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator = {false} />
                        <View style={Styles.footerContainer}>
                            <TouchableOpacity onPress={onClose} style={Styles.closeButton}>
                                <Text style={Styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CustomSelect;
