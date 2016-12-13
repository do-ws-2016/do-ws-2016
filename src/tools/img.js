import sharp from 'sharp';
import request from 'request';
import B64 from 'b64';
import getStream from 'get-stream';

const img2Buffer = (url) => {


  const transformImg = sharp()
    .resize(1242, 1242)
    .jpeg({quality: 80})

  const stream = request
    .get(url)
    .pipe(transformImg)

  return getStream.buffer(stream)

}

const buffer2Img = (buffer, {width, height, greyscale}) => {
  if (!buffer) {
    return null;
  }
  const stream = sharp(buffer);
  const encoder = new B64.Encoder();

  if (width) {
    if(height){
      stream.resize(x,y)
    }
  }
  if (greyscale) {
    stream.greyscale()
  }
  stream.pipe(encoder)

  return getStream(stream)
    .then(base64Data => `data:image/jpeg;base64,${base64Data}`)

}

export {
  img2Buffer,
  buffer2Img,
};
