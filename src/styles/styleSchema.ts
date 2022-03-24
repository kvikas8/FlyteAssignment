import { ColorValue } from 'react-native'

export default interface ColorSchema {
    backdrop: ColorValue
    horizontalRule: ColorValue
    lists: {
        backgroundColor: ColorValue
    }
    pages: {
        backgroundColor: ColorValue
    }
    swipeSheet: {
        backgroundColor: ColorValue
        handle: ColorValue
    }
    texts: {
        subheading: ColorValue
    }
    typeFaceMedium: string
    typeFaceSemiBold: string
}
