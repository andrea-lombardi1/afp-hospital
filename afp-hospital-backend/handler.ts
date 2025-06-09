export const endpoints = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "AFP Hospital API",
      endpoints: [
        { method: "GET",    path: "/lista-ospedali" },
        { method: "GET",    path: "/lista-reparti" },
        { method: "GET",    path: "/lista-reparti/{ospedaleId}" },
        { method: "GET",    path: "/lista-pz" },
        { method: "POST",   path: "/lista-pz/{ospedaleId}" },
        { method: "POST",   path: "/accetta-pz", body: { nome: "ANDREA", cognome: "LOMBARDI", dataNascita: "1111-11-11T00:00:00.000Z", codiceFiscale: "LMBNDR04E10G489J", codiceColore: "ROSSO", stato: "IN CARICO", repartoId: "1", ospedaleId: "1" } },
        { method: "PUT",    path: "/trasferisci-pz/{id}", body: { repartoId: "1", ospedaleId: "1" } },
        { method: "DELETE", path: "/dimetti-pz/{id}" }
      ]
    }),
  };
};