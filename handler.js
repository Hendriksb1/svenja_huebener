const AWS = require('aws-sdk');
const SES = new AWS.SES();
const axios = require('axios')
const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";
const reCaptchaSecret = "6LfJzvwUAAAAAHC7x2x9gGkEKOxzT1xsRwDz8Sh0" ; 

function sendEmail(formData, callback) {
  // Build the SES parameters

  console.table(formData)
  console.table(formData.recaptcha)
  
  const emailParams = {
    Source: 'hendrik.schulze.boeing@gmail.com', // SES SENDING EMAIL
    ReplyToAddresses: [formData.reply_to],
    Destination: {
      ToAddresses: ['hendrik.schulze.boeing@gmail.com'], // SES RECEIVING EMAIL
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

  // SES.sendEmail(emailParams, callback);

  // Send the email
}

module.exports.staticSiteMailer = (event, context, callback) => {
  const formData = JSON.parse(event.body);
  // console.log(formData["g-recaptcha-response"]);
  


  axios.post(reCapUrl, {
    secret: reCaptchaSecret,
    response: formData["g-recaptcha-response"]
  })
  .then((res) => {
    // console.log(`statusCode: ${res.status}`)
    // console.log(`success: ${res.success}`)
    console.log(res.data.success);

    if (res.data.success) {

      sendEmail(formData, function(err, data) {
        const response = {
          statusCode: err ? 500 : 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://svenjahuebener.de/contact.html',
          },
          body: JSON.stringify({
            message: err ? err.message : data,
          }),
        };
    
        callback(null, response);
      });
    } else {
      console.log('It was a robot');
    }
  })
  .catch((error) => {
    console.error(error)
  })



};


