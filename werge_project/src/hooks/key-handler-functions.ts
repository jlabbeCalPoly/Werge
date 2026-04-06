export interface onKeyPressInterface {
    inputState : string[],
    inputIndex: number,
    enlargeIndex: number | null,
    shrinkIndex: number | null
}
const overrides = {
    DELETE: deleteHandler
}

function deleteHandler(
    inputState : string[],
    inputIndex: number,
    wordLength: number
) {
    if (inputIndex > 0) {
        const shrinkIndex: number | null = inputIndex < wordLength ? inputIndex : null;

        inputIndex -= 1;
        inputState[inputIndex] = "";
        const enlargeIndex = inputIndex;
        return returnFormatter(inputState, inputIndex, enlargeIndex, shrinkIndex);
    } else {
        return returnFormatter(inputState, inputIndex);
    }
}

function defaultHandler(
    inputState : string[],
    inputIndex: number,
    wordLength: number,
    key: string
) {
    if (inputIndex < wordLength) {
        inputState[inputIndex] = key;
        const shrinkIndex = inputIndex;

        inputIndex += 1;
        const enlargeIndex: number | null = inputIndex < wordLength ? inputIndex : null;
        return returnFormatter(inputState, inputIndex, enlargeIndex, shrinkIndex);
    } else {
        return returnFormatter(inputState, inputIndex);
    }
}

function returnFormatter(
    inputState : string[],
    inputIndex: number,
    enlargeIndex: number | null = null,
    shrinkIndex: number | null = null
) {
    return { 
        inputState: [...inputState], 
        inputIndex: inputIndex, 
        enlargeIndex: enlargeIndex, 
        shrinkIndex: shrinkIndex 
    };
}

/**
 * Returns a tuple, consisting of the updated inputState, inputIndex, enlargeIndex and shrinkIndex from the key input
 * 
 * @param inputState The current inputState, mapping to each character the player has entered
 * @param inputIndex The current index of the input that's being focused on
 * @param wordLength The length of the word
 * @param key The specific value of the key that was pressed
 * @param override Flag that's used to determine if custom logic is needed for a given key input 
 */
export function handleKeyPress(
    inputState : string[],
    inputIndex: number,
    wordLength: number,
    key: string,
    override: string | undefined
) {
    if (!override) {
        return defaultHandler(inputState, inputIndex, wordLength, key);
    }

    const func = overrides[override as keyof typeof overrides];
    if (!func) {
        console.log(`Unknown override: ${override}`);
        return returnFormatter(inputState, inputIndex);
    }

    return func(inputState, inputIndex, wordLength);
}