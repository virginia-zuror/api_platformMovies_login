const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    poster: { type: String, required: true, trim: true },
    platforms: [{type: mongoose.Schema.Types.ObjectId, ref: "Platform"}],
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
