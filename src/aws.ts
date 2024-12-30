import { S3 } from 'aws-sdk';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_ENDPOINT,
});


export const uploadFile = (fileName: string, localFilePath: string) => {

}