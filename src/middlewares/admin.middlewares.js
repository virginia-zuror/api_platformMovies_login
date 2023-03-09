/* const User = require('../api/models/user.model');
const { verifyToken } = require('../utils/token');

const { generateToken } = require('..//utils/token');


const isAdmin = async (req, res, next) => {
    
    const tokenAdmin = req.body.permissions === 'admin' && generateToken(user._id, user.email);
    const token = req.headers.authorization?.replace('Bearer ', '');


      if(!tokenAdmin){
        return res.status(403).json({ error: 'you must be an admin'} );
      }else if(token ){
         try {
          const decoded = verifyToken(token, process.env.JWT_SECRET);
          req.user = await User.findById(decoded.id);
          next();
      } catch (error) {
        return next(error);
      }
      }else{
        return res.status(403).json(error)
      }    
  };
  


  module.exports = isAdmin; */