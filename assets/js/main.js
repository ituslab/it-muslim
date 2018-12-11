// Quran audio cdn files
// http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/262


function playAudio(e){
  var parent = $(e).closest('.surah-detail');
  var ayahNumber = parent.data('ayah');
  var cdnAudio = 'http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ayahNumber;

  parent.html(`
      <audio class="audio-player" controls>
        <source src="${cdnAudio}"></source>
      </audio>
  `);  
  
}

