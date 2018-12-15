let map, markers = []

function initMap(){
  const
    palembang = {
      lat: -2.9760735,
      lng: 104.77543070000002
    },
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('map-autocomplete-input')
    )

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: palembang
  })

  autocomplete.addListener('place_changed', () => {
    let
      place = autocomplete.getPlace(),
      location = place.geometry.location

    map.setCenter({
      lat: location.lat(),
      lng: location.lng()
    })

    deleteMarkers()
    map.setZoom(15)
    searchPlaces(getPlaces, location, 'mosque')
  })
}

function searchPlaces(callback, location, places){
  const service = new google.maps.places.PlacesService(map)

  service.nearbySearch({
    location: new google.maps.LatLng(
      location.lat(),
      location.lng()
    ),
    radius: 1000,
    type: places
  }, callback)
}

function getPlaces(results, status){
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    let mapResult = results.map(res => {
      return {
        placeId: res.place_id,
        address: res.vicinity,
        latlng: new google.maps.LatLng(
          res.geometry.location.lat(),
          res.geometry.location.lng()
        ),
        name: res.name
      }
    })
    addMarkers(mapResult)
  } else {
    console.log(results, status)
  }
}

function addMarkers(locations) {
  locations.map(loc => {
    markers.push(new google.maps.Marker({
      position: loc.latlng,
      map: map,
      title: loc.name
    }))
  })
}

function deleteMarkers(){
  markers.map(marker => {
    marker.setMap(null)
  })
  markers = []
}
