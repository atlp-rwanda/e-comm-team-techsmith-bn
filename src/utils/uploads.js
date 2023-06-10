import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENVIROMENT VARIABLES
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploads = async (file, folder) => {
  try {
    const options = {
      folder,
      resource_type: 'auto',
      unique_filename: true,
      use_filename: true,
    };
    const response = await cloudinary.uploader.upload(file, options);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export default uploads;
