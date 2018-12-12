

let arrOfAyah = []
let currentDetail = null
let currentIdx = 0


function getResponse(data){
    currentDetail = {
        nama_surah:data.data.englishName,
        jumlah_ayat:data.data.numberOfAyahs
    }

    const {ayahs} = data.data
    const mapResult = ayahs.map(({number,numberInSurah,juz,text,audio})=>(
        {
            number,
            numberInSurah,
            juz,
            text,
            audio   
        }
    ))
    arrOfAyah = mapResult
    parsedResult()
}

function onAutoplay(ev){
    
}

function changeAyah(ayah){

    currentIdx === 0 ? $('#btn-autoplay').show() : $('#btn-autoplay').hide()

    $('#ayah').text(ayah.text).prop('class','font-uthmani')
    $('#ayah').css('font-size','35px');

    $('#ayah-ke').text(`Ayat ke ${ayah.numberInSurah}`)
    $('#audio-container').html(`
        <audio controls class="my-audio">
            <source src="${ayah.audio}"></source>
        </audio>
    `)
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