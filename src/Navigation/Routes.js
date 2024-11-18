import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../Screens/EditProfile";

const Routes = () => {
    const Stack = createStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="EditProfile">
                <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{headerShown: false}} />
            </Stack.Navigator>            
        </NavigationContainer>
    )
}

export default Routes;