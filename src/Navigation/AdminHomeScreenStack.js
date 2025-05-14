import { createStackNavigator } from "@react-navigation/stack";
import AdminHomeScreen from "../Screens/Admin/Home";
import ComplaintDetail from "../Screens/ComplaintDetails";

const AdminHomeScreenStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={AdminHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name={'ComplaintDetail'}
          component={ComplaintDetail} 
          options={{headerShown: false}}
        />
        </Stack.Navigator>
    )
}

export default AdminHomeScreenStack;