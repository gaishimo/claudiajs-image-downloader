import { S3 } from 'aws-sdk'
import api from './api-builder'

export default class ImageHandler {
  constructor(bucketName) {
    console.log('bucketName:', bucketName)
    this.s3 = new S3({ apiVersion: '2006-03-01' })
    this.bucketName = bucketName
  }
  async getImage(key) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    }
    const data = await this.s3.getObject(params).promise()
    const response = new api.ApiResponse(data.Body, {
      'Content-Type': data.ContentType,
    }, 200)
    return response
  }
}

