# Stencil

A collection of helpers, modifiers, objects and compilers to help you get started building a new web site or web application fast.

## Quick start
+ Bootstrap your environment by running:  
`$ make bootstrap`
+ Start the watcher by running:  
`$ make watch`
+ Create/edit files in `_sass/` and `_scripts/`
+ View compiled files in `assets`
+ Count cash

## Copying to an existing project

Stencil uses Grunt and NPM packages to create a better workflow. It’s recommended you include the following in the `.gitignore` file of your existing repo:
```text
# Ignore sass cache
.sass-cache/

# Ignore NPM files
node_modules
```

## CSS

### Coding style
+ Use soft-tabs with a **two space indent**.
+ Put spaces after `:` in property declarations.
+ Put spaces before `{` in rule declarations.
+ Put line breaks between rulesets.
+ Keep individual selectors to a single line.
+ Place closing braces of declaration blocks on a new line.
+ Each declaration should appear on its own line.
+ Order declarations within a selector alphabetically.
+ Group parent and child objects, declaring parents first.
+ Use variables for colors prefixed with `$color-` ([Name that color](http://chir.ag/projects/name-that-color/))
+ Use `px` for `font-size`.
+ Leave `line-height` unit-less.
+ Don’t specify units for zero values, e.g., `margin: 0` instead of `margin: 0px`.
+ Limit the use of shorthand declarations to instances where you must explicitly set all the available values.

#### Example
```scss
.post,
.another-post {
  background-color: $color-cornflour-blue;
  border: 1px solid $color-denim;
  color: $color-black;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 20px; // Not margin: 0 0 20px;
}
```

### Extend vs Mixin

Extends are prone to causing specificity issues so they should be used sparingly. When in doubt, create a mixin.

#### Use Extend when …
The output of the included CSS is always the same and you are extending a global modifier or there is a relationship between the selectors.

##### Example Sass
```scss
%text-s {
  font-size: $text-s;
}

.post-description {
  @extend %text-s;
}

.page-meta {
  @extend %text-s;
}
```

##### Example output
```scss
.post-description,
.page-meta {
  font-size: 12px;
}
```

##### Example Sass
```scss
.button,
%button {
  display: inline-block;
  padding: 1em;
}

.button-positive {
  @extend %button;
  background-color: $color-green;
  color: $color-white;
}

.button-negative {
  @extend %button;
  background-color: $color-red;
  color: $color-white;
}

.button-neutral {
  @extend %button;
  background-color: $color-lightgray;
  color: $color-black;
}
```

##### Example output
```scss
.button,
.button-positive,
.button-negative,
.button-neutral {
  display: inline-block;
  padding: 1em;
}

.button-positive {
  background-color: green;
  color: white;
}

.button-negative {
  background-color: red;
  color: white;
}

.button-neutral {
  background-color: lightgray;
  color: black;
}
```

#### Use a Mixin when …
The output of the included CSS changes or you need to repeat the same group of declarations.

##### Example Sass
```scss
@mixin border-radius($radius) {
  border-radius: $radius;
}
 
.foo {
  @include border-radius(5px);
}
 
.bar {
  @include border-radius(7px);
}
 
.baz {
  @include border-radius(9px);
}
```

##### Example output
```scss
.foo {
  border-radius: 5px;
}
 
.bar {
  border-radius: 7px;
}
 
.baz {
  border-radius: 9px;
}
```

##### Example Sass
```scss
@mixin text-bold() {
  font-family: webfont, sans-serif;
  font-weight: 700;
}
 
.foo {
  @include text-bold();
}
 
.bar {
  @include text-bold();
}
 
.baz {
  @include text-bold();
}
```

##### Example output
```scss
.foo {
  font-family: webfont, sans-serif;
  font-weight: 700;

}
 
.bar {
  font-family: webfont, sans-serif;
  font-weight: 700;

}
 
.baz {
  font-family: webfont, sans-serif;
  font-weight: 700;
}
```

### Naming Conventions

#### Object

```scss
.noun {}	        //examples: .button, .menu, .textbox, .header
```

#### Module

```scss
.noun {}            // parent: .post
.noun-noun {}       // child:  .post-title
```

#### Modifiers

```scss
.is-state {}        // state: is-selected, is-hidden
.adjective {}       // examples: .left, .right, .block, .inline

%is-hidden { display:    none !important; }
%left { float: left !important; }
```

#### Subclasses

```scss
.adjective-noun {}  // example: .dropdown-button
```

### File Structure
```text
_sass
├── global
│   └── _base.scss
│   └── _reset.scss
│   └── _variables.scss
├── helpers
│   ├── _animation.scss
│   ├── _background.scss
│   ├── _form.scss
│   └── _mask.scss
│   └── _scroll.scss
│   └── _style.scss
│   └── _text.scss
├── modifiers
│   ├── _display.scss
│   └── _resonsive.scss
│   └── _setup.scss
│   └── _space.scss
│   └── _text.scss
│   └── _visibility.scss
├── modules
│   ├── _typography.scss
├── objects
│   ├── _button.scss
│   ├── _form.scss
│   ├── _grid.scss
│   ├── _media.scss
│   ├── _nav.scss
│   ├── _tooltip.scss
├── application.scss
```

### Modifiers

All modifiers are available to extend as placeholders or add direct to HTML as classes and come with prefixes for `tab`, `lap`, `desk`, and `cinema`. The value for these break-points can be set in `global/_variables`.

#### Display
+ `%block’
+ + `%inline’
+ + `%inline-block’

#### Responsive
+ `%is-responsive-image`

#### Space

Space modifiers are configured for `margin` and `padding` and come with suffixes for `n`, `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`. The value of each of these can be set in `global/_variables`.

Example for no padding:
+ `%padding-bottom-n`
+ `%padding-left-n`
+ `%padding-right-n`
+ + `%padding-top-n`
+ `%padding-horizontal-n`
+ `%padding-vertical-n`

#### Text

Text modifiers for `size`, `letter-spacing`, `line-height` come with suffixes for `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`. The value of each of these can be set in `global/_variables`.

##### Text size
+ `%text-xxs`
+ `%text-xs`
+ `%text-s`
+ `%text-m`
+ `%text-l`
+ `%text-xl`
+ `%text-xxl`

##### Letter spacing
+ `%letter-xxs`
+ `%letter-xs`
+ `%letter-s`
+ `%letter-m`
+ `%letter-l`
+ `%letter-xl`
+ `%letter-xxl`

##### Line height
+ `%line-xxs`
+ `%line-xs`
+ `%line-s`
+ `%line-m`
+ `%line-l`
+ `%line-xl`
+ `%line-xxl`

##### Alignment
+ `%text-center`
+ `%text-left`
+ `%text-right`
+ `%text-top`
+ `%text-bottom`
+ `%text-middle`

##### Transform
+ `%text-uppercase`
+ `%text-lowercase`
+ `%text-capitalize`

##### Decoration
+ `%text-underline`
+ + `%text-none`

#### Visibility
+ `%is-hidden`
+ `%is-visible`

### Grid

The grid system is based off the bootstrap grid but has been modified to use the `tab`, `lap`, `desk`, and `cinema` break point sizes which can be set in `global/_variables`.

#### Default class example
```html
<div class=“container-fluid”>
  <div class=“row”>
    <div class=“col-palm-12 col-tab-4”></div>
    <div class=“col-palm-12 col-tab-4”></div>
    <div class=“col-palm-12 col-tab-4”></div>
  </div>
</div>
```

#### Modular example
``` html
<div class=“container-fluid”>
  <div class=“posts”>
    <div class=“posts-post”></div>
    <div class=“posts-post”></div>
    <div class=“posts-post”></div>
  </div>
</div>
```

```scss
.posts {  
  @inlcude row;
}

.posts-post {
  @extend %col-palm-12, %tab-col-4;
}
```

#### References
+ http://roytomeij.com/blog/2013/should-you-use-a-sass-mixin-or-extend.html
+ http://csswizardry.com/2014/01/extending-silent-classes-in-sass/
+ http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/
+ http://thesassway.com/advanced/modular-css-naming-conventions
+ http://thesassway.com/advanced/modular-css-typography
+ https://github.com/styleguide/css

## JS

### Compilation

CoffeeScript and JavaScript files found in `_scripts/modules` and `_scripts` will be compiled into
JavaScript and saved as `_scripts/build/application.js`. The `modules` files will be compiled first to ensure they're available to the custom script files.

The compiled `application.js` file will then be combined with all the Javascript files
found in `_scripts/vendor`, minified and saved as `assets/application.min.js`. The `vendor` files will be compiled first to ensure they're available to the custom script files.

#### Adding Javascript plugins

1. Copy and paste the plugin into `_scripts/vendor`
2. Initialize your plugin in a custom script file in `_scripts`, e.g. `_scripts/application.coffee`

### File Structure
```text
_scripts
├── modules
│   ├── align.coffee
│   ├── loader.coffee
│   ├── nav.coffee
│   ├── scroll.coffee
│   ├── toggle.coffee
│   ├── tooltip.coffee
├── vendor
│   ├── bootstrap-tooltip.js
├── application.coffee
```
