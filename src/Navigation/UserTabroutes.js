import { useNavigationState } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import SettingsStack from "./SettingsStack";
import UserTabBar from "./UserTabBar";
import Search from "../Screens/User/Search";
import UserHomeScreenStack from "./UserHomeScreenStack";
import ComplaintsList from "../Screens/User/ComplaintsList";
import { hideBottomTab } from "../Utils/helperfunctions";
import Events from "../Screens/Events";
import { useTheme } from "../Constants/themes";


const UserTabroutes = () => {
  const { themes } = useTheme();
  const Tab = createBottomTabNavigator();
  const state = useNavigationState((state) => state);

  const hideBottomTabs = ['EditProfile', 'CreateComplainBox', 'Viewcomplaints', 'AddComplaint', 'HelpScreen', 'PoliciesScreen', 'ChangePassword']
  
  const hideTabBar = hideBottomTab(state, hideBottomTabs);  
  
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <Tab.Navigator
          initialRouteName="UserHome"
          tabBar={(props) => (!hideTabBar ? <UserTabBar {...props} /> : null)}
        >
          <Tab.Screen name="UserHomeScreenSTack" component={UserHomeScreenStack} options={{ headerShown: false }} />
          <Tab.Screen name="ComplaintsList" component={ComplaintsList} options={{ headerShown: false }} />
          <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Tab.Screen name="Events" component={Events} options={{ headerShown: false }} />
          <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ headerShown: false }} />
        </Tab.Navigator>
        </View>
  );
};

export default UserTabroutes;
