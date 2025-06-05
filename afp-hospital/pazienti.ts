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
  let ospedaleId = event.pathParameters?.ospedaleId || null;
  
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
      ${ospedaleId == null ? ', o.id AS id_ospedale, o.nome AS nome_ospedale' : ''}
      FROM paziente p
      LEFT JOIN reparto r ON p.reparto_id = r.id
      JOIN anagrafica a ON p.anagrafica_id = a.id
      ${ospedaleId == null ? 'LEFT JOIN ospedale o ON p.ospedale_id = o.id' : ''}
    `;
    if (ospedaleId !== null) {
      query += " WHERE p.ospedale_id = " + ospedaleId;
    }
    const [row] = await connection.execute(query);
    // "ROSSO": [], "ARANCIONE": [], "AZZURRO": [], "VERDE": [], "BIANCO": []
    const pazienti = row.reduce((acc, paziente) => {
      const colore = paziente.codice_colore.toUpperCase();
      if (!acc[colore]) {
        acc[colore] = [];
      }
      acc[colore].push(paziente);
      return acc;
    }, {});
    return createHttpResponseOK(pazienti);
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
    console.log(pzTmp);
    

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
    let pzCodice = `${pzTmp.nome.substring(0, 2).toUpperCase()}${pzTmp.cognome.substring(0, 2).toUpperCase()}${pzTmp.dataNascita.substring(2, 4)}`;

    const [newPaziente] = await connection.execute(
      `
                    INSERT INTO paziente (anagrafica_id, reparto_id, codice, codice_colore, stato, ospedale_id, data_inserimento)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [pzNewId, pzTmp.repartoId ?? null, pzCodice, pzTmp.codiceColore, pzTmp.stato, pzTmp.ospedaleId, now]
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
export const modificaPz = async (event) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConf);
    if (!event.pathParameters) {
      return createHttpResponseKO(new Error("Missing id"));
    }
    let pzId = event.pathParameters.id;
    let stato = JSON.parse(event.body || "{}").stato || null;
    let repartoId = JSON.parse(event.body || "{}").repartoId || null;
    let ospedaleId = JSON.parse(event.body || "{}").ospedaleId || null;

    const [pzUpdate] = await connection.execute(
      `
        UPDATE paziente p
        SET stato = ?, reparto_id = ?, ospedale_id = ?
        WHERE p.id = ?`,
      [stato, repartoId, ospedaleId, pzId]
    );

    return createHttpResponseOK({
      messaggio: `Paziente ${pzId} modificato`,
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
