Stencil = Stencil || {}
Stencil.Align =
  verticalAlign: (element) ->
    parent = $(element)
    child = $(element).find('[data-valign-child]')
    topMargin = ((parent.height() - child.height()) / 2)
    child.css('margin-top', topMargin)

  verticalAlignClear: (element) ->
    parent = $(element)
    child = $(element).find('[data-valign-child]')
    child.css('margin-top', 0)

  horizontalAlign: (element) ->
    parent = $(element)
    child = $(element).find('[data-halign-child]')
    topMargin = ((parent.width() - child.width()) / 2)
    child.css('margin-left', topMargin)

  horizontalAlignClear: (element) ->
    parent = $(element)
    child = $(element).find('[data-halign-child]')
    child.css('margin-left', 0)

  alignElements: ->
    $('[data-valign-from]').each ->
      if ($(window).width() >= $(this).attr('data-valign-from'))
        Stencil.Align.verticalAlign(this)
      else
        Stencil.Align.verticalAlignClear(this)

    $('[data-valign]').each ->
      Stencil.Align.verticalAlign(this)

    $('[data-halign-from]').each ->
      if ($(window).width() >= $(this).attr('data-halign-from'))
        Stencil.Align.horizontalAlign(this)
      else
        Stencil.Align.horizontalAlignClear(this)

    $('[data-halign]').each ->
      Stencil.Align.horizontalAlign(this)

  init: ->
    $(window).resize ->
      Stencil.Align.alignElements()

    $(window).load ->
      Stencil.Align.alignElements()

    $(document).on "ready pjax:success", ->
      Stencil.Align.alignElements()
