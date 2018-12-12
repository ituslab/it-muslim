$('#nav-toggler').click(()=>{
  $('#navbar-mobile').css('left','0')
})

$('#navbar-mobile-close').click(()=>{
  $('#navbar-mobile').css('left','-100%')
})

$(window).resize(_=>{
  if($(window).width() > 992) {
      $('#navbar-mobile').css('left','-100%')
  }
})

$(document).ready(() => {
$('.modal').modal()
})

function initMap(){
let uluru = {lat: -25.344, lng: 131.036};
let map = new google.maps.Map(document.getElementById('map'), {
  zoom: 8,
  center: uluru
});
}