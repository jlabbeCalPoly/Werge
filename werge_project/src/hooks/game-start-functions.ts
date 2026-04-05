import { GAME_INFORMATION_MOCK_DATA, GameDataInterface } from "@/types/game-data-interface"

function createInputData(wordLength: number) {
    const inputData: string[] = [];
    inputData.fill("", 0, wordLength-1);
    return inputData;
}

// Format the game data
function formatGameData(data: GameDataInterface) {
    const wordLength = data.gridData.wordLength;
    return {descriptionData: data.descriptionData, gridData: data.gridData, inputData: createInputData(wordLength)}
}

export function handleGameStartMock() {
    return formatGameData(GAME_INFORMATION_MOCK_DATA);
}

// TOOD: Fetch logic to retrieve game data from the server
export async function handleGameStartAsync() {

}