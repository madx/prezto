*prezto*
======

A dead simple JavaScript slideshow system using HTML5 + CSS.

## About

*prezto* is a lightweight slideshow system that uses HTML5, CSS and JavaScript.
It has less features than the majority of web-based slideshow systems (S5,
Slidy, Slidedown or Showoff for example) and is just ~80 lines of JS.

*prezto* is meant to be simple to use by everyone. You just need to have some
basic HTML and CSS knowledge. Advanced users may use custom JS to enhance the
experience.

The easiest way to use *prezto* is to clone this repo and modify the `slides.html` file.

## Features

* Simple, standard keyboard interaction (space, right, left)
* Easy to share slideshow: just drop your HTML file on a web server
* Minimal requirements (a text editor is barely the only thing you need)
* Use well-known and widespread standards
* Extensible through custom JavaScript

## Controls

*prezto*'s defaults controls are simple:

* `space`, `→`: next slide
* `←`: previous slide
* `home`: first slide

## Extend

The whole *prezto* API is exposed as a `slideShow` property on the `window` object.

This means that you can use all the methods of the `SlideShow` class through
this property to remote control your slideshow.

## Compatibility

*prezto* has been tested in the following browsers:

* Firefox (16)
* Chromium (23)

## Feedback and contributions

Feel free to share your thoughts, remarks or suggestions about *prezto*. Also,
contributions are more than welcome, as long as they fit in the spirit of
*prezto*.

If you're using it successfully in a browser that's not listed in the
compatibility list, please report it so I can update the list.
