// Quran audio cdn files
// http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/262

var cdnAudioUrl = function(ayahNumber) {
    return 'http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ayahNumber;
}


function onAudioClick(){
    var parent = $(this).closest('.control-container');
    var dataNumber = parent.data('number');

    var newAudioEl = document.createElement('audio');
    var newSourceEl = document.createElement('source');

    newSourceEl.src = cdnAudioUrl(dataNumber);
    newAudioEl.controls = true;
    newAudioEl.append(newSourceEl);

    var btnClose = document.createElement('button');
    btnClose.innerHTML = 'Close';
    btnClose.onclick = onCloseAudioPanel;

    parent.empty();

    parent.append(newAudioEl);
    parent.append(btnClose);
}

function onCloseAudioPanel(){
    var parent = $(this).closest('.control-container');

    var btnAudioEl = document.createElement('button');
    btnAudioEl.onclick = onAudioClick;
    btnAudioEl.setAttribute('data-number',parent.data('number'));
    btnAudioEl.innerHTML = 'Play audio';

    parent.html(btnAudioEl);
}

$('.btn-audio').click(onAudioClick);