"use strict";

// Quran audio cdn files
// http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/262
function playAudio(e) {
  var parent = $(e).closest('.surah-detail');
  var ayahNumber = parent.data('ayah');
  var cdnAudio = 'http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/' + ayahNumber;
  parent.html("\n      <audio class=\"audio-player\" controls>\n        <source src=\"".concat(cdnAudio, "\"></source>\n      </audio>\n  "));
}

$(document).ready(function () {
  var pathName = window.location.pathname.split('/');
  var surahNumber = pathName[pathName.length - 1];
  $.ajax({
    method: 'GET',
    url: "https://api.alquran.cloud/surah/".concat(surahNumber, "/id.indonesian"),
    dataType: 'JSON'
  }).done(function (res) {
    var data = res.data;
    var ayahs = data.ayahs;
    ayahs.forEach(function (_ref) {
      var numberInSurah = _ref.numberInSurah,
          text = _ref.text;
      $("#translate-".concat(numberInSurah)).html("<p>".concat(text, "</p"));
    });
  });
});