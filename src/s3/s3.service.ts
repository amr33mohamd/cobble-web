import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ManagedUpload } from 'aws-sdk/clients/s3';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

async uploadFile(file: Express.Multer.File, folderName: string): Promise<string> {
    const bucketName: string = process.env.AWS_S3_BUCKET_NAME || '';

    const params: AWS.S3.Types.PutObjectRequest = {
        Bucket: bucketName,
        Key: `${folderName}/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
    };

    const uploadResult: ManagedUpload.SendData = await this.s3.upload(params).promise();

    return uploadResult.Location;
}
}