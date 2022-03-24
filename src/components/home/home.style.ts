import { Platform, ViewStyle } from 'react-native'
import { StyleSchemaParams, StyleSheetSchema } from '../../styles'
import { BOTTOM_MARGIN, SHEET_HEIGHT } from '../swipeSheet/swipeSheetConstants'

export interface HomeStyleSchema extends StyleSheetSchema {
    bottomSheetContainer: ViewStyle
    rootContainer: ViewStyle
    sheetContentContainer: ViewStyle
    sheetHandle: ViewStyle
    sheetHandleContainer: ViewStyle
}

export default ({ colorSchema }: StyleSchemaParams): HomeStyleSchema => {
    return {
        backCover: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colorSchema.backdrop,
        },
        bottomSheetContainer: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        rootContainer: {
            flex: 1,
            backgroundColor: colorSchema.pages.backgroundColor,
        },
        sheetContentContainer: {
            flex: 1,
            height: SHEET_HEIGHT, // TODO: this can be done dynamic while optimizing if time permits
            width: '100%',
            position: 'absolute',
            bottom: BOTTOM_MARGIN - SHEET_HEIGHT,
        },
        sheetHandleContainer: {
            height: 10,
            backgroundColor: colorSchema.swipeSheet.backgroundColor,
            alignItems: 'center',
            marginBottom: 5,
        },
        sheetHandle: {
            flex: 1,
            backgroundColor: colorSchema.swipeSheet.handle,
            width: 80,
            height: '100%',
            borderRadius: 5,
        },
    }
}
