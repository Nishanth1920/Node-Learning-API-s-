require('dotenv').config();
const app = require('./src/app');
const db = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Test database connection
db.raw('SELECT 1')
  .then(() => {
    console.log('✓ Database connected successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV}`);
      console.log(`✓ API: http://localhost:${PORT}/api/users`);
    });
  })
  .catch((err) => {
    console.error('✗ Database connection failed:', err.message);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  db.destroy();
  process.exit(0);
});