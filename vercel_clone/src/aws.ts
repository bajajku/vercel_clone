import { S3 } from 'aws-sdk';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


export const uploadFile = async(fileName: string, localFilePath: string) => {

    // this will synchronously read the entire file into memory
    const fileContent = fs.readFileSync(localFilePath);

    if (!process.env.AWS_BUCKET_NAME) {
        throw new Error('AWS_BUCKET_NAME is not defined in the environment variables');
    }

    const response = await s3.upload({
        Body: fileContent,
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
    }).promise();

    console.log(response);

}