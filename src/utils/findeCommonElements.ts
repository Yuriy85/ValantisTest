export default function findCommonElements<T>(arr1: T[], arr2: T[], arr3: T[]) {
  if (arr1.length === 0 && arr2.length === 0) {
    return arr3;
  } else if (arr1.length === 0 && arr3.length === 0) {
    return arr2;
  } else if (arr2.length === 0 && arr3.length === 0) {
    return arr1;
  }

  if (arr1.length === 0) {
    return arr3.filter((value) => arr2.includes(value));
  } else if (arr2.length === 0) {
    return arr3.filter((value) => arr1.includes(value));
  } else if (arr3.length === 0) {
    return arr2.filter((value) => arr1.includes(value));
  }

  return arr1.filter((value) => arr2.includes(value) && arr3.includes(value));
}
