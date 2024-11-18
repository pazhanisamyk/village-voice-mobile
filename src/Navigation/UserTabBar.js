import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../Styles/ResponsiveSizes'; // Import your scaling function
import Colors from '../Styles/Colors'; // Import your color constants
import Imagepaths from '../Constants/Imagepaths';

const UserTabBar = ({ state, descriptors, navigation }) => {
  const renderIcon = (route, focused) => {
    const iconMap = {
      UserHomeScreenSTack: Imagepaths.Home,
      Search: Imagepaths.Search,
      ComplaintsList: Imagepaths.file,
      Events: Imagepaths.Calendar,
      SettingsStack: Imagepaths.Settings,
    };
    const icon = iconMap[route.name];

    return (
      <Image 
        source={icon} 
        resizeMode='contain'
        style={{ 
          tintColor: focused ? Colors.white : Colors.gray, 
          height: moderateScale(20), 
          width: moderateScale(20) 
        }} 
      />
    );
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        // Center icon for the middle route (assuming it is the second one)
        if (isFocused) {
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.centerIcon}
              onPress={() => navigation.navigate(route.name)}
            >
              {renderIcon(route, isFocused)}
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabButton}
            onPress={() => navigation.navigate(route.name)}
          >
            {renderIcon(route, isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card1,
    borderWidth: 1,
    borderColor: Colors.gray1,
    height: moderateScale(60),
    bottom: moderateScale(10),
    borderRadius: moderateScale(16),
    width: '90%',
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
    marginLeft: '5%',
    padding: moderateScale(10)
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  centerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(7),
    backgroundColor: Colors.red,
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(100),
    borderColor: Colors.background,
    marginBottom: moderateScale(40),  
  }
});

export default UserTabBar;