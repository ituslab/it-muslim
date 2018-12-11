"use strict";

$('#nav-toggler').click(function () {
  $('#navbar-mobile').css('left', '0');
});
$('#navbar-mobile-close').click(function () {
  $('#navbar-mobile').css('left', '-100%');
});
$(window).resize(function (_) {
  if ($(window).width() > 992) {
    $('#navbar-mobile').css('left', '-100%');
  }
});
$(document).ready(function () {
  $('.modal').modal();
});

function initMap() {
  var uluru = {
    lat: -25.344,
    lng: 131.036
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: uluru
  });
}