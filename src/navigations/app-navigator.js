import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import AccountScreen from '../screens/AccountScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Dashboard'>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
        </Stack.Navigator>
    )
}

export default AppNavigator