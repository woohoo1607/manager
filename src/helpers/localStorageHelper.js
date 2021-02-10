export const setData = async (name = "", data = "") =>
  await localStorage.setItem(name, data);

export const getData = async (name = "") =>
  (await localStorage.getItem(name)) || null;

export const removeData = async (name = "") =>
  await localStorage.removeItem(name);
