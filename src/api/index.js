export const checkConnection = () =>
  fetch("https://www.google.com", {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/html",
    },
  });
