import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import Loader from './lib/Loader';
import RootNavigation from './navigation/RootNavigation'
import DevToolScreen from './core/devTools/DevToolScreen';
import devConfig from './config/devConfig';
const store = configureStore();

const Root = () => {

    return (
        <Provider store={store}>
            <View style={{ flexGrow: 1 }}>
                <RootNavigation />
                <Loader />
                {devConfig.devTools && <DevToolScreen />}
            </View>
        </Provider>

    )
}

export default Root