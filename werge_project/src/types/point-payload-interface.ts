/**
 * PointPayloadInterface object data, contains optional values for the base and bonus points that the player has earned
 * @field basePoints? Base points earned (optional)
 * @field bonusPoints? Bonus points earned (optional)
 */
export interface PointPayloadInterface {
     /** Base points earned (optional) */
    basePoints?: number;

    /** Bonus points earned (optional) */
    bonusPoints?: number;
}