export default function getPageElements<T>(
  arr: T[],
  elementsPerPage: number,
  pageNumber: number
): T[] {
  const startIndex = (pageNumber - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  return arr.slice(startIndex, endIndex);
}
