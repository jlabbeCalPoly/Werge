/**
 * Contains configuration information for the TileGrid component.
 *
 * @param width The total width of the TileGrid component.
 * @param height The total height of the TileGrid component.
 * @param gap The spacing between tiles within the grid.
 * @param tileRowHeight The height of each row in the grid.
 * @param tileSize The size (width and height) of each individual tile.
 * @param tileContentSize The size of the text inside each tile.
 */
export interface TileGridConfigInterface {
    width: number,
    height: number,
    gap: number,
    tileRowHeight: number,
    tileSize: number,
    tileContentSize: number
}