jQuery(document).ready(function($){
  $('.projects-container li').siblings('li').addClass('is-loaded');

  //open project
  $('.projects-container li').on('click', function(){
    // console.log("click", $(this));
    var selectedProject = $(this),
      toggle = !selectedProject.hasClass('is-full-width');
    console.log(toggle);
    if(toggle) toggleProject($(this), $('.projects-container'), toggle);
  });

  function toggleProject(project, container, bool) {
    if(bool) {
      //expand project
      container.addClass('project-is-open');
      project.addClass('is-full-width').siblings('li').removeClass('is-loaded');
    } else {
      //check media query
      var mq = window.getComputedStyle(document.querySelector('.projects-container'), '::before').getPropertyValue('content'),
        delay = ( mq == 'mobile' ) ? 100 : 0;

      container.removeClass('project-is-open');
      //fade out project
      project.animate({opacity: 0}, 800, function(){
        project.removeClass('is-loaded');
        $('.projects-container').find('.cd-scroll').attr('style', '');
        setTimeout(function(){
          project.attr('style', '').removeClass('is-full-width').find('.cd-title').attr('style', '');
        }, delay);
        setTimeout(function(){
          showCaption($('.projects-container li').eq(0));
        }, 300);
      });
    }
  }

  function changeOpacity(){
    var newOpacity = 1- $(window).scrollTop()/300;
    $('.projects-container .cd-scroll').css('opacity', newOpacity);
    $('.is-full-width .cd-title').css('opacity', newOpacity);
  }

  function showCaption(project) {
    if(project.length > 0 ) {
      setTimeout(function(){
        project.addClass('is-loaded');
        showCaption(project.next());
      }, 150);
    }
  }

});