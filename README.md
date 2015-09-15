# Stencil

A collection of mixins, utilities and modules to help you get started building a new web site or web application fast.

## Goals
+ Have a default structure so you know how to start
+ Be flexible so you’re never constrained
+ Easily include and use well supported open source components
+ Encourage creating and sharing reusable code as modules between projects

## Table of Contents

+ [Getting Started](#getting-started)
+ [Stylesheets](#stylesheets)
	+ [Coding system](#coding-system)
	+ [Coding style](#coding-style)
	+ [Naming Conventions](#naming-conventions)
	+ [Modifiers](#utilities)
	+ [File structure](#file-structure)
	+ [Extend vs Mixin](#extend-vs-mixin)
+ [JavaScripts](#javascripts)
	+ [Modules](#modules)
	+ [File structure](#scripts-file-structure)

## Getting started
+ Install NPM:  
`$ curl https://www.npmjs.org/install.sh | sh `
+ Install NPM packages:  
`$ npm install`
+ Fetch latest versions of lib files with:    
`$ bower install`
+ Run Gulp copy lib files to build directory:
`$ gulp build`
+ Copy build directory to your project.

## Stylesheets

### Coding system
+ Variables are set in `global/_variables.scss`.
+ Setup your font mixins in `global/_fonts`.
+ Create re-usable blocks of code in `modules/`.
+ Keep module specific variables in their own file (makes them easier to share between projects).
+ Add custom CSS to `_base`.
+ Put quick fixes in `_shame` to be refactored later!

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

### Grid

The Grid included is the Bootstrap Grid. [See the Bootstrap Grid System docs](http://getbootstrap.com/css/#grid)

### Utilities

All utilities are available to extend or add direct to HTML as classes and come with prefixes for `sm`, `md`, `lg`, and `xl`. The value for these break-points can be set in `global/_variables`.

#### Text utilities

Text utilities for `size` come with suffixes for `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`. The value of each of these can be set in `global/_variables`.

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

Space utilities are configured for `margin` and `padding` and come with suffixes for `n`, `sm`, `md`, `lg`. The value of each of these can be set in `global/_variables`.

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

### File structure
```text
scss
├── global
│   └── _fonts.scss
│   └── _variables.scss
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

### Modules

Stencil has a number of built in objects for commonly used patterns.

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

#### Scroll

The Scroll object provides a few different functions to either manipulate the page scrolling (useful when showing a modal overlay) or scroll to an element on the page.

##### Example

Initialize the object:

```js
Stencil.Scroll.init()
```

**Disable page scroll**

```js
Stencil.Scroll.disable()
```

**Enable page scroll**

```js
Stencil.Scroll.enable()
```

**Scroll to selector**

```html
<a href=“#” data-scroll-to=“#section-2” data-scroll-to-offset=“-100”>Scroll to section two</a>
```

#### Toggle

The Toggle object uses a data attribute to toggle the `visible` and `hidden` classes on a target.

##### Example

Initialize the object:

```js
Stencil.Toggle.init()
```

**Toggle the element**

```html
<div data-toggle=“#section-two”>
	Click to hide section two
</div>
```
