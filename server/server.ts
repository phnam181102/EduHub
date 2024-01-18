import { v2 as cloudinary } from 'cloudinary';

require('dotenv').config();

import { app } from './app';
import connectDB from './utils/db';

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});

// Create server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
    connectDB();
});
