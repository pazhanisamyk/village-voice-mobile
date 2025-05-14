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


const AdminTabroutes = () => {
  const { themes } = useTheme();
  const Tab = createBottomTabNavigator();
  const state = useNavigationState((state) => state);

  const hideBottomTabs = ['EditProfile', 'ViewComplaints', 'ComplaintDetail', 'CreateComplainBox', 'AddEvent']
  
  const hideTabBar = hideBottomTab(state, hideBottomTabs);
  
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <Tab.Navigator
          initialRouteName="AdminHomeScreenStack"
          tabBar={(props) => (!hideTabBar ? <AdminTabBar {...props} /> : null)}
        >
          <Tab.Screen name="AdminHomeScreenStack" component={AdminHomeScreenStack} options={{ headerShown: false }} />
          <Tab.Screen name="ComplaintBox" component={ComplaintBoxes} options={{ headerShown: false }} />
          <Tab.Screen name="CreateComplainStack" component={CreateComplainStack} options={{ headerShown: false }} />
          <Tab.Screen name="CreateEventStack" component={CreateEventStack} options={{ headerShown: false }} />
          <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ headerShown: false }} />
        </Tab.Navigator>
        </View>
  );
};

export default AdminTabroutes;
