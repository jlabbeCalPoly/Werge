// Imports
import { StyleSheet, Text, type TextProps } from "react-native";

export function StyledText({style, ...rest}: TextProps) {
    return(
        <Text 
            style={[styles.styledText, style]}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    styledText: {
        fontFamily: "Nunito",
        fontWeight: 800
    }
})