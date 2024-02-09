import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import dismissKeyboard from '../utils/dismissKeyboard'
import { useSelector } from 'react-redux'

const Loader = (props) => {
    const { loadingText = "Loading", hideKeyboard } = props
    const showLoader = useSelector(state => state.core.global.showLoader)
    if (showLoader) {
        !!hideKeyboard && dismissKeyboard();

        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <Text style={styles.loadingText}>{loadingText}</Text>
            </View>
        )
    }
    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    loadingText: {
        color: 'white',
    }

})

export default Loader