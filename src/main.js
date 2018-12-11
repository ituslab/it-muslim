$(document).ready(() => {
  $('.modal').modal()
})

const initMap = () => {
  let uluru = {lat: -25.344, lng: 131.036};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: uluru
  });
}
