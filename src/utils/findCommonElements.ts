export default function findCommonElements(arrays: string[][]) {
  if (arrays.length === 0) {
    return [];
  } else if (arrays.length === 1) {
    return arrays[0];
  }

  return arrays.reduce((prev, current) => prev.filter((value) => current.includes(value)));
}
