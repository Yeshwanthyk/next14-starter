const poster = async (method, url, body) => {
  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });

  const returnedRes = await res.json();

  return returnedRes;
};

export default poster;
