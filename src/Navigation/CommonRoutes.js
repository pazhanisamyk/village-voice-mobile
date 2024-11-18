import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../Screens/WelcomeScreen";
import SignUpScreen from "../Screens/Signup";
import LoginScreen from "../Screens/Login";
import { SafeAreaView } from "react-native";
import { height } from "../Styles/ResponsiveSizes";
import Colors from "../Styles/Colors";
import AdminTabroutes from "./AdminTabroutes";
import UserTabroutes from "./UserTabroutes";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../Screens/Splash";

const CommonRoutes = () => {
    const Stack = createStackNavigator();

    return (
            <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name={'SignUpScreen'}
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'LoginScreen'}
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'AdminTabroutes'}
                component={AdminTabroutes}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'UserTabroutes'}
                component={UserTabroutes}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name={'SplashScreen'}
                component={SplashScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default CommonRoutes;
