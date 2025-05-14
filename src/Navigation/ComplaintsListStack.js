import { createStackNavigator } from "@react-navigation/stack";
import ComplaintDetail from "../Screens/ComplaintDetails";
import ComplaintsList from "../Screens/User/ComplaintsList";

const ComplaintsListStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName="ComplaintsList">
            <Stack.Screen name="ComplaintsList" component={ComplaintsList} options={{ headerShown: false }} />
        <Stack.Screen
          name={'ComplaintDetail'}
          component={ComplaintDetail} 
          options={{headerShown: false}}
        />
        </Stack.Navigator>
    )
}

export default ComplaintsListStack;