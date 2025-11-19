// // backend/utils/dateUtils.js
// function countWorkingDaysInMonth(month, year) {
//   // month: 1-12
//   const start = new Date(year, month - 1, 1);
//   const end = new Date(year, month, 0); // last day
//   let count = 0;
//   for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//     const day = d.getDay();
//     // skip Saturday (6) and Sunday (0)
//     if (day !== 0 && day !== 6) count++;
//   }
//   return count;
// }

// module.exports = { countWorkingDaysInMonth };
// backend/utils/dateUtils.js
export function countWorkingDaysInMonth(month, year) {
  // month: 1-12
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0); // last day
  let count = 0;

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    // skip Saturday (6) and Sunday (0)
    if (day !== 0 && day !== 6) count++;
  }

  return count;
}
