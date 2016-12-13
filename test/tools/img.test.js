import { img2Buffer, buffer2Img } from '../../src/tools/img';

describe('img lib', () => {
  pit('logs the url', () => {
    const URL = 'https://images.unsplash.com/photo-1431440869543-efaf3388c585?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=a9ed512366462aff761f7c04ac383675';
    const timeStart = Date.now();
    return img2Buffer(URL).then((result) => {
      const timerStart = new Date(Date.now() - timeStart);
      console.log(`It took ${timerStart.getSeconds()}.${timerStart.getMilliseconds()}s to load the img into buffer.`);
      const timer = Date.now();
      buffer2Img(result).then(value => {
        const time = new Date(Date.now() - timer);
        console.log(`It took ${time.getSeconds()}.${time.getMilliseconds()}s to load the img from buffer.`);
      })
    })
  });

});
