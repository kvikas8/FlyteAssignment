import ColorSchema from '../styles/styleSchema'

const LIGHTER_GRAY = '#F7F6F8'
const LIGHT_GRAY = '#D4D2D5'
const LIGHTEST_GRAY = '#F5F5F5'
const TRANSPARENT = 'transparent'
const DARK_GREY = '#86888D'
const BLACK = '#000'
const WHITE = '#fff'

export const colorSchema: ColorSchema = {
    backdrop: BLACK,
    horizontalRule: WHITE,
    lists: {
        backgroundColor: LIGHTEST_GRAY,
    },
    pages: {
        backgroundColor: LIGHTER_GRAY,
    },
    swipeSheet: {
        backgroundColor: TRANSPARENT,
        handle: LIGHT_GRAY,
    },
    texts: {
        subheading: DARK_GREY,
    },
    typeFaceMedium: 'Manrope-Medium',
    typeFaceSemiBold: 'Manrope-SemiBold',
}
