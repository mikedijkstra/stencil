Stencil = Stencil || {}
Stencil.Tooltip =
  settings:
    tooltipAttribute: 'data-tooltip'

  init: (options) ->
    @settings = $.extend(@settings, options)

    $("[#{@settings.tooltipAttribute}]").tooltip
      trigger: 'manual'

    that = this
    $("[#{@settings.tooltipAttribute}]").on 'click', ->
      $("[#{that.settings.tooltipAttribute}]").tooltip('destroy')
      $(this).tooltip('show')

    $("[#{@settings.tooltipAttribute}]").on 'mouseover', (event) ->
      $("[#{that.settings.tooltipAttribute}]").tooltip('destroy')
      $(this).tooltip('show')
