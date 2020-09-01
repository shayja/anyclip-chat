const imageToBase64 = (imageFile, handleFileRead) => {
  if (imageFile) {
    // console.log(`imageToBase64->imageFile: ${imageFile}`);
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = (file) => {
      handleFileRead(file.target.result);
    };
  }
};

const validateUploadFile = async (e, handleFileRead) => {
  // console.log(e.target.name);
  // let name = e.target.name;
  const value = e.target.files[0];
  let errormessage = null;
  if (value) {
    const validFileExtensions = ['image/jpg', 'image/png', 'image/jpeg'];
    // console.log(`file size: ${value.size}, type: ${value.type}`);

    if (!validFileExtensions.includes(value.type)) {
      const ext = validFileExtensions.join();
      errormessage = `Please upload file type: ${ext.replace(/image/g, '').replace(/,/g, '')}`;
    } else if (value.size > 3145728) {
      // console.log(`current file size is too large: ${value.size}`);
      errormessage = 'File size limit is 3 MB';
    }
  } else {
    errormessage = 'Please upload your avatar image file.';
  }

  if (errormessage) {
    throw new Error(errormessage);
  }

  // console.log('validateUploadFile', value);

  imageToBase64(value, handleFileRead);
};

export default {
  validateUploadFile,
};
