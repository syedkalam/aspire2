import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
 
import   Home            from '../screens/home'; 
import   Set_limit from '../screens/set_limit'; 
const Stack = createStackNavigator();
const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
        
    },
});

function MyStack() {

    

    return (
        <Stack.Navigator initialRouteName="Home">
           
            
             <Stack.Screen
                name="Home"
                component={Home}
                options={{ cardStyleInterpolator: forFade, headerShown: false }}
            />
            <Stack.Screen
                name="Set_limit"
                component={Set_limit}
                options={{ cardStyleInterpolator: forFade, headerShown: false}}
            />
            
        </Stack.Navigator>
    );
}

export default MyStack;