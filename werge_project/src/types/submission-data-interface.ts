import { GameDataInterface } from "./game-data-interface"
import { PointPayloadInterface } from "./point-payload-interface"

/**
 * SubmissionDataInterface object data, contains the data that the player will recieve from the server after submitting an answer
 * @field success True/false flag, representing if the answer was correct or not
 * @field message Verbose message from the server
 * @field gameData? Only provided on success, contains the setup data for the next round (optional)
 * @feild pointPayload? Only provided on success, contains the points the player earned (optional)
 */
export interface SubmissionDataInterface {
    success: boolean
    message: string,
    gameData?: GameDataInterface
    pointPayload?: PointPayloadInterface
}