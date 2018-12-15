

let arrOfAyah = []
let currentDetail = null
let currentIdx = 0
let isAutoplay = false


function getResponse(data){
    currentDetail = {
        nama_surah:data.data.englishName,
        jumlah_ayat:data.data.numberOfAyahs,
        surah_ke:data.data.number
    }

    const {ayahs} = data.data
    const mapResult = ayahs.map(({number,numberInSurah,juz,text,audio})=>{
        if(currentDetail.surah_ke > 1 && numberInSurah === 1) {
            text = text.toString().replace('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ','')
        }
        return {
            number,
            numberInSurah,
            juz,
            text,
            audio
        }
    })

    arrOfAyah = mapResult

    if(currentDetail.surah_ke > 1) {
        arrOfAyah.unshift({
            text:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
        })
    }
    parsedResult()
}

function onResume(ev) {
    $(ev).hide()
    $('#btn-stop').show()
    $('#audio')[0].play()
}


function onStop(ev){
    isAutoplay = false
    $(ev).hide()
    $('#audio')[0].pause()
    
    if( (currentDetail.surah_ke === 1 && currentIdx === 0) || (currentDetail.surah_ke > 1 && currentIdx === 1) ) {
        $('#btn-autoplay').show()
        $('#audio').off('ended')
        $('#audio').off('play')
        $(window).on('keydown',onSlideKey)
    } else {
        $('#btn-autoplay').hide()
        $('#btn-resume').show()
    }
}

function onAutoplay(ev){
    fetchNextAudio()

    $(ev).hide()
    $('#btn-stop').show()
    $(window).off('keydown')
    $('#audio').on('ended',onAudioEnded)
    $('#audio')[0].play()
    isAutoplay = true
}

function onAudioEnded(){
    if(currentIdx === arrOfAyah.length - 1) {
        $('#btn-stop').hide()
        $('#audio').off('ended')
        $('#audio').off('play')
        $(window).on('keydown',onSlideKey)
        isAutoplay = false

        return
    }

    ++currentIdx
    changeAyah(arrOfAyah[currentIdx])
}

function changeAyah(ayah){
    if( (currentDetail.surah_ke > 1 && currentIdx === 1) || (currentDetail.surah_ke === 1 && currentIdx === 0) ) {
        $('#btn-autoplay').show()
    } else {
        $('#btn-autoplay').hide()
    }

    if(currentDetail.surah_ke > 1 && currentIdx === 0) {
        $('#ayah').text(ayah.text).prop('class','font-uthmani')
        $('#ayah').css('font-size','35px')

        $('#ayah-ke').text(`Surah : ${currentDetail.nama_surah}`)
        $('#audio-container').html('')
        return;
    }

    $('#ayah').text(ayah.text).prop('class','font-uthmani')
    $('#ayah').css('font-size','35px')

    $('#ayah-ke').text(`Ayat ke ${ayah.numberInSurah}`)
    $('#audio-container').html(`
        <audio id="audio" controls class="my-audio">
            <source src="${ayah.audio}"></source>
        </audio>
    `)
    if(isAutoplay) {
        $('#audio').on('ended',onAudioEnded)
        $('#audio').prop('autoplay',true)
        $('#audio').on('play',onPlay)
    }
}

function fetchNextAudio(){
    if(currentIdx === arrOfAyah.length - 1) return
    
    let nextAudioUrl = arrOfAyah[currentIdx + 1].audio
    new Audio(nextAudioUrl)
}

function onPlay(ev){
    $('#btn-resume').hide()
    $('#btn-stop').show()
    $(window).off('keydown')
    isAutoplay = true

    fetchNextAudio()
}


function onSlideKey(ev){
    const {keyCode} = ev
    if(keyCode === 37 || keyCode === 39) {
        switch(keyCode) {
            // on left keyboard key
            case 37:
            if(currentIdx === 0) return;

            --currentIdx
            changeAyah(arrOfAyah[currentIdx])

            break;

            // on right keyboard key
            case 39:
            if(currentIdx === arrOfAyah.length - 1) return;

            ++currentIdx
            changeAyah(arrOfAyah[currentIdx])

            break;
        }
    }
}

function onStartSlide(){
    $('#btn-start-slide').hide()
    $('#jml-ayah').hide()
    changeAyah(arrOfAyah[currentIdx])

    $(window).keydown(onSlideKey)
}

function parsedResult() {
    $('#detail-surah').text(currentDetail.nama_surah)
    $("#detail-jml-ayat").text(`${currentDetail.jumlah_ayat} ayat`)

    $('#my-slider').css('display','flex')
    $('.my-progress').hide()
}





$(document).ready(()=>{
    $('.my-progress').show()

    const urlSegments = window.location.pathname.split('/')
    const lastSegment = urlSegments[urlSegments.length - 1]

    $.get(`https://api.alquran.cloud/surah/${lastSegment}/ar.alafasy`,
        (data,statusText,xhr)=>{
           getResponse(data)
        }
    )

})
