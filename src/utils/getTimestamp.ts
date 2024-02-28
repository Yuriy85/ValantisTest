export default function getTimestamp() {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return year.toString() + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
}
