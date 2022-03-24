import { Component } from 'react'
import { DefaultStyleSchema, StyleProps, StyleSheetSchema } from '../../styles'
import { isEqual } from 'lodash'
import { colorSchema } from '../../config/style'
import { StyleSheet } from 'react-native'
import merge from './merge'

abstract class StyledComponent<P_ extends StyleProps = {}, S_ = {}> extends Component<P_, S_> {
    get style(): StyleSheetSchema {
        if (!this.definedStyle || !isEqual(this.prevPropsStyle, this.props.style)) {
            const defaultStyleWithSchemaApplied = this.defaultStyle
                ? this.defaultStyle({
                      colorSchema: colorSchema,
                  })
                : {}

            const mergeOrder = [defaultStyleWithSchemaApplied, this.props.style || {}]
            this.prevPropsStyle = this.props.style
            this.definedStyle = StyleSheet.create(merge(...mergeOrder))
        }

        return this.definedStyle
    }
    public defaultStyle: DefaultStyleSchema
    public name: string

    public prevPropsStyle: any
    private definedStyle: StyleSheetSchema
}

export default StyledComponent
