import { GridDataInterface } from "@/types/grid-data-interface";
import { TileGridConfig } from "@/types/interfaces/tile-grid-config";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { TileRow, TileRowHandle } from "./tile-row";
import { GridTileColors } from "@/constants/theme";

// Types
export type TileGridHandle = {
    enlargeTileAnimation: (index: number) => boolean,
    shrinkTileAnimation: (index: number) => void
}
/**
 * Props used to configure the TileGrid
 * 
 */
type TileGridProps = {
    gridState?: GridDataInterface,
    inputState?: string[],
    layoutConfig: TileGridConfig
}

export const TileGrid = forwardRef<TileGridHandle, TileGridProps>(({gridState, inputState, layoutConfig}, ref) => {
    const previousRowReferance = useRef<TileRowHandle|null>(null);
    const inputRowRef = useRef<TileRowHandle|null>(null);
    const hiddenRowRef = useRef<TileRowHandle|null>(null);

    useImperativeHandle(ref, () => ({
        /**
         * Play the enlarge animation for the tile corresponding to the provided index
         * 
         * @param index The index that represents which tile should be enlarged
         */
        enlargeTileAnimation(index: number) {
            if (!inputRowRef.current) {
                return false
            }
            return inputRowRef.current.enlargeTileAnimation(index);
        },
        shrinkTileAnimation(index: number) {
            if (!inputRowRef.current) {
                return
            }
            inputRowRef.current.shrinkTileAnimation(index);
        },
    }));

    if (!gridState || !inputState) {
        // TODO: Render a loading component
        return(
            <></>
        );
    } else {
        return(
            <View style={[styles.container, {width: layoutConfig.width, height: layoutConfig.height}]}>
                <TileRow ref={previousRowReferance}
                    tileCharacters={gridState.previousWord}
                    tileRowBundle={{
                        height: layoutConfig.rowHeight,
                        gap: layoutConfig.gap,
                        tileCount: gridState.wordLength 
                    }}
                    tileColor={GridTileColors.gray}
                    tileOpacity={{
                        start: 1,
                        end: 0
                    }}
                    tileSize={layoutConfig.tileSize}
                    fontSize={layoutConfig.fontSize}
                />
                <TileRow ref={inputRowRef}
                    tileCharacters={inputState}
                    tileRowBundle={{
                        height: layoutConfig.rowHeight,
                        gap: layoutConfig.gap,
                        tileCount: gridState.wordLength 
                    }}
                    tileColor={GridTileColors.gold}
                    tileOpacity={{
                        start: 1,
                        end: 1
                    }}
                    tileSize={layoutConfig.tileSize}
                    fontSize={layoutConfig.fontSize}
                    isScalable={true}
                />
                <TileRow ref={hiddenRowRef}
                    tileRowBundle={{
                        height: layoutConfig.rowHeight,
                        gap: layoutConfig.gap,
                        tileCount: gridState.wordLength 
                    }}
                    tileColor={GridTileColors.gray}
                    tileOpacity={{
                        start: 0,
                        end: 1
                    }}
                    tileSize={layoutConfig.tileSize}
                    fontSize={layoutConfig.fontSize}
                />
            </View>
        );
    }
})

const styles = StyleSheet.create({
    container: {}
})