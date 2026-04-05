/**
 * GridDataInterface object data, contains the values that are required to set up the tile grid
 * @field previousWord Previous word in the chain
 * @field letterDifferenceCount Number of differing letters between current and previous word
 * @field currentChainIndex Current index in the word chain (progress)
 * @field totalChainLength Total number of words in the chain
 * @field wordLength Length of each word
 */
export interface GridDataInterface {
    /** Previous word in the chain */
    previousWord: string[];

    /** Number of differing letters between current and previous word */
    letterDifferenceCount: number;

    /** Current index in the word chain (progress) */
    currentChainIndex: number;

    /** Total number of words in the chain */
    totalChainLength: number;

    /** Length of each word */
    wordLength: number;
}
