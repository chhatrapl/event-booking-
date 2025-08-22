import jwt from "jsonwebtoken";

export const genrateAccessToken = async(userId)=>{
    return jwt.sign({userId},process.env.ACCESSTOKEN_SECRATE,{expiresIn:"15min"});
}