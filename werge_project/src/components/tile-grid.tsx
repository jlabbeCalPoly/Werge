import { GridDataInterface } from "@/types/grid-data-interface";
import { TileGridConfigInterface } from "@/types/tile-grid-config-interface";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { TileRow, TileRowHandle } from "./tile-row";
import { GridTileColors } from "@/constants/theme";

// Types
export type TileGridHandle = {
    testAnimation: () => void
}
type TileGridProps = {
    gridState?: GridDataInterface,
    inputState?: string[],
    layoutConfig: TileGridConfigInterface
}

export const TileGrid = forwardRef<TileGridHandle, TileGridProps>(({gridState, inputState, layoutConfig}, ref) => {
    const topRowRef = useRef<TileRowHandle|null>(null);
    const middleRowRef = useRef<TileRowHandle|null>(null);
    const bottomRowRef = useRef<TileRowHandle|null>(null);

    useImperativeHandle(ref, () => ({
        testAnimation() {
            topRowRef.current?.shiftColor(GridTileColors.gold);
        }
    }));

    if (!gridState || !inputState) {
        // TODO: Render a loading component (maybe the one I made back for Hack4Impact bootcamp project)
        return(
            <></>
        );
    } else {
        return(
            <View style={[styles.container, {width: layoutConfig.width, height: layoutConfig.height}]}>
                <TileRow ref={topRowRef}
                    gap={layoutConfig.gap}
                    tileRowHeight={layoutConfig.tileRowHeight}
                    tileSize={layoutConfig.tileSize}
                    tileContentSize={layoutConfig.tileContentSize}
                    tileCount={gridState.wordLength}
                    colorsStart={GridTileColors.gray}
                    opacityStart={0}
                    opacityEnd={1}
                    tileCharacters={gridState.previousWord}
                />
                <TileRow ref={middleRowRef}
                    gap={layoutConfig.gap}
                    tileRowHeight={layoutConfig.tileRowHeight}
                    tileSize={layoutConfig.tileSize}
                    tileContentSize={layoutConfig.tileContentSize}
                    tileCount={gridState.wordLength}
                    colorsStart={GridTileColors.gray}
                    opacityStart={0}
                    opacityEnd={1}
                    tileCharacters={gridState.previousWord}
                />
                <TileRow ref={bottomRowRef}
                    gap={layoutConfig.gap}
                    tileRowHeight={layoutConfig.tileRowHeight}
                    tileSize={layoutConfig.tileSize}
                    tileContentSize={layoutConfig.tileContentSize}
                    tileCount={gridState.wordLength}
                    colorsStart={GridTileColors.gray}
                    opacityStart={0}
                    opacityEnd={1}
                    tileCharacters={gridState.previousWord}
                />
            </View>
        );
    }
})

const styles = StyleSheet.create({
    container: {}
})