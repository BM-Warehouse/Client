import { uploadImageStream } from './cloudinary';

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
    return null;
  }
};

const uploadV2 = async (file) => {
  const res = await uploadImageStream(file);
  return res;
};

const uploadV3 = async (file, onProgressChange) => {
  if (!file) {
    return null;
  }

  const formUpload = new FormData();
  formUpload.append('file', file);
  formUpload.append('upload_preset', 'rwheysjo');

  const uploader = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.cloudinary.com/v1_1/denyah3ls/image/upload', true);

    // Monitor the upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        onProgressChange(percentComplete);
        // setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log('Upload complete!');
        const res = JSON.parse(xhr.responseText);

        console.log(res);
        resolve(res);
      } else {
        reject(new Error('Upload failed'));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Upload failed'));
    };

    xhr.send(formUpload);
  });

  return uploader;
};

export { uploadV1, uploadV2, uploadV3 };
