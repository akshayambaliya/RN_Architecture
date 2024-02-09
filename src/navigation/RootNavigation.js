import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInfoScreen from '../feature/screen/UserInfoScreen';
import { LogBox, View, YellowBox } from 'react-native';
import devConfig from '../config/devConfig';
import { union } from 'lodash';
const Stack = createNativeStackNavigator();

(function ignoreWarnings() {
    LogBox.ignoreAllLogs(devConfig.ignoreAllLogBoxWarnings);
})();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={UserInfoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App
