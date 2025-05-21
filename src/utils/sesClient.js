const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = process.env.REGION ;
// Create SES service object.
const sesClient = new SESClient({ region: REGION, credentials: {
        accessKeyId:process.env.SES_AWS_ACCESS_KEY ,
        secretAccessKey:process.env.SES_AWS_SECRET_KEY ,
    } });
module.exports = { sesClient };