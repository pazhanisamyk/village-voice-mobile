import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../Screens/WelcomeScreen";
import SignUpScreen from "../Screens/Signup";
import LoginScreen from "../Screens/Login";
import AdminTabroutes from "./AdminTabroutes";
import UserTabroutes from "./UserTabroutes";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../Screens/Splash";
import { navigationRef } from "./NavigationService";
import NavigationStrings from "../Constants/NavigationStrings";

const CommonRoutes = () => {
    const Stack = createStackNavigator();

    return (
            <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={NavigationStrings.SPLASH_SCREEN}>
            <Stack.Screen name={NavigationStrings.WELCOME_SCREEN} component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name={NavigationStrings.SIGNUP_SCREEN}
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NavigationStrings.LOGIN_SCREEN}
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NavigationStrings.ADMIN_TAB_ROUTES}
                component={AdminTabroutes}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NavigationStrings.USER_TAB_ROUTES}
                component={UserTabroutes}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name={NavigationStrings.SPLASH_SCREEN}
                component={SplashScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default CommonRoutes;
