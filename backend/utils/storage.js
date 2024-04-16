const { S3Client, GetObjectCommand, PutObjectCommand, PutObject } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const AWS  = require('aws-sdk');
require("dotenv").config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const s3 = new AWS.S3({params: {Bucket: process.env.AWS_BUCKET}});
const storeImage = async function(data, foldername){
	const params = {
		Bucket: process.env.AWS_BUCKET, 
		Key: `${foldername}/${data.name}`,
		Body: data.data,
	};

	return s3.upload(params).promise();
}

module.exports = {storeImage}