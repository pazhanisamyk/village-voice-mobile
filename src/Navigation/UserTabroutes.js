import { useNavigationState } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { moderateScale, moderateScaleVertical } from "../Styles/ResponsiveSizes";
import Colors from "../Styles/Colors";
import SettingsStack from "./SettingsStack";
import UserTabBar from "./UserTabBar";
import Search from "../Screens/User/Search";
import UserHomeScreenStack from "./UserHomeScreenStack";
import ComplaintsList from "../Screens/User/ComplaintsList";
import { hideBottomTab } from "../Utils/helperfunctions";
import Events from "../Screens/Events";


const UserTabroutes = () => {
  const Tab = createBottomTabNavigator();
  const state = useNavigationState((state) => state);

  const hideBottomTabs = ['EditProfile', 'CreateComplainBox', 'Viewcomplaints', 'AddComplaint', 'HelpScreen', 'PoliciesScreen', 'ChangePassword']
  
  const hideTabBar = hideBottomTab(state, hideBottomTabs);  
  
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
        <Tab.Navigator
          initialRouteName="UserHome"
          tabBar={(props) => (!hideTabBar ? <UserTabBar {...props} /> : null)}
        >
          <Tab.Screen name="UserHomeScreenSTack" component={UserHomeScreenStack} options={{ headerShown: false }} />
          <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Tab.Screen name="ComplaintsList" component={ComplaintsList} options={{ headerShown: false }} />
          <Tab.Screen name="Events" component={Events} options={{ headerShown: false }} />
          <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ headerShown: false }} />
        </Tab.Navigator>
        </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    width: '90%',
    marginLeft: '5%',
    paddingBottom: moderateScaleVertical(5),
    bottom: moderateScale(10),
    backgroundColor: Colors.card1,
    borderWidth: moderateScale(1),
    borderColor: Colors.gray1,
    borderRadius: moderateScale(16)
  },
  tabIcon: {
    height: moderateScale(18),
    width: moderateScale(18),
  },
  tabLabel: {
    fontSize: moderateScale(12), // Custom label font size
    color: Colors.gray, // Default label color
  },
  selectedTabLabel: {
    color: Colors.red, // Color for selected tab
  },
});

export default UserTabroutes;
