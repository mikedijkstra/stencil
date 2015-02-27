Stencil = Stencil || {}
Stencil.Nav =
  settings:
    breakPointAttribute: 'data-nav-menu-break-point'
    menuAttribute: 'data-nav-menu'
    overlayAttribute: 'data-nav-overlay'
    parentAttribute: 'data-nav'
    toggleAttribute: 'data-toggle-nav-menu'

  init: (options) ->
    settings = Stencil.Nav.settings
    settings = $.extend(settings, options)

    $(document).on 'click', "[#{settings.toggleAttribute}]", ->
      menu = $(this).parents("[#{settings.parentAttribute}]").find("[#{settings.menuAttribute}]")
      overlay = $(this).parents("[#{settings.parentAttribute}]").find("[#{settings.overlayAttribute}]")

      $(menu).slideToggle()
      $(overlay).toggle()

      if $(menu).attr('data-nav-menu-expanded') == undefined
        $(menu).attr('data-nav-menu-expanded', '')
      else
        $(menu).removeAttr('data-nav-menu-expanded')

    $(document).on 'click touchstart', "[#{settings.overlayAttribute}]", ->
      menu = $(this).parents("[#{settings.parentAttribute}]").find("[#{settings.menuAttribute}]")
      overlay = $(this).parents("[#{settings.parentAttribute}]").find("[#{settings.overlayAttribute}]")

      $(overlay).hide()
      $(menu).slideUp()
      $(menu).removeAttr('data-nav-menu-expanded')

    $(document).on 'click', "[#{settings.menuAttribute}] a", ->
      if $(window).width() >= $(this).attr(settings.breakPointAttribute)
        menu = $(this).parents("[#{settings.menuAttribute}]")
        overlay = $(this).parents("[#{settings.parentAttribute}]").find("[#{settings.overlayAttribute}]")
        $(overlay).hide()
        $(menu).slideUp()
        $(menu).removeAttr('data-nav-menu-expanded')

    $(window).resize ->
      $("[#{settings.menuAttribute}]").each ->
        if $(window).width() >= $(this).attr(settings.breakPointAttribute)
          $(this).fadeIn()
        else if $(this).attr('data-nav-menu-expanded') == undefined
          $(this).hide()
        else
          $(this).show()

    return

  hide: ->
    settings = Stencil.Nav.settings
    $("[#{settings.parentAttribute}]").each ->
      $menu = $(this).find("[#{settings.menuAttribute}]")
      $overlay = $(this).find("[#{settings.overlayAttribute}]")
      if $(window).width() < $menu.attr(settings.breakPointAttribute)
        $menu.slideUp()
        $menu.removeAttr('data-nav-menu-expanded')
        $overlay.hide()

    return
