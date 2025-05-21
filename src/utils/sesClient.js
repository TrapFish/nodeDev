const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION, credentials: {
        accessKeyId:"AKIAW2KD2PDYQNBEKJOP",
        secretAccessKey: "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",
    } });
module.exports = { sesClient };