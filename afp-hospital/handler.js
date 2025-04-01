exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
};
exports.getPazienti = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Get Pazienti",
    }),
  };
}