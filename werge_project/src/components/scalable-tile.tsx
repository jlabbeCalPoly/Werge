// Imports
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { ScaleValues, AnimationDurationValues } from '@/constants/values';
import { Tile, TileProps } from './tile';

// Components
import { AnimatedStyledText } from './animated-styled-text';

// Types
export type ScalableTileHandle = {
    enlarge: () => void,
    shrink: () => void,
    bounce: () => void
}

export const ScalableTile = forwardRef<ScalableTileHandle, TileProps>(({
    character, 
    tileSizingBundle,
    tileColorBundle
}, ref) => {
    const scale = useRef(new Animated.Value(ScaleValues.originalScale)).current;
    const animation = useRef<Animated.CompositeAnimation | null>(null);

    // Cancel the animation if it was playing, then set it to the value it should be at before the given animation plays
    function cancelAnimationIfPlaying(resetValue: number) {
        if (animation.current) {
            scale.setValue(resetValue);
            animation.current = null;
        }
    }

    function handleAnimationCompletion(finished: boolean) {
        // Check if the animation was cancelled prematurely
        if (!finished) {
            return
        }
        animation.current = null;
    }

    // Customize the instance value (TileHandle) that is exposed to the parent component
    useImperativeHandle(ref, () => ({
        /** 
         * Perform a "enlarge" animation on the tile, animating it to its enlarged size
         */ 
        enlarge() {
            cancelAnimationIfPlaying(ScaleValues.originalScale);
            animation.current = Animated.timing(scale, {
                toValue: ScaleValues.enlargedScale,
                duration: AnimationDurationValues.short,
                useNativeDriver: true
            });
            animation.current.start(({ finished }) => handleAnimationCompletion(finished));
        },
        /** 
         * Perform a "shrink" animation on the tile, animating it back to its original size
         */ 
        shrink() {
            cancelAnimationIfPlaying(ScaleValues.enlargedScale);
            animation.current = Animated.timing(scale, {
                toValue: ScaleValues.originalScale,
                duration: AnimationDurationValues.short,
                useNativeDriver: true
            });
            animation.current.start(({ finished }) => handleAnimationCompletion(finished));
        },
        /**
         * Perform a "bounce" animation on the tile, first enlarging it, then shrinking it back to its original size
         */
        bounce() {
            cancelAnimationIfPlaying(1);
            animation.current = Animated.sequence([
                Animated.timing(scale, {
                    toValue: ScaleValues.enlargedScale,
                    duration: AnimationDurationValues.short,
                    useNativeDriver: true
                }),
                Animated.timing(scale, {
                    toValue: ScaleValues.originalScale,
                    duration: AnimationDurationValues.short,
                    useNativeDriver: true
                })
            ])
            animation.current.start(({ finished }) => handleAnimationCompletion(finished));
        }
    }))

    return(
        <Animated.View style={[styles.container, { 
            transform: [{scale}] 
        }]}>
            <Tile 
                character={character}
                tileSizingBundle={tileSizingBundle}
                tileColorBundle={tileColorBundle}
            />
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    container: {}
})