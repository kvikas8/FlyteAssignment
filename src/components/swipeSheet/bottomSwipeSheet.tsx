import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'
import { StyleProps } from '../../styles'
import { BOTTOM_MARGIN, FULL_HEIGHT, HANDLE_HEIGHT, MARGIN, SHEET_HEIGHT } from './swipeSheetConstants'
import { Dimensions, StyleSheet, View } from 'react-native'
import { scrollTo } from 'react-native-reanimated/src/reanimated2/NativeMethods'
import { Screen } from 'react-native-screens'
import { LIGHTEST_GRAY } from '../../config/style'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const MAX_TRANSLATE_Y = -SHEET_HEIGHT

export interface Props extends StyleProps {
    children: Children
    onDraggingSheet?: (percentage: number) => void
}

const BottomSwipeSheet = <P_ extends Props = Props>(props: P_, ref) => {
    const translateY = useSharedValue(-BOTTOM_MARGIN)
    const context = useSharedValue({ y: 0 })

    const onDraggingSheet = percent => {
        props.onDraggingSheet(percent)
    }

    const animateTo = useCallback((destination: number) => {
        'worklet'

        translateY.value = withSpring(destination, { damping: 50 })
    }, [])

    // useImperativeHandle(ref, () => ({ animateTo, isActive }), [animateTo, isActive])

    const panGesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate(event => {
            translateY.value = event.translationY + context.value.y
            const value = Math.max(translateY.value, MAX_TRANSLATE_Y)
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
            if (translateY.value > -SHEET_HEIGHT / 2.5) {
                runOnJS(onDraggingSheet)(75)
            }
        })
        .onEnd(() => {
            if (translateY.value > -SHEET_HEIGHT / 3) {
                runOnJS(onDraggingSheet)(100)
                animateTo(-BOTTOM_MARGIN)
            } else {
                runOnJS(onDraggingSheet)(0)
                // onDraggingSheet(75)
                animateTo(MAX_TRANSLATE_Y)
            }
        })

    // const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedContextType>({
    //     onStart: (event, context) => {
    //         context.translateY = translateY.value
    //     },
    //     onActive: (event, context) => {
    //         const percent: number = (event.absoluteY / FULL_HEIGHT) * 100

    //         if (percent < 95 && percent > 30) {
    //             translateY.value = event.translationY + context.translateY
    //             if (percent >= 75) {
    //                 runOnJS(onDraggingSheet)(75)
    //             }
    //         }
    //     },
    //     onEnd: (event, context) => {
    //         const percent: number = (event.absoluteY / FULL_HEIGHT) * 100
    //         console.log(percent)
    //         if (percent > 75) {
    //             translateY.value = withSpring(0)
    //             runOnJS(onDraggingSheet)(100)
    //         } else {
    //             translateY.value = withSpring(MARGIN - SHEET_HEIGHT)
    //             runOnJS(onDraggingSheet)(0)
    //         }
    //     },
    // })

    // const animationStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [
    //             {
    //                 translateY: translateY.value,
    //             },
    //         ],
    //     }
    // })

    useImperativeHandle(ref, () => ({
        openSheet: () => {
            openSheet()
        },
        closeSheet: () => {
            closeSheet()
        },
    }))

    const openSheet = () => {
        animateTo(-SHEET_HEIGHT)
        runOnJS(onDraggingSheet)(100)
    }
    const closeSheet = () => {
        animateTo(-BOTTOM_MARGIN)
        runOnJS(onDraggingSheet)(100)
    }

    const interpolationStyle = useAnimatedStyle(() => {
        const opacity = interpolate(translateY.value, [MAX_TRANSLATE_Y, -BOTTOM_MARGIN], [1, 0])

        return {
            opacity,
        }
    })

    const animationStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [25, 5],
            Extrapolate.CLAMP
        )

        return {
            // borderRadius,
            transform: [{ translateY: translateY.value }],
        }
    })

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.bottomSheetContainer, animationStyle]}>
                <View style={styles.line} />
                {props.children}
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    backCover: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
    },
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: LIGHTEST_GRAY,
        position: 'absolute',
        top: SCREEN_HEIGHT - BOTTOM_MARGIN,
        borderRadius: 25,
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    },
})

export default forwardRef(BottomSwipeSheet)
