Stencil = Stencil || {}
Stencil.Scroll =
  disabled: false
  position: 0
  settings:
    disableClass: 'no-scroll'
    defaultSelector: 'body'

  init: (options) ->
    Stencil.Scroll.settings = $.extend(Stencil.Scroll.settings, options)

    $(window).scroll ->
      unless Stencil.Scroll.disabled
        Stencil.Scroll.position = $(window).scrollTop()

  disable: (selector) ->
    selector = selector || Stencil.Scroll.settings.defaultSelector
    Stencil.Scroll.disabled = true
    $(selector).addClass(Stencil.Scroll.settings.disableClass)

  enable: (selector) ->
    selector = selector || Stencil.Scroll.settings.defaultSelector
    $(selector).removeClass(Stencil.Scroll.settings.disableClass)
    $(window).scrollTop Stencil.Scroll.position
    Stencil.Scroll.disabled = false
