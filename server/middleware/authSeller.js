import jwt from 'jsonwebtoken';

export const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return res.json({ message: "Not authorized", success: false });
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT);
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.json({ success: false, message: 'Not authorized' });
        }
    } catch (error) {
        console.log("error", error);
        res.json({ message: "Internal server error", success: false });
    }
};


