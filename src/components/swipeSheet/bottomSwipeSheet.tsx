import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import React, { forwardRef, useImperativeHandle } from 'react'
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'
import { StyleProps } from '../../styles'
import { FULL_HEIGHT, MARGIN, SHEET_HEIGHT } from './swipeSheetConstants'
import { View } from 'react-native'

type AnimatedContextType = {
    translateY: number
}

export interface Props extends StyleProps {
    children: Children
    onDraggingSheet?: (percentage: number) => void
}

const BottomSwipeSheet = <P_ extends Props = Props>(props: P_, ref) => {
    const translateY = useSharedValue(0)

    const onDraggingSheet = percent => {
        props.onDraggingSheet(percent)
    }

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedContextType>({
        onStart: (event, context) => {
            context.translateY = translateY.value
        },
        onActive: (event, context) => {
            const percent: number = (event.absoluteY / FULL_HEIGHT) * 100

            if (percent < 95 && percent > 30) {
                translateY.value = event.translationY + context.translateY
                if (percent >= 75) {
                    runOnJS(onDraggingSheet)(75)
                }
            }
        },
        onEnd: (event, context) => {
            const percent: number = (event.absoluteY / FULL_HEIGHT) * 100
            console.log(percent)
            if (percent > 75) {
                translateY.value = withSpring(0)
                runOnJS(onDraggingSheet)(100)
            } else {
                translateY.value = withSpring(MARGIN - SHEET_HEIGHT)
                runOnJS(onDraggingSheet)(0)
            }
        },
    })

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateY.value,
                },
            ],
        }
    })

    useImperativeHandle(ref, () => ({
        openSheet: () => {
            openSheet()
        },
        closeSheet: () => {
            closeSheet()
        },
    }))

    const openSheet = () => {
        runOnJS(onDraggingSheet)(70)
        translateY.value = withSpring(MARGIN - SHEET_HEIGHT)
    }
    const closeSheet = () => {
        runOnJS(onDraggingSheet)(100)
        translateY.value = withSpring(0)
    }

    return (
        // <View>{props.children}</View>
        <GestureHandlerRootView>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[animationStyle]}>{props.children}</Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

export default forwardRef(BottomSwipeSheet)
