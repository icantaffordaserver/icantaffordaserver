$('.accordion-control').each(function(){
  //when an accordion button is clicked...
  $(this).on('click', function(e){
    e.preventDefault(); //prevent default action of button
    //get the element the user clicked on. Select the following panel...if not currently animating use slide toggle to show or hide
    $(this).next('.accordion-panel').not(':animated').slideToggle(200);
    $(this).toggleClass('open');
  });
});

$('.hamburger').on('click', function() {
  $('.ham1, .ham2, .ham3').toggleClass('open');
  $('.sidebar, .faq').toggleClass('open');
});