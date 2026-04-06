import { GAME_INFORMATION_MOCK_DATA, GameDataInterface } from "@/types/game-data-interface"

// Format the game data
function formatGameData(data: GameDataInterface) {
    const wordLength = data.gridData.wordLength;
    return {descriptionData: data.descriptionData, gridData: data.gridData, inputData: Array(wordLength).fill("")}
}

export function handleGameStartMock() {
    return formatGameData(GAME_INFORMATION_MOCK_DATA);
}

// TOOD: Fetch logic to retrieve game data from the server
export async function handleGameStartAsync() {

}