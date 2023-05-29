import { getCookie, BASE_URL, setCookie } from "./utils";

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
    const res = await fetch(url, options);
  
    return await checkResponse(res);
  } catch (err) {
   
    if (err.message === "jwt expired") {
      const refreshToken = getCookie("refreshToken");
      
      const refreshData = await getNewToken(refreshToken);

      let authToken;
      if (refreshData.accessToken.indexOf("Bearer") === 0) {
        authToken = refreshData.accessToken.split("Bearer ")[1];
      }
      if (authToken) {
        setCookie("token", authToken, { path: "/" });
      }
      setCookie("refreshToken", refreshData.refreshToken, { path: "/" });

      const res = await fetch(url, {
        ...options,
        headers: {
          authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const updateData = (token) => {
  return request(`${BASE_URL}auth/user`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
