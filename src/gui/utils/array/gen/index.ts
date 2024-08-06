/**
 * Generates an array with the specified size and using an item generator.
 * @param size Size of the array to generate.
 * @param generator Generator returning an item using its index and eventually the array being generated.
 * @returns An array of generated items.
 */
export function arrayGen<Item>(size: number, generator: arrayGen.Generator<Item>): Item[] {
  const array = Array<Item>(Number.isInteger(size) && size > 0 ? size : 0);
  for (let index = 0; index < array.length; index += 1) {
    array[index] = generator(index, array);
  }
  return array;
}

export namespace arrayGen {
  /**
   * Generator making an `Item` our of an index and eventually the array being generated.
   * @param index Index of the item to generate.
   * @param array Array being generated.
   * @returns The generated item.
   */
  export type Generator<Item> = (index: number, array: Item[]) => Item;
}
