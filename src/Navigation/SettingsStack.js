import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../Screens/EditProfile";
import Settings from "../Screens/Settings";
import HelpScreen from "../Screens/Help";
import PoliciesScreen from "../Screens/Policies";
import ChangePassword from "../Screens/ChangePassword";
import NavigationStrings from "../Constants/NavigationStrings";

const SettingsStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName={NavigationStrings.SETTINGS_SCREEN}>
            <Stack.Screen name={NavigationStrings.SETTINGS_SCREEN} component={Settings} options={{ headerShown: false }} />
        <Stack.Screen
          name={NavigationStrings.EDIT_PROFILE_SCREEN}
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NavigationStrings.HELP_SCREEN}
          component={HelpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NavigationStrings.POLICIES_SCREEN}
          component={PoliciesScreen}
          options={{headerShown: false}}
        />
                <Stack.Screen
          name={NavigationStrings.CHANGE_PASSWORD_SCREEN}
          component={ChangePassword}
          options={{headerShown: false}}
        />
        </Stack.Navigator>
    )
}

export default SettingsStack;