import { ViewStyle } from 'react-native'
import { StyleSchemaParams, StyleSheetSchema } from '../../styles'

export interface DetailsStyleSchema extends StyleSheetSchema {
    rootContainer: ViewStyle
}

export default ({ colorSchema }: StyleSchemaParams): DetailsStyleSchema => {
    return {
        rootContainer: {
            flex: 1,
        },
    }
}
