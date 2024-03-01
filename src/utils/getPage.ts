export default function getPageElements<T>(arr: T[], elementsPerPage: number, page: string): T[] {
  const startIndex = (+page - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  return arr.slice(startIndex, endIndex);
}
