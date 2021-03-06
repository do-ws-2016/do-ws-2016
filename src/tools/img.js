import sharp from 'sharp'
import request from 'request'
import B64 from 'b64'
import getStream from 'get-stream'

const img2Buffer = (url) => {
  // resize to ipad size.
  const transformImg = sharp()
    .resize(2048, 2048)
    .jpeg({quality: 80})

  const stream = request
    .get(url)
    .pipe(transformImg)

  return getStream.buffer(stream)
}

const buffer2Img = (buffer, {width, height, greyscale}) => {
  if (!buffer) {
    return null
  }
  let stream = sharp(buffer)
  const encoder = new B64.Encoder()

  if (width && height) {
    stream = stream.resize(width, height)
  }
  if (greyscale) {
    stream = stream.greyscale()
  }
  stream = stream.pipe(encoder)

  return getStream(stream)
    .then(base64Data => `data:image/jpeg;base64,${base64Data}`)
}

export {
  img2Buffer,
  buffer2Img
}
