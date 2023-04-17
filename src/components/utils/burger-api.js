export const getIngredients = (url) => {
  return fetch(url).then((res) => checkResponse(res));
};

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getOrder = (ingr, url) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingr }),
  }).then((res) => checkResponse(res));
};
