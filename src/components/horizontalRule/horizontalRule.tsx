import React from 'react'
import { View } from 'react-native'
import { StyleProps } from '../../styles'
import StyledComponent from '../common/styledComponent'
import defaultStyle, { HorizontalRuleStyleSchema } from './horizontalRule.style'

interface Props extends StyleProps {
    style?: Partial<HorizontalRuleStyleSchema>
}

export default class HorizontalRule extends StyledComponent<Props> {
    public defaultStyle = defaultStyle
    public name = 'HorizontalRule'
    public get style(): HorizontalRuleStyleSchema {
        return super.style as HorizontalRuleStyleSchema
    }

    public render() {
        return <View style={this.style.horizontalRule} />
    }
}
