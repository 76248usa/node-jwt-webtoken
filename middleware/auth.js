/*const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
//console.log(req.headers.authorization)
const authHeader = req.headers.authorization;

if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new CustomAPIError('No token provided', 401)
}
const token = authHeader.split(' ')[1]

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) 
    const {id,username} = decoded;
    req.user = {id, username}
 res.status(200).json({msg: `Hello, ${decoded,username}`, secret: `Here is your 
 authorized data, your lucky number is ${luckyNumber}`})
 } catch (error) {
     throw new CustomAPIError('Not authorized to access route', 401) 
 }
next()
}
authenticationMiddleware();

module.exports = authenticationMiddleware;*/




const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware
