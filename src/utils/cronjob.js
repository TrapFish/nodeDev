const cron = require('node-cron');


cron.schedule('1 * * * * *', () => {
  console.log('Hello World :::'+ new Date());
});