import { v2 as cloudinary } from 'cloudinary';

const connectCloud = async(req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_NAME,
        api_secret: process.env.CLOUD_API_SECRET
    })
}

export default connectCloud;