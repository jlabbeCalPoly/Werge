// Imports
import { Animated } from "react-native"

/**
 * Used to denote the color values that are required by Tiles
 * 
 * @field opaqueColor Interpolated string value for the opaque color used by the Tile
 * @field transparentColor Interpolated string value for the transparent color used by the Tile
 */
export interface TileColorBundle {
    opaqueColor: Animated.AnimatedInterpolation<string>
    transparentColor: Animated.AnimatedInterpolation<string>
}
