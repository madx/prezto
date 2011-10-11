prezto
======

A fast and simple slideshow system with HTML5 + CSS + JavaScript

## About

prezto is a lightweight slideshow system that uses HTML5, CSS and JavaScript. It has
less features than the majority of web-based slideshow systems (S5, Slidy,
Slidedown or Showoff for example) and is just ~200 lines of JS.

prezto is meant to be simple to use by everyone. You just need to have some
basic HTML and CSS knowledge. Advanced users may use custom JS to enhance the
experience.

## Features

* Simple, standard keyboard interaction (space, right, left)
* A menu to quickly jump to a slide
* Easy to share slideshow: just drop your HTML file on a web server
* Minimal requirements (a text editor is barely the only thing you need)
* Use well-known and widespread standards
* Use of custom JS when you need it

These are the things you won't have with prezto (at least without tweaking):

* Fancy transitions and animations between slides
* Automatic font scaling
* Syntax highlighted code (although this is easy to add)
* and certainly many more …

## Controls

* space, right arrow: next slide
* left arrow: previous slide
* home: first slide
* m: toggle menu

## Hooks

Whenever it enters or leaves a slide, prezto runs what I call a hook chain.

Hooks are defined by adding them either to the `hooks.enter` or `hooks.leave`
objects of your prezto object.

    var pt = new prezto();
    pt.hooks.enter['.some-class'] = function (slide) {
      // Do things with slide which wrapped in a jQuery object
    }
    pt.run();

You can have hooks for a specific class or a specific ID using `.class` or `#id`
as a key

If a hook returns `false`, the hook chain will be stopped. ID-hooks are run
before class-hooks. There's a default hook that is run last and whose job is to
center the slide.

It may be important to know that al hooks are rerun when the window is
resized (leave hooks being run before enter hooks).
