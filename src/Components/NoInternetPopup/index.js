import React from 'react';
import { Modal, Text, View } from 'react-native';
import getStyles from './styles';
import CustomButton from '../CustomButton';
import { useTheme } from '../../Constants/themes';

const NoInternetPopup = ({
  show = false,
  onRetry = () => { }
}) => {
  const { themes } = useTheme();
  const Styles = getStyles(themes);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}>
      <View style={Styles.modalContainer}>
        <Text style={Styles.modalTitle}>Connection error</Text>
        <Text style={Styles.modalText}>
          Unable to connect with server. Check your internet connection and try again
        </Text>
        <CustomButton
          onPress={onRetry}
          gradientColors={[themes.lightgray, themes.lightgray]}
          title="Try again"
          textColor={themes.white} />
      </View>
    </Modal>
  );
};
export default React.memo(NoInternetPopup);
