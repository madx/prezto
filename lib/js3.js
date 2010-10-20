/**
 * js³
 * ===
 * A dead simple JavaScript slideshow system using HTML+CSS.
 * It removes almost all unneeded things (transitions, incremental bullet
 * points,...) to make you focus on the contents.
 *
 * Requires jQuery (tested with 1.4.3)
 *
 * See examples/slides.html for usage examples.
 */

(function(window, undefined) {

var document = window.document;

/**
 * Constructor function.
 */
var js3 = function() {
  this.slides  = $('body > div');
  this.current = 0;
  this.total   = this.slides.size() - 1;

  this.slides.each(function (index) {
    $(this).attr('id', 'slide-'+index);
  });

  this.buildMenu();
  this.buildHelp();
}

/**
 * Runs the slideshow.
 */
js3.prototype.run = function() {
  var self = this;
  $(window).bind('keydown', function (ev) { self.keyDown(ev); });
  $(window).bind('resize',  function (ev) { self.applyTransform(); });
  this.slides.hide();

  if (window.location.hash.match(/^#slide-\d+$/)) {
    this.jumpTo(new Number(window.location.hash.substr(7)));
  } else {
    this.jumpTo(0);
  }
};

/**
 * Jumps to a specific slide.
 */
js3.prototype.jumpTo = function (i) {
  this.currentSlide().hide();
  this.current = i;
  this.currentSlide().show();

  window.location = "#slide-"+i;
  $('#menu li:first-child').html(this.current + '/' + this.total);
  this.applyTransform();
};

/**
 * Returns the current slide wrapped in a jQuery object.
 */
js3.prototype.currentSlide = function () {
  return this.slides.slice(this.current, this.current+1);
};

/**
 * Goes to the next slide or stay on this one if this is the last.
 */
js3.prototype.next = function () {
  if (this.current == this.total) return;
  this.jumpTo(this.current + 1);
};

/**
 * Goes to the previous slide or stay on this one if this is the first.
 */
js3.prototype.prev = function () {
  if (this.current == 0) return;
  this.jumpTo(this.current - 1);
};

/**
 * Goes to the first slide.
 */
js3.prototype.home = function () {
  this.jumpTo(0);
};

/**
 * Builds the menu box and hide it.
 */
js3.prototype.buildMenu = function () {
  var self = this;

  $('body').append('<ul id="menu"></ul>');

  var li = document.createElement('li');
  $(li).html(this.current + '/' + this.total);
  $('#menu').append(li);

  this.slides.each(function (index) {
    var li = document.createElement('li');
    var a  = document.createElement('a');

    $(a).click(function () {
      self.jumpTo(index);
    }).html(index).attr('href', '#slide-'+index);
    $(li).append(a);
    $('#menu').append(li);
  });

  $('#menu').hide();
};

/**
 * Builds the help box and hide it.
 */
js3.prototype.buildHelp = function () {
  $('body').append(
  '<ul id="help">' +
      '<li><kbd>space</kbd>&nbsp;<kbd>→</kbd> next slide</li>' +
      '<li><kbd>←</kbd> previous slide</li>' +
      '<li><kbd>home</kbd> first slide</li>' +
      '<li><kbd>h</kbd> toggle help</li>' +
      '<li><kbd>m</kbd> toggle menu</li>' +
  '</ul>');
  $('#help').hide();
};

/**
 * Toggles the menu.
 */
js3.prototype.toggleMenu = function () {
  $('#menu').toggle(200);
};

/**
 * Toggles the help.
 */
js3.prototype.toggleHelp = function () {
  $('#help').toggle(200);
};

/**
 * Event handler for keydown events, enables keyboard navigation.
 */
js3.prototype.keyDown = function (ev) {
  switch (ev.which) {
    case 32: this.next();       break; // space
    case 39: this.next();       break; // right
    case 37: this.prev();       break; // left
    case 36: this.home();       break; // home
    case 72: this.toggleHelp(); break; // h
    case 77: this.toggleMenu(); break; // m
  }
};

/**
 * Call a javascript function for the current slide.
 * Adapters allows you to apply a given js function to a slide.
 */
js3.prototype.applyTransform = function () {
  var self = this;
  var classes = (this.currentSlide().attr('class') + ' _default')
    .trim()
    .split(/\s+/);

  $.each(classes, function (index, klass) {
    if (js3.transformers[this])
      js3.transformers[this].call(self, self.currentSlide());
  });
};

/**
 * Default adapter for the adapt() method.
 */
js3.transformers = {
  _default: function (slide) {
    slide.css('top',  (window.innerHeight - slide.outerHeight()) / 2);
    slide.css('left', (window.innerWidth - slide.outerWidth()) / 2);
  }
};

/**
 * Returns informations about the slideshow.
 */
js3.prototype.toString = function() {
  return "("+this.current+"/"+this.total+")";
};

// Expose js3 to the global object
return (window.js3 = js3);

})(window);
