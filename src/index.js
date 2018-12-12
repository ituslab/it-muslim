$(document).ready(function(){
    $('.collapsible').collapsible()
});
        

let currentSurahNumber = null

function onOpenModal(ev,surahNumber) {
    currentSurahNumber = surahNumber
    $('#modal-detail').modal('open')
}


$('.btn-go').click((ev)=>{
    let dataMode = $(ev.currentTarget).closest('li').data('mode')
    let toPath = `/surah/${currentSurahNumber}`

    if(dataMode === 'slide_mode') {
        toPath = `/surah/slide/${currentSurahNumber}`
    }

    window.location.href = toPath
})
