!function($) {
  window.Stencil = window.Stencil || {};
  Stencil.Align = {
    verticalAlign: function(element) {
      var that = this;
      var child, parent, topMargin;
      child = $(element);

      if (child.attr('data-valign-to-window') !== void 0) {
        parent = $(window);
      } else {
        parent = $(child.attr('data-valign'));
      }

      if (child.height() < parent.height()) {
        topMargin = (parent.height() - child.height()) / 2;
        return child.css('margin-top', topMargin);
      } else {
        return that.verticalAlignClear(element);
      }
    },

    verticalAlignClear: function(element) {
      var child, parent;
      parent = $(element);
      child = $(element).find('[data-valign]');
      return child.css('margin-top', 0);
    },

    alignElements: function() {
      var that;
      that = this;
      $('[data-valign-from]').each(function() {
        if ($(window).width() >= $(this).attr('data-valign-from')) {
          return that.verticalAlign(this);
        } else {
          return that.verticalAlignClear(this);
        }
      });

      $('[data-valign-to]').each(function() {
        if ($(window).width() <= $(this).attr('data-valign-to')) {
          return that.verticalAlign(this);
        } else {
          return that.verticalAlignClear(this);
        }
      });

      $('[data-valign]').each(function() {
        return that.verticalAlign(this);
      });
    },

    init: function() {
      var that = this;
      $(window).resize(function() {
        return that.alignElements();
      });

      $(window).load(function() {
        return that.alignElements();
      });

      return $(document).on("ready pjax:success", function() {
        return that.alignElements();
      });
    }
  };

  Stencil.Align.init();
}(window.jQuery);
