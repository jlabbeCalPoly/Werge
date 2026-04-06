// Imports
import { forwardRef } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { TileSizingBundle } from '@/types/interfaces/tile-sizing-bundle';
import { TileColorBundle } from '@/types/interfaces/tile-color-bundle';

// Components
import { AnimatedStyledText } from './animated-styled-text';

export type TileProps = {
    character: string,
    tileSizingBundle: TileSizingBundle,
    tileColorBundle: TileColorBundle
}

export const Tile = forwardRef<View, TileProps>(({
    character, 
    tileSizingBundle,
    tileColorBundle
}, ref) => {
    return(
        <Animated.View 
        ref={ref}
        style={[styles.container, { 
            width: tileSizingBundle.tileSize, 
            height: tileSizingBundle.tileSize, 
            backgroundColor: tileColorBundle.transparentColor, 
            borderColor: tileColorBundle.opaqueColor
        }]}>
            <AnimatedStyledText style={{
                fontSize: tileSizingBundle.fontSize,
                color: tileColorBundle.opaqueColor,
            }}>
                {character}
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