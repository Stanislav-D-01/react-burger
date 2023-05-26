import { getCookie, BASE_URL } from "./utils";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

const getNewToken = (refreshToken) => {
  if (refreshToken) {
    return request(`${BASE_URL}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });
  }
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await request(url, options); //делаем запрос
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshToken = getCookie("refreshToken");
      const refreshData = await getNewToken(refreshToken); //обновляем токен
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken); //(или в cookies)
      options.headers.authorization = refreshData.accessToken;

      const res = await request(url, options); //вызываем перезапрос данных
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
