/**
 * prezto
 * ======
 * A dead simple JavaScript slideshow system using HTML5 + CSS.
 * It removes almost all unneeded things (transitions, incremental bullet
 * points,...) to make you focus on the contents.
 *
 * Requires jQuery (tested with 1.4.3)
 *
 * See examples/slides.html for usage examples.
 */

(function(window) {

var document = window.document;

/**
 * Constructor.
 */
var prezto = function() {
  this.slides  = $('body > div');
  this.current = -1;
  this.last    = this.slides.size() - 1;
  this.hooks   = {
    enter: {
      _default: function (slide) {
        slide.css('top',  (window.innerHeight - slide.outerHeight()) / 2);
        slide.css('left', (window.innerWidth  - slide.outerWidth())  / 2);
      }
    },
    leave: {}
  };

  if (this.last == -1) this.fail();

  this.slides.each(function (index) {
    $(this).attr('id', 'slide-'+index);
  });

  this.setup();
};

/**
 * Run the slideshow.
 */
prezto.prototype.run = function() {
  var self = this;
  $(window).bind('keydown', function (ev) { self.keyDown(ev); });
  $(window).bind('resize',  function (ev) { self.fitWindow(); });
  this.slides.hide();

  if (window.location.hash.match(/^#slide-\d+$/)) {
    var i = new Number(window.location.hash.substr(7));
    this.current = i;
    this.jumpTo(i);
  } else {
    this.jumpTo(0);
  }
};

/**
 * Jump to a specific slide.
 */
prezto.prototype.jumpTo = function (i) {
  if (this.current >= 0) this.runHooks('leave');

  this.setCurrentMenuItemClass('');
  this.currentSlide().hide();
  this.current = i;
  this.currentSlide().show();
  this.setCurrentMenuItemClass('current');

  window.location = "#slide-"+i;

  this.progress.html(this.toString());

  this.runHooks('enter');
};

/**
 * Return the current slide wrapped in a jQuery object.
 */
prezto.prototype.currentSlide = function () {
  return this.slides.slice(this.current, this.current+1);
};

/**
 * Go to the next slide or stay on this one if this is the last.
 */
prezto.prototype.next = function () {
  if (this.current == this.last) return;
  this.jumpTo(this.current + 1);
};

/**
 * Go to the previous slide or stay on this one if this is the first.
 */
prezto.prototype.prev = function () {
  if (this.current == 0) return;
  this.jumpTo(this.current - 1);
};

/**
 * Go to the first slide.
 */
prezto.prototype.home = function () {
  this.jumpTo(0);
};

/**
 * Build the interface
 */
prezto.prototype.setup = function () {
  var self = this;

  // Menu
  this.menu = $(document.createElement('menu'));
  this.slides.each(function (index) {
    var li = document.createElement('li');
    var a  = document.createElement('a');

    $(a).click(function () {
      self.jumpTo(index);
    }).html(index)
      .attr('href', '#slide-'+index)
      .attr('id', 'slide-'+index+'-anchor');
    $(li).append(a);
    self.menu.append(li);
  });

  // Progressbar
  this.progress = $(document.createElement('p'))
    .attr('id', 'progress');

  $('body').append(this.menu);
  $('body').append(this.progress);

  this.menu.hide();
};

prezto.prototype.fail = function () {
  var err = $(document.createElement('h1'));
  err.attr('id', 'pt-fail')
     .html("fail: no slides");

  $('body').append(err);

  this.hooks.enter._default(err);

  throw('prezto cannot initialize');
};

/**
 * Toggle the menu.
 */
prezto.prototype.toggleMenu = function () {
  this.menu.toggle(200);
};

/**
 * Update the current menu item class
 */
prezto.prototype.setCurrentMenuItemClass = function (c) {
  $('#slide-'+this.current+'-anchor').attr('class', c);
};

/**
 * Event handler for keydown events.
 */
prezto.prototype.keyDown = function (ev) {
  switch (ev.which) {
    case 32: this.next();       break; // space
    case 39: this.next();       break; // right
    case 37: this.prev();       break; // left
    case 36: this.home();       break; // home
    case 77: this.toggleMenu(); break; // m
  }
};

/**
 * Run custom hooks
 */
prezto.prototype.runHooks = function (type) {
  var self = this;
  var id  = this.currentSlide().attr('id');
  var cls = (this.currentSlide().attr('class') || "").trim().split(/\s+/);
  var names = ['_default'];

  if (id != undefined)
    names.push('#'+id);
  if (cls != undefined) {
    $.each(cls, function (i, n) {
      if (n != '')
        names.push('.'+n);
    });
  }

  $.each(names, function(index, hook) {
    if (self.hooks[type][hook] != undefined) {
      self.hooks[type][hook].call(self, self.currentSlide());
    }
  });
};

/**
 * Returns informations about the slideshow.
 */
prezto.prototype.toString = function() {
  return [
    '(', this.current, '/', this.last, ') ',
    Math.round(this.current * 100.0 / this.last), '%'
  ].join('');

};

// Expose prezto to the global object
return (window.prezto = prezto);

})(window);
