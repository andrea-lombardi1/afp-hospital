import * as mysql from "mysql2/promise";
import { createHttpResponseKO, createHttpResponseOK } from "./responseManager";

const dbConf = {
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
  port: process.env.db_port,
};

export const listaOspedali = async (event) => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConf);
    const [row] = await connection.execute(`
            SELECT
                id,
                nome
                FROM ospedale`);
    return createHttpResponseOK(row);
  } catch (error) {
    return createHttpResponseKO(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

export const listaReparti = async (event) => {
  let connection;
  let ospedaleId = event.queryStringParameters.ospedaleId;

  try {
    connection = await mysql.createConnection(dbConf);
    const [row] = await connection.execute(`
            SELECT
                id,
                nome,
                descrizione
                FROM reparto
                WHERE ospedale_id = ?`, [ospedaleId]);
    return createHttpResponseOK(row);
  } catch (error) {
    return createHttpResponseKO(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};