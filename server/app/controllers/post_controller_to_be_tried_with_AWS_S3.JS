const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
const { StatusCodes } = require("http-status-codes");
const { query } = require("../../config/db");
require('dotenv').config();

const s3Client = new S3Client({ 
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Example function to list S3 buckets
const listBuckets = async (req, res) => {
    try {
        const data = await s3Client.send(new ListBucketsCommand({}));
        res.status(StatusCodes.OK).json(data.Buckets);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

module.exports = {
    listBuckets
};
