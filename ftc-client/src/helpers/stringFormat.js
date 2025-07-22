export const firstTwoLettersOfName = (name) => {
  const splittedName = name.split(" ");
  if (splittedName.length > 1) return splittedName[0][0].toUpperCase() + splittedName[1][0].toUpperCase();
  return splittedName[0][0].toUpperCase();
};