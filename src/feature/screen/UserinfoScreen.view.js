import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ResponsiveStyleSheet from '../../lib/ResponsiveStyleSheet'
const UserinfoScreenView = () => {
    return (
        <View style={styles.container}>
            <Text>UserinfoScreen.view</Text>
            <TouchableOpacity style={{ padding: 30, backgroundColor: 'blue' }}>
                <Text>Open Native Screen</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserinfoScreenView

const styles = ResponsiveStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})