import * as mysql from 'mysql2/promise';

const dbConf = {
    host: 'db-app.cq1rbhexlut1.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '',
    database: 'ospedale'
};

export const listaPz = async (event) => { 
    let connection;

    try {
        connection = await mysql.createConnection(dbConf);
        const [row] = await connection.execute('SELECT * FROM paziente');

        const res : HttpRes = {
            body: row,
            state: 'OK',
            error: null
        };


        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(res)
        };
    } catch (error) {
        const res : HttpRes = {
            body: null,
            state: 'KO',
            error: {
                statusCode: 500,
                message: error.message,
                stackTrace: error.stack
            }
        };
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(res)
        };
    } finally {
        if (connection) {
            await connection.end();
        }
    }
 }

interface HttpRes {
    state: string;
    body: unknown;
    error: HttpError | null;
}

interface HttpError {
    statusCode: number;
    message: string;
    stackTrace: unknown;
}

export const accettaPz = async (event) => { return { statusCode: 200, body: JSON.stringify({ message: 'Hello from accettaPz!' }) } }
export const trasferisciPz = async (event) => { return { statusCode: 200, body: JSON.stringify({ message: 'Hello from trasferisciPz!' }) } }
export const dimettiPz = async (event) => { return { statusCode: 200, body: JSON.stringify({ message: 'Hello from dimettiPz!' }) } }