import Jimp from 'jimp';

const img2Buffer = (url) => {
  return Jimp.read(url)
  .then((image) => {
    //resize
    const size = 1242;
    return image.cover(size, size);
  })
  .then((image) => {
    //change quallity
    return image.quality(50);
  })
  .then((image) => {
    return new Promise((resolve, reject) => {
      image.getBuffer( Jimp.MIME_JPEG, (err, data) => {
        if (err) {
          reject(err);
        }else {
          resolve(data);
        }
      });
    });;
  })
}

const buffer2Img = (imgBuffer) => {
  if (!imgBuffer) {
    return null;
  }
  return Jimp.read(imgBuffer)
  // .then((image) => {
  //   //greyscale
  //   return image.greyscale();
  // })
  .then((image) => {
    return new Promise((resolve, reject) => {
      image.getBase64( Jimp.MIME_JPEG, (err, data) => {
        if (err) {
          reject(err);
        }else {
          resolve(data);
        }
      });
    });;
  })
}

export {
  img2Buffer,
  buffer2Img,
};
