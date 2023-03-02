export const setAccessToken = (access_token) => {
  const bearer = "Bearer ";
  localStorage.setItem("access_token", bearer + access_token);
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};
