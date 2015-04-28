window.Stencil = window.Stencil || {}
Stencil.Toggle = {
  settings: {
    toggleAttribute: 'data-toggle'
  },

  init: function(options) {
    that = this;
    that.settings = $.extend(that.settings, options);

    $(document).on('click', "[" + that.settings.toggleAttribute + "]", function() {
      target = $(this).attr(that.settings.toggleAttribute);

      if ($(target).hasClass('visible')) {
        $(target).addClass('hidden').removeClass('visible');
      } else {
        $(target).addClass('visible').removeClass('hidden');
      }
    });
  }
};
