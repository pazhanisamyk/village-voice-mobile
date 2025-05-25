import { createStackNavigator } from "@react-navigation/stack";
import AdminHomeScreen from "../Screens/Admin/Home";
import ComplaintDetail from "../Screens/ComplaintDetails";
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
        </Stack.Navigator>
    )
}

export default AdminHomeScreenStack;