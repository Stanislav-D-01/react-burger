export const getIngridients = (url) => {
  return fetch(url).then((res) => checkReponse(res));
};

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
