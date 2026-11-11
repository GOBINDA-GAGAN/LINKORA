
 // 404 for routes that do not exist
export function notFound(req, res) {
  return res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

// Central error handler
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(
      (e) => e.message
    );

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  // Invalid JSON request body
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "Invalid JSON body",
    });
  }

  console.error(err);

  return res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
}
