import AsyncStorage from "@react-native-async-storage/async-storage";
import Actions from "../Redux/actions";
import AlertPopup from "../Components/AlertPopup";
import { showMessage } from "react-native-flash-message";
import { moderateScale, textScale } from "../Styles/ResponsiveSizes";
import { Alert, BackHandler } from "react-native";
import { useState } from "react";
import Colors from "../Styles/Colors";

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
      // icon: 'danger',
      message,
      hideStatusBar: true,
      duration: 2500,
      position:'bottom',
      titleStyle: {paddingTop:6},
      style: {margin:moderateScale(20),alignItems:'center',justifyContent:'center',borderRadius:5}
    });
  };
  
  const showSuccess = (message) => {
    showMessage({
      type: 'success',
      // icon: 'success',
      message: message,
      hideStatusBar: true,
      duration: 2500,
      position:'bottom',
       titleStyle: {paddingTop:moderateScale(6), color: Colors.background, fontSize: textScale(14), fontWeight: '500'},
      style: { backgroundColor:Colors.white,margin:moderateScale(20), borderRadius:moderateScale(16),alignItems:'center',justifyContent:'center',}
  
  
    });
  };
  const showInfo = (message) => {
    showMessage({
      type: 'info',
      icon: 'info',
      message,
      hideStatusBar: true,
      duration: 2500,
      style: {margin:moderateScale(20), borderRadius:5,alignItems:'center',justifyContent:'center',}
    });
  };



  export {
    showError,
    showSuccess,
    showInfo,
    hideBottomTab,
  };