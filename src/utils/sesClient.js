const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
console.log("SES Client Region: ", process.env.REGION, process.env.SES_AWS_ACCESS_KEY, process.env.SES_AWS_SECRET_KEY);
const REGION = process.env.REGION ;
// Create SES service object.
const sesClient = new SESClient({ region: REGION, credentials: {
        accessKeyId:process.env.SES_AWS_ACCESS_KEY ,
        secretAccessKey:process.env.SES_AWS_SECRET_KEY ,
    } });
module.exports = { sesClient };