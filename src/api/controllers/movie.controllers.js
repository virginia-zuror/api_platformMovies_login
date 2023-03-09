const Movie = require('../models/movie.model');
const {deleteImgCloudinary} = require('../../middlewares/files.middlewares')


const getAllMovies = async (req, res, next) => {
  try {
    const allMovies = await Movie.find().populate('platforms');
    return res.status(200).json(allMovies);
  } catch (error) {
    return next("Could't find movies 😿", error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = new Movie({
      ...req.body,
      poster: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/do7bnejaz/image/upload/v1678354188/not-available_v1xvn3.jpg',
    });
    const createdMovie = await movie.save();
    return res.status(201).json(createdMovie);
  } catch (error) {
    return next('Error creating movie 😖', error);
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json('Movie deleted 👌');
  } catch (error) {
    return next(error);
  }
};

const updateMovieById = async (req, res, next) => {
  try {
    
    const {id} = req.params;
    const newMovie = new Movie(req.body);
    newMovie._id = id;
    const originalMovie = await Movie.findById(id);
    newMovie.platforms = [
      ...newMovie.platforms,
      ...originalMovie.platforms,
    ]//puedo añadir plataformas sin perder las que ya tiene pero no las puedo borrar...
    if (req.file) {
      deleteImgCloudinary(originalMovie.poster);
      newMovie.poster = req.file.path;
    }
    await Movie.findByIdAndUpdate(id, newMovie);
    
    return res.status(200).json(newMovie); 
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllMovies, createMovie, deleteMovieById, updateMovieById };
