#  Stencil
A collection of compilers to help you prototype a new web site or web application preloaded with a set of CSS helpers to help you get shit done fast.

## What you get
+ Generic styles for reset and form
+ Sass patterns for layout, grid, space, media objects, module objects and responsive media queries
+ A pattern folder to maintain reusable snippets of code

## Getting Started
+ Run bundle install `$ bundle install`
+ Start the watcher `$ ./watch`
+ Create/edit files in `_views/`, `_sass/`, `_coffee/`
+ View compiled files in `site/`
+ Count cash

### How it works
All html files in the `_views` folder are compiled into the `_layouts/application.html` file and stored in the `site` folder.

The `style.scss` file in the `_sass` folder is compiled into the `site/stylesheets/` folder.

All CoffeeScript files in the `_coffee` folder are compiled into the `site/javascripts` folder.

All html files in the `_patterns` folder are compiled into the `_layouts/patterns.html` file and saved as `site/patterns.html`.

## How the CSS works
The `_sass/helpers` folder contains the reset styling and a number of OOCSS objects as Sass patterns and mixins ready to be @extended and @included in your classes.

The `_sass/mixins` folder contains Sass mixins for a number of OOCSS objects, ready to be @included in your classes.

The `_sass/_variables.scss` file contains default variables for all 'out of the box' objects and styles, ready to be customized by you.

The `_sass/_custom.scss` file is ready for all your custom CSS, we added some to get you going!

### How the Pattern folder works
The `patterns` folder contains reusable code snippets which are used to create a pattern file for a project, making it easy for someone new to join your project and know what UI patterns are available.

Create and modify snippets of code in the `_patterns` folder. The patterns are compiled into the `./index.html` file.

### Example getting started flow
1. Clone the repo
2. `cd` into the folder
3. Run bundle install `$ bundle install`
4. Start the watcher `$ ./watch`
5. Write some custom SCSS: `_sass/_custom.scss`
6. Write some custom CoffeeScript: `_coffee/scripts.coffee`
7. View your UI patterns in the browser by opening: `site/patterns.html`
8. Edit the layout: `_layouts/application.html`
9. Edit the index file: `_views/index.html`
10. View your page in the browser by opening `site/index.html`
11. Create a new file: `_views/new.html`
12. View your page in the browser by opening `site/new.html`

### Adding custom Javascript plugins
1. Copy javascript file into `site/javascripts`
2. Reference the file in `_layouts/application.html`

### Adding custom CSS 
1. Copy CSS into `site/stylesheets`
2. Reference the file in `_layouts/application.html`

## Inspired by
- [Robert Love](https://github.com/Robert-Love) and his work with [JoyceCSS](http://joycecss.com/).
- [Harry Roberts](http://hry.rbrts.me) and the work done on the [inuit.css](https://github.com/csswizardry/inuit.css) framework which inspired this project.
- [Nicole Sullian](https://github.com/stubbornella) and her work on [OOCSS](https://github.com/stubbornella/oocss)

## Thanks to
- [Jeremy Keith](http://adactio.com) for his work on [Pattern Primer](http://patternprimer.adactio.com/)
- [Hampton Catlin](http://www.hamptoncatlin.com/) and [Nathan Weizenbaum](http://nex-3.com/) for creating [Saas](http://sass-lang.com/).
- [Jeremy Ashkenas](https://github.com/jashkenas) for creating [CoffeeScript](http://coffeescript.org/).
