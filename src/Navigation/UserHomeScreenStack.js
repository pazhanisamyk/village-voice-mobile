import { createStackNavigator } from "@react-navigation/stack";
import UserHomeScreen from "../Screens/User/Home";
import ViewComplaints from "../Screens/User/ViewComplaints";
import AddComplaint from "../Screens/User/AddComplaint";
import Schemes from "../Screens/Schemes";
import Polls from "../Screens/Polls";
import Notifications from "../Screens/Notifications";
import ComplaintDetail from "../Screens/ComplaintDetails";
import NavigationStrings from "../Constants/NavigationStrings";

const UserHomeScreenStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName={NavigationStrings.USER_HOME}>
            <Stack.Screen name={NavigationStrings.USER_HOME} component={UserHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name={NavigationStrings.VIEW_COMPLAINTS}
              component={ViewComplaints}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NavigationStrings.ADD_COMPLAINT_SCREEN}
              component={AddComplaint}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NavigationStrings.SCHEMES_SCREEN}
              component={Schemes}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NavigationStrings.POLLS_SCREEN}
              component={Polls}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NavigationStrings.NOTIFICATIONS_SCREEN}
              component={Notifications}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={NavigationStrings.COMPLAINT_DETAIL}
              component={ComplaintDetail}
              options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default UserHomeScreenStack;