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