export const endpoints = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "AFP Hospital API",
      endpoints: [
        { method: "GET",    path: "/lista-ospedali" },
        { method: "GET",    path: "/lista-reparti/{id}" },
        { method: "POST",   path: "/lista-pz" },
        { method: "POST",   path: "/accetta-pz" },
        { method: "PUT",    path: "/trasferisci-pz/{id}" },
        { method: "DELETE", path: "/dimetti-pz/{id}" }
      ]
    }),
  };
};