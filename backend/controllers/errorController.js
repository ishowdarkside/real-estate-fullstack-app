const errorController = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode || 500).json({
      status: "fail",
      message: err.message,
      err,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0]?.message;
      return res.status(400).json({
        status: "fail",
        message: firstError,
      });
    }
    if (err.code === 11000) {
      const message = `${Object.keys(err.keyValue)[0]} se već koristi.`;
      return res.status(400).json({
        status: "fail",
        message,
      });
    }
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: "fail",
        message: err.message,
      });
    }
  } else
    return res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
};

module.exports = errorController;
