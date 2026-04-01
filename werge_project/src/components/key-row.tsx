// Imports
import { StyleSheet, View } from "react-native"
import { KeyInterface } from "@/types/key-interface"

// Components
import { Key } from "@/components/key";

type KeyRowProps = {
    onKeyPress: (value: string, override: undefined | string) => void,
    keyRow: KeyInterface[],
    gap: number,
    contentSize: number,
    minWidth: number,
    minHeight: number
}

export function KeyRow({onKeyPress, keyRow, gap, contentSize, minWidth, minHeight}: KeyRowProps) {
    return(
        <View style={[styles.keyRow, { gap }]}>
            {keyRow.map((keyInterface, idx) => (
                <Key 
                    key={idx}
                    onKeyPress={onKeyPress} 
                    keyInterface={keyInterface}
                    contentSize={contentSize}
                    minWidth={minWidth}
                    minHeight={minHeight}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    keyRow: {
        flexDirection: "row",
        justifyContent: "center"
    }
})