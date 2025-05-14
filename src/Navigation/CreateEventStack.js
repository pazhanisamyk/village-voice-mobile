import { createStackNavigator } from "@react-navigation/stack";
import Events from "../Screens/Events";
import AddEvent from "../Screens/AddEvent";

const CreateEventStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName="Events">
            <Stack.Screen name="Events" component={Events} options={{ headerShown: false }} />
        <Stack.Screen
          name={'AddEvent'}
          component={AddEvent}
          options={{headerShown: false}}
        />
        </Stack.Navigator>
    )
}

export default CreateEventStack;