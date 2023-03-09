const express = require('express');
const PlatformsRoutes = express.Router();

const { isAuth} = require('../../middlewares/auth.middlewares');
const {
  getAllPlatforms,
  updatePlatformById,
  deletePlatform,
  createPlatform,
} = require('../controllers/platform.controllers');

PlatformsRoutes.get('/', getAllPlatforms);
PlatformsRoutes.post('/', createPlatform);
PlatformsRoutes.put('/:id', [isAuth], updatePlatformById);
PlatformsRoutes.delete('/:id', [isAuth], deletePlatform);

module.exports = PlatformsRoutes;
