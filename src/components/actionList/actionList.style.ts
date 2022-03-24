import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { StyleSchemaParams, StyleSheetSchema } from '../../styles'

export interface ActionListStyleSchema extends StyleSheetSchema {
    listImage: ImageStyle
    listItemContainer: ViewStyle
    rootContainer: ViewStyle
    subTitleStyle: TextStyle
    titleStyle: TextStyle
}

export default ({ colorSchema }: StyleSchemaParams): ActionListStyleSchema => {
    return {
        listImage: {
            height: 48,
            width: 48,
            marginRight: 15,
        },
        listItemContainer: {
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 20,
            marginVertical: 5,
            alignItems: 'center',
        },
        listTextContainer: {
            flex: 1,
        },
        rootContainer: {
            flex: 1,
            backgroundColor: colorSchema.lists.backgroundColor,
            marginVertical: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 10,
        },
        subTitleStyle: {
            color: colorSchema.texts.subheading,
            fontFamily: colorSchema.typeFaceMedium,
            fontSize: 14,
        },
        titleStyle: {
            fontFamily: colorSchema.typeFaceSemiBold,
            fontSize: 14,
            marginBottom: 3,
        },
    }
}
