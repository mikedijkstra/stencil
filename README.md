# Stencil

A collection of mixins, utilities and modules to help you get started building a new web site or web application fast.

## Goals
+ Have a default structure so you know how to start
+ Be flexible so you’re never constrained
+ Easily include and use well supported open source components
+ Encourage creating and sharing reusable code as modules between projects

## Table of Contents

+ [Getting Started](#getting-started)
+ [Template](#template)
+ [Stylesheets](#stylesheets)
  + [Coding system](#coding-system)
  + [Coding style](#coding-style)
  + [Libraries](#libraries)
  + [Naming Conventions](#naming-conventions)
  + [Utilities](#utilities)
  + [Responsive Mixins](#responsive-mixins)
  + [Modules](#modules)
  + [Extend vs Mixin](#extend-vs-mixin)
  + [File structure](#file-structure)
+ [JavaScripts](#javascripts)
  + [Modules](#javascript-modules)
+ [HTML](#html)

## Getting started
+ Install NPM:  
`$ curl https://www.npmjs.org/install.sh | sh `
+ Install NPM packages:  
`$ npm install`
+ Run Gulp to build directory with lib and stencil files:  
`$ gulp build`
+ Copy `assets` or use with the [stencil
  gem](https://github.com/micdijkstra/stencil-ruby).


## Stylesheets

### Coding system
+ Variables are set in `_variables.scss`.
+ Setup your font mixins in `_fonts`.
+ Add custom CSS to `_base`.
+ Put quick fixes in `_shame` to be refactored later!
+ Create re-usable blocks of code in `modules/`.
+ Keep module specific variables in their own file (makes them easier to share between projects).

### Coding style
+ Use soft-tabs with a **two space indent**.
+ Put spaces after `:` in property declarations.
+ Put line breaks between rulesets.
+ Keep individual selectors to a single line, including `@extend`s.
+ Each declaration should appear on its own line.
+ Order declarations within a selector alphabetically.
+ Group parent and child objects, declaring parents first.
+ Use variables for colors prepend with `$color-`
+ Use `px` for `font-size`.
+ Leave `line-height` unit-less.
+ Don’t specify units for zero values, e.g., `margin: 0` instead of `margin: 0px`.
+ Limit the use of shorthand declarations to instances where you must explicitly set all the available values.
+ When writing CSS put spaces before `{` in rule declarations.
+ When writing CSS place closing braces of declaration blocks on a new line.

### Libraries

The following libraries are included:
 
+ [Normalize.css](https://necolas.github.io/normalize.css/)
+ A selection of [Bootstrap](http://getbootstrap.com/) components

### Grid

The Grid included is the Bootstrap Grid. [See the Bootstrap Grid System docs](http://getbootstrap.com/css/#grid)

### Utilities

All utilities are available to extend or add direct to HTML as classes and come with prefixes for `sm`, `md`, `lg`, and `xl`. The value for these break-points can be set in `_variables`.

#### Text utilities

Text utilities for `size` come with suffixes for `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`. The value of each of these can be set in `_variables`.

##### Example for text size
+ `.u-text-xxs`
+ `.u-text-xs`
+ `.u-text-sm`
+ `.u-text-md`
+ `.u-text-lg`
+ `.u-text-xl`
+ `.u-text-xxl`

##### Example for line height
+ `.u-line-sm`
+ `.u-line-md`
+ `.u-line-lg`

##### Example for letter spacing
+ `.u-letter-sm`
+ `.u-letter-md`
+ `.u-letter-lg`

##### Example for alignment
+ `.u-text-center`
+ `.u-text-left`
+ `.u-text-right`
+ `.u-text-top`
+ `.u-text-bottom`
+ `.u-text-middle`

##### Responsive example
+ `.u-sm-text-xxs`
+ `.u-sm-text-xs`
+ `.u-sm-text-sm`
+ `.u-sm-text-md`
+ `.u-sm-text-lg`
+ `.u-sm-text-xl`
+ `.u-sm-text-xxl`

#### Space utilities

Space utilities are configured for `margin` and `padding` and come with suffixes for `n`, `sm`, `md`, `lg`. The value of each of these can be set in `_variables`.

Example for small padding:
+ `.u-padding-bottom-sm`
+ `.u-padding-left-sm`
+ `.u-padding-right-sm`
+ `.u-padding-top-sm`
+ `.u-padding-horizontal-sm`
+ `.u-padding-vertical-sm`
+ `.u-padding-all-sm`

##### Responsive example
+ `.u-sm-padding-bottom-sm`
+ `.u-sm-padding-left-sm`

### Responsive Mixins

A number of responsive media query mixins are included.

#### From

Will create a media query from the passed in value, e.g.:

+ `@include from(370px) {}`
+ `@include from($device-sm) {}`

#### Shorthand From

The following are shorthand for the from mixin above and correspond the
`$device-` variables set in `_variables`.

+ `@include sm {}`
+ `@include md {}`
+ `@include lg {}`
+ `@include xl {}`


#### To

Will create a media query to the passed in value, e.g.:

+ `@include to(370px) {}`
+ `@include to($device-md) {}`

### Modules

You are encouraged to create modules so code can be shared and reused between projects.

#### Loader

Shows a loading gif before the page is fully loaded.
 
Markup:
```
<div class="loader" data-loader></div>
```
Configure the loading image in `stylesheets/modules/_loader.scss`

#### Nav

A lightweight responsive navigation bar which will collapse at `device-sm`.
 
Markup:
```
<div class="nav-overlay collapse" id="nav-overlay" data-toggle="collapse" data-target="#nav-menu, #nav-overlay"></div>
<div class="nav" id="nav">
  <div class="nav-brand">
    <a href="/" itemprop="url" class="nav-logo">
      <img src="logo.png" alt="CompanyName" itemprop="logo">
    </a>
  </div>

  <div class="nav-menu-toggle">
    <a href="#" class="nav-menu-toggle-control" data-toggle="collapse" data-target="#nav-menu, #nav-overlay">Menu</a>
  </div>

  <div class="nav-menu collapse" id="nav-menu">
    <ul class="nav-menu-items">
      <li class="nav-menu-item"><a href="/page.html">Page</a></li>
      <li class="nav-menu-item"><a href="#">Link</a></li>
      <li class="nav-menu-item nav-menu-item-right"><a href="#">Link</a></li>
    </ul>
  </div>
</div>
```

Modify the styles in `stylesheets/modules/_nav.scss`

### File structure

```text
scss
├── lib
├── mixins
│   ├── _all.scss
│   ├── _background.scss
│   └── _media-queries.scss
│   └── _style.scss
├── modules
│   ├── _all.scss
│   ├── _footer.scss
│   ├── _loader.scss
│   ├── _longform.scss
│   ├── _nav.scss
│   ├── _overlay.scss
├── utilities
│   ├── _all.scss
│   ├── _display.scss
│   └── _resonsive.scss
│   └── _space.scss
│   └── _text.scss
└── _base.scss
└── _fonts.scss
└── _variables.scss
└── _shame.scss
├── application.scss
```

### Extend vs Mixin

Extends are prone to causing specificity issues so they should be used sparingly. When in doubt, create a mixin.

#### Use Extend when …
The output of the included CSS is always the same and you are extending a global modifier or there is a relationship between the selectors.

##### Example sass
```scss
.button {
  display: inline-block;
  padding: 1em;
}

.button-positive {
  @extend .button;
  background-color: $color-button-brand;
  color: $color-white;
}

.button-negative {
  @extend .button;
  background-color: $color-button-error;
  color: $color-white;
}

.button-neutral {
  @extend .button;
  background-color: $color-button-netural;
  color: $color-black;
}
```

##### Example output
```css
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

##### Example sass
```scss
@mixin border-radius($radius) {
  border-radius: $radius;
  -webkit-border-radius: $radius;
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
```css
.foo {
  border-radius: 5px;
	-webkit-border-radius: 5px;
}
 
.bar {
  border-radius: 7px;
	-webkit-border-radius: 7px;
}
 
.baz {
  border-radius: 9px;
	-webkit-border-radius: 9px;
}
```

## JavaScripts

### JavaScript Modules

Stencil has a number of built in objects for commonly used patterns. These are
automatically compiled into `javascripts/stencil.js`.

#### Align

The Align object provides data attributes to vertically and horizontally align absolutely positioned elements.

##### Example

Initialize the object:

```js
Stencil.Align.init()
```

**Vertically align**

```html
<div id="wrapper">
	<div data-valign="#wrapper">
	</div>
</div>
```

**Vertically align from breakpoint**

```html
<div id="wrapper">
	<div data-valign="#wrapper" data-valign-from="768">
	</div>
</div>
```

**Vertically align to breakpoint**

```html
<div id="wrapper">
	<div data-valign="#wrapper" data-valign-to="768">
	</div>
</div>
```

**Vertically align within window**

```html
<div>
	<div data-valign data-valign-to-window>
	</div>
</div>
```

#### Loader

The loader will show a full screen div with a  loading gif until the page is ready.

##### Example

Initialize the object:

```js
Stencil.Loader.init()
```

Add the loader to your HTML:

```html
<body>
  <div data-loader></div>
	…
</body>
```

## Templates

A boilerplate for use with the [stencil gem](https://github.com/micdijkstra/stencil-ruby) has been included for a your convenience, see `templates/`

This following JavaScript libraries are linked to:

+ [jQuery](https://jquery.com/)
+ [Modernizr](https://modernizr.com/)
+ [Respond.js](https://github.com/scottjehl/Respond)

