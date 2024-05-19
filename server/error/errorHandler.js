export const errorHandler = (err, req, res, next) => {
    console.log('Error Middleware:..', err);
    res.status(403).json({
        error: String(err),
    });
    };