const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');




const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      validate: [validator.isEmail, 'Email not valid'],
    },
    username:{type: String, required: true, minLength: [4, 'Min 4 letters']},
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [5, 'Min 5 characters'],
    },
    permissions:{type:String,enum:['admin', 'user'], default: 'user'},
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    next('Error hashing password', error);
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
