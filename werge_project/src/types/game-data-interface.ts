import { GridDataInterface } from "./grid-data-interface"

/**
 * GameDataInterface object data, contains the values that are required to set up the game contents
 * @field gridData Data required to construct the tile grid
 */
export interface GameDataInterface {
    /** Data required to construct the tile grid */
    gridData: GridDataInterface,

    /** Description for the word */
    descriptionData: string
}

export const GAME_INFORMATION_MOCK_DATA: GameDataInterface = {
    gridData: {
        previousWord: ["A", "N", "T"],
        letterDifferenceCount: 1,
        currentChainIndex: 1,
        totalChainLength: 3,
        wordLength: 3
    },
    descriptionData: "Unspecified or unrestricted"
}