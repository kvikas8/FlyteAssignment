import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Routes } from './routes'
import React from 'react'
import { Home } from '../components/home'
import Details from '../components/details/details'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export type HomeStackParamList = {
    Home: undefined
    Details: undefined
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name={Routes.HOME} component={Home} />
                <Stack.Screen name={Routes.DETAILS} component={Details} />
            </Stack.Navigator>
        </GestureHandlerRootView>
    )
}
