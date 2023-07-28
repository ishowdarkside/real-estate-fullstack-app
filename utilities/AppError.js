class AppError extends Error {
  constructor(statusCode, errMsg) {
    super(errMsg);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = AppError;
