class AppError extends Error {
  constructor(statusCode, errMsg) {
    super(errMsg);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
