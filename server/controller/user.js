import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already registered", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "User successfully registered",
      success: true,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.log("Error Message from register :-", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "all fields required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "invalid email or password", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "invalid password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "User successfully login",
      success: true,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "internal server error", success: false });
  }
};

export const isAuth = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found", success: false });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.log("isAuth error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};



export const logOut = async (req, res ) => {
    try{
        res.clearCookie('token', {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
        })

        return res.json({success:true, message: 'logged out'})
    }
    catch(error){
        console.log(error);
        res.json({message:'internal server error', success:false})
    }
}