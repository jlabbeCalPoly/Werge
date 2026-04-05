// Imports
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';

// Components
import { AnimatedStyledText } from './animated-styled-text';

// Types
export type TileHandle = {
    grow: () => void,
    shrink: () => void,
    bounce: () => void
}
type TileProps = {
    char: string,
    tileSize: number,
    tileContentSize: number,
    backgroundColor: Animated.AnimatedInterpolation<string>,
    borderColor: Animated.AnimatedInterpolation<string>,
    textColor: Animated.AnimatedInterpolation<string>
}

export const Tile = forwardRef<TileHandle, TileProps>(({
    char, 
    tileSize, 
    tileContentSize,
    backgroundColor,
    borderColor,
    textColor
}, ref) => {
    const scale = useRef(new Animated.Value(1)).current;
    const animation = useRef<Animated.CompositeAnimation | null>(null);

    // Cancel the animation if it was playing, then set it to the value it should be at before the given animation plays
    function cancelAnimationIfPlaying(resetValue: number) {
        if (animation.current) {
            animation.current.stop();
            animation.current = null;

            scale.setValue(resetValue);
        }
    }

    // Customize the instance value (TileHandle) that is exposed to the parent component
    useImperativeHandle(ref, () => ({
        grow() {
            cancelAnimationIfPlaying(1);
            animation.current = Animated.timing(scale, {
                toValue: 1.2,
                duration: 80,
                useNativeDriver: true
            });
            animation.current.start();
        },
        // Shrink the tile back to its original size
        shrink() {
            cancelAnimationIfPlaying(1.2);
            animation.current = Animated.timing(scale, {
                toValue: 1,
                duration: 80,
                useNativeDriver: true
            });
            animation.current.start();
        },
        // 
        bounce() {
            cancelAnimationIfPlaying(1);
            animation.current = Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.2,
                    duration: 80,
                    useNativeDriver: true
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 80,
                    useNativeDriver: true
                })
            ])
            // Start the animation, but also include a callback to set the ref to null if the animation completes without being cancelled
            animation.current.start(({ finished }) => {
                if (!finished) {
                    return
                }
                animation.current = null;
            });
        }
    }))

    return(
        <Animated.View style={[styles.container, { width: tileSize, height: tileSize, backgroundColor: backgroundColor, borderColor: borderColor } ]}>
            <AnimatedStyledText style={{
                fontSize: tileContentSize,
                color: textColor,
            }}>
                {char}
            </AnimatedStyledText>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
    }
})