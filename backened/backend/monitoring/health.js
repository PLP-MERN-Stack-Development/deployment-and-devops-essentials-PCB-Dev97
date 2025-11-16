import mongoose from 'mongoose';

export const healthCheck = async (req, res) => {
  const checks = {
    database: mongoose.connection.readyState === 1,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };

  const status = checks.database ? 200 : 503;
  
  res.status(status).json({
    status: checks.database ? 'OK' : 'Service Unavailable',
    ...checks,
    environment: process.env.NODE_ENV
  });
};