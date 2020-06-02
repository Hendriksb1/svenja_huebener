import $ from "jquery";
import 'bootstrap';
import './assets/styles/main.scss';

// console.log('app.js loaded');

// $(document).ready(() => {
//   console.log('jquery works!');
// });


//////// recaptcha by google

function ccb(response) {
  $('.btn-submit-form').prop('disabled', false);
}

window.ccb = ccb;

// import './assets/scripts/scrollto.js';
$(document).ready(function () {

  $('.first-button').on('click', function () {
    $('.animated-icon1').toggleClass('open');
  });

  ////////////////// form


  (() => {
    const form = document.querySelector('form');
    const formResponse = document.querySelector('#js-form-response');

    form.onsubmit = e => {
      e.preventDefault();

      // Prepare data to send
      const data = {};
      const formElements = Array.from(form);
      formElements.map(input => (data[input.name] = input.value));

      // Log what our lambda function will receive

      // data.[g-recaptcha-response]

      console.log(data);

        // Construct an HTTP request
        var xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action, true);
        xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // Send the collected data as JSON
        xhr.send(JSON.stringify(data));

        // Callback function
        xhr.onloadend = response => {
          if (response.target.status === 200) {
            // The form submission was successful
            form.reset();
            formResponse.innerHTML = 'Thanks for the message. I’ll be in touch shortly.';
          } else {
            // The form submission failed
            formResponse.innerHTML = 'Something went wrong';
            console.error(JSON.parse(response.target.response).message);
          }
        };


    };


  })();

  //////// end form

});