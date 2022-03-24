import 'react-native-reanimated'
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import HomeNavigator from './src/navigation/homeNavigator'

const App = () => {
    return (
        <NavigationContainer>
            <HomeNavigator />
        </NavigationContainer>
    )
}

export default App
