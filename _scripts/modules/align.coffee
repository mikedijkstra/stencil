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
    that = this
    $('[data-valign-from]').each ->
      if ($(window).width() >= $(this).attr('data-valign-from'))
        that.verticalAlign(this)
      else
        that.verticalAlignClear(this)

    $('[data-valign]').each ->
      that.verticalAlign(this)

    $('[data-halign-from]').each ->
      if ($(window).width() >= $(this).attr('data-halign-from'))
        that.horizontalAlign(this)
      else
        that.horizontalAlignClear(this)

    $('[data-halign]').each ->
      that.horizontalAlign(this)

  init: ->
    that = this
    $(window).resize ->
      that.alignElements()

    $(window).load ->
      that.alignElements()

    $(document).on "ready pjax:success", ->
      that.alignElements()
