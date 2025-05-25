import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { moderateScale } from '../Styles/ResponsiveSizes'; // Import your scaling function
import Imagepaths from '../Constants/Imagepaths';
import { useTheme } from '../Constants/themes';
import NavigationStrings from '../Constants/NavigationStrings';

const AdminTabBar = ({ state, descriptors, navigation }) => {
  const { themes } = useTheme();
  const Styles = getStyles(themes);
  const renderIcon = (route, focused) => {
    const iconMap = {
      [NavigationStrings.ADMIN_HOME_STACK]: Imagepaths.Home,
      [NavigationStrings.COMPLAINT_BOX]: Imagepaths.Budgets,
      [NavigationStrings.CREATE_COMPLAINT_STACK]: Imagepaths.file,
      [NavigationStrings.CREATE_EVENT_STACK]: Imagepaths.Calendar,
      [NavigationStrings.SETTINGS_STACK]: Imagepaths.Settings,
    };
    const icon = iconMap[route.name];

    return (
      <>
      <Image 
        source={icon} 
        resizeMode='contain'
        style={{ 
          tintColor: focused ? themes.white : themes.gray, 
          height: focused ? moderateScale(22) : moderateScale(20), 
          width: focused ? moderateScale(22) : moderateScale(20) 
        }} 
      />
      {focused && <View style={{height:moderateScale(3), width: moderateScale(40), borderRadius: moderateScale(8), backgroundColor: themes.white,marginTop: moderateScale(8)}} />}
      </>
    );
  };

  return (
    <View style={Styles.tabContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            style={Styles.tabButton}
            onPress={() => navigation.navigate(route.name)}
          >
            {renderIcon(route, isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getStyles = (themes) => StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themes.card1,
    borderWidth: 1,
    borderColor: themes.gray1,
    height: moderateScale(60),
    borderRadius: moderateScale(16),
    width: '90%',
    marginBottom: moderateScale(10),
    marginLeft: '5%',
    padding: moderateScale(10)
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AdminTabBar;
