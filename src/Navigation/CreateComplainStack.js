import { createStackNavigator } from "@react-navigation/stack";
import CreatedComplaintBoxes from "../Screens/Admin/CreatedComplaintBoxes";
import CreateComplainBox from "../Screens/Admin/CreateComplainBox";
import ViewComplaints from "../Screens/Admin/ViewComplaints";
import NavigationStrings from "../Constants/NavigationStrings";

const CreateComplainStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName={NavigationStrings.CREATE_COMPLAINT_BOXES}>
            <Stack.Screen name={NavigationStrings.CREATE_COMPLAINT_BOXES} component={CreatedComplaintBoxes} options={{ headerShown: false }} />
            <Stack.Screen
                name={NavigationStrings.VIEW_COMPLAINTS}
                component={ViewComplaints}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NavigationStrings.CREATE_COMPLAINT_BOX}
                component={CreateComplainBox}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default CreateComplainStack;