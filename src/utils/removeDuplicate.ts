import { GoodInfo } from '../api/valantis';

export function removeIdDuplicates(arr: string[]) {
  const uniqueArray = [];
  const seenElements: { [key: string]: boolean } = {};

  for (let i = 0; i < arr.length; i++) {
    const currentItem = arr[i];
    if (!seenElements[currentItem]) {
      uniqueArray.push(currentItem);
      seenElements[currentItem] = true;
    }
  }

  return uniqueArray;
}

export function removeInfoDuplicates(arr: GoodInfo[]): GoodInfo[] {
  const uniqueIds: { [key: string]: boolean } = {};
  const uniqueArr: GoodInfo[] = [];

  arr.forEach((obj) => {
    if (!uniqueIds[obj.id]) {
      uniqueIds[obj.id] = true;
      uniqueArr.push(obj);
    }
  });

  return uniqueArr;
}
