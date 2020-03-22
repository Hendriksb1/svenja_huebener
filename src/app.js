import $ from "jquery";
import 'bootstrap';
import './assets/styles/main.scss';

console.log('app.js loaded');

$(document).ready(() => {
  console.log('jquery works!');
});

// import './assets/scripts/scrollto.js';
$(document).ready(function () {

  $('.first-button').on('click', function () {

    $('.animated-icon1').toggleClass('open');
  });
  
});