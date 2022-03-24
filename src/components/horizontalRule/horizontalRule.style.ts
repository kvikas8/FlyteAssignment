import { ViewStyle } from 'react-native'
import { StyleSchemaParams, StyleSheetSchema } from '../../styles'

export interface HorizontalRuleStyleSchema extends StyleSheetSchema {
    horizontalRule: ViewStyle
}

export default ({ colorSchema }: StyleSchemaParams) => {
    return {
        horizontalRule: {
            borderBottomColor: colorSchema.horizontalRule,
            borderBottomWidth: 2,
            marginVertical: 10,
            width: '100%',
        },
    }
}
