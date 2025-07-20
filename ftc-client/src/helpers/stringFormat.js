export const firstTwoLettersOfName = (name) => {
  const splittedName = name.split(" ");
  if (splittedName.length > 1) return splittedName[0][0] + splittedName[1][0];
  return splittedName[0][0];
};