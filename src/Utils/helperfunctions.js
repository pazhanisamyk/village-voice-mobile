import AsyncStorage from "@react-native-async-storage/async-storage";
import Actions from "../Redux/actions";
import { showMessage } from "react-native-flash-message";
import { moderateScale, textScale } from "../Styles/ResponsiveSizes";

export const sessionHandler = (error) => {
    Actions.userLogout();
    AsyncStorage.clear();
  };

  const hideBottomTab = (state, currentRouteName) => {
    let currentRoute = state;
    
    while (currentRoute?.routes && typeof currentRoute.index === 'number') {
      currentRoute = currentRoute.routes[currentRoute.index]?.state || currentRoute.routes[currentRoute.index];
    }
  
    return currentRouteName.includes(currentRoute?.name);
  };

  const showError = (message) => {
    console.log(message, 'THIS IS MESSAGE');
    showMessage({
      type: 'danger',
      icon: 'danger',
      message,
      hideStatusBar: false,
      duration: 2500,
      position:'top',
      titleStyle: {color: '#FFFFFF', fontSize: textScale(14), fontWeight: '500'},
      style: { backgroundColor:'#dc3545',margin:moderateScale(20), borderRadius:moderateScale(16),alignItems:'center',justifyContent:'center',}
    });
  };
  
  const showSuccess = (message) => {
    showMessage({
      type: 'success',
      icon: 'success',
      message: message, 
      hideStatusBar: false,
      duration: 2500,
      position:'top',
      titleStyle: { color: '#FFFFFF', fontSize: textScale(14), fontWeight: '500'},
      style: { backgroundColor:'#28a745',margin:moderateScale(20), borderRadius:moderateScale(16),alignItems:'center',justifyContent:'center',}
  
  
    });
  };
  const showInfo = (message) => {
    showMessage({
      type: 'info',
      icon: 'info',
      message,
      hideStatusBar: false,
      duration: 2500,
      titleStyle: {color: '#FFFFFF', fontSize: textScale(14), fontWeight: '500'},
      style: { backgroundColor:'#ffc107 ',margin:moderateScale(20), borderRadius:moderateScale(16),alignItems:'center',justifyContent:'center',}
    });
  };



  export {
    showError,
    showSuccess,
    showInfo,
    hideBottomTab,
  };