const express = require('express');
const MoviesRoutes = express.Router();

const { upload } = require('../../middlewares/files.middlewares');
const {isAuth } = require("../../middlewares/auth.middlewares");
const {
  getAllMovies,
  createMovie,
  deleteMovieById,
  updateMovieById
} = require('../controllers/movie.controllers');

MoviesRoutes.get('/', getAllMovies);
MoviesRoutes.post('/', upload.single('poster'), createMovie);
MoviesRoutes.delete('/:id', [isAuth], deleteMovieById)
MoviesRoutes.patch('/:id', [isAuth], upload.single('poster'), updateMovieById)


module.exports = MoviesRoutes;
