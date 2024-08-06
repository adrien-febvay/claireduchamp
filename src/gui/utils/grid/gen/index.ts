import { arrayGen } from '@/gui/utils/array/gen';

/**
 * Generates an grid with the specified size and using an item generator.
 * @param size Size of the grid to generate.
 * @param columns Number of columns of the grid.
 * @param generator Generator returning an item using its index, row, column and eventually the array being generated.
 * @returns A grid of generated items.
 */
export function gridGen<Item>(size: number, columns: number, generator: gridGen.Generator<Item>): Item[][] {
  const length = Number.isInteger(size) && size > 0 ? size : 0;
  const width = Number.isInteger(columns) && columns > 0 ? columns : 1;
  let items = length;
  return arrayGen<Item[]>(Math.ceil(items / width), (row, grid) =>
    arrayGen<Item>(Math.min(items, width), (column, array) => {
      grid[row] = array;
      return generator(length - items--, row, column, grid);
    }),
  );
}

export namespace gridGen {
  /**
   * Generator making an `Item` our of an index and eventually the grid being generated.
   * @param index Index of the item to generate.
   * @param row Row of the item to generate.
   * @param column Column of the item to generate.
   * @param grid Grid being generated.
   * @returns The generated item.
   */
  export type Generator<Item> = (index: number, row: number, column: number, grid: Item[][]) => Item;
}
