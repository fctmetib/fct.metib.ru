export interface SelectedItemSortedInterface {
    contract: string;
    summ: number;
    categories: [
      {
        categoryName: string;
        summ: number;
        requests: [
          {
            id: number;
            number: string;
            summ: number;
          },
        ],
      },
    ],
}
