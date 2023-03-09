const Platform = require('../models/platform.model');

const getAllPlatforms = async (req, res, next) => {
  try {
    const allPlatforms = await Platform.find();
    return res.status(200).json(allPlatforms);
  } catch (error) {
    return next(error);
  }
};

const createPlatform = async (req, res, next) => {
  try {
    const platform = new Platform(req.body);
    const createdPlatform = await platform.save();
    return res.status(202).json(createdPlatform);
  } catch (error) {
    return next('Error creating platform 😖', error);
  }
};

const updatePlatformById = async (req, res, next) => {
  try {
    const { platformId } = req.body;
    const {movieId} = req.body;
   
    const updatedPlatform = await Platform.findByIdAndUpdate(platformId, {
      $push: {movies : movieId}
    },
    {new:true});
    
    return res.status(200).json(updatedPlatform); 
  } catch (error) {
    return next('Failling updating platform 🥺', error);
  }
};

const deletePlatform = async(req, res, next)=>{
  try {
    const { id } = req.params;
    await Platform.findByIdAndDelete(id)
    return res.status(200).json('Platform deleted! 👌')
  } catch (error) {
    return next(error)
  }
}

module.exports = { getAllPlatforms, createPlatform, updatePlatformById, deletePlatform };
