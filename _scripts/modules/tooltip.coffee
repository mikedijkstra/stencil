Stencil = Stencil || {}
Stencil.Tooltip =
  settings:
    tooltipAttribute: 'data-tooltip'

  init: (options) ->
    Stencil.Loader.settings = $.extend(Stencil.Loader.settings, options)

    $("[#{Stencil.Loader.settings.tooltipAttribute}]").tooltip
      trigger: 'manual'

    $("[#{Stencil.Loader.settings.tooltipAttribute}]").on 'click', ->
      $("[#{Stencil.Loader.settings.tooltipAttribute}]").tooltip('destroy')
      $(this).tooltip('show')

    if $('html.no-touch').length
      $("[#{Stencil.Loader.settings.tooltipAttribute}]").on 'mouseover', (event) ->
        $("[#{Stencil.Loader.settings.tooltipAttribute}]").tooltip('destroy')
        $(this).tooltip('show')
