import { useNavigationState } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import SettingsStack from "./SettingsStack";
import UserTabBar from "./UserTabBar";
import Search from "../Screens/User/Search";
import UserHomeScreenStack from "./UserHomeScreenStack";
import { hideBottomTab } from "../Utils/helperfunctions";
import { useTheme } from "../Constants/themes";
import CreateEventStack from "./CreateEventStack";
import ComplaintsListStack from "./ComplaintsListStack";


const UserTabroutes = () => {
  const { themes } = useTheme();
  const Tab = createBottomTabNavigator();
  const state = useNavigationState((state) => state);

  const hideBottomTabs = ['EditProfile', 'ComplaintDetail', 'CreateComplainBox', 'Viewcomplaints', 'AddComplaint', 'HelpScreen', 'PoliciesScreen', 'ChangePassword']
  
  const hideTabBar = hideBottomTab(state, hideBottomTabs);  
  
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <Tab.Navigator
          initialRouteName="UserHome"
          tabBar={(props) => (!hideTabBar ? <UserTabBar {...props} /> : null)}
        >
          <Tab.Screen name="UserHomeScreenSTack" component={UserHomeScreenStack} options={{ headerShown: false }} />
          <Tab.Screen name="ComplaintsListStack" component={ComplaintsListStack} options={{ headerShown: false }} />
          <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Tab.Screen name="CreateEventStack" component={CreateEventStack} options={{ headerShown: false }} />
          <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ headerShown: false }} />
        </Tab.Navigator>
        </View>
  );
};

export default UserTabroutes;
