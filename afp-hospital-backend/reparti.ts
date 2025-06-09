import * as mysql from "mysql2/promise";
import { createHttpResponseKO, createHttpResponseOK } from "./responseManager";

const dbConf = {
  host: process.env.db_host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
};

export const listaReparti = async (event) => {
  let connection;
  let ospedaleId = event.pathParameters?.ospedaleId || null;

  try {
    connection = await mysql.createConnection(dbConf);
    let query = `
      SELECT
      id,
      nome,
      descrizione
      FROM reparto
    `;
    if (ospedaleId !== null) {
      query += ' WHERE ospedale_id = ' + ospedaleId;
    }
    const [row] = await connection.execute(query);
    return createHttpResponseOK(row);
  } catch (error) {
    return createHttpResponseKO(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};