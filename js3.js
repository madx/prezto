/*
 * js3 - javascript simple slideshow system
 *
 */


js3 = {

  "current": 0,

  "init": function() {
    $('.slide').hide();
    $('#menu').hide();
    $('.incremental > *').hide();
    js3.slides = $('#slideshow > div.slide');
    slidecount = 0;
    js3.slides.each(function() {
      /* Append to menu */
      title = $(this).find('h1').html();
      ref   = "javascript:js3.menuJumpTo("+slidecount+")";
      entry = "<li><a href=\""+ref+"\" title=\"Jump to slide\">"+title+"</li>"
      $('#menu ul').append(entry);
      /* Compute footnotes */
      fn_num = 1;
      $(this).find('.fn').each(function() {
        $(this).append('<sup>'+fn_num+'</sup>');
        fn_num++;
      });
      slidecount++;
    });
    js3.count  = slidecount;
    js3.curri  = 0;
    js3.main   = $('#layout #contents');
    document.onkeypress = js3.keyNav;
    js3.showSlide();
  },
  
  "currentSlide": function() {
    return js3.slides.eq(js3.current);
  },

  "nthSlide": function(num) {
    return js3.slides.eq(num);
  },

  "showSlide": function() {
    slide = js3.currentSlide();
    js3.main.html(slide.html());
    slide.find('.fn').each(function() {
      num   = $(this).children('sup').text();
      title = $(this).attr('title');
      $('#footnotes').append("<p>"+num+": "+title+"</p>");
    });
    js3.main.addClass(slide.attr('class'));
  },

	"flushLayout": function() {
    js3.main.html('').removeClass();
    js3.curri = 0;
    $('#layout #footnotes').html('');
  },

	"jumpTo": function(num) {
    js3.flushLayout();
    js3.current = num;
    js3.showSlide();
  },

  "nextStep": function(force) {
    /* Show the next slide or the next item for incremental display */
    if(!force && js3.incLen() > 0) {
      if(js3.curri < js3.incLen()) {
        js3.main.find('.incremental').children().eq(js3.curri).show();
        js3.curri++;
      } else {
        js3.curri = 0;
        js3.nextStep(true);
      }
    } else if(js3.current + 1 < js3.count) {
      js3.flushLayout();
      js3.current += 1;
      js3.showSlide();
    }
  },

  "nextSlide": function() {
    if(js3.current + 1 < js3.count)
      js3.jumpTo(js3.current+1);
  },

  "prevStep": function(force) {
    if(!force && js3.incLen() > 0) {
      if(js3.curri > 0) {
        js3.curri--;
        js3.main.find('.incremental').children().eq(js3.curri).hide();
      } else {
        js3.curri = 0;
        js3.prevStep(true);
      }
    } else if(js3.current > 0) {
      js3.flushLayout();
      js3.current -= 1;
      js3.showSlide();
    }
  },

  "prevSlide": function() {
    if(js3.current > 0)
      js3.jumpTo(js3.current-1);
  },

  "toggleMenu": function() {
    $('#menu').toggle();
  },

  "menuJumpTo": function(n) {
    js3.jumpTo(n);
    js3.toggleMenu();
  },
  
  "slideTitle": function(num) {
    return js3.nthSlide(num).children('h1').eq(0).html();
  },

  "incLen": function() {
    return js3.main.find('.incremental > *').length;
  },
  
  "keyNav": function(key) {
    key = key || window.event;
    switch(key.which) {
      case 32:  js3.nextStep();          break; /* space     */ 
      case 36:  js3.jumpTo(js3.count-1); break; /* $         */ 
      case 48:  js3.jumpTo(0);           break; /* 0         */ 
      case 8:   js3.prevStep();          break; /* backspace */ 
      case 110: js3.nextSlide();         break; /* n         */ 
      case 112: js3.prevSlide();         break; /* p         */ 
      case 103: js3.toggleMenu();        break; /* g         */ 
    }
    switch(key.keyCode) {
      case 39: js3.nextStep(); break; /* Arrow keys left and right */
      case 37: js3.prevStep(); break;
    }
  }
};

$(function() { js3.init(); });
