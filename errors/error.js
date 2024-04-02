
export function errorHandler (err, req, res, next) {
    console.log(err.stack)
    res.status(err.status).json(err.message)
}