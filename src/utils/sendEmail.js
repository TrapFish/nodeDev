const { SendEmailCommand } = require("@aws-sdk/client-ses");
const {sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress) => {
console.log("Sending email to:", toAddress, fromAddress);
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [
        
      ],
      ToAddresses: [
        toAddress,
        
      ],
    },
    Message: {
      
      Body: {
        
        Html: {
          Charset: "UTF-8",
          Data: "<h1>Hello SES</h1>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "Hello from ses Hello world",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Trigger another mail via SES",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};


const run = async () => {
  const sendEmailCommand = createSendEmailCommand(
    "kumargourav280892@gmail.com",
    "gourav3492@gmail.com",
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports = { run };


// // emailService.js
// const { SESv2Client } = require("@aws-sdk/client-sesv2");
// const nodemailer = require("nodemailer");
// // const  { createTransport } = require("nodemailer");
// //const aws = require("@aws-sdk/client-sesv2");

// const sesv2Client  = new SESv2Client({
//   region: "ap-south-1", // change to your SES region
//   credentials: {
//     accessKeyId: "AKIAW2KD2PDY5BIPGXF7",
//     secretAccessKey: "AKIAW2KD2PDY5BIPGXF7",
//   },
// });

// const transporter = nodemailer.createTransport({
//   SES: { ses:  sesv2Client.send.bind(sesv2Client)},
// });

// async function sendEmail({ to, subject, text, html }) {
//     console.log("Sending email to:", to, subject, text, html);
//   await transporter.sendMail({
//     from: "kumargourav280892@gmail.com",
//     to,
//     subject,
//     text,
//     html,
//   });
// }

// const { SendEmailCommand, SESv2Client } = require("@aws-sdk/client-sesv2");

// const sesClient = new SESv2Client({ 
//     region: "us-east-1",
//     credentials: {
//         accessKeyId:"AKIAW2KD2PDY6L6MCT5N",
//         secretAccessKey: "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",
//     }
// });

// async function sendEmail({ to, subject, text, html }) {
//     console.log("Sending email to:", to, subject, text, html);
//     const command = new SendEmailCommand({
//         FromEmailAddress: "kumargourav280892@gmail.com",
//         Destination: {
//             ToAddresses: [to],
//         },
//         Content: {
//             Simple: {
//                 Subject: { Data: subject },
//                 Body: {
//                     Text: { Data: text },
//                 },
//             },
//         },
//     });
//     await sesClient.send(command);
// }

// module.exports = { sendEmail }