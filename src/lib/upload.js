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

    // secureUrl ganti dulu jadi secure_url
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(`category added failed: ${error}`);
  }
}

export {
  uploadV1
}