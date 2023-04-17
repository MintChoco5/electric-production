// 封装ls存取token

const key = "";
const setUser = (userinfo) => {
  return window.localStorage.setItem(key, userinfo);
};
const getUser = () => {
  return window.localStorage.getItem(key);
};
const removeUser = () => {
  return window.localStorage.removeItem(key);
};

export { setUser, getUser, removeUser };