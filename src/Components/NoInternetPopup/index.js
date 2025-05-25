import React from 'react';
import { Modal, Text, View } from 'react-native';
import getStyles from './styles';
import CustomButton from '../CustomButton';
import { useTheme } from '../../Constants/themes';
import strings from '../../Constants/languages';

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
        <Text style={Styles.modalTitle}>{strings.CONNECTION_ERROR}</Text>
        <Text style={Styles.modalText}>
          {strings.CONNECTION_ERROR_MSG}
        </Text>
        <CustomButton
          onPress={onRetry}
          gradientColors={[themes.lightgray, themes.lightgray]}
          title={strings.TRY_AGAIN}
          textColor={themes.white} />
      </View>
    </Modal>
  );
};
export default React.memo(NoInternetPopup);
