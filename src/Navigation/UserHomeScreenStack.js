import { createStackNavigator } from "@react-navigation/stack";
import UserHomeScreen from "../Screens/User/Home";
import ViewComplaints from "../Screens/User/ViewComplaints";
import AddComplaint from "../Screens/User/AddComplaint";

const UserHomeScreenStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName="UserHomeScreen">
            <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name={'Viewcomplaints'}
          component={ViewComplaints}
          options={{headerShown: false}}
        />
                <Stack.Screen
          name={'AddComplaint'}
          component={AddComplaint}
          options={{headerShown: false}}
        />
        </Stack.Navigator>
    )
}

export default UserHomeScreenStack;