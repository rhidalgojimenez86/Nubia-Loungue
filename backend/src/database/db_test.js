const pool = require('./getPool');

pool.query('SELECT 1')
  .then(([rows]) => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
    console.error('Error message:', err.message);
    console.error('SQL state:', err.sqlState); 
    process.exit(1); // Detener la aplicación si no se puede conectar
  });