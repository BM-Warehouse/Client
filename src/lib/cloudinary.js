'use server'
import path from 'path';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'denyah3ls',
  api_key: '718294621377917',
  api_secret: 'vpjFbNKorBIPIRSVwLjDnUMXlhQ'
});

async function uploadImage(imagePath) {
  // const baseName = path.basename(imagePath);
  const publicId = `image_assets/${+new Date()}`;

  const ret = await cloudinary.uploader.upload(imagePath, { publicId });
  console.log(ret);
}

export default uploadImage;
