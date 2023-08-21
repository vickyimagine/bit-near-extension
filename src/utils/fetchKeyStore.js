export const fetchKeys = () => {
  const keys =
    localStorage.getItem("keyStore") !== "undefined"
      ? JSON.parse(localStorage.getItem("keyStore"))
      : localStorage.clear();
  // console.log(userInfo);
  return keys;
};
