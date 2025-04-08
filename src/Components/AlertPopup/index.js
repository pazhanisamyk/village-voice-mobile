import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import getStyles from './styles';
import strings from '../../Constants/languages';
import { useTheme } from '../../Constants/themes';

const AlertPopup = ({
    message = '',
    header = strings.WARNING,
    isModalVisible = false,
    isCancelVisible = false,
    onPressSubmit = () => { },
    onPressCancel = () => { }
}) => {
    const { themes } = useTheme();
    const Styles = getStyles(themes);

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
                            {isCancelVisible && <TouchableOpacity onPress={onPressCancel} style={[Styles.closeButton, { backgroundColor: themes.red1, marginRight: '10%' }]}>
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
