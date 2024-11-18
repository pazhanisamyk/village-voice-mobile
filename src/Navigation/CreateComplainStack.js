import { createStackNavigator } from "@react-navigation/stack";
import CreatedComplaintBoxes from "../Screens/Admin/CreatedComplaintBoxes";
import CreateComplainBox from "../Screens/Admin/CreateComplainBox";
import ViewComplaints from "../Screens/User/ViewComplaints";

const CreateComplainStack = () => {
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName="CreatedComplaintBoxes">
            <Stack.Screen name="CreatedComplaintBoxes" component={CreatedComplaintBoxes} options={{ headerShown: false }} />
        <Stack.Screen
          name={'CreateComplainBox'}
          component={CreateComplainBox}
          options={{headerShown: false}}
        />
        </Stack.Navigator>
    )
}

export default CreateComplainStack;