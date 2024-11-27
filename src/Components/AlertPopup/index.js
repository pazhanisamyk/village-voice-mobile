import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Styles from './styles';
import Colors from '../../Styles/Colors';
import strings from '../../Constants/languages';

const AlertPopup = ({
    message = '',
    header = strings.WARNING,
    isModalVisible = false,
    isCancelVisible = false,
    onPressSubmit = () => { },
    onPressCancel = () => { }
}) => {

    return (
        <View style={Styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={onPressSubmit}
            >
                <View style={Styles.modalOverlay}>
                    <View style={Styles.modalContainer}>
                        <View style={Styles.headerOutline}>
                            <Text style={Styles.headerText}>{header}</Text>
                        </View>
                        <View style={Styles.bodyContainer}>
                            <Text style={Styles.messageText}>{message}</Text>
                        </View>
                        <View style={Styles.footerContainer}>
                            {isCancelVisible && <TouchableOpacity onPress={onPressCancel} style={[Styles.closeButton, { backgroundColor: Colors.red1, marginRight: '10%' }]}>
                                <Text style={Styles.closeButtonText}>{strings.CANCEL}</Text>
                            </TouchableOpacity>}
                            <TouchableOpacity onPress={onPressSubmit} style={Styles.closeButton}>
                                <Text style={Styles.closeButtonText}>{strings.OKAY}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AlertPopup;
