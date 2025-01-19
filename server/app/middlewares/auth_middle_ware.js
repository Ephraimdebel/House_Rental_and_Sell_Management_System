const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")


async function authMiddleware(req,res,next){  
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
       return res.status(StatusCodes.UNAUTHORIZED).json({msg:" 1 unauthorized"})
}
const token = authHeader.split(" ")[1]

try{
    const {username,userid,role} = jwt.verify(token,process.env.JWT_SECRET)
    // return res.status(StatusCodes.OK).json(data)
    req.user = {username,userid,role}
    next()
}catch(err){
    console.log(err)
    return res.status(StatusCodes.UNAUTHORIZED).json({msg:"2 unauthorized"})

}

}
module.exports = authMiddleware