Stencil = Stencil || {}
Stencil.Toggle =
  settings:
    hideAttribute: 'data-hidden'
    toggleAttribute: 'data-toggle'

  init: (options) ->
    settings = Stencil.Toggle.settings
    settings = $.extend(settings, options)

    $("[#{settings.hideAttribute}]").hide()

    $("[#{settings.toggleAttribute}]").click ->
      target = $(this).attr("#{settings.toggleAttribute}")
      $(target).fadeToggle()
      if $(target).attr('data-toggle-expanded') == undefined
        $(target).attr('data-toggle-expanded', '')
      else
        $(target).removeAttr('data-toggle-expanded')

      if Stencil.Scroll
        Stencil.Scroll.disable()
      else
        console.error 'Error initializing Stencil.Loader'
        console.error 'Dependency Missing: Stencil.Scroll'
