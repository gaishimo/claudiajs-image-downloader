import 'babel-polyfill'
import api from './api-builder'
import ImageHandler from './image-handler'

api.setBinaryMediaTypes(['image/jpeg', 'image/jpg', 'image/png'])

const BUCKET_NAME = process.env.S3_BUCKET_NAME
const imageHandler = new ImageHandler(BUCKET_NAME)

api.get('/img', req => imageHandler.getImage(req.queryString.key), {
  success: {
    contentHandling: 'CONVERT_TO_BINARY',
  },
})

api.intercept((request) => {
  console.log(
    'context: ', request.context,
    ' pathParams:', request.pathParams,
    ' params:', request.queryString,
    ' body: ', request.body,
  )
  return request
})

module.exports = api
