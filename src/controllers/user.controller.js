import { User } from "../models/user.model.js";
import { genrateRefreshToken } from "../utils/genrateRefreshToken.js";
import { genrateAccessToken } from "../utils/genrateAccessToken.js";
import bcrypt from "bcrypt";



export const signup = async (req, res) => {

    let { name, email, password } = req.body;

    if ([name, email, password].some(field => typeof field !== "string" || field.trim() === "")) {
        console.log("All fields must be valid strings");
        return res.status(400).json({ success: false, message: "All fields must be non-empty strings" });
    }

    const existedUser = await User.findOne({ email });
    console.log(existedUser);
    

    if (existedUser) {
        return res.status(409).json({
            message: "user already existed with this email"
        })
         };

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);

            const user = await User.create({
                name,
                email,
                password: hashedPassword
            })

            const accessToken = genrateAccessToken(user._id);
            const refreshToken = genrateRefreshToken(user._id);
            console.log("accesstoken : ", accessToken, "refreshToken : ", refreshToken);
            const option1 = {
                httpOnly:true,
                sameSite:"strict",
                secure: process.env.NODE_ENV === "production",
                maxAge:15*60*1000
            }
            const option2= {
                httpOnly:true,
                sameSite:"strict",
                secure: process.env.NODE_ENV === "production",
                maxAge:7*24*60*60*1000
            }

            return res.status(201).cookie("accesstoken", accessToken,option1)
                .cookie("refreshToken", refreshToken,option2)
                .json({
                    success: true,
                    message: "User created successfully.",
                    user:user
                })

        } catch (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: "somthing went wrong user does not created!",
                    error: error.message || error.toString() || "Unknown error"
                }
            )
        }


   




}

export const login = async (req, res) =>{
    try {
        const {email, password} = req.body;
    
          if ([email, password].some(field => typeof field !== "string" || field.trim() === "")) {
            console.log("All fields must be valid strings");
            return res.status(400).json({ success: false, message: "All fields must be non-empty strings" });
        }
    
       const user = await User.findOne({ email });
        console.log(user);
        
    
        if (!user) {
            return res.status(404).json({
                message: "user does not  existed with this email"
            })
             };
    
         const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
         if(!isPasswordCorrect){
                    console.log("password is incorrect!");
                     return res.status(400).json({ success: false, message: "password is incorrect!" });
         };
    
         const loggedInUser = await User.findOne({_id:user._id}).select("-password -refreshToken");
    
         try {
             const accessToken = await genrateAccessToken(user._id);
                const refreshToken = await genrateRefreshToken(user._id);
                 
                console.log("accessToken : ", accessToken, "refreshToken : ", refreshToken);
                const option1 = {
                    httpOnly:true,
                    sameSite:"strict",
                    secure: process.env.NODE_ENV === "production",
                    maxAge:15*60*1000
                }
                const option2= {
                    httpOnly:true,
                    sameSite:"strict",
                    secure: process.env.NODE_ENV === "production",
                    maxAge:7*24*60*60*1000
                }
    
                return res.status(201).cookie("accessToken", accessToken,option1)
                    .cookie("refreshToken", refreshToken,option2)
                    .json({
                        success: true,
                        message: "User loggedin successfully.",
                        user:user
                    })
            
         } catch (error) {
             return res.status(500).json(
                    {
                        success: false,
                        message: "somthing went wrong while genrating token!",
                        error: error.message || error.toString() || "Unknown error"
                    }
                )
         }
    
    
    } catch (error) {
          return res.status(500).json(
                    {
                        success: false,
                        message: "somthing went wrong!",
                        error: error.message || error.toString() || "Unknown error"
                    }
                )
    }


  
}

export const logout = async (req, res)=>{
    const userId = req.user._id;
    console.log("userId ; ",userId);
 try {
  const user =  await User.findByIdAndUpdate(userId,{$set:{refreshToken:undefined}},{new:true})
   const options = {
     httpOnly:true,
     secure:true
   }
   return res.status(200).clearCookie("accessToken", options)
                         .clearCookie("refreshToken", options)
                         .json({success:true, message:"user logedOut successfully."})
 
 } catch (error) {
  
  return res.status(500).json({
                               success:false,
                                 message:"somting went wrong while logging Out.",
                                 error: error.message || error.toString() || "Unknown error"
                                })

 }

};

export const deleteUser = async (req, res) => {
    const userId = req.user.id;
    console.log(userId)
    try {
          if (!userId) {
            return res.status(404).json({
                message: "unauthorized request"
            })
             };
  
             const deletedUser = await User.findByIdAndDelete(userId);
             if(!deleteUser){
                return res.status(404).json({
                message: "user not deleted"
            })
             }

             return res.status(202).json({
                success:true,
                message:"user deleted successfully"
             });


    } catch (error) {
         return res.status(500).json(
                    {
                        success: false,
                        message: "somthing went wrong!",
                        error: error.message || error.toString() || "Unknown error"
                    }
                )
    }
}