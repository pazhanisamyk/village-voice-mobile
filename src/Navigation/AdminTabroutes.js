import { useNavigationState } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import AdminTabBar from "./AdminTabBar";
import ComplaintBoxes from "../Screens/Admin/Complaintbox";
import SettingsStack from "./SettingsStack";
import CreateComplainStack from "./CreateComplainStack";
import { hideBottomTab } from "../Utils/helperfunctions";
import { useTheme } from "../Constants/themes";
import CreateEventStack from "./CreateEventStack";
import AdminHomeScreenStack from "./AdminHomeScreenStack";
import NavigationStrings from "../Constants/NavigationStrings";


const AdminTabroutes = () => {
  const { themes } = useTheme();
  const Tab = createBottomTabNavigator();
  const state = useNavigationState((state) => state);

  const hideBottomTabs = [NavigationStrings.EDIT_PROFILE_SCREEN, NavigationStrings.VIEW_COMPLAINTS, NavigationStrings.COMPLAINT_DETAIL, NavigationStrings.CREATE_COMPLAINT_BOX, NavigationStrings.ADD_EVENT_SCREEN]

  const hideTabBar = hideBottomTab(state, hideBottomTabs);

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Tab.Navigator
        initialRouteName={NavigationStrings.ADMIN_HOME_STACK}
        tabBar={(props) => (!hideTabBar ? <AdminTabBar {...props} /> : null)}
      >
        <Tab.Screen name={NavigationStrings.ADMIN_HOME_STACK} component={AdminHomeScreenStack} options={{ headerShown: false }} />
        <Tab.Screen name={NavigationStrings.COMPLAINT_BOX} component={ComplaintBoxes} options={{ headerShown: false }} />
        <Tab.Screen name={NavigationStrings.CREATE_COMPLAINT_STACK} component={CreateComplainStack} options={{ headerShown: false }} />
        <Tab.Screen name={NavigationStrings.CREATE_EVENT_STACK} component={CreateEventStack} options={{ headerShown: false }} />
        <Tab.Screen name={NavigationStrings.SETTINGS_STACK} component={SettingsStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </View>
  );
};

export default AdminTabroutes;
