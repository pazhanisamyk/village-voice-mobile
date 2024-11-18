import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../Screens/EditProfile";
import Settings from "../Screens/Settings";
import HelpScreen from "../Screens/Help";
import PoliciesScreen from "../Screens/Policies";
import ChangePassword from "../Screens/ChangePassword";

const SettingsStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen
          name={'EditProfile'}
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'HelpScreen'}
          component={HelpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'PoliciesScreen'}
          component={PoliciesScreen}
          options={{headerShown: false}}
        />
                <Stack.Screen
          name={'ChangePassword'}
          component={ChangePassword}
          options={{headerShown: false}}
        />
        </Stack.Navigator>
    )
}

export default SettingsStack;