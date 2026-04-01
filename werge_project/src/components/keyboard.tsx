// Imports
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Spacing } from '@/constants/theme';
import { KeyInterface } from '@/types/key-interface';

// Components
import { KeyRow } from './key-row';

// Constants
const MAX_HEIGHT_PERCENT = 0.3;      // The keyboard is constrained to a max height
const KEYBOARD_ASPECT_RATIO = 0.4    // The keyboard is constrained to an aspect ratio (height:width)
const ROW_GAP_PERCENT = 0.02;        // The gap between rows on the keyboard (percent of the keyboard height)
const MAX_MINI_KEYS = 10;            // The most amount of mini keys (only 1 char long) in a row
const KEY_ROWS: KeyInterface[][] = [ // Contains the keys for the keyboard separated by row, represented by the fields provided in KeyInterface
    [
        {type: "text", value: "Q"},
        {type: "text", value: "W"},
        {type: "text", value: "E"},
        {type: "text", value: "R"},
        {type: "text", value: "T"},
        {type: "text", value: "Y"},
        {type: "text", value: "U"},
        {type: "text", value: "I"},
        {type: "text", value: "O"},
        {type: "text", value: "P"}
    ],
    [
        {type: "text", value: "A"},
        {type: "text", value: "S"},
        {type: "text", value: "D"},
        {type: "text", value: "F"},
        {type: "text", value: "G"},
        {type: "text", value: "H"},
        {type: "text", value: "J"},
        {type: "text", value: "K"},
        {type: "text", value: "L"}
    ],
    [
        {type: "text", value: "ENTER", override: "ENTER"},
        {type: "text", value: "Z"},
        {type: "text", value: "X"},
        {type: "text", value: "C"},
        {type: "text", value: "V"},
        {type: "text", value: "B"},
        {type: "text", value: "N"},
        {type: "text", value: "M"},
        {type: "icon", value: "arrow-back", override: "DELETE"}
    ]
]

type KeyboardProps = {
    onKeyPress: (value: string, override: undefined | string) => void
}

/*
    Calculate the size for the keyboard based on the current screen dimensions and size constraints
    Return: list with the width and height for the keyboard, respectively
*/
function calculateSize() {
    const dim = Dimensions.get('screen');
    const insets = useSafeAreaInsets();
    const width = dim.width - insets.left - insets.right - (2 * Spacing.three);
    const height = dim.height - insets.bottom - insets.top - Spacing.three;

    // Determine if the height can fit within the max size bounds if the width is scaled to the edge of the screen (ideal)
    const heightRatio = width * KEYBOARD_ASPECT_RATIO / height;
    if (heightRatio <= MAX_HEIGHT_PERCENT) {
        return {width: width, height: heightRatio * height};
    } 
    // Otherwise, scale based on the height constraints and adjust the width accordingly
    else {
        const scaledHeight = MAX_HEIGHT_PERCENT * height;
        const scaledWidth = scaledHeight / KEYBOARD_ASPECT_RATIO;
        return {width: scaledWidth, height: scaledHeight};
    }
}

function calculateKeySize(width: number, height: number) {
    const gap = ROW_GAP_PERCENT * height;
    const minWidth = (width - ((MAX_MINI_KEYS - 1) * gap)) / MAX_MINI_KEYS;
    const minHeight = (height - (2 * gap)) / 3;
    const contentSize = minHeight * 0.4;

    return { gap, contentSize, minWidth, minHeight }
}

export function Keyboard({onKeyPress}: KeyboardProps) {
    const { width, height } = calculateSize();
    const { gap, contentSize, minWidth, minHeight } = calculateKeySize(width, height); 

    return(
        <View style={[styles.keyboard, { width, height }]}>
            {KEY_ROWS.map((keyRow, idx) => (
                <KeyRow 
                    key={idx}
                    onKeyPress={onKeyPress} 
                    keyRow={keyRow} 
                    gap={gap}
                    contentSize={contentSize}
                    minWidth={minWidth}
                    minHeight={minHeight}/>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    keyboard: {
        flexDirection: "column",
        justifyContent: "space-between"
    }
});