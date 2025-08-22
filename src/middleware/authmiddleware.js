import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
try {
     const token = req.cookies?.accessToken ||  req.headers["authorization"]?.replace("Bearer ", "");
     console.log("token : ", token);
     
        if(!token){
            return res.status(401).json({
                 sucess:false, 
                 message:"token does not exist!"
             })
        }
    
        const decodedToken = await jwt.verify(token, process.env.ACCESSTOKEN_SECRATE);
        console.log("decoded token : ", decodedToken);

            
         const user = await User.findById(decodedToken.userId).select("-password -refreshToken");
    
        if(!decodedToken){
            return res.status(401).json({
                 success:false,
                 message:"invalid accessToken!"
             })
        }
    
        req.user = user
        next();
} catch (error) {
     return res.status(500).json({
        success:false,
        message:"somthing went wrong while Auhtorization!",
        error:error.message || error.toString()
    })
}

};