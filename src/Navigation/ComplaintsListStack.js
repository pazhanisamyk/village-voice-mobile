import { createStackNavigator } from "@react-navigation/stack";
import ComplaintDetail from "../Screens/ComplaintDetails";
import ComplaintsList from "../Screens/User/ComplaintsList";
import NavigationStrings from "../Constants/NavigationStrings";

const ComplaintsListStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName={NavigationStrings.COMPLAINT_LIST}>
            <Stack.Screen name={NavigationStrings.COMPLAINT_LIST} component={ComplaintsList} options={{ headerShown: false }} />
        <Stack.Screen
          name={NavigationStrings.COMPLAINT_DETAIL}
          component={ComplaintDetail} 
          options={{headerShown: false}}
        />
        </Stack.Navigator>
    )
}

export default ComplaintsListStack;