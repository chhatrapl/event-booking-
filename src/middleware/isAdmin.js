import { User } from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
          return res.status(403).json({ message: "unauthorized request!" })
        }

        if (user.role !== "admin"){
              return res.status(403).json({ message: "only admin can create event!" })
        }

        next();

} catch (error) {
    return res.status(500).json({
        success:false,
        message:"somthing went wrong",
        error: error.message || error.toString()
    })
    }
};