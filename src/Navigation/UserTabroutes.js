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
import NavigationStrings from "../Constants/NavigationStrings";


const UserTabroutes = () => {
  const { themes } = useTheme();
  const Tab = createBottomTabNavigator();
  const state = useNavigationState((state) => state);

  const hideBottomTabs = [NavigationStrings.EDIT_PROFILE_SCREEN, NavigationStrings.COMPLAINT_DETAIL, NavigationStrings.VIEW_COMPLAINTS, NavigationStrings.ADD_COMPLAINT_SCREEN, NavigationStrings.HELP_SCREEN, NavigationStrings.POLICIES_SCREEN, NavigationStrings.CHANGE_PASSWORD_SCREEN]

  const hideTabBar = hideBottomTab(state, hideBottomTabs);

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Tab.Navigator
        initialRouteName={NavigationStrings.USER_HOME_STACK}
        tabBar={(props) => (!hideTabBar ? <UserTabBar {...props} /> : null)}
      >
        <Tab.Screen name={NavigationStrings.USER_HOME_STACK} component={UserHomeScreenStack} options={{ headerShown: false }} />
        <Tab.Screen name={NavigationStrings.COMPLAINT_LIST_STACK} component={ComplaintsListStack} options={{ headerShown: false }} />
        <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Tab.Screen name={NavigationStrings.CREATE_EVENT_STACK} component={CreateEventStack} options={{ headerShown: false }} />
        <Tab.Screen name={NavigationStrings.SETTINGS_STACK} component={SettingsStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </View>
  );
};

export default UserTabroutes;
