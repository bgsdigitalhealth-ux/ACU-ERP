export const errorHandler = (err, req, res, next) => {
  console.error('[Error Middleware]', err.stack || err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? null : err.stack,
    timestamp: new Date().toISOString(),
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  });
};

