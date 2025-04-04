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

export const createHttpResponseOK = (row) => {
    const res: HttpRes = {
        body: row,
        state: 'OK',
        error: null
    };

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(res)
    };
};

export const createHttpResponseKO = (error) => {
    const res: HttpRes = {
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
};
