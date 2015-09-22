!function($) {
  window.Stencil = window.Stencil || {};
  Stencil.Loader = {
    settings: {
      loaderAttribute: 'data-loader'
    },

    init: function(options) {
      var that = this;
      that.settings = $.extend(that.settings, options);
      $('body').addClass('modal-open');
      return $(window).load(function() {
        $("[" + that.settings.loaderAttribute + "]").addClass('hidden');
        return $('body').removeClass('modal-open');
      });
    }
  };
  Stencil.Loader.init();
}(window.jQuery);
