/**
 * prezto
 * ======
 * A dead simple JavaScript slideshow system using HTML5 + CSS.
 *
 * Requires Zepto.js (tested with 1.0rc1)
 */

var Prezto = function(window, $) {
  window.slideShow = new Prezto.SlideShow();
  window.slideShow.start();
};

Prezto.SlideShow = function() {
  this.slides  = $('body > div');
  this.current = 0;
  this.last    = this.slides.size() - 1;
  this.handlers = {
    32: this.next, // space
    39: this.next, // right
    37: this.prev, // left
    36: this.home  // home
  }
};

Prezto.SlideShow.prototype.start = function() {
  var self = this;
  $(window).bind('keydown', function (ev) { self.keyDown(ev); });

  this.slides.each(function(i, e) {
    $(e).hide();
  });

  this.jumpTo(this.current);
};

Prezto.SlideShow.prototype.fold = function() {
  this.slides.each(function(i, e) {
    $(e).hide();
  });

  this.jumpTo(this.current);
};

Prezto.SlideShow.prototype.expand = function() {
  this.slides.each(function(i, e) {
    $(e).show();
  });
};

Prezto.SlideShow.prototype.jumpTo = function(slideId) {
  $(this.slides[this.current]).hide();
  this.current = slideId;
  $(this.slides[slideId]).show();
};

Prezto.SlideShow.prototype.next = function () {
  if (this.current == this.last) return;
  this.jumpTo(this.current + 1);
};

Prezto.SlideShow.prototype.prev = function () {
  if (this.current == 0) return;
  this.jumpTo(this.current - 1);
};

Prezto.SlideShow.prototype.home = function () {
  this.jumpTo(0);
};

Prezto.SlideShow.prototype.bind = function(key, handler) {
  this.handlers[key] = handler;
}

Prezto.SlideShow.prototype.keyDown = function (ev) {
  if (ev.which in this.handlers) {
    this.handlers[ev.which].call(this);
    ev.preventDefault();
  }
};

