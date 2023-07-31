const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function formatDate(date) {
  const formatted = `${new Date(date).getDate()} ${
    months[new Date(date).getMonth() - 1]
  } ${new Date(date).getFullYear()}`;

  return formatted;
}
