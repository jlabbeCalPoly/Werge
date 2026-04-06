// Imports
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { StyleSheet, Animated, View } from "react-native";

// Components
import { Tile } from "./tile";
import { GridTileColorInterface } from "@/types/grid-tile-color-interface";
import { ScalableTile, ScalableTileHandle } from "./scalable-tile";
import { TileRowBundle } from "@/types/interfaces/tile-row-bundle";
import { TileColor } from "@/types/types/tile-color";
import { TileOpacity } from "@/types/types/tile-opacity";

export type TileRowHandle = {
    resetAnimations: () => void,
    shiftColor: (colorsEnd: GridTileColorInterface) => void,
    enlargeTileAnimation: (index: number) => boolean,
    shrinkTileAnimation: (index: number) => void
}
type TileRowProps = {
    tileCharacters?: string[]
    tileRowBundle: TileRowBundle
    tileColor: TileColor,
    tileOpacity: TileOpacity,
    tileSize: number
    fontSize: number,
    isScalable?: boolean
}

interface InterpolationConfig {
    inputRange: number[];
    opaqueOutputRange: string[];
    transparentOutputRange: string[];
}

// Initialize the variables required for the opacity animation
function setupOpacityAnimation(tileOpacity: TileOpacity) {
    const opacityAnimation = useRef<Animated.CompositeAnimation | null>(null);
    const opacityAnimationValue = useRef(new Animated.Value(0)).current;
    const opacity = opacityAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [tileOpacity.start, tileOpacity.end]
    });

    return { opacityAnimation, opacityAnimationValue, opacity };
}

// Initialize the variables required for the color animation
function setupColorAnimation(interpolationConfig: InterpolationConfig) {
    const colorAnimation = useRef<Animated.CompositeAnimation | null>(null);
    const colorAnimationValue = useRef(new Animated.Value(0)).current;

    // data for tileColorBundle
    const opaqueColor = colorAnimationValue.interpolate({
        inputRange: interpolationConfig.inputRange,
        outputRange: interpolationConfig.opaqueOutputRange,
    });
    const transparentColor = colorAnimationValue.interpolate({
        inputRange: interpolationConfig.inputRange,
        outputRange: interpolationConfig.transparentOutputRange,
    });

    return { colorAnimation, colorAnimationValue, opaqueColor, transparentColor };
}

export const TileRow = forwardRef<TileRowHandle, TileRowProps>(({
    tileCharacters, 
    tileRowBundle, 
    tileColor,
    tileOpacity,
    tileSize, 
    fontSize,
    isScalable
}, ref) => {
    // Tile refs setup
    const tileRefs = useRef<Array<ScalableTileHandle | View | null>>(
        Array(tileRowBundle.tileCount).fill(null)
    );
    // Opacity animation setup
    const { opacityAnimation, opacityAnimationValue, opacity } = setupOpacityAnimation(tileOpacity);

    // Store color interpolation as state so color updates cause re-render
    const [interpolationConfig, setInterpolationConfig] = useState<InterpolationConfig>({
        inputRange: [0, 1],
        opaqueOutputRange: [tileColor.opaque, tileColor.opaque],
        transparentOutputRange: [tileColor.transparent, tileColor.transparent],
    });
    // Color animation setup
    const { colorAnimation, colorAnimationValue, opaqueColor, transparentColor } = setupColorAnimation(interpolationConfig)

    // Cancel the color animation if it's in the process of playing, then reset its values back to 0
    function cancelAnimationIfPlaying(animation: React.RefObject<Animated.CompositeAnimation | null>, animationValue: Animated.Value) {
        if (animation.current) {
            // setValue also automatically stops any running animations
            animationValue.setValue(0);
            animation.current = null;
        }
    }

    function handleAnimationCompletion(finished: boolean, animation: React.RefObject<Animated.CompositeAnimation | null>) {
        // Check if the animation was cancelled prematurely
        if (!finished) {
            return
        }
        animation.current = null;
    }

    useImperativeHandle(ref, () => ({
        /**
         * Cancel any ongoing animations and reset back to original values
         */
        resetAnimations() {
            cancelAnimationIfPlaying(colorAnimation, colorAnimationValue);
            cancelAnimationIfPlaying(opacityAnimation, opacityAnimationValue);
        },

        /**
         * Shift the color of the row to the provided color
         * 
         * @param toTileColor TileColor data object representing the colors to transition to
         */
        shiftColor(toTileColor: TileColor) {
            cancelAnimationIfPlaying(colorAnimation, colorAnimationValue);
            setInterpolationConfig({
                inputRange: [0, 1],
                opaqueOutputRange: [tileColor.opaque, toTileColor.opaque],
                transparentOutputRange: [tileColor.transparent, toTileColor.transparent]
            });

            colorAnimation.current = Animated.timing(colorAnimationValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            })
            
            // Start the animation
            colorAnimation.current.start(({finished}) => {
                handleAnimationCompletion(finished, colorAnimation);
            });
        },

        /**
         * Shift the color of the row to the provided color, then return back to the original color
         * 
         * @param color TileColor data object representing the colors to transition to
         */
        reboundColor(toTileColor: TileColor) {
            cancelAnimationIfPlaying(colorAnimation, colorAnimationValue);
            setInterpolationConfig({
                inputRange: [0, 0.5, 1],
                opaqueOutputRange: [tileColor.opaque, toTileColor.opaque, tileColor.opaque],
                transparentOutputRange: [tileColor.transparent, toTileColor.transparent, tileColor.transparent]
            });

            colorAnimation.current = Animated.timing(colorAnimationValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            })
            
            // Start the animation
            colorAnimation.current.start(({finished}) => {
                handleAnimationCompletion(finished, colorAnimation);
            });
        },

        enlargeTileAnimation(index: number) {
            if (tileRefs.current[index] && "enlarge" in tileRefs.current[index]) {
                tileRefs.current[index].enlarge();
                return true;
            } else {
                return false
            }
        },
        shrinkTileAnimation(index: number) {
            if (tileRefs.current[index] && "shrink" in tileRefs.current[index]) {
                tileRefs.current[index].shrink();
            }
        }
    }));

    return(
        <Animated.View style={[styles.container, {gap: tileRowBundle.gap, height: tileRowBundle.height, opacity: opacity}]}>
            {Array.from({ length: tileRowBundle.tileCount }, (_, i) => (isScalable ?
                <ScalableTile 
                    key={i}
                    ref={el => { tileRefs.current[i] = el }}
                    character={tileCharacters ? tileCharacters[i] : ""}
                    tileSizingBundle={{
                        tileSize: tileSize,
                        fontSize: fontSize
                    }}
                    tileColorBundle={{
                        opaqueColor: opaqueColor,
                        transparentColor: transparentColor
                    }}
                /> 
                :
                <Tile
                    key={i}
                    ref={el => { tileRefs.current[i] = el }}
                    character={tileCharacters ? tileCharacters[i] : ""}
                    tileSizingBundle={{
                        tileSize: tileSize,
                        fontSize: fontSize
                    }}
                    tileColorBundle={{
                        opaqueColor: opaqueColor,
                        transparentColor: transparentColor
                    }}
                />
            ))}
        </Animated.View>
    );
})

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center"
    }
})