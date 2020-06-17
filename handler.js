const AWS = require('aws-sdk');
const SES = new AWS.SES();
const axios = require('axios')
const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";
// const reCaptchaSecret = "ad reCaptchaSecret here";

function sendEmail(formData, callback) {

  const emailParams = {
    Source: 'info@svenjahuebener.de', // SES SENDING EMAIL
    ReplyToAddresses: [formData.reply_to],
    Destination: {
      ToAddresses: ['info@svenjahuebener.de'], // SES RECEIVING EMAIL
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.reply_to}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'New message from svenjahuebener.de',
      },
    },
  };

  console.log(formData["g-recaptcha-response"]);

  async function wrapperFunc() {
    try {

      let r1 = await axios({
        method: 'post',
        url: reCapUrl,
        params: {
          secret: reCaptchaSecret,
          response: formData["g-recaptcha-response"]
        }
      });;
      // now process r2
      return r1.data; // this will be the resolved value of the returned promise
    } catch (e) {
      console.log(e);
      throw e; // let caller know the promise was rejected with this reason
    }
  }

  wrapperFunc().then(result => {
    // got final result
    console.log(result);

    if (result.success) {
      SES.sendEmail(emailParams, callback); // this sends the mail
    } else {
      console.log("robot");
      callback(null, {
        "responseCode": 1,
        "responseDesc": "Failed captcha verification",
        "googleResponse": result,
        "formData":formData
      });

    }
  }).catch(err => {
    // got error
  });


}



module.exports.staticSiteMailer = (event, context, callback) => {
  const formData = JSON.parse(event.body);

  sendEmail(formData, function (err, data) {

    const response = {
      statusCode: err ? 500 : 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://svenjahuebener.de',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: err ? err.message : data,
      }),
    };
    callback(null, response);

  });

};