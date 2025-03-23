const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({
      success: false,
      error: errors.join(", "),
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: "Duplicate value entered",
    });
  }

  // Mongoose ObjectId cast error
  if (err.name === "CastError") {
    return res.status(404).json({
      success: false,
      error: `Resource not found with id: ${err.value}`,
    });
  }

  // JSON parsing error
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "Invalid JSON",
    });
  }

  // Default to 500 server error
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};

module.exports = errorHandler;
