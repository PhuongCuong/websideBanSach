const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

var params = {
    Bucket: bucketName,
    Delimiter: '/',
    Prefix: 'Book/'
};


let checkfileexist = async () => {
    const data = await s3.listObjects(params).promise();

    for (let index = 1; index < data['Contents'].length; index++) {
        console.log(data['Contents'][index]['Key'])
    }
}

let uploadfile = async (file) => {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: 'Book/' + file.originalname
    };

    const data = await s3.listObjects(params).promise();

    for (let i = 0; i < data.Contents.length; i++) {
        if (data.Contents[i].Key === uploadParams.Key) {
            const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${uploadParams.Key}`;
            console.log('Tệp tin đã tồn tại');
            return fileUrl;
        }
    }

    const result = await s3.upload(uploadParams).promise();
    const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${uploadParams.Key}`;
    return fileUrl;

}

module.exports = {
    uploadfile: uploadfile,
    checkfileexist: checkfileexist
}