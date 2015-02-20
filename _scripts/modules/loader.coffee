Stencil = Stencil || {}
Stencil.Loader =
  settings:
    loaderAttribute: 'data-loader'

  init: (options) ->
    Stencil.Loader.settings = $.extend(Stencil.Loader.settings, options)

    if Stencil.Scroll
      Stencil.Scroll.disable('body')
      $(window).load ->
        $("[#{Stencil.Loader.settings.loaderAttribute}]").fadeOut()
        Stencil.Scroll.enable('body')
    else
      console.error 'Error initializing Stencil.Loader'
      console.error 'Dependency Missing: Stencil.Scroll'
