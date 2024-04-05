/**Convert js date to string
 * @param {string} date String in any valid js date format
 * @returns {string} Formatted date string dd. Mon. yyyy
 */
export const formatDate = (date) => {
  const monthName = [
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

  const displayDate = new Date(date);
  const day = displayDate.getDate();
  const month = monthName[displayDate.getMonth()];
  const year = displayDate.getFullYear();
  const dateString = `${day}. ${month}. ${year}`;
  return dateString;
};
