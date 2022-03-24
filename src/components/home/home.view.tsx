import { StyleProps } from '../../styles'
import { defaultStyle, HomeStyleSchema } from '.'
import StyledComponent from '../common/styledComponent'
import React from 'react'
import { Button, SafeAreaView, Text, View } from 'react-native'
import BottomSwipeSheet from '../swipeSheet/bottomSwipeSheet'
import { ActionList } from '../actionList'
import { TouchableOpacity } from 'react-native-gesture-handler'

export interface Props extends StyleProps {
    children: (parent: HomeView) => Children
    onDraggingSheet: (percent) => void
    onPressActionListItem: () => void
    onPressOpenSheet: () => void
    onUpdateSheetRef: (sheetRef: any) => void
    opacity: number
}

const defaultProps = {
    children: ({ BackCover, OpenSheetButton, Sheet }: HomeView) => {
        return (
            <>
                <BackCover />
                <OpenSheetButton />
                <Sheet />
            </>
        )
    },
}

export class HomeView<P_ extends Props = Props> extends StyledComponent<P_> {
    public static defaultProps = defaultProps
    public defaultStyle = defaultStyle
    public opacity: number = 1
    public get style(): HomeStyleSchema {
        return super.style as HomeStyleSchema
    }

    public OpenSheetButton = () => {
        return <Button title="Open Sheet" onPress={this.props.onPressOpenSheet} />
    }

    public Container = ({ children }: { children: Children }) => {
        return <SafeAreaView style={this.style.rootContainer}>{children}</SafeAreaView>
    }

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>
    }

    public Sheet = () => {
        return (
            <View style={this.style.bottomSheetContainer}>
                <BottomSwipeSheet
                    ref={ref => this.props.onUpdateSheetRef(ref)}
                    onDraggingSheet={this.props.onDraggingSheet}
                >
                    <View style={this.style.sheetContentContainer}>
                        {this.SheetHandle()}
                        <ActionList onPressActionListItem={this.props.onPressActionListItem} />
                    </View>
                </BottomSwipeSheet>
            </View>
        )
    }

    public SheetHandle = () => {
        return (
            <View style={this.style.sheetHandleContainer}>
                <View style={this.style.sheetHandle}></View>
            </View>
        )
    }

    public BackCover = () => {
        return <View style={{ ...this.style.backCover, opacity: this.props.opacity }} />
    }
}
