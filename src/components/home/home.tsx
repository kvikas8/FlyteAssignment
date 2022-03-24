import { NavigationAction } from '@react-navigation/native'
import React, { Component } from 'react'
import { HomeView, ViewProps } from '.'
import { Routes } from '../../navigation/routes'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../../navigation/homeNavigator'

type NavProps = NativeStackScreenProps<HomeStackParamList, Routes.HOME>

interface Props extends Partial<ViewProps>, NavProps {}

interface State {
    opacity: number
}

export class Home<P_ extends Props = Props, S_ extends State = State> extends Component<P_, S_> {
    protected sheetRef: any

    constructor(props: P_) {
        super(props)
        this.state = {
            opacity: 0,
        } as S_
    }

    public render() {
        return (
            <HomeView
                onDraggingSheet={this.onDraggingSheet}
                onPressActionListItem={this.onPressActionListItem}
                onPressOpenSheet={this.onPressOpenSheet}
                onUpdateSheetRef={this.onUpdateSheetRef}
                opacity={this.state.opacity}
                {...(this.props as P_)}
            />
        )
    }

    protected onPressActionListItem = () => {
        this.sheetRef.closeSheet()
        this.props.navigation.navigate(Routes.DETAILS)
    }

    protected onDraggingSheet = percent => {
        const decimal = percent / 100
        const opacity = 1 - decimal
        if (opacity !== this.state.opacity) {
            this.setState({
                opacity: opacity > 0.5 ? 0.5 : opacity,
            })
        }
    }

    protected onUpdateSheetRef = ref => {
        this.sheetRef = ref
    }

    protected onPressOpenSheet = () => {
        this.sheetRef.openSheet()
    }
}
