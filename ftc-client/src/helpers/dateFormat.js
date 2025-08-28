export const getMonth = (month) => {
  try {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[month - 1];
  } catch (err) {
    console.log(err.message)
  }
};

export const getToDay = (day) => {
  try {
    const days = [
      "Monday", "Tuesday", "Wednesday", 
      "Thursday", "Friday", "Saturday",
      "Sunday"
    ];
    return days[day - 1];
  } catch (err) {
    console.log(err.message);
  }
};

export const getMonthNumber = (month) => {
  try {
    const months = {
      "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
      "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
    };
    return months[month];
  } catch (err) {
    console.log(err.message)
  }
};