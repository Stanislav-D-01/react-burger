export const getIngridients = (url) => {
  return fetch(url).then((res) => checkReponse(res));
};

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getOrder = (ingr, url) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingr }),
  }).then((res) => checkReponse(res));
};