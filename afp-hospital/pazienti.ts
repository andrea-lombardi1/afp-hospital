import * as mysql from "mysql2/promise";
import { createHttpResponseKO, createHttpResponseOK } from "./responseManager";

const dbConf = {
  host: process.env.db_host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
};

export const listaPz = async (event) => {
  let connection;
  let ospedaleId = JSON.parse(event.body || "{}").ospedaleId || null;

  try {
    connection = await mysql.createConnection(dbConf);
    let query = `
                    SELECT
                            p.id AS id_paziente,
                            p.codice,
                            p.codice_colore,
                            p.stato,
                            p.data_inserimento,
                            r.id AS id_reparto,
                            r.nome AS nome_reparto,
                            r.descrizione,
                            a.id AS id_anagrafica,
                            a.nome,
                            a.cognome,
                            a.codice_fiscale,
                            a.data_nascita
                    FROM paziente p
                    JOIN reparto r ON p.id = r.id
                    JOIN anagrafica a ON p.id = a.id
            `;
    if (ospedaleId !== null) {
      query += " WHERE r.ospedale_id = " + ospedaleId;
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

export const accettaPz = async (event) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConf);
    if (!event.body) {
      return createHttpResponseKO(new Error("Missing body"));
    }
    let pzTmp = JSON.parse(event.body);

    const [pzCreation] = await connection.execute(
      `
                INSERT INTO anagrafica (nome, cognome, data_nascita, codice_fiscale)
                VALUES (?, ?, ?, ?)`,
      [
        pzTmp.nome,
        pzTmp.cognome,
        new Date(pzTmp.dataNascita),
        pzTmp.codiceFiscale,
      ]
    );

    let pzNewId = pzCreation.insertId;
    let now = new Date();

    const [newPaziente] = await connection.execute(
      `
                    INSERT INTO paziente (anagrafica_id, reparto_id, codice, codice_colore, stato, ospedale_id, data_inserimento)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [pzNewId, pzTmp.repartoId, pzTmp.codice, pzTmp.codiceColore, pzTmp.stato, pzTmp.ospedaleId, now]
    );

    return createHttpResponseOK({
      messaggio: `Paziente ${pzTmp.nome} ${pzTmp.cognome} accettato`,
      id: pzNewId,
    });
  } catch (error) {
    return createHttpResponseKO(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
export const trasferisciPz = async (event) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConf);
    if (!event.pathParameters) {
      return createHttpResponseKO(new Error("Missing id"));
    }
    let pzId = event.pathParameters.id;
    let repartoId = JSON.parse(event.body || "{}").repartoId || null;
    let ospedaleId = JSON.parse(event.body || "{}").ospedaleId || null;

    const [pzUpdate] = await connection.execute(
      `
        UPDATE paziente p
        SET stato = 'TRASFERITO', reparto_id = ?, ospedale_id = ?
        WHERE p.id = ?`,
      [repartoId, ospedaleId, pzId]
    );

    return createHttpResponseOK({
      messaggio: `Paziente ${pzId} trasferito`,
      affectedRows: pzUpdate.affectedRows,
    });
  } catch (error) {
    return createHttpResponseKO(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
export const dimettiPz = async (event) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConf);
    if (!event.pathParameters) {
      return createHttpResponseKO(new Error("Missing id"));
    }
    let pzId = event.pathParameters.id;

    const [pzUpdate] = await connection.execute(
      `
                UPDATE paziente p
                SET stato = 'DIMESSO', reparto_id = null, ospedale_id = null
                WHERE p.id = ?`,
      [pzId]
    );

    return createHttpResponseOK({
      messaggio: `Paziente ${pzId} dimesso`,
      affectedRows: pzUpdate.affectedRows,
    });
  } catch (error) {
    return createHttpResponseKO(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
