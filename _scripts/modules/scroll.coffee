Stencil = Stencil || {}
Stencil.Scroll =
  disabled: false
  position: 0
  settings:
    disableClass: 'no-scroll'
    defaultSelector: 'body'
    scrollSelector: 'html, body'
    scrollToAttribute: 'data-scroll-to'
    scrollToOffsetAttribute: 'data-scroll-to-offset'
    scrollToSelector: '[data-scroll-to]'

  init: (options) ->
    Stencil.Scroll.settings = $.extend(Stencil.Scroll.settings, options)

    $(window).scroll ->
      unless Stencil.Scroll.disabled
        Stencil.Scroll.position = $(window).scrollTop()

    scrollToSelector = Stencil.Scroll.settings.scrollToSelector
    $(scrollToSelector).click ->
      scrollTo = $(this).attr(Stencil.Scroll.settings.scrollToAttribute)
      offset = parseInt $(this).attr(Stencil.Scroll.settings.scrollToOffsetAttribute)
      Stencil.Scroll.to(scrollTo, offset)

  disable: (selector) ->
    selector = selector || Stencil.Scroll.settings.defaultSelector
    Stencil.Scroll.disabled = true
    $(selector).addClass(Stencil.Scroll.settings.disableClass)

  enable: (selector) ->
    selector = selector || Stencil.Scroll.settings.defaultSelector
    $(selector).removeClass(Stencil.Scroll.settings.disableClass)
    $(window).scrollTop Stencil.Scroll.position
    Stencil.Scroll.disabled = false

  to: (selector, offset) ->
    offset = offset || 0
    scrollTo = $(selector).offset().top + offset
    $(Stencil.Scroll.settings.scrollSelector).animate({ scrollTop: scrollTo }, "fast")
