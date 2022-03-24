import { StyleProps } from '../../styles'
import { defaultStyle } from '.'
import StyledComponent from '../common/styledComponent'
import React from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { ActionListStyleSchema } from './actionList.style'
import { FlatList } from 'react-native-gesture-handler'
import HorizontalRule from '../horizontalRule/horizontalRule'
import Image from '../common/image'
import { ImageNames } from '../../config/imageName'

export interface ListContent {
    imageName: ImageNames
    title: string
    subtitle: string
}

export interface Props extends StyleProps {
    children: (parent: ActionListView) => Children
    content: ListContent[]
    onPressListItem: () => void
}

const defaultProps = {
    children: ({ List }: ActionListView) => {
        return (
            <>
                <List />
            </>
        )
    },
}

export class ActionListView<P_ extends Props = Props> extends StyledComponent<P_> {
    public static defaultProps = defaultProps
    public defaultStyle = defaultStyle
    public get style(): ActionListStyleSchema {
        return super.style as ActionListStyleSchema
    }

    public Container = ({ children }: { children: Children }) => {
        return <View style={this.style.rootContainer}>{children}</View>
    }

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>
    }

    public List = () => {
        return (
            <FlatList
                data={this.props.content}
                keyExtractor={item => item.title}
                renderItem={this.renderListItem}
                ItemSeparatorComponent={() => <HorizontalRule />}
                // scrollEnabled={false} // can be handled from props if needed
            />
        )
    }

    public renderListItem = ({ item }: { item: ListContent }) => {
        return (
            <TouchableOpacity style={this.style.listItemContainer} onPress={this.props.onPressListItem}>
                <Image name={item.imageName} resizeMode="contain" style={this.style.listImage} />
                <View pointerEvents="none" style={this.style.listTextContainer}>
                    <Text style={this.style.titleStyle}>{item.title}</Text>
                    <Text style={this.style.subTitleStyle}>{item.subtitle}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
