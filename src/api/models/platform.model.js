const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    suscribed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Platform = mongoose.model('Platform', PlatformSchema);

module.exports = Platform;
