export class MibArray {
  /**
   * Возвращает массив, с уникальными значениями (без дубликатов)
   *
   * @remarks
   * Необходимо задать тип T - для типизации массива.
   *
   * @param array - Массив, в котором необходимо убрать дубликаты
   * @returns Массив, с уникальными значениями
   *
   */
  public static getUniq<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  }

  /**
   * Возвращает массив, с уникальными значениями (без дубликатов), по заданному параметру
   *
   * @remarks
   * Необходимо задать тип T - для типизации массива.
   *
   * @param array - Массив, в котором необходимо убрать дубликаты
   * @param property - Свойство, по которому будет сортировка
   * @returns Массив, с уникальными значениями
   *
   */
  public static getUniqByProperty<T>(array: T[], property: string): T[] {
    return array.filter((item, index, a) => {
      return a.map((mapItem) => mapItem[property]).indexOf(item[property]) === index
    })
  }
}
