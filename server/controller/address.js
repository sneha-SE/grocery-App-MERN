import  Address  from '../model/address.js';

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.userId;

        await Address.create({ address, userId });
        res.json({ message: 'Address added successfully', success: true });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Internal server error', success: false });
    }
};

export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const address = await Address.find({ userId });
        res.json({ success: true, message: "Address fetched successfully", address });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Internal server error', success: false });
    }
};
