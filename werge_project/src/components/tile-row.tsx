// Imports
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { StyleSheet, View, Animated } from "react-native";

// Components
import { Tile } from "./tile";
import { GridTileColorInterface } from "@/types/grid-tile-color-interface";

export type TileRowHandle = {
    resetAnimations: () => void,
    shiftColor: (colorsEnd: GridTileColorInterface) => void
}
type TileRowProps = {
    gap: number,
    tileRowHeight: number,
    tileSize: number
    tileContentSize: number,
    tileCount: number,
    colorsStart: GridTileColorInterface,
    opacityStart: number,
    opacityEnd: number,
    tileCharacters?: string[]
}

interface InterpolationConfig {
    inputRange: number[];
    opaqueOutputRange: string[];
    transparentOutputRange: string[];
}

export const TileRow = forwardRef<TileRowHandle, TileRowProps>(({gap, tileRowHeight, tileSize, tileContentSize, tileCount, colorsStart, opacityStart, opacityEnd, tileCharacters}, ref) => {
    // Opacity animation setup
    const opacityAnimation = useRef<Animated.CompositeAnimation | null>(null);
    const opacityAnimationValue = useRef(new Animated.Value(0)).current;
    const opacity = opacityAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [opacityStart, opacityEnd]
    });

    // Default color animation setup
    const colorAnimation = useRef<Animated.CompositeAnimation | null>(null);
    const colorAnimationValue = useRef(new Animated.Value(0)).current;

    // State so updating the color 
    const [interpolationConfig, setInterpolationConfig] = useState<InterpolationConfig>({
        inputRange: [0, 1],
        opaqueOutputRange: [colorsStart.opaque, colorsStart.opaque],
        transparentOutputRange: [colorsStart.transparent, colorsStart.transparent],
    });

    const backgroundColor = colorAnimationValue.interpolate({
        inputRange: interpolationConfig.inputRange,
        outputRange: interpolationConfig.transparentOutputRange,
    });
    const borderColor = colorAnimationValue.interpolate({
        inputRange: interpolationConfig.inputRange,
        outputRange: interpolationConfig.opaqueOutputRange,
    });
    const textColor = borderColor;

    // Cancel the color animation if it's in the process of playing, then reset its values back to 0
    function cancelColorAnimationIfPlaying() {
        if (colorAnimation.current) {
            // setValue also automatically stops any running animations
            colorAnimationValue.setValue(0);
            colorAnimation.current = null;
        }
    }

    // Cancel the opacity animation if it's in the process of playing, then reset its values back to 0
    function cancelOpacityAnimationIfPlaying() {
        if (opacityAnimation.current) {
            // setValue also automatically stops any running animations
            opacityAnimationValue.setValue(0);
            opacityAnimation.current = null;
        }
    }

    useImperativeHandle(ref, () => ({
        /**
         * Cancel any ongoing animations and reset back to original values
         */
        resetAnimations() {
            cancelColorAnimationIfPlaying();
            cancelOpacityAnimationIfPlaying();
        },

        /**
         * Shift the color of the row to the provided color
         * 
         * @param colorsEnd The opaque color being shifted to
         */
        shiftColor(colorsEnd: GridTileColorInterface) {
            cancelColorAnimationIfPlaying();
            setInterpolationConfig({
                inputRange: [0, 1],
                opaqueOutputRange: [colorsStart.opaque, colorsEnd.opaque],
                transparentOutputRange: [colorsStart.transparent, colorsEnd.transparent]
            });

            colorAnimation.current = Animated.timing(colorAnimationValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            })
            
            // Start the animation
            colorAnimation.current.start(({finished}) => {
                // If the animation was cancelled prematurely, debounce
                if (!finished) {
                    return;
                }
                colorAnimation.current = null;
            });
        },

        /**
         * Shift the color of the row to the provided color, then return back to the original color
         * 
         * @param color The color being shifted to
         */
        reboundColor(color: string) {
    
        }
    }));

    return(
        <View style={[styles.container, {gap: gap, height: tileRowHeight}]}>
            {Array.from({ length: tileCount }, (_, i) => (
                <Tile 
                    key={i}
                    char={tileCharacters && i < tileCharacters.length ? tileCharacters[i] : ""}
                    tileSize={tileSize}
                    tileContentSize={tileContentSize}
                    backgroundColor={backgroundColor}
                    borderColor={borderColor}
                    textColor={textColor}
                />
            ))}
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center"
    }
})