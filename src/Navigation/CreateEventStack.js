import { createStackNavigator } from "@react-navigation/stack";
import Events from "../Screens/Events";
import AddEvent from "../Screens/AddEvent";
import NavigationStrings from "../Constants/NavigationStrings";

const CreateEventStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName={NavigationStrings.EVENTS_SCREEN}>
            <Stack.Screen name={NavigationStrings.EVENTS_SCREEN} component={Events} options={{ headerShown: false }} />
        <Stack.Screen
          name={NavigationStrings.ADD_EVENT_SCREEN}
          component={AddEvent}
          options={{headerShown: false}}
        />
        </Stack.Navigator>
    )
}

export default CreateEventStack;