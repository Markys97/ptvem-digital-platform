// src/common/middleware/errorHandler.js
function notFoundHandler(req, res, next) {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
}

function errorHandler(err, req, res, next) {
  console.error("❌ Error handler:", err);

  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal server error",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
