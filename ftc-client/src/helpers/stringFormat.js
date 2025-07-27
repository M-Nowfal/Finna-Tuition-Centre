export const firstTwoLettersOfName = (name) => {
  try {
    const splittedName = name.split(" ");
    if (splittedName.length > 1) return splittedName[0][0].toUpperCase() + splittedName[1][0].toUpperCase();
    return splittedName[0][0].toUpperCase();
  } catch (err) {
    console.log(err.message);
  }
};