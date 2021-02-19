const baseResponse = (res, code, message = '', data = {}) => {
    const content = {
        code,
        message,
        data,
    };

    res.status(code).json({ content });
};

const baseErrorResponse = (res, code, message, errors = []) => {
    const content = {
        code,
        message,
        errors,
    };
    res.status(code).json({ content });
};

const badRequestResponse = (res, message = 'Invalid request', errors = []) => baseErrorResponse(res, 400, message, errors);

const unauthorizedResponse = (res, message = 'Unauthorized') => baseErrorResponse(res, 401, message);

const notFoundResponse = (res, message = 'Not found') => baseErrorResponse(res, 404, message);

const ohShitResponse = (res, message = 'Oh shit') => baseErrorResponse(res, 500, message);

const successResponse = (res, data = [], message = '') => {
    const content = {
        code: 200,
        message,
        data,
    };

    res.status(200).json({ content });
};

const itemCreatedResponse = (res, data = [], message = '') => baseResponse(res, 201, message, data);

const itemUpdatedResponse = (res, data = [], message = '') => {
    const content = {
        code: 204,
        message,
        data,
    };

    res.status(200).json({
        content,
    });
};

const itemDeletedResponse = (res, message = '', data = []) => {
    const content = {
        code: 204,
        message,
        data,
    };

    res.status(200).json({
        content,
    });
};

module.exports = {
    notFoundResponse,
    successResponse,
    ohShitResponse,
    itemCreatedResponse,
    badRequestResponse,
    itemDeletedResponse,
    itemUpdatedResponse,
    unauthorizedResponse,
};
