const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
console.log("SES Client Region: ", process.env.REGION, process.env.SES_AWS_ACCESS_KEY, process.env.SES_AWS_SECRET_KEY);
const REGION = process.env.REGION || 'ap-south-1';
// Create SES service object.
const sesClient = new SESClient({ region: REGION, credentials: {
        accessKeyId:process.env.SES_AWS_ACCESS_KEY || "AKIAW2KD2PDYQNBEKJOP",
        secretAccessKey:process.env.SES_AWS_SECRET_KEY || "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",
    } });
module.exports = { sesClient };