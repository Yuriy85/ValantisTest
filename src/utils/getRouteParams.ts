export default function getRouteParams(
  path: string | undefined,
  param: 'page' | 'name' | 'brand' | 'price'
) {
  const regex = new RegExp(param + '=([^&]*)');
  const match = path?.match(regex);
  return match ? match[1] : '';
}
