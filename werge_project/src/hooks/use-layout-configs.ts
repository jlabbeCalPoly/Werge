import { AspectRatios, GapRatios, MaxHeightRatios, MaxItems } from "@/constants/layout";
import { Spacing } from "@/constants/theme";
import { TileGridConfigInterface } from "@/types/tile-grid-config-interface";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function calculateSafeWidthAndHeight() {
    const dim = Dimensions.get("screen");
    const insets = useSafeAreaInsets();
    const width = dim.width - insets.left - insets.right - (2 * Spacing.three);
    const height = dim.height - insets.bottom - insets.top - Spacing.three;

    return {width: width, height: height}
}

function calculateTileGridWidth(width: number, height: number) {
    // Determine if the height can fit within the max size bounds if the width is scaled to the edge of the screen (ideal)
    const heightRatio = width * AspectRatios.gridTileAspectRatio / height;

    if (heightRatio <= MaxHeightRatios.gridTileHeightRatio) {
        return width;
    } 
    // Otherwise, scale based on the height constraints
    else {
        return MaxHeightRatios.gridTileHeightRatio * height;
    }
}

function calculateTileSize(tileGridWidth: number, gap: number) {
    const tileSize = (tileGridWidth - ((MaxItems.gridTileMaxItems - 1) * gap)) / MaxItems.gridTileMaxItems
    const tileContentSize = tileSize * 0.4;

    return { tileSize, tileContentSize };
}

function calculateTileGridHeights(tileSize: number, gap: number) {
    const tileRowHeight = tileSize + gap;
    const tileGridHeight = tileRowHeight * 3;

    return { tileRowHeight, tileGridHeight };
}

function createTileGridLayoutConfig(width: number, height: number) {
    const tileGridWidth = calculateTileGridWidth(width, height)
    const gap = tileGridWidth * GapRatios.gapRatio;
    
    const { tileSize, tileContentSize } = calculateTileSize(tileGridWidth, gap)
    const { tileRowHeight, tileGridHeight } = calculateTileGridHeights(tileSize, gap)

    const tileGridLayoutConfig: TileGridConfigInterface = {
        width: tileGridWidth,
        height: tileGridHeight,
        gap: gap,
        tileRowHeight: tileRowHeight,
        tileSize: tileSize,
        tileContentSize: tileContentSize
    }

    return tileGridLayoutConfig
}

/**
 * Returns the layout configuration details for different components
 */
export function useLayoutConfigs() {
    const {width, height} = calculateSafeWidthAndHeight();

    return {
        tileGridLayoutConfig: createTileGridLayoutConfig(width, height)
    }
}