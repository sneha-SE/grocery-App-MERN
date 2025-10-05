import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized', success: false });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT);

    if (tokenDecode) {
      req.user = tokenDecode; // attach decoded data to req.user
      next();
    } else {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }

  } catch (error) {
    console.log("authUser error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
