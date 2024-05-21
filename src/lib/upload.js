import { uploadImageStream } from "./cloudinary";

const uploadV1 = async (file) => {
  if (!file) {
    return null;
  }

  const formUpload = new FormData();
  formUpload.append('file', file);
  formUpload.append('upload_preset', 'rwheysjo');

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/denyah3ls/image/upload', {
      method: 'POST',
      body: formUpload
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.log(`category added failed: ${error}`);
  }
}

const uploadV2 = async (file) => {
  const res = await uploadImageStream(file)
  return res;
}

export {
  uploadV1,
  uploadV2
}