export const alertForErrorHttpStatus = (data) => {
  const { statusCode, message } = data;
  if (typeof statusCode === "undefined") {
    return;
  }

  if (isNaN(statusCode)) {
    alert(`status code가 올바르지 않습니다 : ${statusCode}`);
    return;
  }

  const statusCodeStr = String(statusCode);
  if (statusCodeStr.startsWith("4") || statusCodeStr.startsWith("5")) {
    alert(message);
    return;
  }
};
