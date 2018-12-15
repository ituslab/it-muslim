$('#nav-toggler').click(()=>{
  $('#navbar-mobile').css('left','0')
})

$('#navbar-mobile-close').click(()=>{
  $('#navbar-mobile').css('left','-100%')
})

$(window).resize(_=>{
  if($(window).width() > 992) {
      $('#navbar-mobile').css('left','-100%')
  }
})

$(document).ready(() => {
  $('.modal').modal()
})
