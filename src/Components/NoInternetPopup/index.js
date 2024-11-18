import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import CustomButton from '../CustomButton';
import Colors from '../../Styles/Colors';

const NoInternetPopup = ({
  show = false,
  onRetry = () => { }
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Connection error</Text>
        <Text style={styles.modalText}>
          Unable to connect with server. Check your internet connection and try again
        </Text>
        <CustomButton
          onPress={onRetry}
          gradientColors={[Colors.lightgray, Colors.lightgray]}
          title="Try again"
          textColor={Colors.white} />
      </View>
    </Modal>
  );
};
export default React.memo(NoInternetPopup);
