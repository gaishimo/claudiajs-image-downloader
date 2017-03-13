import 'babel-polyfill'
import assert from 'power-assert'
import td from 'testdouble'

import ImageHandler from '../src/image-handler'

describe('image', () => {
  it('works', async () => {
    const imageHandler = new ImageHandler('dummy-bucket')
    td.replace(imageHandler.s3, 'getObject')
    td.when(imageHandler.s3.getObject(td.matchers.anything()))
      .thenReturn({
        promise: () => (
          Promise.resolve({
            Body: new Buffer('xxxxxxx'),
            ContentType: 'image/jpg',
          })
        ),
      })
    const apiResponse = await imageHandler.getImage('image.jpg')
    assert(Buffer.isBuffer(apiResponse.response))
    assert(apiResponse.headers['Content-Type'])
  })
})
