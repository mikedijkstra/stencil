# Document Ready
$ ->
  Stencil.Nav.init()
  Stencil.Scroll.init(defaultSelector: 'body, .wrapper')
  Stencil.Align.init()
  Stencil.Loader.init()
  Stencil.Toggle.init()
  Stencil.Tooltip.init()
  return

# Window Loaded
$(window).load ->
