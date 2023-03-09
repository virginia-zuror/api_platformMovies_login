const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connect = require('./utils/connect.js');
const { configCloudinary } = require('./middlewares/files.middlewares');

dotenv.config();

configCloudinary();

const PORT = process.env.PORT || 8081;

const server = express();

connect();

server.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ limit: '5mb', extended: true }));

const MoviesRoutes = require('./api/routes/movies.routes');
server.use('/api/v1/movies', MoviesRoutes);

const PlatformsRoutes = require('./api/routes/platforms.routes');
server.use('/api/v1/platforms', PlatformsRoutes);

const UsersRoutes = require('./api/routes/users.routes');
server.use('/api/v1/users', UsersRoutes);

server.use('*', (req, res, next) => {
  const error = new Error('Route not found 🙊');
  return next(error);
});

server.disable('x-powered-by');

if (require.main === module) {
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 😎`);
});
}

module.exports = server;