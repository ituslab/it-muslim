// Quran audio cdn files
// http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/262



function playAudio(numberAyah) {
  var
    audioCdn = 'http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+numberAyah;

  $('#'+numberAyah).html(`
    <audio id="{{ayah.number}}" autoplay class="ayah-player" controls>
      <source src="${audioCdn}" type="audio/mpeg">
    </audio>
  `)
}
