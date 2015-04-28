window.Stencil = window.Stencil || {};
Stencil.Loader = {
  settings: {
    loaderAttribute: 'data-loader'
  },

  init: function(options) {
    var that = this;
    that.settings = $.extend(that.settings, options);

    if (Stencil.Scroll) {
      Stencil.Scroll.disable('body');
      return $(window).load(function() {
        $("[" + that.settings.loaderAttribute + "]").addClass('hidden');
        return Stencil.Scroll.enable('body');
      });
    } else {
      console.error('Error initializing Stencil.Loader');
      return console.error('Dependency Missing: Stencil.Scroll');
    }
  }
};
