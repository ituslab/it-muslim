// Quran audio cdn files
// http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/262


var audioCdn = function(numberAyah) {
  return 'http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+numberAyah;
}

var currentParent = null;

function closeAudio(ev){
  var parent = $(ev).closest('.surah-detail');
  parent.html(`
      <a class="waves-effect waves-teal btn-flat btn-audio" onclick="playAudio(this)">Play Audio</a>
  `);
}

function playAudio(e){
  if(currentParent &&
      currentParent.data('ayah') !== $(e).closest('.surah-detail').data('ayah')
    ) {
    console.log('on if...');

    $(currentParent).html(`
        <a class="waves-effect waves-teal btn-flat btn-audio" onclick="playAudio(this)">Play Audio</a>  
    `);
  }

  var parent = $(e).closest('.surah-detail');
  currentParent = parent;
  var ayahNumber = parent.data('ayah');
  

  parent.html(`
      <div class="audio-container">
        <audio class="audio-player" controls>
          <source src="${audioCdn(ayahNumber)}"></source>
        </audio>
        <a class="waves-effect waves-teal btn-flat btn-close" onclick="closeAudio(this)">Close</a>
      </div>
  `);  
  
}

