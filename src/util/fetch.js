export const fetchJsonData = async (url, method, headers, data) => {
  const body = JSON.stringify(data);
  const HOST = "https://pre-onboarding-selection-task.shop";

  try {
  const res = await fetch(HOST + url, {
    method,
    headers,
    body,
  });
  return method.toUpperCase() === "DELETE"
    ? { status: res.status }
    : await res.json();
  } catch (e) {
    console.log(e)
  }
};


