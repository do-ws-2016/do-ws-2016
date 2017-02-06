import { img2Buffer, buffer2Img } from '../../src/tools/img'
describe('img lib', () => {
  pit('logs the url', () => {
    const URL = 'http://engineeringtutorial.com/wp-content/uploads/2016/07/Transformer-Open-and-Short-Circuit-Tests.png'
    const timeStart = Date.now()
    return img2Buffer(URL).then((result) => {
      const timerStart = new Date(Date.now() - timeStart)
      console.log(`It took ${timerStart.getSeconds()}.${timerStart.getMilliseconds()}s to load the img into buffer.`)
      const timer = Date.now()
      return buffer2Img(result, {}).then(value => {
        const time = new Date(Date.now() - timer)
        console.log(`It took ${time.getSeconds()}.${time.getMilliseconds()}s to load the img from buffer.`)
      })
    })
  })
})
