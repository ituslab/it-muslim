// Quran audio cdn files
// http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/262


function playAudio(e){
  let parent = $(e).closest('.surah-detail');
  let ayahNumber = parent.data('ayah');
  let cdnAudio = 'http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ayahNumber;

  parent.html(`
      <audio class="audio-player" controls autoplay>
        <source src="${cdnAudio}"></source>
      </audio>
  `)
}

$(document).ready(() => {
  let pathName = window.location.pathname.split('/')
  let surahNumber = pathName[pathName.length-1]
  $.ajax({
    method: 'GET',
    url: `https://api.alquran.cloud/surah/${surahNumber}/id.indonesian`,
    dataType: 'JSON'
  }).done(res => {
    const {data} = res
    const {ayahs} = data
    ayahs.forEach(({numberInSurah, text}) => {
      $(`#translate-${numberInSurah}`).html(`<p>${text}</p`)
    })
  })
})
