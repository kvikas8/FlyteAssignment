import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import ColorSchema from './styleSchema'

export type StyleType = ViewStyle | TextStyle | ImageStyle
export interface StyleSheetSchema {
    [key: string]: StyleType
}

export type DefaultStyleSchema = (params: StyleSchemaParams) => StyleSheetSchema

export interface StyleSchemaParams {
    colorSchema: ColorSchema | Partial<ColorSchema>
}

export interface StyleProps {
    className?: string
    style?: StyleSheetSchema
}
