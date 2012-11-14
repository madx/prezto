/**
 * prezto
 * ======
 * A dead simple JavaScript slideshow system using HTML5 + CSS.
 *
 * Requires Zepto.js (tested with 1.0rc1)
 */

var Prezto = function(window, $) {

  var SlideShow = function() {
    this.slides  = $('body > div');
    this.current = 0;
    this.last    = this.slides.size() - 1;
  };

  SlideShow.prototype.start = function() {
    var self = this;
    $(window).bind('keydown', function (ev) { self.keyDown(ev);          });
    $(window).bind('resize',  function (ev) { self.jumpTo(self.current); });

    this.slides.each(function(i, e) {
      $(e).hide();
    });

    this.jumpTo(this.current);
  };

  SlideShow.prototype.fold = function() {
    this.slides.each(function(i, e) {
      $(e).hide();
    });

    this.jumpTo(this.current);
  };

  SlideShow.prototype.expand = function() {
    this.slides.each(function(i, e) {
      $(e).show();
    });
  };

  SlideShow.prototype.jumpTo = function(slideId) {
    $(this.slides[this.current]).hide();
    this.current = slideId;
    $(this.slides[slideId]).show();
  };

  SlideShow.prototype.next = function () {
    if (this.current == this.last) return;
    this.jumpTo(this.current + 1);
  };

  SlideShow.prototype.prev = function () {
    if (this.current == 0) return;
    this.jumpTo(this.current - 1);
  };

  SlideShow.prototype.home = function () {
    this.jumpTo(0);
  };

  SlideShow.prototype.keyDown = function (ev) {
    var handlers = {
      32: this.next, // space
      39: this.next, // right
      37: this.prev, // left
      36: this.home // home
    }

    if (ev.which in handlers) {
      handlers[ev.which].call(this);
      ev.preventDefault();
    }
  };

  window.slideShow = new SlideShow();
  window.slideShow.start();
};

