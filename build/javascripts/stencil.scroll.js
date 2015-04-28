window.Stencil = window.Stencil || {};
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
    var that = this;
    var scrollToSelector;

    that.settings = $.extend(that.settings, options);
    $(window).scroll(function() {
      if (!Stencil.Scroll.disabled) {
        return Stencil.Scroll.position = $(window).scrollTop();
      }
    });

    scrollToSelector = that.settings.scrollToSelector;
    return $(scrollToSelector).click(function() {
      var offset, scrollTo;
      scrollTo = $(this).attr(that.settings.scrollToAttribute);
      offset = parseInt($(this).attr(that.settings.scrollToOffsetAttribute));
      return Stencil.Scroll.to(scrollTo, offset);
    });
  },

  disable: function(selector) {
    selector = selector || this.settings.defaultSelector;
    Stencil.Scroll.disabled = true;
    return $(selector).addClass(this.settings.disableClass);
  },

  enable: function(selector) {
    selector = selector || this.settings.defaultSelector;
    $(selector).removeClass(this.settings.disableClass);
    $(window).scrollTop(Stencil.Scroll.position);
    return Stencil.Scroll.disabled = false;
  },

  to: function(selector, offset) {
    var scrollTo;
    offset = offset || 0;
    scrollTo = $(selector).offset().top + offset;
    return $(this.settings.scrollSelector).animate({
      scrollTop: scrollTo
    }, "fast");
  }
};
