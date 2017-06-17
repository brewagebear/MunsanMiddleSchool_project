'use strict'
  function initSlider(){
    $('.single-items').slick({
      arrows : false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      autoplay: true,
      autoplaySpeed: 2000,
      variableWidth: false
    });
  }

  function initMainGrid(){
    $('.grid').masonry({
      itemSelector: '.grid-main-item',
      columnWidth: '.grid-main-sizer',
      gutter: 15,
      percentPosition: true,
    });
  }

  function initGrid(){
    $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      gutter: 5,
      percentPosition: true,
    });
  }

var defaultModal = $('.open');
var cultureModal = $('.open_culture');

defaultModal.click(function(e){
    var titleId = $(this).attr('id');
    var titleContent = $(this).find('.title').text();

    var modalViewSelect = titleId;
    var tmpl_dir = '../assets/static/modalview';
    var tmpl_url = tmpl_dir + '/' + modalViewSelect + '.html';

    $.ajax({
        url: tmpl_url,
        method: 'GET',
        async: false,
        dataType : 'html',
        success: function (data) {
              $("#title").html(titleContent);
              $("#content").html(data);
              $("#defaultModal").modal('show');
          }
    });
  });

cultureModal.click(function(e){
  var titleId = $(this).attr('id');
  var titleContent = $(this).find('.title').text();

  var modalViewSelect = titleId;
  var tmpl_dir = '../assets/static/modalview';
  var tmpl_url = tmpl_dir + '/culture/' + modalViewSelect + '.html';

  $.ajax({
      url: tmpl_url,
      method: 'GET',
      async: false,
      dataType : 'html',
      success: function (data) {
            $("#longModalTitle").html(titleContent);
            $("#longModalContent").html(data);
            $("#longModal").modal('show');
        }
  });
});

  $(".waves-effect").click(function(){
    var getTestStatement = $(this).find('.testWord');
    var getAnswerStatement = $(this).find('.answerSection');

    if ($(this).find('.testWord').is(':visible')) {
      $(this).toggleClass("highlight");
      $(getTestStatement).css('display', 'none');
      $(getAnswerStatement).css('display', 'block');
    } else {
      $(this).toggleClass("highlight");
      $(getTestStatement).css('display', 'block');
      $(getAnswerStatement).css('display', 'none');
    }
 });
