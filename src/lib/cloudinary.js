'use server'
import path from 'path';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'denyah3ls',
    api_key: '718294621377917',
    api_secret: 'vpjFbNKorBIPIRSVwLjDnUMXlhQ'
});

export async function uploadImage(imagePath) {
    // const baseName = path.basename(imagePath);
    const publicId = `image_assets/${+new Date()}`;

    const ret = await cloudinary.uploader.upload(imagePath, { publicId });
    console.log(ret);
}

export async function uploadImageStream(file) {
    const name = file.name;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer)
    const publicId = `image_assets_bmwarehouse/${name}_${Date.now()}`;

    const res = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ public_id: publicId }, (error, result) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        }).end(buffer);
    });

    return res;
}

