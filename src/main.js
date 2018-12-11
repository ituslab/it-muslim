// Quran audio cdn files
// http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/262


function playAudio(e){
  let parent = $(e).closest('.surah-detail');
  let ayahNumber = parent.data('ayah');
  let cdnAudio = 'http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ayahNumber;

  parent.html(`
      <audio class="audio-player" controls>
        <source src="${cdnAudio}"></source>
      </audio>
  `);

}
