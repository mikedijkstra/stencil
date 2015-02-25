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
