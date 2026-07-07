import { createStackNavigator } from "@react-navigation/stack";
import AdminHomeScreen from "../Screens/Admin/Home";
import ComplaintDetail from "../Screens/ComplaintDetails";
import Schemes from "../Screens/Schemes";
import AddScheme from "../Screens/AddScheme";
import Polls from "../Screens/Polls";
import CreatePoll from "../Screens/CreatePoll";
import Notifications from "../Screens/Notifications";
import NavigationStrings from "../Constants/NavigationStrings";

const AdminHomeScreenStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName={NavigationStrings.ADDMIN_HOME}> 
            <Stack.Screen name={NavigationStrings.ADDMIN_HOME} component={AdminHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name={NavigationStrings.COMPLAINT_DETAIL}
              component={ComplaintDetail} 
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NavigationStrings.SCHEMES_SCREEN}
              component={Schemes} 
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NavigationStrings.ADD_SCHEME_SCREEN}
              component={AddScheme} 
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NavigationStrings.POLLS_SCREEN}
              component={Polls} 
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NavigationStrings.CREATE_POLL_SCREEN}
              component={CreatePoll} 
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NavigationStrings.NOTIFICATIONS_SCREEN}
              component={Notifications} 
              options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default AdminHomeScreenStack;