export function getFormattedDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function getYYYYMMDDFormattedDate(dateString) {
  let dateParts = dateString.split("/");
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}

export function getMMMDDYYYFormattedDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}

export function getMMMDDYYY_HHMMFormattedDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedDate;
}
