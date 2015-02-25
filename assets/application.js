/* ========================================================================
 * Bootstrap: tooltip.js v3.3.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.1'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
    this.arrow()
      .css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isHorizontal ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

(function() {
  var Stencil;

  Stencil = Stencil || {};

  Stencil.Align = {
    verticalAlign: function(element) {
      var child, parent, topMargin;
      parent = $(element);
      child = $(element).find('[data-valign-child]');
      topMargin = (parent.height() - child.height()) / 2;
      return child.css('margin-top', topMargin);
    },
    verticalAlignClear: function(element) {
      var child, parent;
      parent = $(element);
      child = $(element).find('[data-valign-child]');
      return child.css('margin-top', 0);
    },
    horizontalAlign: function(element) {
      var child, parent, topMargin;
      parent = $(element);
      child = $(element).find('[data-halign-child]');
      topMargin = (parent.width() - child.width()) / 2;
      return child.css('margin-left', topMargin);
    },
    horizontalAlignClear: function(element) {
      var child, parent;
      parent = $(element);
      child = $(element).find('[data-halign-child]');
      return child.css('margin-left', 0);
    },
    alignElements: function() {
      $('[data-valign-from]').each(function() {
        if ($(window).width() >= $(this).attr('data-valign-from')) {
          return Stencil.Align.verticalAlign(this);
        } else {
          return Stencil.Align.verticalAlignClear(this);
        }
      });
      $('[data-valign]').each(function() {
        return Stencil.Align.verticalAlign(this);
      });
      $('[data-halign-from]').each(function() {
        if ($(window).width() >= $(this).attr('data-halign-from')) {
          return Stencil.Align.horizontalAlign(this);
        } else {
          return Stencil.Align.horizontalAlignClear(this);
        }
      });
      return $('[data-halign]').each(function() {
        return Stencil.Align.horizontalAlign(this);
      });
    },
    init: function() {
      $(window).resize(function() {
        return Stencil.Align.alignElements();
      });
      $(window).load(function() {
        return Stencil.Align.alignElements();
      });
      return $(document).on("ready pjax:success", function() {
        return Stencil.Align.alignElements();
      });
    }
  };

  Stencil = Stencil || {};

  Stencil.Loader = {
    settings: {
      loaderAttribute: 'data-loader'
    },
    init: function(options) {
      Stencil.Loader.settings = $.extend(Stencil.Loader.settings, options);
      if (Stencil.Scroll) {
        Stencil.Scroll.disable('body');
        return $(window).load(function() {
          $("[" + Stencil.Loader.settings.loaderAttribute + "]").fadeOut();
          return Stencil.Scroll.enable('body');
        });
      } else {
        console.error('Error initializing Stencil.Loader');
        return console.error('Dependency Missing: Stencil.Scroll');
      }
    }
  };

  Stencil = Stencil || {};

  Stencil.Nav = {
    settings: {
      breakPointAttribute: 'data-nav-menu-break-point',
      menuAttribute: 'data-nav-menu',
      overlayAttribute: 'data-nav-overlay',
      parentAttribute: 'data-nav',
      toggleAttribute: 'data-toggle-nav-menu'
    },
    init: function(options) {
      var settings;
      settings = Stencil.Nav.settings;
      settings = $.extend(settings, options);
      $(document).on('click', "[" + settings.toggleAttribute + "]", function() {
        var menu, overlay;
        menu = $(this).parents("[" + settings.parentAttribute + "]").find("[" + settings.menuAttribute + "]");
        overlay = $(this).parents("[" + settings.parentAttribute + "]").find("[" + settings.overlayAttribute + "]");
        $(menu).slideToggle();
        $(overlay).toggle();
        if ($(menu).attr('data-nav-menu-expanded') === void 0) {
          return $(menu).attr('data-nav-menu-expanded', '');
        } else {
          return $(menu).removeAttr('data-nav-menu-expanded');
        }
      });
      $(document).on('click touchstart', "[" + settings.overlayAttribute + "]", function() {
        var menu, overlay;
        menu = $(this).parents("[" + settings.parentAttribute + "]").find("[" + settings.menuAttribute + "]");
        overlay = $(this).parents("[" + settings.parentAttribute + "]").find("[" + settings.overlayAttribute + "]");
        $(overlay).hide();
        $(menu).slideUp();
        return $(menu).removeAttr('data-nav-menu-expanded');
      });
      $(document).on('click', "[" + settings.menuAttribute + "] a", function() {
        var menu, overlay;
        if ($(window).width() >= $(this).attr(settings.breakPointAttribute)) {
          menu = $(this).parents("[" + settings.menuAttribute + "]");
          overlay = $(this).parents("[" + settings.parentAttribute + "]").find("[" + settings.overlayAttribute + "]");
          $(overlay).hide();
          $(menu).slideUp();
          return $(menu).removeAttr('data-nav-menu-expanded');
        }
      });
      $(window).resize(function() {
        return $("[" + settings.menuAttribute + "]").each(function() {
          if ($(window).width() >= $(this).attr(settings.breakPointAttribute)) {
            return $(this).fadeIn();
          } else if ($(this).attr('data-nav-menu-expanded') === void 0) {
            return $(this).hide();
          } else {
            return $(this).show();
          }
        });
      });
    },
    hide: function() {
      var settings;
      settings = Stencil.Nav.settings;
      $("[" + settings.parentAttribute + "]").each(function() {
        var $menu, $overlay;
        $menu = $(this).find("[" + settings.menuAttribute + "]");
        $overlay = $(this).find("[" + settings.overlayAttribute + "]");
        if ($(window).width() < $menu.attr(settings.breakPointAttribute)) {
          $menu.slideUp();
          $menu.removeAttr('data-nav-menu-expanded');
          return $overlay.hide();
        }
      });
    }
  };

  Stencil = Stencil || {};

  Stencil.Scroll = {
    disabled: false,
    position: 0,
    settings: {
      disableClass: 'no-scroll',
      defaultSelector: 'body'
    },
    init: function(options) {
      Stencil.Scroll.settings = $.extend(Stencil.Scroll.settings, options);
      return $(window).scroll(function() {
        if (!Stencil.Scroll.disabled) {
          return Stencil.Scroll.position = $(window).scrollTop();
        }
      });
    },
    disable: function(selector) {
      selector = selector || Stencil.Scroll.settings.defaultSelector;
      Stencil.Scroll.disabled = true;
      return $(selector).addClass(Stencil.Scroll.settings.disableClass);
    },
    enable: function(selector) {
      selector = selector || Stencil.Scroll.settings.defaultSelector;
      $(selector).removeClass(Stencil.Scroll.settings.disableClass);
      $(window).scrollTop(Stencil.Scroll.position);
      return Stencil.Scroll.disabled = false;
    }
  };

  Stencil = Stencil || {};

  Stencil.Toggle = {
    settings: {
      hideAttribute: 'data-hidden',
      toggleAttribute: 'data-toggle'
    },
    init: function(options) {
      var settings;
      settings = Stencil.Toggle.settings;
      settings = $.extend(settings, options);
      $("[" + settings.hideAttribute + "]").hide();
      return $("[" + settings.toggleAttribute + "]").click(function() {
        var target;
        target = $(this).attr("" + settings.toggleAttribute);
        $(target).fadeToggle();
        if ($(target).attr('data-toggle-expanded') === void 0) {
          $(target).attr('data-toggle-expanded', '');
        } else {
          $(target).removeAttr('data-toggle-expanded');
        }
        if (Stencil.Scroll) {
          return Stencil.Scroll.disable();
        } else {
          console.error('Error initializing Stencil.Loader');
          return console.error('Dependency Missing: Stencil.Scroll');
        }
      });
    }
  };

  Stencil = Stencil || {};

  Stencil.Tooltip = {
    settings: {
      tooltipAttribute: 'data-tooltip'
    },
    init: function(options) {
      Stencil.Loader.settings = $.extend(Stencil.Loader.settings, options);
      $("[" + Stencil.Loader.settings.tooltipAttribute + "]").tooltip({
        trigger: 'manual'
      });
      $("[" + Stencil.Loader.settings.tooltipAttribute + "]").on('click', function() {
        $("[" + Stencil.Loader.settings.tooltipAttribute + "]").tooltip('destroy');
        return $(this).tooltip('show');
      });
      if ($('html.no-touch').length) {
        return $("[" + Stencil.Loader.settings.tooltipAttribute + "]").on('mouseover', function(event) {
          $("[" + Stencil.Loader.settings.tooltipAttribute + "]").tooltip('destroy');
          return $(this).tooltip('show');
        });
      }
    }
  };

}).call(this);

(function() {
  var Stencil;

  Stencil = Stencil || {};

  Stencil.Align = {
    verticalAlign: function(element) {
      var child, parent, topMargin;
      parent = $(element);
      child = $(element).find('[data-valign-child]');
      topMargin = (parent.height() - child.height()) / 2;
      return child.css('margin-top', topMargin);
    },
    verticalAlignClear: function(element) {
      var child, parent;
      parent = $(element);
      child = $(element).find('[data-valign-child]');
      return child.css('margin-top', 0);
    },
    horizontalAlign: function(element) {
      var child, parent, topMargin;
      parent = $(element);
      child = $(element).find('[data-halign-child]');
      topMargin = (parent.width() - child.width()) / 2;
      return child.css('margin-left', topMargin);
    },
    horizontalAlignClear: function(element) {
      var child, parent;
      parent = $(element);
      child = $(element).find('[data-halign-child]');
      return child.css('margin-left', 0);
    },
    alignElements: function() {
      $('[data-valign-from]').each(function() {
        if ($(window).width() >= $(this).attr('data-valign-from')) {
          return Stencil.Align.verticalAlign(this);
        } else {
          return Stencil.Align.verticalAlignClear(this);
        }
      });
      $('[data-valign]').each(function() {
        return Stencil.Align.verticalAlign(this);
      });
      $('[data-halign-from]').each(function() {
        if ($(window).width() >= $(this).attr('data-halign-from')) {
          return Stencil.Align.horizontalAlign(this);
        } else {
          return Stencil.Align.horizontalAlignClear(this);
        }
      });
      return $('[data-halign]').each(function() {
        return Stencil.Align.horizontalAlign(this);
      });
    },
    init: function() {
      $(window).resize(function() {
        return Stencil.Align.alignElements();
      });
      $(window).load(function() {
        return Stencil.Align.alignElements();
      });
      return $(document).on("ready pjax:success", function() {
        return Stencil.Align.alignElements();
      });
    }
  };

  Stencil = Stencil || {};

  Stencil.Loader = {
    settings: {
      loaderAttribute: 'data-loader'
    },
    init: function(options) {
      Stencil.Loader.settings = $.extend(Stencil.Loader.settings, options);
      if (Stencil.Scroll) {
        Stencil.Scroll.disable('body');
        return $(window).load(function() {
          $("[" + Stencil.Loader.settings.loaderAttribute + "]").fadeOut();
          return Stencil.Scroll.enable('body');
        });
      } else {
        console.error('Error initializing Stencil.Loader');
        return console.error('Dependency Missing: Stencil.Scroll');
      }
    }
  };

  Stencil = Stencil || {};

  Stencil.Nav = {
    settings: {
      breakPointAttribute: 'data-nav-menu-break-point',
      menuAttribute: 'data-nav-menu',
      overlayAttribute: 'data-nav-overlay',
      parentAttribute: 'data-nav',
      toggleAttribute: 'data-toggle-nav-menu'
    },
    init: function(options) {
      var settings;
      settings = Stencil.Nav.settings;
      settings = $.extend(settings, options);
      $(document).on('click', "[" + settings.toggleAttribute + "]", function() {
        var menu, overlay;
        menu = $(this).parents("[" + settings.parentAttribute + "]").find("[" + settings.menuAttribute + "]");
        overlay = $(this).parents("[" + settings.parentAttribute + "]").find("[" + settings.overlayAttribute + "]");
        $(menu).slideToggle();
        $(overlay).toggle();
        if ($(menu).attr('data-nav-menu-expanded') === void 0) {
          return $(menu).attr('data-nav-menu-expanded', '');
        } else {
          return $(menu).removeAttr('data-nav-menu-expanded');
        }
      });
      $(document).on('click touchstart', "[" + settings.overlayAttribute + "]", function() {
        var menu, overlay;
        menu = $(this).parents("[" + settings.parentAttribute + "]").find("[" + settings.menuAttribute + "]");
        overlay = $(this).parents("[" + settings.parentAttribute + "]").find("[" + settings.overlayAttribute + "]");
        $(overlay).hide();
        $(menu).slideUp();
        return $(menu).removeAttr('data-nav-menu-expanded');
      });
      $(document).on('click', "[" + settings.menuAttribute + "] a", function() {
        var menu, overlay;
        if ($(window).width() >= $(this).attr(settings.breakPointAttribute)) {
          menu = $(this).parents("[" + settings.menuAttribute + "]");
          overlay = $(this).parents("[" + settings.parentAttribute + "]").find("[" + settings.overlayAttribute + "]");
          $(overlay).hide();
          $(menu).slideUp();
          return $(menu).removeAttr('data-nav-menu-expanded');
        }
      });
      $(window).resize(function() {
        return $("[" + settings.menuAttribute + "]").each(function() {
          if ($(window).width() >= $(this).attr(settings.breakPointAttribute)) {
            return $(this).fadeIn();
          } else if ($(this).attr('data-nav-menu-expanded') === void 0) {
            return $(this).hide();
          } else {
            return $(this).show();
          }
        });
      });
    },
    hide: function() {
      var settings;
      settings = Stencil.Nav.settings;
      $("[" + settings.parentAttribute + "]").each(function() {
        var $menu, $overlay;
        $menu = $(this).find("[" + settings.menuAttribute + "]");
        $overlay = $(this).find("[" + settings.overlayAttribute + "]");
        if ($(window).width() < $menu.attr(settings.breakPointAttribute)) {
          $menu.slideUp();
          $menu.removeAttr('data-nav-menu-expanded');
          return $overlay.hide();
        }
      });
    }
  };

  Stencil = Stencil || {};

  Stencil.Scroll = {
    disabled: false,
    position: 0,
    settings: {
      disableClass: 'no-scroll',
      defaultSelector: 'body',
      scrollSelector: 'html, body',
      scrollToAttribute: 'data-scroll-to',
      scrollToOffsetAttribute: 'data-scroll-to-offset',
      scrollToSelector: '[data-scroll-to]'
    },
    init: function(options) {
      var scrollToSelector;
      Stencil.Scroll.settings = $.extend(Stencil.Scroll.settings, options);
      $(window).scroll(function() {
        if (!Stencil.Scroll.disabled) {
          return Stencil.Scroll.position = $(window).scrollTop();
        }
      });
      scrollToSelector = Stencil.Scroll.settings.scrollToSelector;
      return $(scrollToSelector).click(function() {
        var offset, scrollTo;
        scrollTo = $(this).attr(Stencil.Scroll.settings.scrollToAttribute);
        offset = parseInt($(this).attr(Stencil.Scroll.settings.scrollToOffsetAttribute));
        return Stencil.Scroll.to(scrollTo, offset);
      });
    },
    disable: function(selector) {
      selector = selector || Stencil.Scroll.settings.defaultSelector;
      Stencil.Scroll.disabled = true;
      return $(selector).addClass(Stencil.Scroll.settings.disableClass);
    },
    enable: function(selector) {
      selector = selector || Stencil.Scroll.settings.defaultSelector;
      $(selector).removeClass(Stencil.Scroll.settings.disableClass);
      $(window).scrollTop(Stencil.Scroll.position);
      return Stencil.Scroll.disabled = false;
    },
    to: function(selector, offset) {
      var scrollTo;
      offset = offset || 0;
      scrollTo = $(selector).offset().top + offset;
      return $(Stencil.Scroll.settings.scrollSelector).animate({
        scrollTop: scrollTo
      }, "fast");
    }
  };

  Stencil = Stencil || {};

  Stencil.Toggle = {
    settings: {
      hideAttribute: 'data-hidden',
      toggleAttribute: 'data-toggle'
    },
    init: function(options) {
      var settings;
      settings = Stencil.Toggle.settings;
      settings = $.extend(settings, options);
      $("[" + settings.hideAttribute + "]").hide();
      return $("[" + settings.toggleAttribute + "]").click(function() {
        var target;
        target = $(this).attr("" + settings.toggleAttribute);
        $(target).fadeToggle();
        if ($(target).attr('data-toggle-expanded') === void 0) {
          $(target).attr('data-toggle-expanded', '');
        } else {
          $(target).removeAttr('data-toggle-expanded');
        }
        if (Stencil.Scroll) {
          return Stencil.Scroll.disable();
        } else {
          console.error('Error initializing Stencil.Loader');
          return console.error('Dependency Missing: Stencil.Scroll');
        }
      });
    }
  };

  Stencil = Stencil || {};

  Stencil.Tooltip = {
    settings: {
      tooltipAttribute: 'data-tooltip'
    },
    init: function(options) {
      Stencil.Loader.settings = $.extend(Stencil.Loader.settings, options);
      $("[" + Stencil.Loader.settings.tooltipAttribute + "]").tooltip({
        trigger: 'manual'
      });
      $("[" + Stencil.Loader.settings.tooltipAttribute + "]").on('click', function() {
        $("[" + Stencil.Loader.settings.tooltipAttribute + "]").tooltip('destroy');
        return $(this).tooltip('show');
      });
      if ($('html.no-touch').length) {
        return $("[" + Stencil.Loader.settings.tooltipAttribute + "]").on('mouseover', function(event) {
          $("[" + Stencil.Loader.settings.tooltipAttribute + "]").tooltip('destroy');
          return $(this).tooltip('show');
        });
      }
    }
  };

  $(function() {
    Stencil.Nav.init();
    Stencil.Scroll.init({
      defaultSelector: 'body, .wrapper'
    });
    Stencil.Align.init();
    Stencil.Loader.init();
    Stencil.Toggle.init();
    Stencil.Tooltip.init();
  });

  $(window).load(function() {});

}).call(this);
