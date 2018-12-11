"use strict";

// Quran audio cdn files
// http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/262
function playAudio(numberAyah) {
  var audioCdn = 'http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/' + numberAyah;
  $('#' + numberAyah).html("\n      <audio id=\"{{ayah.number}}\" autoplay class=\"ayah-player\" controls>\n        <source src=\"".concat(audioCdn, "\" type=\"audio/mpeg\">\n      </audio>\n    "));
}