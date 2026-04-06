/**
 * Contains configuration information for the TileGrid component.
 *
 * @param width The total width of the TileGrid component.
 * @param height The total height of the TileGrid component.
 * @param gap The spacing between tiles within the grid.
 * @param rowHeight The height of each row in the grid.
 * @param tileSize The size (width and height) of each individual tile.
 * @param fontSize The size of the text inside each tile.
 */
export interface TileGridConfig {
    width: number,
    height: number,
    gap: number,
    rowHeight: number,
    tileSize: number,
    fontSize: number
}