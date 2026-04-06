// Imports
import { ComponentProps, useRef } from 'react';
import { StyleSheet, Animated, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyInterface } from '@/types/key-interface';

// Components
import { StyledText } from './styled-text';

// Types
type IoniconsName = ComponentProps<typeof Ionicons>['name'];
type KeyProps = {
    onKeyPress: (value: string, override: string | undefined) => void,
    keyInterface: KeyInterface,
    contentSize: number,
    minWidth: number,
    minHeight: number
}

export function Key({onKeyPress, keyInterface, contentSize, minWidth, minHeight}: KeyProps) {
    const scale = useRef(new Animated.Value(1)).current;
    const animation = useRef<Animated.CompositeAnimation | null>(null);

    function handleKeyPress() {
        // Cancel any running animation (if in the process of animating) and reset
        if (animation.current) {
            animation.current.stop();
            scale.setValue(1);
        }
        animation.current = Animated.sequence([
            Animated.timing(scale, {
                toValue: 0.8,
                duration: 80,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 80,
                useNativeDriver: true,
            }),
        ]);
        
        // Play animation, then reset in the event it completed normally
        animation.current.start(({finished}) => {
            if (!finished) {
                return
            }
            animation.current = null;
        });

        onKeyPress(keyInterface.value, keyInterface.override);
    }

    return(
        <Pressable
            onPress={handleKeyPress}>
            <Animated.View style={[styles.container, { minWidth, minHeight, transform: [{scale}] }]}>
            {keyInterface.type == "text" ? 
                <StyledText style={{ 
                    color: "#000000",
                    fontSize: contentSize, 
                    paddingHorizontal: 0.2*contentSize }}>
                        {keyInterface.value}
                </StyledText>
                : 
                <Ionicons name={keyInterface.value as IoniconsName} size={contentSize}/>
            }
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    }
})