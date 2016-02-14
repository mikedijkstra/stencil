window.Stencil = window.Stencil || {};

/*doc
---
title: Vertical Align
name: vertical-align
category: Utilities
---

Aligns elements vertically.

Instantiate with `Stencil.verticalAlign()`.

Vertical Align works on all elements with the data attribute 'data-valign'.

You can set the following options using data attribute tags:
  
+ `data-valign`: Selector for the parent to align to. Default is window.
+ `data-valign-to`: Break point to vertically align to. Default is window width.
+ `data-valign-from`: Break point to vertically align from. Default is 0.
+ `data-valign-property`: Property to manipulate to center. Default is margin-top.

```markup_example_template
<div id="my-id">
  <div data-valign="#my-id" data-valign-from="768px">
    Content
  </div>
</div>

<script>
  $(window).load(function() {
    Stencil.verticalAlign();
  });

  $(window).resize(function() {
    Stencil.verticalAlign();
  });
</script>
```
*/

Stencil.verticalAlign = function() {
  var windowWidth = $(window).width();

  $('[data-valign]').each(function() {
    var child = $(this);
    var parent = $(this).attr('data-valign');
    var to = $(this).attr('data-valign-to');
    var from = $(this).attr('data-valign-from');
    var property = $(this).attr('data-valign-property');

    if ( parent == undefined ) { parent = window }
    if ( to == undefined ) { to = $(window).width() }
    if ( from == undefined ) { from = 0 }
    if ( property == undefined ) { property = 'margin-top' }

    if (windowWidth <= parseInt(to) && windowWidth >= parseInt(from)) {
      var parentHeight = $(parent).outerHeight(),
          childHeight = $(child).outerHeight();
      if (childHeight < parentHeight) {
        return $(child).css(property, (parentHeight - childHeight) / 2);
      }
    }

    return $(child).css(property, 0);
  });
}
