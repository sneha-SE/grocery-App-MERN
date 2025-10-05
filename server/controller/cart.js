import { User } from '../model/user.js';

export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { cartItems },
            { new: true }
        );

        if (!updatedUser) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Cart updated", user: updatedUser });
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error", success: false });
    }
};
