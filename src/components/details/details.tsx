import { StyleProps } from '../../styles'
import StyledComponent from '../common/styledComponent'
import React from 'react'
import { Button, View } from 'react-native'
import defaultStyle, { DetailsStyleSchema } from './details.style'
import { HomeStackParamList } from '../../navigation/homeNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Routes } from '../../navigation/routes'

type NavProps = NativeStackScreenProps<HomeStackParamList, Routes.DETAILS>

export interface Props extends StyleProps, NavProps {
    children: (parent: Details) => Children
}

const defaultProps = {
    children: ({ BackButton }: Details) => {
        return (
            <>
                <BackButton />
            </>
        )
    },
}

export default class Details<P_ extends Props = Props> extends StyledComponent<P_> {
    public static defaultProps = defaultProps
    public defaultStyle = defaultStyle

    public get style(): DetailsStyleSchema {
        return super.style as DetailsStyleSchema
    }

    public BackButton = (): JSX.Element => {
        return <Button title="Take me back" onPress={this.onPressGoBack} />
    }

    public Container = ({ children }: { children: Children }) => {
        return <View style={this.style.rootContainer}>{children}</View>
    }

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>
    }

    protected onPressGoBack = () => {
        this.props.navigation.goBack()
    }
}
