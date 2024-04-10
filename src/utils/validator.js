const ValidateDate = (date) => {
  const ch = date.charAt(date.length - 1);

  if (!(ch >= 0 && ch <= 9)) return false;
  if (date.length > 10) return false;
  if (date.length === 1 && ch > 3) return false;
  if (
    date.length === 2 &&
    ((date.charAt(0) === "3" && ch > 1) || (date.charAt(0) === "0" && ch < 1))
  )
    return false;
  if (date.length === 4 && ch > 1) return false;
  if (
    date.length === 5 &&
    ((date.charAt(3) === "1" && ch > 2) || (date.charAt(3) === "0" && ch < 1))
  )
    return false;
  return true;
};

export default ValidateDate;
