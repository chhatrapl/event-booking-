import jwt from "jsonwebtoken";

export const genrateRefreshToken = async(userId)=>{
    return jwt.sign({userId},process.env.REFRESHTOKEN_SECRATE,{expiresIn:"7d"});
};